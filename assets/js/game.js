
// assign each button to a variable 
var honesty = $("#honesty");
var trust = $("#trust");
var respect = $("#respect");
var responsibility = $("#responsibility");
var fairness = $("#fairness");
var courage = $("#courage");
var scenario = $("#scenario"); // scenario context
var timer = $("#timer");
var life = $("#life");
var start = $("#start");
var video = $("video");
var icon = $("i");
var scenarioText = $("#scenarioText h6");
var instruction = $("#instruction");
var backGround = $("#pop_background");
var instructionPopup = $("#instruction_popup");

// declare scenarios
var honestyVideos = ["assets/videos/1b-v3.mp4", "assets/videos/2b-v3.mp4"];
var trustVideos = ["assets/videos/4b-v3.mp4"];
var respectVideos = ["assets/videos/5b-v3.mp4"];
var fairnessVideos = ["assets/videos/7b-v3.mp4"];
var responsibilityVideos = ["assets/videos/9b-v3.mp4", "assets/videos/10b-v3.mp4"];
var courageVideos = ["assets/videos/11b-v3.mp4", "assets/videos/12b-v3.mp4"];

var scenarios = [honestyVideos, trustVideos, respectVideos, responsibilityVideos, 
					fairnessVideos, courageVideos];
var buttons = [honesty, trust, respect, responsibility, fairness, courage];


var honestyText = ["Your friend asked you to work together on a quiz but want to ask the instructor and abide by the policies in the course outline.", 
					"After being granted an extension for a paper you are struggling with, you decide to admit your struggles and contact your instructor to receive help."];
var trustText = ["You receive an “F” on a paper and think that your friend may have copied your work without you knowing, and you want your instructor to know that you did completed the work on your own."];
var respectText = ["You have already completed half the assignment with your friends when you learn it is an individual assignment, so you start the assignment over on your own to ensure it captures your thoughts alone."];
var fairnessText = ["A student is writing an exam and has access to the answer key, so you let the instructor know after class that the answers are available online so that no one has an advantage on the exam."];
var responsibilityText = ["After having lied on your resume, you find yourself unable to answer questions about a skill you claimed to have, and decide to let the interviewer know that you have no experience with that content.", 
					"You realize you should go see a counselor to take control of your academic career after your mother asks how classes are going."];
var courageText = ["While writing an exam where electronics are not allowed, you see students looking at their phones, and decide to notify the exam invigilator.",
				 "You have recently switched academic programs and have been afraid to tell your family, so you make the difficult decision to seek help and visit an academic advisor."];

var scenariosText = [honestyText, trustText, respectText, responsibilityText, 
					fairnessText, courageText];

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

	video[0].pause();
	icon.hide();

	while (true) {
		
		scenarioIndex = getRandom(numVars);
		videoIndex = getRandom(scenarios[scenarioIndex].length);
		currVideo = scenarios[scenarioIndex][videoIndex];

		if (played.indexOf(currVideo) == -1) {
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

		buttons[i].click(function() {

			if (!started) return;		

			var buttonIndex = $(this).index();

			if (buttonIndex == scenarioIndex) {

				if (totalPlay == numVars) {
					stop = true;
					video[0].pause();
					video.hide();
					icon.hide();
					scenario.text("You Finished in: " + time + "s");
					scenario.show();
					start.text("Start");
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
					scenario.text("Try Again!");
					scenario.show();
					start.text("Start");
					scenarioText.text("");
					scenarioText.hide();
					instruction.show();
				}
				life.text(numLife);
			}
		});
	}

	start.click(function() {

		if (started) {
			start.text("Start");
			scenario.text("Six Values 2");
			scenarioText.text("");
			scenarioText.hide();
			instruction.show();
			scenario.show();
			video[0].pause();
			video.hide();
			icon.hide();
			stop = true;
		} else {
			start.text("Stop");
			scenario.hide();
			video.show();
			instruction.hide();
			scenarioText.show();
			init();
		}
	});
}



setListeners();



