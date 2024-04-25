/* eslint-disable no-debugger */
import { Component } from './base/Component';
import { bem, ensureElement } from '../utils/utils';
import clsx from 'clsx';
import { ICard, ICardActions, ILarekItem } from '../types';
import { settings } from '../utils/constants';

export class Card<T> extends Component<T> implements ICard {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _category?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _itemCounter?: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		// Общая часть
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);

		// Card preview
		this._category = container.querySelector(`.${blockName}__category`);
		this._image = container.querySelector(`.${blockName}__image`);
		this._description = container.querySelector(`.${blockName}__text`);

		// Card in basket
		this._itemCounter = container.querySelector(`.basket__item-index`);

		// Card preview + in basket
		this._button = container.querySelector(`.${blockName}__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: ILarekItem['price']) {
		this.setText(this._price, this.constructPrice(value));
	}

	get price(): ILarekItem['price'] {
		return isNaN(+this._price) ? null : +this._price;
	}

	set button(isIncluded: boolean) {
		this.setText(this._button, isIncluded ? 'Убрать из корзины' : 'В корзину');
	}

	set category(value: string) {
		if (this._category) {
			this.setText(this._category, value);
			this._category.className = clsx('card__category', {
				[bem(
					this.blockName,
					'category',
					settings.itemCategoryClasses[this.category] ??
						settings.itemCategoryClasses['']
				).name]: true,
			});
		}
	}

	get category() {
		return this._category?.textContent ?? '';
	}

	set image(value: string) {
		this.setImage(this._image, value, `${this.category}-${this.title}`);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set itemCounter(value: number) {
		this.setText(this._itemCounter, value);
	}

	get itemCounter(): string {
		return this._itemCounter.textContent || '';
	}

	constructPrice(price: number | null) {
		return price === null ? 'Бесценно' : `${price} синапсов`;
	}
}

export class CatalogItem extends Card<ILarekItem> {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}

	render(data?: Partial<ILarekItem>): HTMLElement {
		this.button = data.isIncluded;
		return super.render(data);
	}
}
