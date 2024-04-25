import { ICardActions, ILarekItem } from '../../types';
import { Card } from '../Card';

export class CardBasket extends Card<ILarekItem> {
	protected _buttons: HTMLElement[];
	protected _total: HTMLElement[];

	constructor(container: HTMLElement, actions: ICardActions) {
		super('card', container, actions);
	}

	render(data?: Partial<ILarekItem & { itemCounter: number }>): HTMLElement {
		this.itemCounter = data.itemCounter;
		return super.render(data);
	}
}
