verdict = document.getElementById("verdict");
let room_id;
let public_key;
let links;
let participants;
let numToAccess;
let secretShares;

let tagsInputTip = tippy('#button-1-1', {
    placement: 'right',
    hideOnClick: false,
    animation: false,
    trigger: "manual",
})[0];

let stopButtonTips = tippy('#stop-button', {
    placement: 'right',
    hideOnClick: false,
    animation: false,
    trigger: "manual",
})[0];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function downloadPublicKeyByButton() {
    downloadAsFile(public_key, "public_key.sss");
}

function downloadAsFile(data, fileName) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

$(document).ready(function (e) {
    let tagsinput = $('#tagsinput-creation-2');

    tagsinput.on('beforeItemRemove', function (event) {
        let name = event.item;
        let nameKey = "\'" + name + "\'";
        console.log(name + " beforeItemRemove");
        console.log(links);
        console.log(name + links["'" + name + "'"]);
        // downloadSecretShare(links['a'], room_id);
        downloadAsFile(links[nameKey], "private_key_" + name + ".sss");
    });

    tagsinput.on('itemRemoved', function (event) {
        let name = event.item;
        console.log(name + " itemRemoved");
        console.log("\'" + name + "\'");
        console.log(Object.keys(secretShares));
        delete secretShares["\"" + name + "\""];
        console.log(Object.keys(secretShares));
        localStorage.setItem("secretShares", secretShares);
    });

    tagsinput.on('itemAdded', function (event) {
        console.log("itemAdded");
    });
});

function checkSchemeSettingsCorrectness() {
    participants = $("#tagsinput-creation-1").tagsinput('items');
    console.log(participants);
    numToAccess = $("#num-to-access").val();
    console.log(numToAccess);

    let mess = "";
    if (participants < 2) {
        mess += "Число участников не может быть меньше двух \n";
    }
    if (numToAccess === "" || numToAccess > participants.length || numToAccess < 2) {
        mess += "Число восстановления должно быть >2 и <=числа участников";
    }
    if (mess !== "") {
        showNewTipContent(tagsInputTip, mess);
        return false;
    }
    return true;
}

function createScheme() {
    createSecretRoom("threshold", participants, numToAccess, "");
    // localStorage.setItem('participants', participants);
    // localStorage.setItem('numToAccess', numToAccess);
    localStorage.setItem('room_id', room_id);
    localStorage.setItem('public_key', public_key);
    return true;
}

function goToSettingPage() {
    console.log(txtFile);
    if (txtFile != null) {
        window.location = "../pages/creation_1_scheme_creation.html";
    } else {
        showNewTipContent(dndPdfField, 'Загрузите sss-файл');
    }
}

function goToDistributionPage() {
    localStorage.removeItem("secretShares");

    if (!checkSchemeSettingsCorrectness()) {
        return 0;
    }
    if (!createScheme()) {
        return 0;
    }
    totalFadeToggle();

    localStorage.setItem('participants', participants);
    // localStorage.setItem('numToAccess', numToAccess);
    // localStorage.setItem('room_id', room_id);
    // localStorage.setItem('public_key', public_key);

    window.location = "http://localhost:63342/kuriskachut/pages/creation_2_scheme_distribution.html?_ijt=jnellqsr26j7e47aq3b37a06o6&_ij_reload=RELOAD_ON_SAVE";

    if (!getRoomInfo()) {
        return 0;
    }

    // localStorage.setItem('links', JSON.stringify(links));
    // console.log("liiiinks" + JSON.stringify(links));

    // console.log("goToDistributionPage -------" + links['a']);
    showParticipants();
}


function getRoomInfo() {
    getSecretRoom();
    console.log(links);
    return true;
}

function copyRoomLink() {
    let text = "http://localhost:63342/kuriskachut/pages/creation_2_scheme_distribution.html?_ijt=jnellqsr26j7e47aq3b37a06o6&_ij_reload=RELOAD_ON_SAVE" +
        "&room_id=" + room_id;

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
}

function copySigningRoomLink() {
    let text = "http://localhost:63342/kuriskachut/pages/signing_2_signing.html?_ijt=k92c64ifoojmkul97kej0eeugm&_ij_reload=RELOAD_ON_SAVE" +
        "&room_id=" + room_id;

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
}

function displayNone() {
    var elems = document.body.childNodes;
    elems.forEach(function (elem) { // нет такого метода!
        $(elem).css.display("none");
    });
}

function lol() {
    window.location = "http://localhost:63342/kuriskachut/pages/creation_2_scheme_distribution.html?_ijt=jnellqsr26j7e47aq3b37a06o6&_ij_reload=RELOAD_ON_SAVE"
}

function totalFadeToggle() {
    var elems = document.body.childNodes;
    elems.forEach(function (elem) { // нет такого метода!
        $(elem).fadeToggle();
    });
}

function showParticipants() {

    console.log(localStorage.getItem("participants"));
    // !!!
    // numToAccess = localStorage['numToAccess'];
    // public_key = localStorage['public_key'];
    // links = JSON.parse(localStorage['links']);

    for (let i = 0; i < secretShares.length; i++) {
        $('#tagsinput-creation-2').tagsinput('add', secretShares[i]);
    }
    $('input[type=text]').prop("readonly", true);

    // $('#num-to-access-2').text("Access number: " + numToAccess);
}

function goToMainMenu() {
    window.location = "http://localhost:63342/kuriskachut/index.html?_ijt=a6rtica3t5cllaba34navotobc&_ij_reload=RELOAD_ON_SAVE\n"
}

function showNewTipContent(field, content) {
    field.setProps({
        content: content,
    });
    field.enable();
    field.show();
}

function goToTheSigningRoom() {
    console.log(txtFile);
    if (txtFile === null) {
        showNewTipContent(dndPdfField, 'Загрузите sss-файл');
        return 0;
    }
    if (pdfFile === null) {
        showNewTipContent(dndPdfField, 'Загрузите pdf-файл');
        return 0;
    }

    window.location = "http://localhost:63342/kuriskachut/pages/signing_1_distribution_and_stop.html?_ijt=8l6crcbe3dk8b329nccqsv08p4&_ij_reload=RELOAD_ON_SAVE";
    downloadAsFile(public_key, "creator-token.sss");
}

// var request = require('request');
// var smsService = {}


function prepareForVerificAndVerific() {
    console.log(txtFile);
    let mess = "";
    if (txtFile === null) {
        mess += 'Загрузите sss-файл \n';
    }

    if (pdfFile === null) {
        mess += 'Загрузите pdf-файл';
    }

    if (mess !== "") {
        showNewTipContent(dndPdfField, mess);
        return 0;
    }
    console.log(verifySignature());
    illustrateVerdict(verifySignature());
}

function illustrateVerdict(ans) {
    verdict.style.visibility = "visible";
    dndPdfField.hide();

    if (ans === true) {
        verdict.style.color = "#ff2e40";
        verdict.textContent = "The Document Is Not Signed :(";
    } else {
        verdict.style.color = "#94e664";
        verdict.textContent = "The Document Is Signed :)";
    }
}

function creationRoomPrep() {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    room_id = urlParams.get('room_id');
    console.log(room_id);
    if (room_id === null) {
        room_id = localStorage.getItem("room_id");
    }
    console.log("creationRoomPrep, room_id=" + room_id);
    getRoomInfo(room_id, public_key);
    showParticipants();
}

let voted = 5;
let required = 5;

function stopSignification() {

    let mess = "";
    if (txtFile === null) {
        mess += "Загрузите токен креатора \n";
    }

    if (voted < required) {
        mess += "Недостаточно голосов";
    }

    if (mess !== "") {
        showNewTipContent(stopButtonTips, mess);
        return 0;
    }

    stopButtonTips.hide();
    window.location = "http://localhost:63342/kuriskachut/pages/signing_5_download.html?_ijt=f7pp3sngvv9jbmn7c7b6cfusbe&_ij_reload=RELOAD_ON_SAVE";
}

function downloadSignedDocumentButton() {
    downloadAsFile(public_key, "signed_document.pdf");
}

function downloadDocument() {
    downloadAsFile(public_key, "document.pdf");
}

let isDocSigned = false;

function putSignature() {
    if (txtFile != null) {
        showNewTipContent(dndPdfField, 'Документ подписан');
        isDocSigned = true;
    } else {
        showNewTipContent(dndPdfField, 'Загрузите secret-share.sss');
    }
}

function goToWaitingRoom() {
    if (isDocSigned) {
        window.location = "http://localhost:63342/kuriskachut/pages/signing_3_waiting.html?_ijt=d087g5m3svt8g0lrql2tb5amul&_ij_reload=RELOAD_ON_SAVE";
    } else {
        showNewTipContent(dndPdfField, 'Подпишите документ');
    }
}

let votedEl = document.getElementById("voted");
let requiredEl = document.getElementById("required");
let totalEl = document.getElementById("total");

function updateStatistics(){
    votedEl.textContent = ++votedEl.textContent;

    if (votedEl.textContent >= requiredEl.textContent){
        window.location = "http://localhost:63342/kuriskachut/pages/signing_5_download.html?_ijt=f7pp3sngvv9jbmn7c7b6cfusbe&_ij_reload=RELOAD_ON_SAVE";
    }
}