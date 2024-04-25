import _ from 'lodash';

import { Model } from './base/Model';
import { IAppState, ILarekItem, IOrder, IOrderForm } from '../types';

export class LarekItem extends Model<ILarekItem> {
	description: string;
	id: string;
	image: string;
	title: string;
	price: number | null;
	category: string;
	isIncluded: boolean;
}

export class AppState extends Model<IAppState> {
	catalog: ILarekItem[];
	loading: boolean;
	order: IOrder = {
		address: '',
		email: '',
		phone: '',
		payment: '',
		items: [],
		total: 0,
	};
	preview: string | null;
	formError: string | null;

	toggleOrderedItem(id: string, isIncluded: boolean) {
		if (isIncluded) {
			this.order.items = _.uniq([...this.order.items, id]);
		} else {
			this.order.items = _.without(this.order.items, id);
		}
	}

	clearBasket() {
		this.order.items.forEach((id) => {
			this.toggleOrderedItem(id, false);
		});
	}

	setCatalog(items: ILarekItem[]) {
		this.catalog = items.map((item) => new LarekItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item?: ILarekItem) {
		this.preview = item?.id ?? null;
		if (this.preview) {
			this.emitChanges('preview:changed', item);
		}
	}

	toggleItemInBasket(item: ILarekItem, isIncluded?: boolean) {
		// const isIncluded = this.order.items.includes(item.id);

		this.toggleOrderedItem(item.id, isIncluded ?? !item.isIncluded);
		this.emitChanges('preview:changed', item);
	}

	setTotal() {
		this.order.total = this.order.items.reduce(
			(res, cur) =>
				(res += this.catalog.find((item) => item.id === cur)?.price ?? 0),
			0
		);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		return !this.formError?.length;
	}
}
