var app = {

    inicio: function(){
        this.iniciaFastClick();
        this.iniciarBotones();
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciarBotones: function(){
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click', function () {
            app.cargarFoto(Camera.PictureSourceType.CAMERA);
        });

        var buttonGallery = document.querySelector('#button-gallery');
        buttonGallery.addEventListener('click', function () {
             app.tomarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
        });

        var buttonSave = document.querySelector('#button-save');
        buttonSave.addEventListener('click', function () {
            alert('Foto guardada en la galeria');
        });

        var filterButtons = document.querySelectorAll('.button-filter');
        filterButtons[0].addEventListener('click', function () {
            app.aplicaFiltro('gray');
        });
        filterButtons[1].addEventListener('click', function () {
            app.aplicaFiltro('negative');
        });
        filterButtons[2].addEventListener('click', function () {
            app.aplicaFiltro('sepia');
        });

        var buttonGallery = document.querySelector('#button-gallery');
        buttonGallery.addEventListener('click', function () {
            app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
        });
    },

    cargarFoto: function (pictureSourceType) {
       var opciones = {
           quality: 100,
           sourceType: pictureSourceType,
           destinationType: Camera.DestinationType.DATA_URL,
           targetWidth: 300,
           targetHeight: 300,
           correctOrientation: true
       };
       navigator.camera.getPicture(app.fotoCargada, app.errorAlCargarFoto, opciones);
    },

    fotoCargada: function (imageURI) {
        var img = document.createElement('img');
        img.onload = function () {
            app.pintarFoto(img);
        }
        img.src = "data:image/jpeg;base64," + imageURI;
    },

    pintarFoto: function (img) {
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
    },

    errorAlCargarFoto: function (mensaje) {
        console.log('Fallo al tomar foto o toma cancelada: ' + mensaje);
    },

    aplicaFiltro: function(filterName){
        var canvas = document.querySelector('#foto');
        var context = canvas.getContext('2d');
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        effects[filterName](imageData.data);

        context.putImageData(imageData, 0, 0);
    }
};
var imageData;

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        app.inicio();
    }, false);
}