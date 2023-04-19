verdict = document.getElementById("verdict");
let room_id;
let public_key;
let links;
let participants;
let numToAccess;
let secretShares;
let sign_room_id;
let creator_token;
let signed_count;
let participants_count;
let enough_participants;
let original_download_link;
let editing_room_id;
let room_status;
let signingStoped;

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

async function downloadPublicKeyByButton() {
    console.log(room_id);
    // downloadAsFile(JSON.stringify(public_key), "public_key.sss");
    await downloadPublicKey();
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
        // downloadAsFile(links[nameKey], "private_key_" + name + ".sss");
    });

    tagsinput.on('itemRemoved', async function (event) {
        let name = event.item;
        console.log("AAAAA" + name);
        await downloadSecretShare(name);

        console.log(name + " itemRemoved");
        console.log("\'" + name + "\'");
        console.log(Object.keys(links));
        delete links["\"" + name + "\""];
        console.log(Object.keys(links));
        localStorage.setItem("links", links);
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
    // "threshold", participants, numToAccess, ""
    // new Promise(function (resolve) {
    //     createSecretRoom();
    //     resolve(true);
    // }).then(function (value) {
    //     console.log("asd");
    //     localStorage.setItem('room_id', room_id);
    //     localStorage.setItem('public_key', public_key);
    //     return true;
    // });
    // console.log("sdf");
    return true;
    // localStorage.setItem('participants', participants);
    // localStorage.setItem('numToAccess', numToAccess);
}

async function goToSettingPage() {
    localStorage.setItem('sssFile', sssFile);

    console.log(sssFile);
    if (sssFile != null) {
        await getSecretRoom();

        window.location = "../pages/editing_2_settings.html?room_id=" + room_id;
    } else {
        showNewTipContent(dndPdfField, 'Загрузите sss-файл');
    }
}

async function goToDistributionPage() {

    if (!checkSchemeSettingsCorrectness()) {
        return 0;
    }
    totalFadeToggle();

    localStorage.setItem('participants', participants);
    // localStorage.setItem('numToAccess', numToAccess);
    // localStorage.setItem('room_id', room_id);
    // localStorage.setItem('public_key', public_key);

    await createSecretRoom();

    window.location = "/kuriskachut/pages/creation_2_scheme_distribution.html?room_id="+room_id;
}


async function goToEditDistributionPage(){
    sssFile = localStorage.getItem("sssFile");
    console.log(sssFile + "sadfadffsfdsfsdfdfd");
    await createSecretReissueRoom();
    window.location = "/kuriskachut/pages/editing_3_distribution_and_stop.html?room_id="+room_id;
}

function copyRoomLink() {
    let text = "/kuriskachut/pages/creation_2_scheme_distribution.html?_ijt=jnellqsr26j7e47aq3b37a06o6&_ij_reload=RELOAD_ON_SAVE" +
        "&room_id=" + room_id;

    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error in copying text: ', err);
        });
}

function copySigningRoomLink(schemeEditFlow) {
    let text;
    if (schemeEditFlow)
        text = "/kuriskachut/pages/editing_4_signing.html?" +
            "room_id=" + sign_room_id;
    else
        text = "/kuriskachut/pages/signing_2_signing.html?" +
            "&room_id=" + sign_room_id;

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
    window.location = "/kuriskachut/pages/creation_2_scheme_distribution.html?_ijt=jnellqsr26j7e47aq3b37a06o6&_ij_reload=RELOAD_ON_SAVE"
}

function totalFadeToggle() {
    var elems = document.body.childNodes;
    elems.forEach(function (elem) { // нет такого метода!
        $(elem).fadeToggle();
    });
}

function showParticipants() {

    // console.log(localStorage.getItem("participants"));

    // !!!
    // numToAccess = localStorage['numToAccess'];
    // public_key = localStorage['public_key'];
    // links = JSON.parse(localStorage['links']);
    console.log("AAAAAAAAAAAAAAAAa" + links);
    $("#tagsinput-creation-2").tagsinput('removeAll');

    for (const [key, value] of Object.entries(links)) {
        console.log(`${key} +--- ${value}`);

        $('#tagsinput-creation-2').tagsinput('add', key.replace(/'/g, ""));

    }
    // for (let i = 0; i < links.length; i++) {
    //     $('#tagsinput-creation-2').tagsinput('add', "1");
    // }

    // $('input[type=text]').prop("readonly", true);

    // $('#num-to-access-2').text("Access number: " + numToAccess);
}

function goToMainMenu() {
    window.location = "/kuriskachut/index.html?_ijt=a6rtica3t5cllaba34navotobc&_ij_reload=RELOAD_ON_SAVE\n"
}

function showNewTipContent(field, content) {
    field.setProps({
        content: content,
    });
    field.enable();
    field.show();
}

async function goToTheSigningRoom() {
    console.log(sssFile);
    if (sssFile === null) {
        showNewTipContent(dndPdfField, 'Загрузите sss-файл');
        return 0;
    }
    if (pdfFile === null) {
        showNewTipContent(dndPdfField, 'Загрузите pdf-файл');
        return 0;
    }

    await createSigningRoom();

    window.location = "/kuriskachut/pages/signing_1_distribution_and_stop.html?room_id=" + sign_room_id + "&creator_token=" + creator_token;
    // downloadAsFile(public_key, "creator-token.sss");
}

// var request = require('request');
// var smsService = {}


async function prepareForVerificAndVerific() {
    console.log(rpkFile);
    console.log(pdfFile);
    let mess = "";
    if (rpkFile === null) {
        mess += 'Загрузите rpk-файл \n';
    }

    if (pdfFile === null) {
        mess += 'Загрузите pdf-файл';
    }

    if (mess !== "") {
        showNewTipContent(dndPdfField, mess);
        return 0;
    }
    // console.log(verifySignature());
    let verdict = await verifySignature();
    illustrateVerdict(verdict);
}

function illustrateVerdict(ans) {
    verdict.style.visibility = "visible";
    dndPdfField.hide();
    console.log(ans);
    if (ans === false) {
        verdict.style.color = "#ff2e40";
        verdict.textContent = "The Document Is Not Signed :(";
    } else {
        verdict.style.color = "#94e664";
        verdict.textContent = "The Document Is Signed :)";
    }
}

async function creationRoomPrep() {
    await getSecretRoom();
    showParticipants();
}

async function editingRoomPrep() {
    await getSecretRoom();
    showParticipants();
}


let voted = 5;
let required = 5;

async function updateAndStop() {
    await getSigningRoom();
    await stopSignification();
}

async function stopSignification() {
    console.log("ASDDSFDSFDSF" + enough_participants);
    if (enough_participants) {
        await finishSigning();
    } else {
        showNewTipContent(stopButtonTips, "Недостаточно голосов");
        return 0;
    }
    stopButtonTips.hide();
    signingStoped = true;
    window.location = ("/kuriskachut/pages/signing_5_download.html?room_id=" + sign_room_id);
}

async function downloadSignedDocumentButton() {
    // downloadAsFile(public_key, "signed_document.pdf");
    await downloadSignedDocument();
}

async function downloadDocument() {
    // downloadAsFile(public_key, "document.pdf");
    // original_download_link
    await downloadOriginalDocument();
}

let isDocSigned = false;

async function putSignature() {
    if (sssFile != null && await signDocument()) {
        showNewTipContent(dndPdfField, 'Документ подписан');
        isDocSigned = true;
    } else {
        showNewTipContent(dndPdfField, 'Загрузите secret-share.sss');
    }
}

function goToWaitingRoom() {
    if (isDocSigned) {
        window.location = "/kuriskachut/pages/signing_3_waiting.html?room_id=" + sign_room_id;
    } else {
        showNewTipContent(dndPdfField, 'Подпишите документ');
    }
}

let votedEl = document.getElementById("voted");
let requiredEl = document.getElementById("required");
let totalEl = document.getElementById("total");
let stopBttn = document.getElementById("stop-button");
let stopBttn2 = document.getElementById("stop-button-2");

let xvotedEl = document.getElementById("voted-x");
let xtotalEl = document.getElementById("total-x");
let fvotedEl = document.getElementById("voted-f");
let ftotalEl = document.getElementById("total-f");

async function updateStatistics() {
    console.log(ftotalEl + " ----------" + fvotedEl);

    await getSigningRoom();
    console.log(ftotalEl + " ----------" + fvotedEl);

    if (votedEl !== null && totalEl !== null) {
        votedEl.textContent = signed_count.toString();
        totalEl.textContent = participants_count.toString();
        // if (enough_participants) {
        //     window.location = "http://localhost:63342/kuriskachut/pages/signing_5_download.html?_ijt=f7pp3sngvv9jbmn7c7b6cfusbe&_ij_reload=RELOAD_ON_SAVE";
        // }
    }
    if (xvotedEl !== null && xtotalEl !== null) {
        xvotedEl.textContent = signed_count.toString();
        xtotalEl.textContent = participants_count.toString();
        // if (enough_participants) {
        //     window.location = "http://localhost:63342/kuriskachut/pages/signing_5_download.html?_ijt=f7pp3sngvv9jbmn7c7b6cfusbe&_ij_reload=RELOAD_ON_SAVE";
        // }
    }
    console.log(ftotalEl + " ----------" + fvotedEl);
    if (fvotedEl !== null && ftotalEl !== null ) {
        fvotedEl.textContent = signed_count.toString();
        ftotalEl.textContent = participants_count.toString();
        if (enough_participants) {
            window.location = ("/kuriskachut/pages/signing_5_download.html?room_id=" + sign_room_id);
        }
        // if (enough_participants) {
        // }
    }
    // if (xvotedEl !== null)
    //     xvotedEl.textContent = signed_count.toString();
    // if (xtotalEl !== null)
    //     xtotalEl.textContent = participants_count.toString();
    if (enough_participants && stopBttn !== null) {
        stopBttn.style.visibility = "visible";
    }
    if (enough_participants && stopBttn2 !== null) {
        stopBttn2.style.visibility = "visible";
    }
    console.log("rrrrrrrrrr");
    //
    // votedEl.textContent = ++votedEl.textContent;
    //
}

function uploadRoomId() {
    room_id = localStorage['room_id'];
}

function goToEditRoom() {
    window.location = "pages/editing_1_initiation.html?room_id=" + room_id;
}