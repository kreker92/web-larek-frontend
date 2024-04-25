/**
 * Интерфейс класса Api
 */
export interface IApi {
	baseUrl: string;
	get(uri: string): Promise<object>;
	post(uri: string, data: object, method: ApiPostMethods): Promise<object>;
}

/**
 * Тело ответа списка товаров из api
 */
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

/**
 * Свойства страницы
 */
export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

/**
 * Поля карточки товара
 */
export type ILarekItem = {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
	isIncluded?: boolean;
};

/**
 * Интерфейс страницы сайта
 */
export interface IAppState {
	catalog: ILarekItem[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrder extends IOrderForm, ApiListResponse<string> {}

/**
 * Тип ответа на отправку заказа
 */
export type OrderResponse = Partial<{
	id: string;
	total: number;
	error: string;
}>;

/**
 * Возможные HTTP методы в api
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * Интерфейс класса LarekApi
 */
export interface ILarekApi extends IApi {
	getItemList(): Promise<ApiListResponse<ILarekItem>>;
	makeOrder(data: IOrder): Promise<OrderResponse>;
}

/**
 * Интерфейс класса Modal
 */
export interface IModal {
	set content(content: HTMLElement);
	open(): void;
	close(): void;
}

/**
 * Поля корзины товаров
 */
export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

/**
 * Интерфейс Компонента формы
 */
export interface IFormState<T> {
	valid: boolean;
	errors: string[];
	onInputChanges: (field: keyof T, value: string) => void;
}
/**
 * Интерфейс модального окна
 */
export interface IModalData {
	content: HTMLElement;
}

/**
 * Методы в карточке товара
 */
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

/**
 * Карточка товара
 */
export interface ICard {
	title: string;
	description?: string | string[];
	image: string;
	category: string;
	price: number | null;
	constructPrice(price: number | null): string;
	isIncluded?: boolean;
}

/**
 * Интерфейс класса EventEmitter
 */
export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
}

/**
 * Интерфейс компонента Success
 */
export interface ISuccess {
	total: number;
}

/**
 * Методы компонента Success
 */
export interface ISuccessActions {
	onClick: () => void;
}

/**
 * тип ключа события
 */
export type EventName = string | RegExp;
/**
 * Тип коллбэка
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Subscriber = Function;
