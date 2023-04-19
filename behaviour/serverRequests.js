async function createSecretRoom() {
    //type, names, threshold, formula
    // room_id = "roomID12345";
    // public_key = "publicKey12345";
    // return true;
    console.log("!!!!!!");
    console.log(participants);
    const rawResponse = await fetch('http://localhost:8080/createSecretRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "threshold",
            "threshold": 2,
            "names": participants
            // "names": JSON.stringify(participants)
        })
    })
    console.log("&&&&&&&&&&");

    let ans = await rawResponse.json();
    console.log(ans);
    room_id = ans["room_id"];
    public_key = ans["public_key"];
    console.log("rom_id="+room_id+" public_key=" +public_key);
    localStorage.setItem('room_id', room_id);
}

async function getSecretRoom() {
    room_id = localStorage.getItem("room_id");

    const rawResponse = await fetch('http://localhost:8080/getSecretRoom?room_id=' + room_id, {
        method: 'GET'
    })

    let ans = await rawResponse.json();
    console.log(ans["links"].toString());
    let obj = ans["links"];
    links = {};
    for (const [key, value] of Object.entries(obj)) {
        links[`'${key}'`] = `${value}`;
    }
    console.log(links);
    public_key = ans["public_key"];
}

async function downloadPublicKey() {
    // const rawResponse = await fetch('http://localhost:8080/downloadPublicKey/mRH-sht-xEa-itl', {
    //     method: 'GET'
    // })
    //
    // let ans = await rawResponse;
    // console.log(ans);

    var link = document.createElement('a');
    link.setAttribute('href', 'http://localhost:8080/downloadPublicKey/' + room_id);
    link.setAttribute('download', "public-key.sss");
    link.setAttribute('target','_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function downloadSecretShare(name) {

    var link = document.createElement('a');
    link.setAttribute('href', 'http://localhost:8080' + links[`'${name}'`]);
    link.setAttribute('download', "secret-share.sss");
    link.setAttribute('target','_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function createSigningRoom() {
    const formData = new FormData();
    formData.append('pdf1', pdfFile);
    formData.append('pdf2', sssFile);

    const rawResponse = await fetch('http://localhost:8080/createSigningRoom', {
        method: 'POST',
        body: formData,
    })

    let ans = await rawResponse.json();
    console.log(ans);
    sign_room_id = ans["room_id"];
    creator_token = ans["creator_token"];
    localStorage.setItem('sign_room_id', sign_room_id);
}

async function getSigningRoom() {
    // sign_room_id = localStorage.getItem("sign_room_id");

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    sign_room_id = urlParams.get('room_id')
    console.log(sign_room_id);
    const rawResponse = await fetch('http://localhost:8080/getSigningRoom?room_id=' + sign_room_id, {
        method: 'GET'
    })

    let ans = await rawResponse.json();
    console.log(ans);
    signed_count = ans["signed_count"];
    participants_count = ans["participants_count"];
    enough_participants = ans["enough_participants"];
    original_download_link = ans["original_download_link"];
    console.log("signed_count " + signed_count + " participants_count " + participants_count);
    // Получение информации о комнаты подписания
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSigningRoom)
    // Возможные коды ответа: 200, 400
    // Ответ: JSON (таблица 5)
}

async function downloadOriginalDocument() {
    ///downloadOriginalDocument/{room_id}

    // const rawResponse = await fetch('http://localhost:8080/downloadOriginalDocument/' + room_id, {
    //     method: 'GET'
    // })
    //
    // let ans = await rawResponse;
    // console.log(ans);
    console.log("aADSDSF"+sign_room_id);
    var link = document.createElement('a');
    link.setAttribute('href', 'http://localhost:8080/downloadOriginalDocument/' + sign_room_id);
    link.setAttribute('download', "original-doc.pdf");
    link.setAttribute('target','_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Скачивание исходного документа
    // Метод запроса: GET
    // Параметры(в пути url): room_id (идентификатор комнаты, полученный в
    // createSigningRoom)
    // Возможные коды ответа: 200, 400
    // Ответ: pdf-файл
}

async function signDocument() {
    console.log("!!!!");

    const rawResponse = await fetch('http://localhost:8080/signDocument?room_id='+"JtV-CKQ-kGH-ynq", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: sssFile
    })
    let ans = await rawResponse;
    console.log(ans);

    return true;
    // Участие в подписывании документа
    // Метод запроса: GET
    // Параметры: room_id (строка – идентификатор комнаты, полученный в
    // createSigningRoom), файл-доля секрета участника
    // Возможные коды ответа: 200, 400
}

async function finishSigning() {

    console.log("!!!!");

    const rawResponse = await fetch('http://localhost:8080/finishSigning?room_id=JtV-CKQ-kGH-ynq&creator_token=EXt-Jye-Ahb-HjU', {
        method: 'POST'
    })

    console.log(await rawResponse);
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
//pdf, public_key
async function verifySignature() {

    const formData = new FormData();
    formData.append('pdf1', pdfFile);
    formData.append('pdf2', rpkFile);

    const rawResponse = await fetch('http://localhost:8080/verifySignature', {
        method: 'POST',
        body: formData,
    })

    let txt = await rawResponse.text();

    console.log("дождались"+txt);


    if (txt === "OK") {
        ans =  true;
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
