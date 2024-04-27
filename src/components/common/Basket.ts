import { Component } from '../base/Component';
import { createElement, ensureElement, formatNumber } from '../../utils/utils';
import { EventEmitter } from '../base/Events';

export class Basket<T> extends Component<T> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(
		blockName: string,
		container: HTMLElement,
		protected events: EventEmitter
	) {
		super(container);

		this._list = ensureElement<HTMLElement>(
			`.${blockName}__list`,
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			`.${blockName}__price-num`,
			this.container
		);
		this._button = ensureElement<HTMLElement>(
			`.${blockName}__button`,
			this.container
		);

		this._button.addEventListener('click', () => {
			events.emit('order:open');
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	setDisabledButton(state: boolean) {
		super.setDisabled(this._button, state);
	}

	set total(total: number) {
		this.setText(this._total, formatNumber(total));
	}
}
