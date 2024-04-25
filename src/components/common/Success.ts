import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { ISuccess, ISuccessActions } from '../../types';

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _description: HTMLElement;
	protected _title: HTMLElement;
	protected descriptionTemplate: string;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._title = ensureElement<HTMLElement>(
			'.order-success__title',
			this.container
		);
		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}

		this.descriptionTemplate = this._description.textContent ?? '';
	}

	set total(value: number | undefined) {
		if (value !== undefined) {
			const res = this.descriptionTemplate.split(' ');
			if (res[1]) {
				res[1] = String(value);
			}
			this.setText(this._description, res.join(' '));
		}
	}

	set error(value: string) {
		this.setText(this._description, value);
		this.setText(this._title, 'Ошибка. Повторите заказ.');
	}
}
