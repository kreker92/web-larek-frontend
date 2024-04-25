---
runme:
  id: 01HVM5QYR5PKT7KCHMXGQTS2ZK
  version: v3
---

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```sh {"id":"01HVM5QYR5PKT7KCHMX50HEMQ7"}
npm install
npm run start
```

или

```sh {"id":"01HVM5QYR5PKT7KCHMX8HV53MJ"}
yarn
yarn start
```

## Сборка

```sh {"id":"01HVM5QYR5PKT7KCHMXC6Z0V0X"}
npm run build
```

или

```sh {"id":"01HVM5QYR5PKT7KCHMXERAEAGK"}
yarn build
```

## Типы

./src/types/index.ts

## Основные типы данных

Описаны в `./src/types/index.ts`

Состояние страницы IAppState:

- basket - список добавленных в корзину товаров
- catalog - список товаров
- loading - ожидание отрисовки контента (ожидание завершения запроса и отрисовки результата)
- order - все данные по заказу (товары + данные клиента)
- preview - какой товар открыт в модальном окне (id товара)
- formError - сообщение об ошибке после отправки заказа

- toggleOrderedItem - добавление/удаление товара из корзины
- clearBasket - очистка корзины

Заказ IOrder:

- items - список id товаров в заказе
- total - сумма стоимости товаров в заказе
- + IOrderForm

Форма заказа IOrderForm:

- контактные данные клиента

Карточка товара ILarekItem:

- все поля из картоки товара (см. пример ответа Api /product/)

## Базовый код

### Будущие классы из папки base

Базовый класс запросов к серверу Api

- baseUrl - адрес api;
- get - запрос с методом GET
- get - запрос с другими методами. указанными в типе ApiPostMethods

Базовый класс всех View Component
Меняет вид элемента и возвращает HTMLElement

- toggleClass - переключает класс элемента
- setText - установит текст в элемент
- setImage - установит картинку в элемент
- render - вернет HTMLElement

Базовый класс всех сущностей Model
Нужен для изменения данных и вызова событий что их поменяли

- emitChanges - сообщить всем, что модель поменялась

Брокер событий EventEmitter

- on - подписать callback на событие
- off - удалить callback на событие
- emit - вызвать событие

## VIEW

### Page

- catalog - каталог товаров
- counter - счетчик товаров в корзине
- locked - блокировка прокрутки страницы (вызываем при открытии модальнго окна)

### Form

- onInputChange - подписываем поля формы (в конструкторе вызываем для всех полей) на сохранение изменения
- valid - валидность формы для активации кнопки отправки
- errors - сообщение из ошибки

### Modal

- content - элемент для показа в модальном окне
- open -  открыть модальное окно
- close - закрыть его
- render - render + open

### Basket

- items - товары в корзине
- total - цена товаров в корзине

### Success

- total - сумма заказа
- error - ошибка из ответа после отправки заказа

### Card

- id - id товара
- title - название товара
- price - цена товара
- button - текст кнопки добавления в корзину
- category - категория товара
- image - картинка товара
- description - описание товара
- itemCounter - порядковый номер товара
- constructPrice - возвращает цену товара для показа

#### CatalogItem

Дочерний класс от Card для реализации паттерна Builder

## MODEL

### AppState

- toggleOrderedItem - добавление/удаление товара из заказа
- clearBasket - очистить корзину
- setTotal - перезаписать сумму заказа
- setCatalog - создать каталог, добавить слушатель на изменение товаров (если будет новый запрос в api за товарами)
- setPreview - вернуть товар для показа в модальном окне
- toggleItemInBasket - добавление/удаление товара в корзине
- setOrderField - записать новое значени поля заказа
- validateOrder - валидация поля заказа

## PRESENTER

- items:changed - изменилися список товаров
- preview:changed - Изменен открытый выбранный товар
- basket:open - открыть корзину
- modal:open - открыть модальное окно
- modal:close - закрыть модальное окно
- order:open - открыть форму заказа
- contacts:open - открыть форму контактов заказа
- order:submit - отправить форму order
- contacts:submit - отправить форму contacts
- /^order\..*:change/ - изменить поле формы заказа
- card:select - показать товар в модальном окне
- order:validate - Валидация формы заказа
- contacts:validate - Валидация формы контатов
