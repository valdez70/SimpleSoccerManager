"use strict";
class Player extends Moveable{
	constructor(xPos,yPos,_width,_length,field,position,side,team) {
		super(xPos,yPos,_width,_length,field);
		
		
		this.field=field;
		this.leftlegLength;
		this.rightLegLength;

		this.keeperDirection=0; //create separate keeper class and move this there


		this.ball=this.field.ball;

		this.messages=[];
		this.kickSound;
		this.state="n/a";
		this.teammates=[];

		this.attackTendency;
		this.defendTendency;
		this.attackingRunAngle;
		this.oldPositionRating=0;
		this.attackingRunChoice=0;

		this.mostRecentPasses=[];
		this.numPasses=0;


		this.morale=1;




		this.team=team;

		this.defaultFieldRegionXIndex;
		this.defaultFieldRegionYIndex;
		this.side=side;
		if(side=="left"){
			this.direction=1;

		}
		else{
			this.direction=-1;
		}

		this.objectives=[];
		this.position=position;
		switch(position){
			case "K": //keeper
			this.attackTendency=0;
			this.defendTendency=1;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=0;

			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}


			break;
			case "LCB": //left center back
			var fieldRegionYindex_left=3;
			var fieldRegionXindex_left=2;
			this.attackTendency=0.1;
			this.defendTendency=0.95;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "CB": //center back
			this.attackTendency=0.1;
			this.defendTendency=0.95;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=2;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RCB": //right center back
			this.attackTendency=0.1;
			this.defendTendency=0.95;
			var fieldRegionYindex_left=5;
			var fieldRegionXindex_left=2;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RB": //right back
			this.attackTendency=0.3;
			this.defendTendency=0.95;
			var fieldRegionYindex_left=7;
			var fieldRegionXindex_left=2;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "LB": //left back
			this.attackTendency=0.3;
			this.defendTendency=0.95;
			var fieldRegionYindex_left=1;
			var fieldRegionXindex_left=2;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "DM": //defensive midfield
			this.attackTendency=0.6;
			this.defendTendency=0.7;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=3;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "CM": //center midfield
			this.attackTendency=0.7;
			this.defendTendency=0.5;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=4;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "LCM": //left center midfield
			this.attackTendency=0.7;
			this.defendTendency=0.5;
			var fieldRegionYindex_left=3;
			var fieldRegionXindex_left=4;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RCM": //right center midfield
			this.attackTendency=0.7;
			this.defendTendency=0.5;
			var fieldRegionYindex_left=5;
			var fieldRegionXindex_left=4;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "LM": //left midfield
			this.attackTendency=0.75;
			this.defendTendency=0.35;
			var fieldRegionYindex_left=1;
			var fieldRegionXindex_left=4;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RM": //right midfield
			this.attackTendency=0.75;
			this.defendTendency=0.35;
			var fieldRegionYindex_left=7;
			var fieldRegionXindex_left=4;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "AM": //right midfield
			this.attackTendency=0.9;
			this.defendTendency=0.3;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=5;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "LCF": //left center forward
			this.attackTendency=0.95;
			this.defendTendency=0.1;
			var fieldRegionYindex_left=3;
			var fieldRegionXindex_left=6;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RCF": //right center forward
			this.attackTendency=0.95;
			this.defendTendency=0.1;
			var fieldRegionYindex_left=5;
			var fieldRegionXindex_left=6;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "CF": //center forward
			this.attackTendency=0.95;
			this.defendTendency=0.1;
			var fieldRegionYindex_left=4;
			var fieldRegionXindex_left=6;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "LF": //left forward
			this.attackTendency=0.95;
			this.defendTendency=0.1;
			var fieldRegionYindex_left=3;
			var fieldRegionXindex_left=6;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;
			case "RF": //left forward
			this.attackTendency=0.95;
			this.defendTendency=0.1;
			var fieldRegionYindex_left=5;
			var fieldRegionXindex_left=6;
			if(side=="left"){
				this.defaultFieldRegionYIndex=fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=fieldRegionXindex_left

			}
			else{
				this.defaultFieldRegionYIndex=8-fieldRegionYindex_left;
				this.defaultFieldRegionXIndex=8-fieldRegionXindex_left;
			}
			break;

		}
		var defaultFieldRegionIndex=9*(this.defaultFieldRegionXIndex)+(this.defaultFieldRegionYIndex);
		this.defaultFieldRegion=field.fieldRegions[defaultFieldRegionIndex];
		// this.xPos=this.defaultFieldRegion.midx;
		// if(this.position!="K"){
		// 	this.xPos-=(this.field._width/4.5*this.direction);
		// }
		// else{
		// 	this.xPos-=(this.field._width/36*this.direction)
		// }
		// this.yPos=this.defaultFieldRegion.midy;
		this.xPos=this.field.midx;
		this.yPos=this.field.yPos+this.field._length;
		if (this.position!="K") {
			this.kickOffPositionX=this.defaultFieldRegion.midx-(this.field._width/4.5*this.direction);

		}
		else{
			this.kickOffPositionX=this.defaultFieldRegion.midx-(this.field._width/36*this.direction);

		}

		this.kickOffPositionY=this.defaultFieldRegion.midy;

		// this.xPos=this.field.xPos;
		// this.yPos=this.field.yPos;
		this.attackingPositionX=this.defaultFieldRegion.midx+(this.direction*this.field._width/6);
		this.defendingPositionX=this.defaultFieldRegion.midx-(this.field._width/6*this.direction);
		
	}


	animate(colors){
		this.updateMid();
		this.updatePosition();
		push();
		fill(colors[0],colors[1],colors[2]);
		ellipse(this.xPos,this.yPos,this._length,this._length);
		fill(0);
		ellipse(this.xPos,this.yPos,this._length/2,this._length/2);	
		pop();
		if (this.isOutOfBounds()) {
			this.moveToDefaultPosition();
		};

	}



	changeVelocity(dx,dy){
		this.dx=dx;
		this.dy=dy;

	}


	passTo(player){

		if(this.hasBall()){
			this.messageTeammate("neutral", player);
			this.messageTeammatesWithException("n/a",[player]);
			this.setState("n/a");
			this.updateRecentPasses(player);



			var x=player.xPos;
			var y=player.yPos;
		//player.wait();
		this.ball.moveTo(x,y);
		//console.log("has ball");
		
		

	}
	if (player.distanceToBall()<2*this._width) {
		player.chaseBall();
	};
	if(player.hasBall()){
		this.ball.dx=player.dx;
		this.ball.dy=player.dy;
		player.setState("n/a");

	}

}

hasBall(){
	//return true;
	return this.inContactWith(this.ball);
}

shoot(){
	//add distance error
	//add angle difficulty
	//add hitting off the bar
	this.messageTeammates("n/a");
	if(this.hasBall()){
		this.kickSound.play();
		var randomPosY=random(-this.field.rightPost._length/2,this.field.rightPost._length/2);
		var distanceToGoal=this.distanceToGoal();
		distanceToGoal=map(distanceToGoal,0,this.field._width,1,3);
		if(this.side=="left"){
			
			
			this.ball.moveTo(this.field.rightPost.midx,this.field.rightPost.midy+randomPosY*distanceToGoal);
		}
		else{
			this.ball.moveTo(this.field.leftPost.midx,this.field.leftPost.midy+randomPosY*distanceToGoal);

		}

	}

}


dribble(){
	if (this.hasBall()) {
		//sort out orientation
		this.ball.dx=this.dx;
		this.ball.dy=this.dy;
		this.moveForward();
	};

}

mark(player){
	if (this.distanceToPlayer(player)>this.field._width/36) {
		this.moveTo(player.xPos,player.yPos);
		console.log(this.distanceToPlayer(player),this.field._width/36);

	}
	

}

support(player){

}

chaseBall(){
	if(!this.hasBall()){
		this.moveTo(this.ball.xPos,this.ball.yPos);

	}
	else{
		this.dx=0;
		this.dy=0;
	}
	

}
distanceToBall(){
	return super.distanceTo(this.ball.xPos,this.ball.yPos);

}
distanceToDefaultPosition(){
	return super.distanceTo(this.defaultFieldRegion.xPos,this.defaultFieldRegion.yPos);

}

distanceToPlayer(player){
	return super.distanceTo(player.xPos,player.yPos);
}

moveToDefaultPosition(){
	this.moveTo(this.defaultFieldRegion.midx,this.defaultFieldRegion.midy);
}

setInDefaultPosition(){
	//this.moveTo(this.defaultFieldRegion.midx,this.defaultFieldRegion.midy);
	this.xPos=this.defaultFieldRegion.midx;
	this.yPos=this.defaultFieldRegion.midy;
	this.stop();
}

moveToDefensivePosition(){
	var defendProbability=random(0,1);
	if (defendProbability>this.defendTendency){
		this.stop();
	}
	else{
		if (this.position=="K") {
			if (this.team.ballIsInTeamThird()) {
				this.keeperMovement();

			}else{
				this.stopAtDefaultRegion();
			}

		};
		if (!this.isBehindBall()) {
			if (this.xPos*this.direction>(this.defaultFieldRegion.midx-this.field._width/6*this.direction)*this.direction) {
				if (this.position!="K") {
					this.moveBackward();
				}
				else{
					this.stop();
				}
			}
			else{
				if (this.position=="CB"||this.position=="RCB"||this.position=="LCB"||this.position=="LB"||this.position=="RB") {
					this.moveBackward();
				}
				else{
					if (this.position=="K") {
						this.keeperMovement();
					}
					else{
						this.stop();
					}
				}

			}

		}
		else{
			if (this.position!="K") {
				this.moveTo(this.defaultFieldRegion.midx-this.field._width/6*this.direction, this.defaultFieldRegion.midy);	
			};

		}
	}

}

moveToAttackingPosition(){
	var attackProbability=random(0,1);
	if (this.position=="K") {
		this.stopAtDefaultRegion();
	}
	else if (attackProbability<this.attackTendency) {
			if (this.isBehindBall()) {
				this.stopAtAttackingPosition();	
			}
			else{
				this.stopAtDefaultRegion();
				}
	}
}

isBehindAttackingPosition(){
	return this.xPos*this.direction<(this.defaultFieldRegion.midx+(this.direction*this.field._width/6))*this.direction;
}

isOutOfDefensivePosition(){
	return this.direction*this.xPos>this.direction*this.defaultFieldRegion.midx-(this.field._width/18*this.direction);

}

isBehindBall(){
	return this.direction*(this.xPos)<this.direction*(this.ball.xPos);

}



messageTeammate(newState,player){
	player.setState(newState);

}

processMessages(){
	

}


moveTo(xval,yval){

	if (this.state=="neutral") {
		this.stop();
	}
	else{
		if(this.distanceTo(xval,yval)>this._width){

			super.moveTo(xval,yval);		

		}
		else{
			this.stop();
		}

	}

	

}

moveToRegion(fieldRegion){
	this.moveTo(fieldRegion.midx,fieldRegion.midy);

}



bestFieldRegionChoice(){
	var bestChoice=this.field.fieldRegions[0];
	for (var i = this.field.fieldRegions.length - 1; i >= 0; i--) {
		if (bestChoice.congestion()>this.field.fieldRegions[i].congestion()) {
			bestChoice=this.field.fieldRegions[i];
		};
		
	};
	return bestChoice;
}

setState(newState){
	this.state=newState;

}

messageTeammates(newState){
	for (var i = this.teammates.length - 1; i >= 0; i--) {
		//if (numOccurencesInArray(this.teammates[i],exceptions)==0) {
			this.teammates[i].setState(newState);

		//};
		
	};

}


messageTeammatesWithException(newState,exceptions){
	for (var i = this.teammates.length - 1; i >= 0; i--) {
		if (numOccurencesInArray(this.teammates[i],exceptions)==0) {
			this.teammates[i].setState(newState);

		};
		
	};

}

getAttackingPositionRating(){
	var currRegion=this.currentFieldRegion();
	var rating=50;
	if (currRegion!=1) {
		rating=rating-10*currRegion.congestionWith(this.team.opposition);
		rating=rating-2.5*currRegion.congestion();
		var distanceToGoal=this.distanceToGoal();
		if (distanceToGoal>this.field._width/3) {
			var availableSupport=this.getAvailableAttackingSupport();
			var availableSupportCoeff;
			if (availableSupport>this.teammates.length/2) {
				availableSupportCoeff=map(availableSupport,this.teammates.length/2,this.teammates.length,0,-50);
			}
			else{
				availableSupportCoeff=map(availableSupport,0,this.teammates.length/2,-50,0);
			}
			rating+=availableSupportCoeff;

		};
		var teamFocus=this.team.nearestPlayerToBall();

		if (this!=teamFocus) {
			var numPassesFromFocus=this.numRecentPassesFrom(teamFocus);
			rating-=10*numPassesFromFocus;

		};

		var distanceToGoalCoeff2=map(distanceToGoal,0,this.field._width,0,50);
		rating=rating-distanceToGoalCoeff2;
		var ballXDistance=this.xPos*this.direction-this.ball.xPos*this.direction;
		var defaultPositionDistance=this.distanceToRegion(this.defaultFieldRegion);
		defaultPositionDistance=map(defaultPositionDistance,0,this.field._width,0,10);
		rating=rating-defaultPositionDistance;
		ballXDistance=map(ballXDistance,-this.field._width,this.field._width,-50,50);
		rating=rating+ballXDistance;
		rating=rating+(1-this.oppositionInterceptionProbability()*50);
		var distanceToBall=this.distanceToBall();

		if (distanceToBall<5*this._width) {
			distanceToBall=map(distanceToBall,0,2*this._width,-200,-50);
			rating+=distanceToBall;

		};
		if (this!=this.team.focusPlayer()) {

			var distanceToFocusPlayer=this.distanceToPlayer(this.team.focusPlayer());
			if (distanceToFocusPlayer<3*this._width) {
				distanceToFocusPlayer=map(distanceToFocusPlayer,0,3*this._width,-200,0);
				rating+=distanceToFocusPlayer;

			};
			
		};

		return rating;


		
	};
	return 0;

}

currentFieldRegion(){
	for (var i = this.field.fieldRegions.length - 1; i >= 0; i--) {
		if(this.field.fieldRegions[i].containsPlayer(this)){
			return this.field.fieldRegions[i];
		};
	};
	return 1;

}

oppositionInterceptionProbability(){
	var angleToBall=this.angleToBall();
	var distanceToBall=this.distanceToBall();
	var probability=0;
	for (var i = this.team.opposition.players.length - 1; i >= 0; i--) {
		var angleI=this.team.opposition.players[i].angleToBall();
		var distI=this.team.opposition.players[i].distanceToBall();

		if (angleI<0.95*angleToBall&&angleI<1.05*angleToBall&&distI<distanceToBall) {
			probability++;
		};

		
	};
	return probability/this.team.opposition.players.length;

}

angleToPlayer(player){
	return super.angleTo(player.xPos,player.yPos)
}

angleToBall(){
	return super.angleTo(this.ball.xPos,this.ball.yPos);
}

findBestPositionedPlayer(){
	var bestChoice=this.teammates[0];
	for (var i = this.teammates.length - 1; i >= 0; i--) {
		if(this.teammates[i].getAttackingPositionRating()>bestChoice.getAttackingPositionRating()){
			bestChoice=this.teammates[i];
		}
	};
	return bestChoice;
}


distanceToGoal(){
	return super.distanceTo(this.team.opposition.post.xPos,this.team.opposition.post.yPos);
}

distanceToRegion(region){
	return super.distanceTo(region.midx,region.midy);

}

choiceInPossession(){

	if (this.probabilityPass()>=max(this.probabilityDribble(),this.probabilityShoot())) {
		this.passTo(this.findBestPositionedPlayer())
	}
	else if(this.probabilityShoot()>=max(this.probabilityPass(),this.probabilityDribble())){
		this.shoot();
	}
	else{
		this.dribble();
	}



}

probabilityShoot(){
	var distanceToGoal=this.distanceToGoal();
	var obstruction=this.numOpponentsObstruction();
	if (distanceToGoal<this.field._width/5) {
		return 0.9;
	};
	var maxDistance=(this.field._width*this.field._width)+(this.field._length*this.field._length);
	maxDistance=sqrt(maxDistance);
	var probability=map(distanceToGoal,0,maxDistance,0,0.8);
	if (obstruction>6) {
		probability+=0.2;
	};
	
	return (1-probability);}
	probabilityPass(){
		var bestChoiceRating=this.findBestPositionedPlayer().getAttackingPositionRating();
		bestChoiceRating=map(bestChoiceRating,-70,50,0,1);
		return bestChoiceRating;
	}
	probabilityDribble(){

		return 1-(this.probabilityPass()+this.probabilityShoot())/2;
	}

	isColliding(){
		var bool=false;

		for (var i = this.field.allPlayers.length - 1; i >= 0; i--) {
			bool=bool||this.inContactWith(this.field.allPlayers[i])&&this.field.allPlayers[i]!=this;
		};
		return bool;
	}

	spread(){
		this.dx=this.direction;
	}

	moveToKickOffPosition(){

		if (!this.isInKickOffPosition()) {
			this.moveTo(this.kickOffPositionX,this.kickOffPositionY);
		}
		else{
			this.stop();
		}

	}

	isInKickOffPosition(){
		return this.distanceTo(this.kickOffPositionX,this.kickOffPositionY)<this._width;
	}

	isInDefaultPosition(){
		return this.distanceTo(this.defaultFieldRegion.midx,this.defaultFieldRegion.midy)<this._width;
	}


	keeperMovement(){
		
		if (this.keeperDirection==0) {
			this.moveLeft();
		}
		else{
			this.moveRight();
		}
		if (this.yPos>=this.team.post.yPos+this.team.post._length) {
			this.keeperDirection=0;
		}
		else if (this.yPos<=this.team.post.yPos) {
			this.keeperDirection=1;
		}
		

	}

	passToBestOption(){
		this.passTo(this.findBestPositionedPlayer());

	}

	updateRecentPasses(player){
		this.numPasses++;
		if (this.numPasses<5) {
			this.mostRecentPasses.push(player);
		}
		else{
			this.mostRecentPasses[this.numPasses%5]=player;
		}

		
	}

	getAvailableAttackingSupport(){
		var support=0;
		for (var i = this.teammates.length - 1; i >= 0; i--) {
			if (this.teammates[i].isAheadOfPlayer(this)) {
				support++;
			};
			
		};
		return support;
	}

	isAheadOfPlayer(player){
		return this.xPos*this.direction>player.xPos*player.direction;
	}

	numOpponentsObstruction(){
		var obstruction=0;
		for (var i = this.team.opposition.players.length - 1; i >= 0; i--) {
			if(!this.isAheadOfPlayer(this.team.opposition.players[i])){
				obstruction++;
			}
		};
		return obstruction;
	}

	numRecentPassesFrom(player){
		return numOccurencesInArray(this,player.mostRecentPasses);
	}

	moveLeft(){
		if (this.state!="neutral") {
			super.moveLeft();
		}
		else{
			this.stop();
		}

	}

	moveRight(){
		if (this.state!="neutral") {
			super.moveRight();
		}
		else{
			this.stop();
		}

	}

	moveBackward(){
		if (this.state!="neutral") {
			super.moveBackward();
		}
		else{
			this.stop();
		}

	}

	moveForward(){
		if (this.state!="neutral") {
			super.moveForward();
		}
		else{
			this.stop();
		}

	}

	inContactWith(moveable){
		return this.distanceTo(moveable.xPos,moveable.yPos)<this._length;
	}

	stopAtDefaultRegion(){
		if (this.distanceToRegion(this.defaultFieldRegion)>this._width) {
			this.moveToRegion(this.defaultFieldRegion);

		}
		else{
			this.stop();

		}

	}

	stopAtDefensivePosition(){

	}

	stopAtAttackingPosition(){
		if (this.isBehindAttackingPosition()) {
			this.moveForward();
		}
		else{
			this.stop();
		}
		}

	


}

function numOccurencesInArray(val, array){
	var count=0;
	for (var i = array.length - 1; i >= 0; i--) {
		if(array[i]==val){
			count++;
		}
	};
	return count;

}