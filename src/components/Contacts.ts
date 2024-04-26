import { Form } from './common/Form';
import { IOrderForm, IEvents } from '../types';

export class Contacts extends Form<IOrderForm> {
	protected _buttons: NodeListOf<HTMLButtonElement>;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
