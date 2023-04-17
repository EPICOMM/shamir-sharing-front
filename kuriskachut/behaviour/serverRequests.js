async function createSecretRoom(type, names, threshold, formula) {
    room_id = "roomID12345";
    public_key = "publicKey12345";
    return true;
    const rawResponse = await fetch('http://localhost:8080/createSecretRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "threshold",
            "threshold": 2,
            // "names": ["a", "b", "c", "d", "e"]
            "names": JSON.stringify(participants)
        })
    })

    console.log(await rawResponse.json());
}

async function getSecretRoom() {

    secretShares = null;
    if (localStorage.getItem("secretShares") !== null) {
        secretShares = localStorage.getItem("secretShares").split(',');
    } else {
        secretShares = localStorage.getItem("participants").split(',');
    }
    // console.log("getSecretRoom =" + participants);
    links = {};
    for (let i = 0; i < secretShares.length; i++) {
        links["\'" + secretShares[i] + "\'"] = ("'" + i + "'");
    }
    // console.log("getSecretRoom ==" + links);

    // links = {"a": "aa", "b": "bb", "c": "cc"};
    public_key = "publicKey12345";
    return true;

    const rawResponse = await fetch('http://localhost:8080/getSecretRoom?room_id=EHu-RKz-Nmy-LyF', {
        method: 'GET'
    })

    console.log(await rawResponse.json());
    // Получение актуальной информации по комнате разделения секрета
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // эндпоинте createSecretRoom)
    // Ответ: JSON (таблица 3)
    // Возможные коды ответа: 200, 400
    // Возможные типы ошибок: WRONG_ID
    // links = {
    //     name :"url",
    //     name2: null
    // }
    // public_key = {
    //     "n": "dfeddsc",
    //     "e": "sdfdsfd"
    // }
    // room_id = "d312ed";
    // creator_token = "sdcdcdsc";
}

async function downloadPublicKey() {
    const rawResponse = await fetch('http://localhost:8080/downloadPublicKey/EHu-RKz-Nmy-LyF', {
        method: 'GET'
    })

    console.log(await rawResponse.json());
    // Получение открытой части ключа
    // Метод запроса: GET
    // Параметры (содержатся в пути url): room_id(идентификатор комнаты,
    //     полученный в эндпоинте cresteSecretRoom)
    // Ответ: файл (описание структуры содержание файла ответа в приложении)
}

async function downloadSecretShare(room_id, user_id) {

    return true;
    const rawResponse = await fetch('http://localhost:8080/downloadSecretShare/EHu-RKz-Nmy-LyF/a', {
        method: 'GET'
    })

    console.log(await rawResponse.json());
    // Получение доли разделенного секрета
    // Метод запроса: GET
    // Параметры (содержатся в пути url): room_id(идентификатор комнаты,
    //     полученный в эндпоинте cresteSecretRoom), user_id(имя пользователя,
    //     заданное при создании комнаты)
    // Возможные коды ответа: 200, 400
    // Ответ: файл (описание структуры содержание файла ответа в приложении)
}

async function createSigningRoom() {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('pdf1', pdfFile);
    formData.append('pdf2', txtFile);

    const rawResponse = await fetch('http://localhost:8080/createSigningRoom', {
        method: 'POST',
        body: formData,
    })

    console.log(await rawResponse.json());
    // Создание комнаты подписания
    // Метод запроса: POST
    // Параметры: multipart-запрос содержит два файла – pdf-файл, который
    // требуется подписать и долю секрета участника, инициирующего процесс
    // подписания
    // Возможные коды ответа: 200, 400
    // Ответ: JSON (таблица 4)
}

function getSigningRoom() {
    // Получение информации о комнаты подписания
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSigningRoom)
    // Возможные коды ответа: 200, 400
    // Ответ: JSON (таблица 5)
}

function downloadOriginalDocument(room_id) {
    // Скачивание исходного документа
    // Метод запроса: GET
    // Параметры(в пути url): room_id (идентификатор комнаты, полученный в
    // createSigningRoom)
    // Возможные коды ответа: 200, 400
    // Ответ: pdf-файл
}

function signDocument(room_id) {
    // Участие в подписывании документа
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSigningRoom), файл-доля секрета участника
    // Возможные коды ответа: 200, 400
}

function finishSigning(room_id, creator_token) {
    // Завершение подписывания документа
    // Метод запроса: POST
    // Параметры: room_id (строка, возвращается при создании комнаты),
    // creator_token (строка, выдается при создании комнаты)
    // Возможные коды ответа: 200, 400
    // Ответ: pdf-файл, если подписание прошло успешно
}

function downloadSignedDocument(room_id) {
    // Скачивание подписанного документа
    // Метод запроса: GET
    // Параметры (в пути url): room_id (строка, выдается при создании комнаты)
    // Возможные коды ответа: 200, 404
    // Ответ: pdf-файл
    // 3) Изменение структуры доступа
}

function createSecretReissueRoom(file) {
    // Создание комнаты изменения изменения структуры разделения секрета
    // Метод запроса: POST
    // Параметры запроса: formula(строка, задающая новую формулу)
    // Тело запроса: binary файл – доля секрета участника, инициирующего процесс
    // изменения структуры доступа
    // Ответ: room_id(строка)
    // Возможные коды ответа: 200, 400
    // Возможные типы ошибок: FORMULA_ERROR, NAMES_ERROR
}

function getSecretReissueRoom(room_id) {
    // Получение информации о комнате изменения структуры разделения секрета
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSecretReissueRoom)
    // Возможные коды ответа: 200, 400
    // Ответ: JSON (таблица 6)
}

function approveSecretReissue(room_id) {
    // Участие в изменении структуры разделения секрета
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSecretReissueRoom), файл-доля секрета участника
    // Возможные коды ответа: 200, 400
}

function downloadReissuedSecretShare(room_id, user_id) {
    // Получение новой доли разделенного секрета
    // Метод запроса: GET
    // Параметры (содержатся в пути url): room_id(идентификатор комнаты,
    //     полученный в эндпоинте cresteSecretReissueRoom), user_id(имя пользователя,
    //     заданное при создании комнаты)
    // Ответ: файл (описание структуры содержание файла ответа в приложении)
    // 4) Проверка подписи
}

function verifySignature(pdf, public_key) {
    if (getRandomInt(2) % 2 === 0) {
        ans = true;
    } else {
        ans = false;
    }
    return ans;
    // Проверка подписи
    // Метод запроса: POST
    // Параметры: multipart-запрос содержит два файла – pdf-файл, который
    // требуется проверить, и публичный ключ подписи
    // Возможные коды ответа: 200, 400
    // Ответ: result(строка «OK» или «WRONG»)
}