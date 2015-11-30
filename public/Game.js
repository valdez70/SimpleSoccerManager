
"use strict";
class Game{
	constructor(xPos,yPos,_width,_length){
		this.field=new Field(xPos,yPos,_width,_length);
		this.ball=this.field.ball;
		this.teamA=this.field.teamA;
		this.teamB=this.field.teamB;
		this.timeElapsed=0;
		this.gameTime=0;
		this.allPlayers=this.field.allPlayers;
		this.winner="";
		this.lastPlayerInPossession;
		this.gameStatus="event";
		this.animationTime=0;
		this.state="KICKOFF";
		this.teamAmorale=0;
		this.cumulativeTimeDelay=0;
		this.delay=0;
		this.delayUpdated=false;
		this.teamB.objectives=["defend"];
		this.teamA.objectives=["attack"];
		this.lastTimeBeforeGameEvent=0;
		this.halfTimeHappened=false;
		//this.teamB.setState("kickoff");
		//this.teamA.setState("kickoff");

		this.mostRecentEventTimeStop=0;
		this.mostRecentEventTimeStart=0;
		


	}
	animate(){
		//var waitTime;
		push();
		fill(0,0,0);
		stroke(0);
		strokeWeight(2);
		rect(this.field.xPos-this.field._length/20,this.field.yPos-this.field._length/20,this.field._width+this.field._length/10,11*this.field._length/10);
		pop();
		this.timeElapsed=millis();

		if (this.gameEvent()) {
			
			if(this.isFullTime()){
				this.gameTime=90;
				this.lastTimeBeforeGameEvent=90;

			}
			else if(this.isHalfTime()){
				this.lastTimeBeforeGameEvent=45;
				this.gameTime=45;
			}

			else{
				this.gameTime=this.lastTimeBeforeGameEvent;

			}
			
			this.delayUpdated=false;
		}
		else{
			this.updateCumulativeDelay();
			this.gameTime=Math.floor(this.timeElapsed/1000)-Math.floor(this.cumulativeTimeDelay/1000);
			this.delayUpdated=true;

		}
		this.updateLastTimeBeforeGameEvent();		
		this.getMostRecentEventTimeStart();
		this.getMostRecentEventTimeStop();
		
		
		
		this.field.animate();
		this.displayScore();
		this.displayTime();
		this.displayFocusPlayers();
		if (this.getLastPlayerInPossession()!=1) {
			this.lastPlayerInPossession=this.getLastPlayerInPossession();
		};
		//console.log(this.teamA.isInKickOffPosition())
		
		//this.teamA.attack();


		this.updateTeamMorale();

	}


	displayScore(){
		push();
		fill(0);
		var scoreString=this.teamA.nm+" "+this.teamA.score+" : "+this.teamB.score+" "+this.teamB.nm;
		//var scoreString="Not for now"
		textSize(width/40);
		text(scoreString, width/48, height/20);
		pop();
	}

	displayTime(){
		push();
		fill(0);
		
		textSize(width/40);
		var timeString=this.gameTime+":00"
		text(timeString, 42*width/48, height/20);
		pop();

	}
	displayFocusPlayers(){
		push();
		fill(0);
		textSize(width/50);
		//text(this.teamA.mindset, width/5, 9*height/10);
		//text(this.teamA.nearestPlayerToBall().position, width/5, 9*height/10);
		// fill(this.teamB.colors);
		//text(this.teamB.mindset, 3.8*width/5, 9*height/10)
		//text(this.teamB.nearestPlayerToBall().position, 3.8*width/5, 9*height/10);
		pop();
	}

	stateMachine(){
		this.updateState();
		this.updateScores();
		
		this.animate();
		if (this.gameEvent()) {
			this.ball.stop();
			this.displayGameStatus();
			this.restartGameFromState();			
		}
		else if(!this.isFullTime()){
			this.animationTime=0;
			
			
			}

		else{


			this.end();
		}

		

	}

	displaySubs(){

	}

	
	goalScored(){
		return this.leftGoalScored()||this.rightGoalScored();

		
	}
	leftGoalScored(){
		return this.field.leftPost.contains(this.ball.xPos,this.ball.yPos);

	}
	rightGoalScored(){
		return this.field.rightPost.contains(this.ball.xPos,this.ball.yPos);

	}
	isCorner(){
		return this.isleftCorner()||this.isRightCorner();
	}
	isleftCorner(){
		return this.ball.xPos>this.field.xPos+this.field._width && this.lastPlayerInPossession.side=="right";	

	}
	isRightCorner(){
		return this.ball.xPos<this.field.xPos && this.lastPlayerInPossession.side=="left";		
	}
	isThrowing(){
		return (this.ball.yPos<this.field.yPos || this.ball.yPos>this.field.yPos+this.field._length)||this.teamA.state=="ownthrowing"||this.teamA.state=="oppthrowing";
	}
	isRightThrowing(){
		return this.isThrowing() && this.lastPlayerInPossession.side=="left";

	}
	isLeftThrowing(){
		return this.isThrowing() && this.lastPlayerInPossession.side=="right";
	}
	isGoalKick(){
		return this.isLeftGoalKick()||this.isRightGoalKick()

	}
	isLeftGoalKick(){
		return this.ball.xPos<this.field.xPos && this.lastPlayerInPossession.side=="right";

	}
	isRightGoalKick(){
		return this.ball.xPos>this.field.xPos+this.field._width && this.lastPlayerInPossession.side=="left";

	}
	isHalfTime(){
		return this.gameTime==45&&!this.halfTimeHappened;
	}

	isFullTime(){
		return this.gameTime>=90;
	}

	isStarting(){
		return this.timeElapsed<5000;
	}
	

	kickOff(){

	}


	end(){
		this.setTeamsToNeutral();
		this.gameTime=90;
		this.ball.stop();
		 if (this.teamA.score>this.teamB.score) {
		 		this.winner=this.teamA;
		 	}
		 else if(this.teamB.score>this.teamA.score){
		 		this.winner=this.teamB;
		 	}
		

		if (this.winner!="") {
			this.state="GAME OVER, "+this.winner.nm+ " WINS";
			
			

		}
		else{
			this.state="GAME OVER, DRAW";


		}
		this.displayGameStatus();

		
		

	}


	getLastPlayerInPossession(){
		for (var i = this.allPlayers.length - 1; i >= 0; i--) {
			if (this.allPlayers[i].hasBall()) {
				return this.allPlayers[i];
			};
		};
		return 1;
	}


	displayGameStatus(){

		push();
		fill(255);
		textAlign(CENTER);
		textSize(this.field._width/10);
		text(this.state,this.field.midx,this.field.midy);		
		pop();

	}	
	gameEvent(){
		return this.isFullTime()||this.isThrowing()||this.isCorner()||this.isHalfTime()||this.goalScored()||this.isStarting()||this.state=="KICKOFF"||this.isGoalKick();
	}

	setTeamsToNeutral(){
		this.setTeamStates("neutral","neutral");
	}

	setTeamsToPlay(){
		this.setTeamStates("play","play");

	}

	restartGameFromThrowing(){
		var teamToRestart;
		this.ball.stop();
		if (this.lastPlayerInPossession.side=="right") {
			teamToRestart=this.teamA;
			this.setTeamStates("ownthrowing","oppthrowing");
			
		}
		else{
			teamToRestart=this.teamB;
			this.setTeamStates("oppthrowing","ownthrowing");
			
		}

		if (this.ball.yPos<this.field.midy){
			this.ball.yPos=this.field.yPos;
		}
		else{
			this.ball.yPos=this.field.yPos+this.field._length;

		}



		
		if (teamToRestart.isReadyForThrowing()) {
			teamToRestart.nearestPlayerToBall().passToBestOption();
			this.setState("PLAY");
			this.setTeamsToPlay();
			};


	}
	restartGameFromGoalKick(){

		//this.teamB.moveToAttackingRegions();
		//this.teamA.moveToAttackingRegions();
		if (this.isLeftGoalKick()) {
			this.setTeamStates("owngoalkick","oppgoalkick");			
			if (this.isReadyForGoalKick()) {
				this.ball.xPos=this.teamA.players[0].xPos;
				this.ball.yPos=this.teamA.players[0].yPos;
				this.setTeamsToPlay();


			};
		}
		else{
			this.setTeamStates("oppgoalkick","owngoalkick");

			if (this.isReadyForGoalKick()) {
				this.ball.xPos=this.teamB.players[0].xPos;
				this.ball.yPos=this.teamB.players[0].yPos;
				this.setTeamsToPlay();

			};	

		}

		

	}
	restartGameFromCorner(){
		if (this.isleftCorner()) {

		}
		else{

		}

	}
	restartGameFromKickOff(){
		this.setTeamStates("kickoff","kickoff");
		if (this.isReadyForKickOff()) {
				this.ball.xPos=this.field.midx;
				this.ball.yPos=this.field.midy;
				this.setTeamsToPlay();
				console.log("start playing now");
				if (this.state=="HALF TIME") {
					this.halfTimeHappened=true;

				};
				this.setState("PLAY");
				
				

			}
			

	}

	restartGameFromState(){
		if (this.state=="THROWING") {
			this.restartGameFromThrowing();
		}
		else if (this.state=="GOALKICK") {
			this.restartGameFromGoalKick();

		}
		else if (this.state=="CORNER") {
			this.restartGameFromCorner();
		}
	
	
		else if (this.state=="GOAL"||this.state=="KICKOFF"||this.state=="HALF TIME") {
			this.restartGameFromKickOff();
			
		}
		else{
			console.log(this.state+" state is not recognized");
		}
		//this.setState("PLAY");
		//this.setTeamsToPlay();
	}

	setState(newState){
		this.state=newState;
	}

	setTeamStates(stateA,stateB){
		this.teamA.setState(stateA);
		this.teamB.setState(stateB);

	}

	updateScores(){
		if (this.goalScored()) {
				if (this.animationTime==0) {
					if (this.leftGoalScored()) {
					this.teamB.score++;
				}else{
					this.teamA.score++;
				}

				};
				this.animationTime++;
				
			}
	}
	updateState(){
		if(!this.isFullTime()){
			if (this.goalScored()) {
			this.state="GOAL";
		};
			if (this.isCorner()) {
				this.state="CORNER";
			};
			if (this.isGoalKick()) {
				this.state="GOALKICK";
			};
			if (this.isHalfTime()) {
				this.state="HALF TIME";
			};
			if (this.isFullTime()) {
				this.state="FULL TIME";
			};
			if (this.isThrowing()) {
				this.state="THROWING";
			};
			if (!this.gameEvent()) {
				this.state="PLAY"
			};

		}
		
		else{
			this.state="FULL TIME";
		} 
		

	}
	isReadyForKickOff(){
		return this.teamA.isInKickOffPosition()&&this.teamB.isInKickOffPosition();

	}
	isReadyForGoalKick(){
		return this.teamA.isReadyForGoalKick()&&this.teamB.isReadyForGoalKick();

	}
	updateTeamMorale(){
		//var teamMoraleDepletion=map(this.gameTime,0,90,0,0.2/this.gameTime);
		var constantMoraleDepletion=0.2/900;

		if (!this.teamA.getTeamMorale()<constantMoraleDepletion) {
			this.teamA.incrementTeamMorale(-constantMoraleDepletion);
		};
		
	}

	pause(){
		this.setTeamStates("neutral","neutral");
		this.ball.storeVelocity();
		this.ball.stop();

	}

	play(){
		this.ball.moveWithStoredVelocity();
		this.setTeamsToPlay();


	}

	updateDelay(){

		this.delay=millis();

	}
	updateCumulativeDelay(){
		if (!this.delayUpdated) {
			var interval=this.getCurrentDelayInterval();
			this.cumulativeTimeDelay+=interval;
			this.delayUpdated=true;
		};
		
		

	}
	handleHalfTimeTransition(){
		this.cumulativeTimeDelay-=0;
	}

	updateLastTimeBeforeGameEvent(){
		if (!this.gameEvent()) {
			this.lastTimeBeforeGameEvent=this.gameTime;

		};
	}

	getMostRecentEventTimeStop(){
		if (this.gameEvent()) {
			this.mostRecentEventTimeStop=millis();

		};

	}

	getMostRecentEventTimeStart(){
		if (!this.gameEvent()) {
			this.mostRecentEventTimeStart=millis();
		};

	}

	getCurrentDelayInterval(){
		var start=this.mostRecentEventTimeStart;
		var stop=this.mostRecentEventTimeStop;
		return stop-start;
	}

}