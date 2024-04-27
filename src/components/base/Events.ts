import { EventName, IEvents, Subscriber } from '../../types';

/**
 * Брокер событий, классическая реализация
 */
export class EventEmitter implements IEvents {
	_events: Map<EventName, Set<Subscriber>>;

	constructor() {
		this._events = new Map<EventName, Set<Subscriber>>();
	}

	/**
	 * Установить обработчик на событие
	 */
	on<T extends object>(eventName: EventName, callback: (event: T) => void) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<Subscriber>());
		}
		this._events.get(eventName)?.add(callback);
	}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: EventName, callback: Subscriber) {
		if (this._events.has(eventName)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			this._events.get(eventName)!.delete(callback);
			if (this._events.get(eventName)?.size === 0) {
				this._events.delete(eventName);
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	emit<T extends object>(eventName: string, data?: T) {
		this._events.forEach((subscribers, name) => {
			if (
				(name instanceof RegExp && name.test(eventName)) ||
				name === eventName
			) {
				subscribers.forEach((callback) => callback(data));
			}
		});
	}
}
