import './scss/styles.scss';

import { LarekAPI } from './components/LarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { AppState, LarekItem } from './components/AppData';
import { Page } from './components/Page';

import { cloneTemplate, ensureElement } from './utils/utils';

import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { CardBasket } from './components/common/CardBasket';
import { Order } from './components/Order';
import { Success } from './components/common/Success';
import { CatalogItem } from './components/Card';
import { IOrderForm, OrderResponse } from './types';
import { Contacts } from './components/Contacts';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Все шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
	onClick: (payment: string) => {
		appData.order.payment = payment;
		events.emit('order:validate');
	},
});
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			...item,
			isIncluded: appData.order.items.includes(item.id),
		});
	});
});

// Открыть товар
events.on('card:select', (item: LarekItem) => {
	appData.setPreview(item);
});

// Изменен открытый выбранный товар
events.on('preview:changed', (item: LarekItem) => {
	const resItem = {
		...item,
		isIncluded: appData.order.items.includes(item.id),
	};
	const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:toggle', resItem);
		},
	});

	modal.render({
		content: card.render(resItem),
	});

	events.emit('modal:open');
});

// добавить в корзину/ удалить из корзины
events.on('card:toggle', (item: LarekItem) => {
	appData.toggleItemInBasket(item);
	events.emit('order:change');
});

// Посчитать тотал в заказе
events.on('order:change', () => {
	appData.setTotal();
	page.counter = appData.order.items.length;
	basket.setDisabledButton(!page.counter);
});

// Открыть корзину с товарами
events.on('basket:open', () => {
	events.emit('order:change');
	modal.render({
		content: basket.render({
			items: appData.order.items
				.map((id, itemCounter) => {
					const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
						onClick: () => {
							appData.toggleOrderedItem(item.id, false);
							events.emit('basket:open');
						},
					});
					const item = appData.catalog.find((item) => item.id === id);
					return item
						? cardBasket.render({ ...item, itemCounter: ++itemCounter })
						: null;
				})
				.filter((item) => item),
			total: appData.order.total,
		}),
	});
});

// Открыть форму заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
		}),
	});
	events.emit('order:validate');
});

// Открыть форму контактов
events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
	events.emit('contacts:validate');
});

// Изменилось одно из полей
events.on(
	/^(order|contacts)\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
		events.emit('order:validate');
		events.emit('contacts:validate');
	}
);

// Валидация формы заказа
events.on('order:validate', () => {
	order.valid = !!(appData.order.payment && appData.order.address);
});

// Валидация формы контатов
events.on('contacts:validate', () => {
	contacts.valid = !!(
		appData.order.payment &&
		appData.order.address &&
		appData.order.phone &&
		appData.order.email
	);
});

// Отправка формы order
events.on('order:submit', () => {
	events.emit('contacts:open');
});

// Отправка формы contacts
events.on('contacts:submit', () => {
	api
		.makeOrder(appData.order)
		.then((result: OrderResponse) => {
			if (result.error) {
				contacts.errors = result.error;
				console.error(result.error, result);
			} else {
				modal.render({
					content: success.render(result),
				});
				events.emit('order:clear');
			}
		})
		.catch((err) => {
			contacts.errors = err as string;
			console.error(err);
		});
});

// Очистка корзины
events.on('order:clear', () => {
	appData.clearBasket();
	page.counter = appData.order.items.length;
	appData.clearOrderForm(order, contacts);
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
	appData.setPreview();
});

// Получаем лоты с сервера
api
	.getItemList()
	// .then(appData.setCatalog.bind(appData)) // !!! зачем это?
	.then((data) => appData.setCatalog(data.items))
	.catch((err) => {
		console.error(err);
	});
