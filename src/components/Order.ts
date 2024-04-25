import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { IEvents } from './base/events';
import clsx from 'clsx';

export class Order extends Form<Pick<IOrderForm, 'payment' | 'address'>> {
	protected _buttons: NodeListOf<HTMLButtonElement>;

	constructor(
		container: HTMLFormElement,
		events: IEvents,
		actions: {
			onClick: (payment: string) => void;
			onSubmit?: (event: MouseEvent) => void;
		}
	) {
		super(container, events);

		this._buttons = container.querySelectorAll('.button_alt');
		this._buttons.forEach((button) =>
			button.addEventListener('click', () => {
				const payment = button.name;
				actions.onClick(payment);
				this.payment = payment;
			})
		);
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: string) {
		this._buttons.forEach((button) => {
			button.className = clsx('button', 'button_alt', {
				'button_alt-active': button.name === value,
			});
		});
	}
}
