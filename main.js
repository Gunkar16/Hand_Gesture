rediction_1 = "";
prediction_2 = "";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_qualtiy:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_image' src='"+data_uri+"'>";
    });
}
console.log('ml5 version',ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/L4Jxly6fb/model.json',modelLoaded)

function modelLoaded(){
    console.log("model Loaded");
}
function speak(){
    synth = window.speechSynthesis;
    speakdata1 = "first prediction is " + prediction_1;
    speakdata2 = "second prediction is " + prediction_2;
    utterthis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);

}
function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img,GotResult)
}
function GotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Punch"){
            document.getElementById("update_emoji").innerHTML = "&#9994";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "&#129304";
        }
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077";

        }
        if(results[0].label == "Thumbs Down"){
            document.getElementById("update_emoji").innerHTML = "&#128078";
        }
        if(results[0].label == "High Five"){
            document.getElementById("update_emoji").innerHTML = "&#128400";
        }
        if(results[1].label == "Punch"){
            document.getElementById("update_emoji_2").innerHTML = "&#9994";
        }

        if(results[1].label == "victory"){
            document.getElementById("update_emoji_2").innerHTML = "&#129304";
        }
        if(results[1].label == "Thumbs Up"){
            document.getElementById("update_emoji_2").innerHTML = "&#128077";

        }
        if(results[1].label == "Thumbs Down"){
            document.getElementById("update_emoji_2").innerHTML = "&#128078";
        }
        if(results[1].label == "High Five"){
            document.getElementById("update_emoji_2").innerHTML = "&#128400";
        }
        
    }
}