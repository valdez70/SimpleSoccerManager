"use strict";
class Team{
	constructor(formation,field,name,side,colors,post){
		//this.formation=formation;
		this.field=field;
		this.ball=this.field.ball;
		this.nm=name;
		this.side=side;
		this.players=[];
		this.colors=colors;
		this.subs=["K","CB","LB","RM","CM","LF","CF"];
		this.score=0;
		this.focusPlayer;
		this.post=post;
		this.mindset="";

		this.opposition;

		this.mode;
		this.state="";
		this.mentality;
		this.objectives=[];
		this.formation=formation;
		for(var i=0; i<11; i++){
			//var newPlayer=new Player(field.xPos,field.yPos,field._length/50,field._width50, field,formation.getRoles()[i],side);
			var newPlayer=new Player(field.xPos,field.yPos,field._length/50,field._width/50, field,formation.getRoles()[i],side,this);
			this.players.push(newPlayer);
			//this.players[i]=newPlayer;

		}
		for (var i = this.players.length - 1; i >= 0; i--) {
			var teammates=[];
			for (var j = this.players.length - 1; j >= 0; j--) {
				if(this.players[i]!=this.players[j]){
					teammates.push(this.players[j]);
				}

			};
			this.players[i].teammates=teammates;
		};

		
		//createFormation(formation);

		for (var i = this.subs.length - 1; i >= 0; i--) {
			this.subs[i]=new Player(field.xPos,field.yPos,field._width/50,field._width/50, field,this.subs[i],side,this);
		}

	}
	animate(){
		for (var i = this.players.length - 1; i >= 0; i--) {
			this.players[i].animate(this.colors);
		};
		for (var i = this.subs.length - 1; i >= 0; i--) {
			//subs[i].animate(this.colors);
		};
		this.executeObjective();

	}
	press(){
		var nearestPlayer=this.nearestPlayerToBall();
		nearestPlayer.chaseBall();
		//nearestPlayer.mark(this.players[10]);
		//nearestPlayer.dx+=1;

	}
	defend(){
		this.mindset="defending";
		if (this.inPossession()) {
			//if (this.mode=="computer") {
				this.attack();

			//}
			
		}
		else{
			for (var i = this.players.length - 1; i >= 0; i--) {

				if (this.nearestPlayerToBall()!=this.players[i]) {
					this.players[i].moveToDefensivePosition();
				}
				else{
					if (this.players[i].position!="K") {
						this.players[i].chaseBall();

					};

					
				}
				
			};
		}
		
	


	}
	attack(){
		this.mindset="attacking";
		if (this.oppositionInPossesion()) {
			//if (this.mode=="computer") {
				this.defend();

			//};
			
		}
		else{
			if (this.focusPlayer()!=1) {
		
			this.focusPlayer().choiceInPossession();
			
		};

		for (var i = this.players.length - 1; i >= 0; i--) {
			if(this.focusPlayer()!=this.players[i]){
				this.players[i].moveToAttackingPosition()}
		};

		}
		

		
	
		}

	nearestPlayerToBall(){
		var nearestPlayer=this.players[0];
		for (var i = this.players.length - 1; i >= 0; i--) {
			if(this.players[i].distanceToBall()<nearestPlayer.distanceToBall()){
				nearestPlayer=this.players[i];

			}
			
		};
		
		return nearestPlayer;
	}

	executeObjective(){

		if (this.state=="play") {

			if(this.objectives.indexOf("attack")!==-1){
				this.attack();

			}

			else if(this.objectives.indexOf("defend")!==-1){
				this.defend();

			}

		}
		if (this.state=="kickoff") {
			this.moveToKickOffPosition();
		}
		if (this.state=="owngoalkick") {
			this.moveToKickOffPosition();
		}
		if (this.state=="owncorner") {
			this.moveToKickOffPosition();
		}
		if (this.state=="oppgoalkick") {
			this.moveToKickOffPosition();
		}
		if (this.state=="oppcorner") {
			this.moveToKickOffPosition();
		}
		if (this.state=="ownthrowing") {
			//this.moveToKickOffPosition();
			this.doThrowing()
		};
		if (this.state=="oppthrowing") {
			//this.moveToKickOffPosition();
			this.stop();
		};

		if (this.state=="neutral") {
			this.stop();
		};








	}
	changeFormation(newFormation){
		//needs to be changed
		this.formation=newFormation;
		for(var i=0; i<11; i++){
			var newPlayer=new Player(field.xPos,field.yPos,field._width/50,field._length/50,field,newFormation.getRoles()[i],side,this);
			this.players.push(newPlayer);
		}

	}

	hasBall(){
		var bool=false;
		for (var i = this.players.length - 1; i >= 0; i--) {
			bool=bool||this.players[i].hasBall();

		};
		return bool;
	}


	focusPlayer(){
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (this.players[i].hasBall()) {
				return this.players[i];
			};
			
		};
		return 1;
	}

	oppositionhasBall(){
		return this.opposition.hasBall();
	}

	oppositionInPossesion(){
		return (this.oppositionhasBall()||(this.field.lastPlayerInPossesion.side==this.opposition.side))&&!this.hasBall();

	}

	inPossession(){
		return (this.hasBall()||(this.field.lastPlayerInPossesion.side==this.side))&&!this.oppositionhasBall();
	}

	ballIsInTeamThird(){
		
			return this.ball.distanceTo(this.post.xPos,this.post.yPos)<this.field._width/3;
				
	}
	spread(){
		for (var i = this.players.length - 1; i >= 0; i--) {
			this.players[i].spread();
		};
	}

	setState(newstate){
		this.state=newstate;

	}

	stop(){
		for (var i = this.players.length - 1; i >= 0; i--) {
			this.players[i].stop();
		};
	}

   moveToKickOffPosition(){
   	
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		this.players[i].moveToKickOffPosition();
   	};
   }

   moveToAttackingRegions(){
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		this.players[i].moveToDefaultPosition();
   	};
   }

   isInKickOffPosition(){
   	var bool=true;
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		bool=bool&&this.players[i].isInKickOffPosition();
   		
   			
   	};

   	return bool;

   }
   doThrowing(){
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		if(this.players[i]!=this.nearestPlayerToBall()){
   			this.stop();

   		}
   		else{
   			this.nearestPlayerToBall().chaseBall();
   		}
   	};
   }
   isReadyForThrowing(){
   	if (this.state=="ownthrowing"&&this.hasBall()) {
   		return true;

   	};
   }
   isReadyForGoalKick(){
   	var bool=true
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		bool=bool&&this.players[i].isInDefaultPosition();
   	};
   }

   changeTeamMorale(newMorale){
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		this.players[i].morale=newMorale;
   	};
   }

   incrementTeamMorale(increment){
   	for (var i = this.players.length - 1; i >= 0; i--) {
   		this.players[i].morale+=increment;
   	};

   }	
}