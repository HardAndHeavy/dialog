# dialog

Сервис для интеграции 1C и Dialogflow CX.

### Требования

* Docker

### Настройка

Настраиваем *.env* файл корне проекта:
```
NODE_ENV=production
BASE_1C_HOST=http://ИМЯ_МАШИНЫ_1С/demo_dialog/hs/dialog
BASE_1C_USERNAME=dialog
BASE_1C_PASSWORD=dialog
BASE_1C_TOKEN=base-1c-token
AG_CLIENT_ID=Client ID issued by Google to your Actions
DIALOG_TOKEN=dialog-token
DF_CLIENT_EMAIL=сервисный аккаунт
DF_PROJECT_ID=ID проекта
DF_LOCATION=us-central1
DF_AGENT_ID=ID агента
DF_LANGUAGE_CODE=ru
```
- `NODE_ENV` — внутренняя константа проекта. Необходимо указать `production`
- `BASE_1C_HOST` — URL http-сервиса 1С. Важно указать имя (или ip) машины на которой опубликована база 1С, а не писать `localhost`
- `BASE_1C_USERNAME` — пользователь http-сервиса
- `BASE_1C_PASSWORD` — пароль пользователя http-сервиса
- `BASE_1C_TOKEN` — внутренний ключ для работы http-сервиса. В базе 1С он хранится в константе *Dialog base-1c-token*
- `AG_CLIENT_ID` — *Client ID*, который нам выдал Google Ассистент для связывания аккаунта
- `DIALOG_TOKEN` — внешний ключ для работы http-сервиса. В базе 1С он хранится в константе *Dialog dialog-token*
- `DF_CLIENT_EMAIL` — сервисный аккаунт. Настраивается в *Google Cloud Platform* в разделе *Service accounts*
- `DF_PROJECT_ID` — ID проекта. Можно найти в URL после projects
- `DF_LOCATION` — область в которой был размещен агент
- `DF_AGENT_ID` — ID агента. Можно найти в URL после agents
- `DF_LANGUAGE_CODE` — язык, для русского надо указать — ru

Настраиваем *dialogflow.key* файл в каталоге *config*. Ключ создаётся в *Google Cloud Platform* в разделе *Service accounts*. Для `DF_CLIENT_EMAIL` выпускается ключ в разделе *KEYS* в формате JSON файла. Из этого файла вырезается значение поля `private_key` с заменой \n на реальный перевод строки.

### Разработка

```sh
$ make docker-run
$ make start
```
Переходим на [http://localhost:3000/](http://localhost:3000/)

### Статьи по работе с сервисом

[Окей, Google](https://grig.top/ok_google/)
[Dialogflow CX](https://grig.top/dialogflow_cx/)