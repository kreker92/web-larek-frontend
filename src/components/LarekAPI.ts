import {
	ApiListResponse,
	ILarekItem,
	ILarekApi,
	OrderResponse,
} from '../types';
import { Api } from './base/Api';
import { IOrder } from '../types';

export class LarekAPI extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getItemList() {
		return this.get('/product/').then((data: ApiListResponse<ILarekItem>) => ({
			...data,
			items: data.items.map((item: ILarekItem) => ({
				...item,
				image: this.cdn + item.image,
			})),
		}));
	}

	makeOrder(order: IOrder) {
		return this.post('/order', order, 'POST').then(
			(data: OrderResponse) => data
		);
	}
}
