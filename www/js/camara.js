var app = {

    inicio: function(){
        this.iniciaFastClick();
        this.iniciaBoton();
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaBoton: function(){
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click', function () {
            app.tomarFoto(Camera.PictureSourceType.CAMERA);
        });
    },

    tomarFoto: function (pictureSourceType) {
            var opciones = {
                quality: 90,
                sourceType: pictureSourceType,
                destinationType: Camera.DestinationType.DATA_URL,
                targetWidth: 300,
                targetHeight: 300,
                correctOrientation: true
            };
            navigator.camera.getPicture(app.fotoTomada, app.errorAlCargarFoto, opciones);
    },

    fotoTomada: function(imageURI){
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

    errorAlTomarFoto: function(mensaje){
        console.log('Fallo al tomar foto o toma cancelada: ' + mensaje);
    }
};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        app.inicio();
    }, false);
}