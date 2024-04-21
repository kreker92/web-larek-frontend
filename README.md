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
- catalog - список товаров
- basket - список добавленных в корзину товаров
- preview - какой товар открыт в модальном окне
- order - все данные по заказу (товары + данные клиента)
- loading - ожидание отрисовки контента (ожидание завершения запроса и отрисовки результата)

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
- catalog - сохраняет каталог товаров в _catalog
- _basket - на HTMLElement в конструкторе вешаем событие открытия при клике на корзину

### Form
- onInputChange - подписываем поле (в конструкторе вызываем для всех полей) на сохранение изменения

### Modal
- open -  открыть модальное окно
- close - закрыть его

### Basket
- items - показать добавленные товары

### Success
- возвращает шаблон с успехом заказа

### Card
- get/set все поля из ILarekItem
- в конструкторе добавить слушатели на кли по кнопке "добавить в корзину"

## MODEL
### AppState
- clearBasket - очистить корзину
- getTotal - вернуть сумм заказа
- setCatalog - создать каталог, добавить слушатель на изменение товаров (если будет новый запрос в api за товарами)
- setPreview - вернуть товар для показа в модальном окне

## PRESENTER
basket:open - открыть корзину
basket:close - закрыть корзину
modal:open - открыть модальное окно
modal:close - закрыть модальное окно
order:open - открыть форму заказа
order:submit - отправить заказ
/^order\..*:change/ - изменить поле формы заказа
card:select - покащать товар в модальном окне
