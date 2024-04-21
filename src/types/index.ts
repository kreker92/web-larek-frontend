/**
 * Типы оплаты: онлайн, при получении
 */
export type Payment = 'online' | 'cash';

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
 * Поля карточки товара
 */
export type ILarekItem = {
	id: string;
	title: string;
	category: string;
	image: string;
	price: number | null;
	description: string;
};

/**
 * Интерфейс страницы сайта
 */
export interface IAppState {
	catalog: ILarekItem[];
	basket: Pick<ILarekItem, 'id'>[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export interface IOrderForm {
	address: string;
	email: string;
	phone: string;
	payment: Payment;
}

export interface IOrder extends IOrderForm {
	items: Pick<ILarekItem, 'id'>[];
	total: number;
}

/**
 * Тип ответа на запрос списка товаров
 * */
type ILarekItemsResponse = {
	total: number;
	items: ILarekItem[];
};

/**
 * Тип ответа на отправку заказа
 */
type OrderResponse = Partial<{
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
	getCards(uri: string): Promise<ILarekItemsResponse>;
	sendOrder(
		uri: string,
		data: IOrder,
		method?: ApiPostMethods
	): Promise<OrderResponse>;
}

/**
 * Интерфейс класса Modal
 */
export interface IModal {
	set content(content: HTMLElement);
	open(): void;
	close(): void;
}
