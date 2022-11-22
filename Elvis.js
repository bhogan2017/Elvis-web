var issearching = false;
var stopped = false;
var isactive = false;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function ai(string) {
    speak(string);
}

function speak(a) {
    //voices = window.speechSynthesis.getVoices()
    var msg = new SpeechSynthesisUtterance(a);
    //msg.voice = voices[4];
    //msg.lang = voices[4].lang;
    // @grant        window.index.html
    window.speechSynthesis.speak(msg);
}

function restart() {
    document.getElementById("viizer").style.visibility = "hidden";
    isactive = false;
    recognition.onresult = function(event) {
        var current = event.resultIndex;
        window.transcript = event.results[current][0].transcript;
        console.log(window.transcript);
        tsCheck(); //ADD THIS
    }
}

function done_searching() {
    issearching = false;
    restart();
}

function Elvis_Appointed() {
    document.getElementById("viizer").style.visibility = "visible";
    if (isactive == false) {
        var response_type = getRandomInt(3)
        if (response_type == 0) {
            ai("yess?");
        } else if (response_type == 1) {
            ai("that's me!");
        } else if (response_type == 2) {
            ai("uh-huh?!");
        }
    }
    isactive = true;

    // HERE

    if (isactive == true) {
        recognition.onresult = function(event) {
            var current = event.resultIndex;
            window.transcript = event.results[current][0].transcript;
            document.getElementById("user_input").innerHTML = window.transcript;

            const jokeContainer = document.getElementById("joke");

            const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

            let getJoke = () => {

                fetch(url)
                    .then(data => data.json())
                    .then(item => {
                        joke = `${item.joke}`;
                        ai(joke);
                    });
            }



            if (window.transcript.toLowerCase().includes("google")) {
                var search = window.transcript.split(' ').slice(2).join(' ');
                var ignoreword = "GOOGLE";
                search = search.substr(search.indexOf(ignoreword) + 1, search.length);
                window.open("https://www.google.com/search?q=" + search, "_blank");
                ai("Searching google for" + search);
                done_searching();
            } else if (window.transcript.toLowerCase().includes("look up")) {
                var search = window.transcript.split(' ').slice(3).join(' ');
                var ignoreword = "look up";
                search = search.substr(search.indexOf(ignoreword) + 1, search.length);
                window.open("https://www.google.com/search?q=" + search, "_blank");
                ai("Searching google for" + search);
                done_searching();
            } else if (window.transcript.toLowerCase().includes("Elvis")) {
                isactive = false;
                Elvis_Appointed();
            } else if (window.transcript.toLowerCase().includes("exit")) {
                ai("see you!");
                window.close();
            } else if (window.transcript.toLowerCase().includes("thank")) {
                ai("your welcome");

            } else if (window.transcript.toLowerCase().includes("favorite") && window.transcript.toLowerCase().includes("color")) {
                ai("I love all the colors of the rainbow but if i had to pick, probably blue");

            } else if (window.transcript.toLowerCase().includes("who made you")) {
                ai("I was created by Ben Hogan");
                // window.close();
            } else if (window.transcript.toLowerCase().includes("stop") || window.transcript.toLowerCase().includes("power down")) {
                ai("okay!");
                restart();
            } else if (window.transcript.toLowerCase().includes("hi")) {
                ai("Hello!");
                restart();
            } else if (window.transcript.toLowerCase().includes("test")) {
                ai("test");
                restart();
            } else if (window.transcript.toLowerCase().includes("good") || window.transcript.toLowerCase().includes("helpful") || window.transcript.toLowerCase().includes("thank you")) {
                ai("Im here to help!");
                restart();
            } else if (window.transcript.toLowerCase().includes("joke")) {
                getJoke();
            } else if (window.transcript.toLowerCase().includes("time")) {
                var d = new Date();
                var hours = d.getHours();
                //var hours = (hours+24-2)%24;
                var minutes = new Date().getMinutes();
                var mid = 'A M';
                if (hours == 0) { //At 00 hours we need to show 12 am
                    hours = 12;
                } else if (hours > 12) {
                    hours = hours % 12;
                    mid = 'P M';
                }
                if (minutes < 10) {
                    0 + minutes
                    var mlten = true;
                } else {
                    minutes = minutes;
                }
                var today = new Date();
                if (mlten == true) {
                    var time = hours + " o" + minutes + "";
                } else {
                    var time = hours + "" + minutes;
                }
                ai("The current time is: " + time + mid);
                // restart();


                document.getElementById("user_input").innerHTML = "";
            }
            // Joke Code (Add script from) TODO
            else if (window.transcript.toLowerCase().includes("light") && window.transcript.toLowerCase().includes("on")) {
                let python = document.getElementById('python');
                python.innerHTML = "on";
            } else if (window.transcript.toLowerCase().includes("light") && window.transcript.toLowerCase().includes("off")) {
                let python = document.getElementById('python');
                python.innerHTML = "off";
            }
        }
    }
}

function tsCheck() {
    if (/Elvis/i.test(window.transcript)) {
        Elvis_Appointed();
    }
}

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onresult = function(event) {
    document.getElementById("viizer").style.visibility = "hidden";
    var current = event.resultIndex;
    window.transcript = event.results[current][0].transcript;
    tsCheck(); //ADD THIS
    console.log(window.transcript);
}

function reactivate() {
    recognition.onend = function(event) {
        recognition.start();
    }
    restart();
}

recognition.onaudioend = function(event) {
        recognition.stop();
        console.log("no audio...");
        reactivate();
    }
    // if (1 + 1 == 2) {
    //     //h1 innerhtml



// }
// User_Input = window.transcript;
//  = User_Input;


isactive = false;
recognition.stop();
recognition.start();