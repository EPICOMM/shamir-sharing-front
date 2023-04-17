// dndField = document.getElementById("drop_zone");
let txtFile = null;
let pdfFile = null;

let dndPdfField = tippy('.dndField', {
    placement: 'right',
    hideOnClick: false,
    animation: false,
    trigger: "manual",
})[0];

dndPdfField.disable();
let checkPdf = false;
let file;

function checkPdfMode(input){
    checkPdf = input;
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
                pdfTxtCheck(checkPdf);
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

function pdfTxtCheck(checkPdf){
    // file.type === 'text/plain
    if (file.name.toString().length >= 4 && file.name.toString().slice(-4) === ".sss"){
        txtFile = file;
        dndPdfField.setProps({
            content: 'Uploaded sss-file: ' + file.name,
        });
    } else if (checkPdf && file.type === 'application/pdf'){
        pdfFile = file;
        dndPdfField.setProps({
            content: 'Uploaded pdf-file: ' + file.name,
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

function pdfAndTxtCheck() {

}

function dragOverHandler(ev) {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

