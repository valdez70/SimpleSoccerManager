
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
		//this.teamB.setState("kickoff");
		//this.teamA.setState("kickoff");
		


	}
	animate(){
		push();
		fill(181,181,181);
		stroke(0);
		strokeWeight(2);
		rect(this.field.xPos-this.field._length/20,this.field.yPos-this.field._length/20,this.field._width+this.field._length/10,11*this.field._length/10);
		pop();
		this.timeElapsed=millis();
		if(!this.gameEvent()){
		this.gameTime=Math.floor(this.timeElapsed/2000)-Math.floor(this.cumulativeTimeDelay/2000);
		}
		
		
		this.field.animate();
		this.displayScore();
		this.displayTime();
		this.displayFocusPlayers();
		if (this.getLastPlayerInPossession()!=1) {
			this.lastPlayerInPossession=this.getLastPlayerInPossession();
		};
		//console.log(this.teamA.isInKickOffPosition())
		
		//this.teamA.attack();
		this.teamB.objectives=["defend"];
		this.updateTeamMorale();

	}


	displayScore(){
		push();
		fill(0);
		var scoreString=this.teamA.nm+" "+this.teamA.score+" : "+game.teamB.score+" "+game.teamB.nm;
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
		text(this.teamA.nearestPlayerToBall().position, width/5, 9*height/10);
		// fill(this.teamB.colors);
		//text(this.teamB.mindset, 3.8*width/5, 9*height/10)
		text(this.teamB.nearestPlayerToBall().position, 3.8*width/5, 9*height/10);
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
	isLeftThrowing(){
		return this.ball.yPos<this.field.yPos || this.ball.yPos>this.field.yPos+this.field._width;

	}
	isThrowing(){
		return this.ball.yPos<this.field.yPos || this.ball.yPos>this.field.yPos+this.field._width;
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
		return this.gameTime==45;
	}

	isFullTime(){
		return this.gameTime>=90;
	}

	isStarting(){
		return this.timeElapsed<5000;
	}
	

	kickOff(){

	}

	goalAnimation(){
		
			push();
			textSize(this.field._width/30);
			fill(255);
			text("GOAL",this.field.xPos,this.field.yPos);
			this.ball.stop();
			for (var i = this.allPlayers.length - 1; i >= 0; i--) {
				this.allPlayers[i].stop();
			};
			pop();
			this.ball.xPos=this.field.midx;
			this.ball.yPos=this.field.midy;
			for (var i = this.allPlayers.length - 1; i >= 0; i--) {
				this.allPlayers[i].setInDefaultPosition();
				this.allPlayers[i].stop();
			};
			
			this.ball.stop();
		
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


	animationExpired(delayTime){
		
		this.animationTime++;
		if (this.animationTime>delayTime) {
			this.animationTime=0;			
			return true;
		};
		return false;

	


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
		return this.isFullTime()||this.isThrowing()||this.isCorner()||this.isHalfTime()||this.goalScored()||this.isStarting()||this.state=="KICKOFF";
	}

	setTeamsToNeutral(){
		this.setTeamStates("neutral","neutral");
	}

	setTeamsToPlay(){
		this.setTeamStates("play","play");

	}

	restartGameFromThrowing(){
		if (this.isLeftThrowing()) {
			this.setTeamStates("ownthrowing","oppthrowing");
			if (this.teamA.isReadyForThrowing()) {
				this.setTeamStates("play","play");
				this.teamA.nearestPlayerToBall().passToBestOption();

			};
		}
		else{

			this.setTeamStates("oppthrowing","ownthrowing");
			if (this.teamB.isReadyForThrowing()) {
				this.setTeamStates("play","play");
				this.teamB.nearestPlayerToBall().passToBestOption();

			};

		}


	}
	restartGameFromGoalKick(){
		this.teamB.moveToAttackingRegions();
		this.teamA.moveToAttackingRegions();
		if (this.isLeftGoalKick()) {
			
			if (this.isReadyForGoalKick()) {
				this.ball.xPos=this.teamA.players[0].xPos;
				this.ball.yPos=this.teamA.players[0].yPos;

			};
			


		}
		else{

			if (this.isReadyForGoalKick()) {
				this.ball.xPos=this.teamB.players[0].xPos;
				this.ball.yPos=this.teamB.players[0].yPos;

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
				this.setState("PLAY");
			}
			else{
				this.cumulativeTimeDelay=millis();
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
					this.teamA.score++;
				}else{
					this.teamB.score++;
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


		this.teamA.incrementTeamMorale(-constantMoraleDepletion);
	}

}