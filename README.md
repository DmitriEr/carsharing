### Carsharing application

ТЗ

V - верстка, связанные сущности в элементах формы должны подгружаться с сервера или хранится в Моках, задание считается выполненным, если страница имеет внешний вид в соответствии с макетом и корректно отображается на адаптивных разрешениях.

F - функциональные фичи, все сущности должны быть подгружены с сервера, если они описаны в Swagger

## Итерация 1 (6 недель)

+ V-01. Сверстать главную страницу сайта - слайдер с предложениями "компании"

+ V-02. Сверстать форму оформления заказа на аренду авто (шаг 1). Вместо карты можно использовать изображение с картой.

+ V-03. Сверстать форму оформления заказа на аренду авто (шаг 2)

+ V-04. Сверстать форму оформления заказа на аренду авто (шаг 3)

+ V-05. Сверстать форму оформления заказа на аренду авто (шаг 4)

+ V-06. Сверстать форму оформленного заказа на аренду авто (шаг 5) - не является вкладкой

+ F-01. Реализовать переключаемый слайдер

+ F-02. Реализовать переключение вкладок. Данные заказа при переключении вкладок теряться не должны. Разешается переходить только на уже заполненные вкладки и на следующую после заполненной вкадки.

+ F-03. Вкладка №1 - Реализовать поиск пункта выдачи после ввода двух и более символов, если указан город - все пункты должны быть из этого города, реализовать отображение всех пнктов выдачи выбранного города на карте, при выборе пункта выдачи карта должна переместится на точку пункта выдачи.

+ F-04. Вкладка №2 - Реализовать выбор марки авто из полученного с сервера списка

+ F-05. Вкладка №3 - Реализовать заполнение заказа дополнительными данными

+ F-06. Вкладка №4 - Реализовать подтверждение заказа, после подтверждения итоговых данных уходит запрос на сохранения заказа

+ F-07. Детали заказа - реализовать вывод деталей заказа, урл должен содержать ид заказа, при инициализации страницы происходит запрос на получение данных

## Итерация 2 (6 недель)

- V-07. Сверстать форму авторизации

- V-08. Сверстать страницу списка заказов в админ панели

- V-09. Сверстать страницу списка для основных сущностей системы. Макет абстрактный, набор полей каждый выбиарет на свое усмотрение, оценивается цдобство финальной реализации.

- V-10. Сверстать страницу редактирования для основных сущностей системы

- V-11. Сверстать страницу ошибки админ панели

- F-08. Авторизация в админскую часть. Если осуществляется переход по ссылке вида /admin/* пользователь обязан аутентифицироваться в систему

- F-09. Реализовать созданиe и редактированиe сущностей системы в админ панели

- F-10. Вывод сущностей системы в админ. панели на страницах списка сущностей

Back

## Серверная часть реализована с помощью сервиса Api-factory, внимательно ознакомься с документацией прежде чем начать работать

Документация API-Factory - Авторизация
Документация API-Factory - CRUD - сущностей
Документация API-Factory - REST для сущности Table
ApplicationID: 5e25c641099b810b946c5d5b
Secret: 4cbcea96de
Учетная запись: { username: 'intern', password: 'intern-S!' }
Swagger

