verVideo = (video,ctx)=>{
    ctx.drawImage(video,0,0,ctx.width,ctx.height);
}

gravar = () => {
    let canvas = document.getElementById('preview'); 
    let context = canvas.getContext("2d");
    canvas.width = "380";
    canvas.height = "300";
    context.width = canvas.width;
    context.height = canvas.height;
    let video = document.querySelector('video');
    navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia({video: true, audio: true}, (stream) =>{
            video.srcObject = stream;
            video.play();
            // video.onloadedmetadata = function (e) {
              
            // };
        }, (erro) =>{console.log("O seguinte erro ocorreu: " + erro);}
    );
    setInterval(()=>{
        verVideo(video,context);
    },70)

}