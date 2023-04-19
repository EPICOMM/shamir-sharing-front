// dndField = document.getElementById("drop_zone");
let rpkFile = null;
let sssFile = null;
let pdfFile = null;

let dndPdfField = tippy('.dndField', {
    placement: 'right',
    hideOnClick: false,
    animation: false,
    trigger: "manual",
})[0];

// dndPdfField.disable();
let checkPdf = false;
let checkSss = false;
let checkRpk = false;

let file;

function checkPdfMode(pdf, sss, rpk){
    checkPdf = pdf;
    checkSss = sss;
    checkRpk = rpk;
}


function dropHandler(ev) {
    console.log("File(s) dropped" + ev.name);

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === "file") {
                file = item.getAsFile();
                console.log('Uploaded ' + file.type );
                pdfSssRpkCheck(checkPdf, checkSss, checkRpk);
                console.log(`… file[${i}].name = ${file.name}`);
            }
        });
    } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
            console.log(`… file[${i}].name = ${file.name}`);
        });
    }
}

function pdfSssRpkCheck(checkPdf, checkSss, checkRpk){
    // file.type === 'text/plain
    if (checkSss && file.name.toString().length >= 4 && file.name.toString().slice(-4) === ".sss"){
        sssFile = file;
        dndPdfField.setProps({
            content: 'Uploaded sss-file: ' + file.name,
        });
    } else if (checkPdf && file.type === 'application/pdf'){
        pdfFile = file;
        dndPdfField.setProps({
            content: 'Uploaded pdf-file: ' + file.name,
        });
    } else if (checkRpk && file.name.toString().length >= 4 && file.name.toString().slice(-4) === ".rpk") {
        rpkFile = file;
        dndPdfField.setProps({
            content: 'Uploaded rpk-file: ' + file.name,
        });
    } else {
        console.log( 'It is NOT validated!');
        dndPdfField.setProps({
            content: 'Invalid input',
        });
    }
    dndPdfField.enable();
    dndPdfField.show();

    // if (file.type === 'application/pdf' || file.type === 'text/plain') {
    //     let fileType = file.name.slice(-3);
    //     if (fileType === 'pdf'){
    //         pdfFile = file[0];
    //     } else {
    //         txtFile = file[0];
    //     }
    //     console.log('Uploaded ' + file.name);
    //     // dndField[0].disable();
    //     dndPdfField[0].setProps({
    //         content: 'Uploaded ' + fileType + '-file: ' + file.name,
    //         theme: 'tomato',
    //     });
    //     dndPdfField[0].enable();
    //
    //     dndPdfField[0].show();
    // } else {
    //     console.log( 'It is NOT validated!' );
    //     dndPdfField[0].setProps({
    //         content: 'Invalid input ',
    //         theme: 'tomato',
    //     });
    //     dndPdfField[0].enable();
    //     dndPdfField[0].show();
    // }
}

function dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

