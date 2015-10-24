var field;
var game;
var controls;
var latestCommand="Say a command, e.g. attack";

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
	myRec.continuous = true; // do continuous recognition
	myRec.interimResults = true; // allow partial recognition (faster, less accurate)

	function setup() {
		createCanvas(windowWidth,windowHeight);

		//field=new Field(width/5,height/5,3*width/5,3*height/5);
		game=new Game();
  		myRec.onResult = parseResult; // recognition callback
		myRec.start(); // start engine
	}

	function draw() {

		background(33,150,243);  
		game.animate();
		displayLatestCommand();
		//field.teamA.players[0].mark(field.teamA.players[10]);

	}


	function windowResized(){
		resizeCanvas(windowWidth, windowHeight);
  	//redraw();
  }

  


  function parseResult()
  {
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostRecentPhrase = myRec.resultString;
		latestCommand=mostRecentPhrase;
		//field.teamA.objectives[0]=mostRecentPhrase;

	}


	function displayLatestCommand(){
		//put this function in game class

		push();
		fill(255);
		rectMode(CENTER);
		rect(width/2,height/10,width/3,height/10);
		fill(127,127,130);
		textSize(width/80);
		text(latestCommand, 5*width/12, height/10);
		pop();
	}