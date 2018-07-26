
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

// declare scenarios
var scenarios = ["honesty", "trust", "respect", "responsibility", 
					"fairness", "courage"];
var buttons = [honesty, trust, respect, responsibility, fairness, courage];

// Global Vars
var scenarioIndex; // current scenario number 
var numVars = 6;
var time = 0;
var record = null;
var totalPlay = 0;
var played = [];
var stop = false;
var started = false;
var numLife = 3;

// get random number
function getRandom(max) {
	return Math.floor(Math.random() * max);
}

//get random scenarios
function setScenario() {

	while (true) {
		
		scenarioIndex = getRandom(numVars);
		if (played.indexOf(scenarioIndex) == -1) {
			break;
		}
	}
	played.push(scenarioIndex);
	scenario.text(scenarios[scenarioIndex]);
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
					scenario.text("Try Again!");
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
			stop = true;
		} else {
			start.text("Stop");
			init();
		}
	});
}



setListeners();



