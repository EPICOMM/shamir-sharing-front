async function createSecretRoom() {
    //type, names, threshold, formula
    // room_id = "roomID12345";
    // public_key = "publicKey12345";
    // return true;
    console.log("!!!!!!");
    console.log(participants);
    const rawResponse = await fetch('/api/createSecretRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "type": "threshold",
            "threshold": numToAccess,
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
    creator_token = localStorage.getItem("creator_token");
    console.log("AAAAAAA getSecretRoom " + creator_token);
    const rawResponse = await fetch('/api/getSecretRoom?room_id=' + room_id, {
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
    link.setAttribute('href', '/api/downloadPublicKey/' + room_id);
    link.setAttribute('download', "public-key.sss");
    link.setAttribute('target','_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function downloadSecretShare(name) {

    var link = document.createElement('a');
    link.setAttribute('href', '/api' + links[`'${name}'`]);
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

    const rawResponse = await fetch('/api/createSigningRoom', {
        method: 'POST',
        body: formData,
    })

    let ans = await rawResponse.json();
    console.log(ans);
    sign_room_id = ans["room_id"];
    creator_token = ans["creator_token"];
    localStorage.setItem('sign_room_id', sign_room_id);
    localStorage.setItem('creator_token', creator_token);

}

async function getSigningRoom() {
    // sign_room_id = localStorage.getItem("sign_room_id");

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    sign_room_id = urlParams.get('room_id')
    console.log(sign_room_id);
    const rawResponse = await fetch('/api/getSigningRoom?room_id=' + sign_room_id, {
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
    link.setAttribute('href', '/api/downloadOriginalDocument/' + sign_room_id);
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

    const rawResponse = await fetch('/api/signDocument?room_id='+sign_room_id, {
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
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    creator_token = urlParams.get('creator_token');
    console.log(creator_token);
    console.log("!!!!");

    const rawResponse = await fetch('/api/finishSigning?room_id='+sign_room_id+"&creator_token="+ creator_token, {
        method: 'POST'
    })
    let ans = await rawResponse;
    console.log("await rawResponse" + ans);
    // Завершение подписывания документа
    // Метод запроса: POST
    // Параметры: room_id (строка, возвращается при создании комнаты),
    // creator_token (строка, выдается при создании комнаты)
    // Возможные коды ответа: 200, 400
    // Ответ: pdf-файл, если подписание прошло успешно
}

function downloadSignedDocument() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    sign_room_id = urlParams.get('room_id');
    console.log(sign_room_id);
    console.log("aADSDSF"+sign_room_id);
    var link = document.createElement('a');
    link.setAttribute('href', '/api/downloadSignedDocument/' + sign_room_id);
    link.setAttribute('download', "original-doc.pdf");
    link.setAttribute('target','_blank');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Скачивание подписанного документа
    // Метод запроса: GET
    // Параметры (в пути url): room_id (строка, выдается при создании комнаты)
    // Возможные коды ответа: 200, 404
    // Ответ: pdf-файл
    // 3) Изменение структуры доступа
}

async function createSecretReissueRoom() {

    const formData = new FormData();
    formData.append('pdf1', sssFile);

    // const rawResponse = await fetch('http://localhost:8080/createSecretRoom', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "type": "threshold",
    //         "threshold": 2,
    //         "names": participants
    //         // "names": JSON.stringify(participants)
    //     })
    // })

    const rawResponse = await fetch('createSecretReissueRoom?formula=T2(a,b,c,d,e,f,g)', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: sssFile
    })

    let ans = await rawResponse.json();
    console.log(ans);
    editing_room_id = ans["editing_room_id"];
    localStorage.setItem('editing_room_id', editing_room_id);

    // Создание комнаты изменения изменения структуры разделения секрета
    // Метод запроса: POST
    // Параметры запроса: formula(строка, задающая новую формулу)
    // Тело запроса: binary файл – доля секрета участника, инициирующего процесс
    // изменения структуры доступа
    // Ответ: room_id(строка)
    // Возможные коды ответа: 200, 400
    // Возможные типы ошибок: FORMULA_ERROR, NAMES_ERROR
}

async function getSecretReissueRoom(room_id) {
    editing_room_id = localStorage.getItem("editing_room_id");
    console.log("AAAAAAA getSecretRoom " + editing_room_id);

    const rawResponse = await fetch('/api/getSecretReissueRoom?room_id=' + editing_room_id, {
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
    signed_count = ans["signed_count"];
    participants_count = ans["participants_count"];
    room_status = ans["room_status"];
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

    const rawResponse = await fetch('/api/verifySignature', {
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
