var app = {

    inicio: function(){
        this.iniciaFastClick();
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaBoton: function(){
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click', this.tomarFoto);
    },

    tomarFoto: function(){
        var opciones = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 300,
            targetHeight: 300,
            correctOrientation: true
        };
          
        navigator.Camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
    },

    fotoTomada: function(imageURI){
        var image = document.querySelector('#foto');
        image.src = imageURI;
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