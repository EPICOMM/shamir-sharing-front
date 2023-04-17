var logorec = document.getElementById("svgrec");
var logo = document.getElementById("logo");
var logotrans = document.getElementById("logo-trans");
logotrans.style.left = (document.documentElement.clientWidth /2 - 100).toString() + "px";
logo.style.left = (document.documentElement.clientWidth.toString()/2 - 100) + "px";

function lol(){
    logotrans.style.left = (document.documentElement.clientWidth /2 - 100).toString() + "px";
    logo.style.left = (document.documentElement.clientWidth.toString()/2 - 100) + "px";
}
// logorec.style.top = logo.offsetTop.toString() + "px";
// logorec.style.left = logo.offsetLeft.toString() + "px";

lol();

window.addEventListener('resize', lol);

logo.onclick = function() {
    logo.src = 'next_image.jpg';
}

logo.onclick = function (){
    if (logotrans.style.visibility === "hidden"){
        logotrans.style.visibility = "visible";
    } else {
        logotrans.style.visibility = "hidden";
    }
}


// photo.addEventListener('load', function myLoadHandler(event) {
//     relocateImageAndCanvas();
// });



