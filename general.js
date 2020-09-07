
var canvas;
var image;

function create() {
    document.getElementById('info').style.display = 'none';
    document.getElementById('form').style.display = 'block';
}

function preview() {

    // create canvas
    canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = document.getElementById('width').value;
    canvas.height = document.getElementById('height').value;

    // create gradient
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, document.getElementById('bg1_color').value);
    grd.addColorStop(1, document.getElementById('bg2_color').value);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // add text
    var font_size = document.getElementById('text_size').value;
    var font_size_css = parseInt((canvas.width * font_size) / 1080);
    ctx.fillStyle = document.getElementById('text_color').value;
    ctx.font = font_size_css + 'px Arial';

    var textString = document.getElementById('text').value,
        textWidth = ctx.measureText(textString).width;
    ctx.fillText(textString, (canvas.width / 2) - (textWidth / 2), canvas.height / 2.9);

    // add qr code
    var qr = new QRious();
    qr.padding = parseInt((canvas.width * 25) / 1080);
    qr.size = parseInt((canvas.width * 500) / 1080);
    qr.value = document.getElementById('url').value;

    image = new Image();
    image.src = qr.image.src;
    image.onload = function () {
        var canvasContext = canvas.getContext('2d');

        var scale = Math.min(canvas.width / image.width, canvas.height / image.height);
        var newWidth = image.width;
        var newHeight = image.height;
        var xOffset = canvas.width / 2 - newWidth / 2;
        var yOffset = canvas.height / 1.8 - newHeight / 1.8;

        canvasContext.drawImage(image, xOffset, yOffset, newWidth, newHeight);

        // clone image
        document.getElementById('preview').innerHTML = '<img src="' + canvas.toDataURL() + '" width="336" height="667">';
        document.getElementById('download').href = canvas.toDataURL();
    };
}

// check mobile device and fill width and height inputs
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {

    var ratio = window.devicePixelRatio || 1;
    var w = screen.width * ratio;
    var h = screen.height * ratio;

    document.getElementById('width').value = w;
    document.getElementById('height').value = h;
}


preview();
