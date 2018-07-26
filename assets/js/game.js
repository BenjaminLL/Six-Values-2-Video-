
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

// declare scenarios
var honestyVideos = ["assets/videos/1a-v3.mp4", "assets/videos/1b-v3.mp4", "assets/videos/2a-v3.mp4", "assets/videos/2b-v3.mp4"];
var trustVideos = ["assets/videos/4a-v3.mp4", "assets/videos/4b-v3.mp4"];
var respectVideos = ["assets/videos/5b-v3.mp4", "assets/videos/6a-v3.mp4"];
var responsibilityVideos = ["assets/videos/7a-v3.mp4", "assets/videos/7b-v3.mp4"];
var fairnessVideos = ["assets/videos/9a-v3.mp4", "assets/videos/9b-v3.mp4", "assets/videos/10a-v3.mp4", "assets/videos/10b-v3.mp4"];
var courageVideos = ["assets/videos/11a-v3.mp4", "assets/videos/11b-v3.mp4", "assets/videos/12a-v3.mp4", "assets/videos/12b-v3.mp4"];

var scenarios = [honestyVideos, trustVideos, respectVideos, responsibilityVideos, 
					fairnessVideos, courageVideos];
var buttons = [honesty, trust, respect, responsibility, fairness, courage];

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

// get random number
function getRandom(max) {
	return Math.floor(Math.random() * max);
}

//get random scenarios
function setScenario() {

	while (true) {
		
		scenarioIndex = getRandom(numVars);
		videoIndex = getRandom(scenarios[scenarioIndex].length);
		currVideo = scenarios[scenarioIndex][videoIndex];

		if (played.indexOf(currVideo) == -1) {
			break;
		}
	}

	played.push(currVideo);
	video[0].src = currVideo;
	video[0].play();
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
	for (var i = 0; i < numVars; ++i) {

		buttons[i].click(function() {

			if (!started) return;		

			var buttonIndex = $(this).index();
			console.log("buttonIndex: " + buttonIndex);
			console.log("scenarioIndex: " + scenarioIndex);
			if (buttonIndex == scenarioIndex) {

				if (totalPlay == numVars) {
					stop = true;
					scenario.text("You Win!");
					start.text("Start");
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
					scenario.text("Try Again!");
					scenario.show();
					start.text("Start");
				}
				life.text(numLife);
			}
		});
	}

	start.click(function() {

		if (started) {
			start.text("Start");
			scenario.text("Six Values 2");
			scenario.show();
			video[0].pause();
			video.hide();
			stop = true;
		} else {
			start.text("Stop");
			scenario.hide();
			video.show();
			init();
		}
	});
}



setListeners();



