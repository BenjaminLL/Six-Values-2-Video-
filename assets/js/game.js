
// get all the elements from the game
var honesty = $("#honesty");
var trust = $("#trust");
var respect = $("#respect");
var responsibility = $("#responsibility");
var fairness = $("#fairness");
var courage = $("#courage");
var scenario = $("#scenario"); // scenario context
var timeText = $("#time");
var timer = $("#timer");
var lifeText = $("#lifeText");
var life = $("#life");
var start = $("#start");
var video = $("video");
var icon = $("i");
var scenarioText = $("#scenarioText h6");
var instruction = $("#instruction");
var instructionTitle = $("#instructionTitle");
var instructionMessage = $("#instruction_message");
var backGround = $("#pop_background");
var instructionPopup = $("#instruction_popup");

var STOP, START, END_MESSAGE, TITLE, FAIL;
var INSTRUCTION_MESSAGES = [];

var buttons = [honesty, trust, respect, fairness, responsibility, courage];
// declare scenarios
var honestyVideos = [];
var trustVideos = [];
var respectVideos = [];
var fairnessVideos = [];
var responsibilityVideos = [];
var courageVideos = [];

var scenarios = [honestyVideos, trustVideos, respectVideos, fairnessVideos, 
					responsibilityVideos, courageVideos];

var honestyText = [];
var trustText = [];
var respectText = [];
var fairnessText = [];
var responsibilityText = [];
var courageText = [];

var scenariosText = [honestyText, trustText, respectText, fairnessText, 
					responsibilityText, courageText];



// load xml based one the specified language
function parseXML(){  
              
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } 

            // get the lan attribute
            var lan = document.getElementsByTagName('html')[0].getAttribute('lang');
            
            // load xml
            if (lan == "en") {

                console.log("English version picked");
                xmlhttp.open("GET","assets/language/game2_en.xml",false);
            } else if (lan == "fr") {

                console.log("French version picked");
                xmlhttp.open("GET","assets/language/game2_fr.xml",false);
            } else if (lan == "zh") {

                console.log("Chinese version picked");
                xmlhttp.open("GET","assets/language/game2_zh.xml",false);
            } else {
                console.log("no language picked");
                xmlhttp.open("GET","language/game1_en.xml",false);
            }

            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;

            // load content to each text field
            timeText.text(xmlDoc.getElementsByTagName("time")[0].childNodes[0].nodeValue);
            lifeText.text(xmlDoc.getElementsByTagName("life")[0].childNodes[0].nodeValue);
            scenario.text(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue);

            FAIL = xmlDoc.getElementsByTagName("fail")[0].childNodes[0].nodeValue;
            TITLE = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            END_MESSAGE = xmlDoc.getElementsByTagName("end_message")[0].childNodes[0].nodeValue;
            STOP = xmlDoc.getElementsByTagName("stop")[0].childNodes[0].nodeValue;
            START = xmlDoc.getElementsByTagName("start")[0].childNodes[0].nodeValue;
            start.text(START);

            instruction.text(xmlDoc.getElementsByTagName("instruction")[0].childNodes[0].nodeValue);
            instructionTitle.text(xmlDoc.getElementsByTagName("instruction")[0].childNodes[0].nodeValue);

            var INSTRUCTION_MESSAGE = xmlDoc.getElementsByTagName("instruction_message")[0];
            INSTRUCTION_MESSAGES[0] = INSTRUCTION_MESSAGE.getElementsByTagName("first_sentence")[0].childNodes[0].nodeValue;
            INSTRUCTION_MESSAGES[1] = INSTRUCTION_MESSAGE.getElementsByTagName("second_sentence")[0].childNodes[0].nodeValue;
            instructionMessage.html(INSTRUCTION_MESSAGES[0] + "<br><br>" + INSTRUCTION_MESSAGES[1]);

            var sixValues = ["honesty", "trust", "respect", "fairness", "responsibility", "courage"];
            var buttonText = xmlDoc.getElementsByTagName("six_values")[0];
            var blurbs = xmlDoc.getElementsByTagName("blurbs")[0];
            var videoPaths = xmlDoc.getElementsByTagName("video_path")[0];
            var index = 1;

            for (var i = 0; i < 6; ++i) {

            	buttons[i].text(buttonText.getElementsByTagName(sixValues[i])[0].childNodes[0].nodeValue);

            	var tmpText = scenariosText[i];
            	var tmpVideo = scenarios[i];
            	var blurbOne = "b" + index;
            	var blurbTwo = "b" + (index + 1);

				tmpText.push(blurbs.getElementsByTagName(blurbOne)[0].childNodes[0].nodeValue);
				tmpText.push(blurbs.getElementsByTagName(blurbTwo)[0].childNodes[0].nodeValue);

				tmpVideo.push(videoPaths.getElementsByTagName(blurbOne)[0].childNodes[0].nodeValue);
				tmpVideo.push(videoPaths.getElementsByTagName(blurbTwo)[0].childNodes[0].nodeValue);

            	index += 2;
            }
 

}




// Global Vars
var scenarioIndex; // current scenario number 
var currVideo;
var numVars = 6;
var time = 0;
var record = null;
var totalPlay = 0;
var played = [];
var stop = false;
var started = false;
var numLife = 3;


video.hide();
icon.hide();
scenarioText.hide();
backGround.hide();
instructionPopup.hide();

// get random number
function getRandom(max) {
	return Math.floor(Math.random() * max);
}

//get random scenarios
function setScenario() {

	for (var i = 0; i < 6; ++i) {
		buttons[i].css("color", "black");
	}

	video[0].pause();
	icon.hide();

	while (true) {
		
		scenarioIndex = getRandom(numVars);
		videoIndex = getRandom(scenarios[scenarioIndex].length);
		currVideo = scenarios[scenarioIndex][videoIndex];

		if (played.indexOf(currVideo) == -1 && currVideo != "null") {
			break;
		}
	}
	console.log("scenarioIndex: " + scenarioIndex);
	played.push(currVideo);
	video[0].src = currVideo;
	video[0].play();
	scenarioText.text(scenariosText[scenarioIndex][videoIndex]);
	++totalPlay;
}

// setup timer
function countTime() {

	clearInterval(record);

    record = setInterval(function() {

    	// check if the game end
    	if (stop) {
        	clearInterval(record);
            record = null;
            started = false;
        } else {
        	// increase the time
	    	++time;
	        timer.text(time);    
        }

    }, 1000);
}

// initial the game contents and status
function init() {

	// initial global variables
	time = 0;
	totalPlay = 0;
	played = [];
	stop = false;
	started = true;
	numLife = 3;

	// set contents and start the timer
	setScenario();
	timer.text(time);
	life.text(numLife);
	countTime();
}

function setListeners() {

	backGround.click(function() {
		backGround.hide();
    	instructionPopup.hide();
	});

	instruction.click(function() {
		backGround.show();
    	instructionPopup.show();
	});

	video[0].onended = function() {
		icon.show();
	};

	icon.click(function() {
		video[0].play();
		icon.hide();
	});

	for (var i = 0; i < numVars; ++i) {

		buttons[i].mouseup(function() {

			if (!started) return;		

			var buttonIndex = $(this).index();

			if (buttonIndex == scenarioIndex) {

				if (totalPlay == numVars) {
					stop = true;
					video[0].pause();
					video.hide();
					icon.hide();
					scenario.text(END_MESSAGE + time + "s");
					scenario.show();
					start.text(START);
					scenarioText.text("");
					scenarioText.hide();
					instruction.show();
				} else {
					setScenario();
				}
			} else {
				
				--numLife;
				console.log(numLife);
				if (numLife == 0) {
					stop = true;
					video[0].pause();
					video.hide();
					icon.hide();
					scenario.text(FAIL);
					scenario.show();
					start.text(START);
					scenarioText.text("");
					scenarioText.hide();
					instruction.show();
				}
				life.text(numLife);
			}
		})
		.mousedown(function() {

			if (!started) return;		

			var buttonIndex = $(this).index();

			if (buttonIndex == scenarioIndex) {

				$(this).css("color", "white");
			} else {
				
				$(this).css("color", "#db2202");
			}

		});
	}

	start.click(function() {

		if (started) {
			start.text(START);
			scenario.text(TITLE);
			scenarioText.text("");
			scenarioText.hide();
			instruction.show();
			scenario.show();
			video[0].pause();
			video.hide();
			icon.hide();
			stop = true;
		} else {
			start.text(STOP);
			scenario.hide();
			video.show();
			instruction.hide();
			scenarioText.show();
			init();
		}
	});
}


parseXML();
setListeners();



