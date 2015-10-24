"use strict";
class Team{
	constructor(formation,field,name,side,colors){
		//this.formation=formation;
		this.field=field;
		this.ball=this.field.ball;
		this.nm=name;
		this.side=side;
		this.players=[];
		this.colors=colors;
		this.subs=["K","CB","LB","RM","CM","LF","CF"];
		this.score=0;

		this.state;
		this.mentality;
		this.objectives=[];
		this.formation=formation;
		for(var i=0; i<11; i++){
			var newPlayer=new Player(field.xPos,field.yPos,field._width/50,field._width/50, field,formation.getRoles()[i],side);
			this.players.push(newPlayer);
			//this.players[i]=newPlayer;

		}

		
		//createFormation(formation);

		for (var i = this.subs.length - 1; i >= 0; i--) {
			this.subs[i]=new Player(field.xPos,field.yPos,field._width/50,field._width/50, field,this.subs[i],side);
		}

	}
	animate(){
		for (var i = this.players.length - 1; i >= 0; i--) {
			this.players[i].animate(this.colors);
		};
		for (var i = this.subs.length - 1; i >= 0; i--) {
			//subs[i].animate(this.colors);
		};

	}
	press(){
		var nearestPlayer=this.nearestPlayerToBall();
		nearestPlayer.chaseBall();
		//nearestPlayer.mark(this.players[10]);
		//nearestPlayer.dx+=1;

	}
	defend(){
		var nearestPlayer=this.nearestPlayerToBall();
		nearestPlayer.chaseBall();
		for (var i = this.players.length - 1; i >= 0; i--) {
			if (nearestPlayer!=this.players[i]&&this.players[i].position!="K") {
				this.players[i].moveToDefensivePosition();
			};
			
		};

	}
	attack(){

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



		if(this.objectives.indexOf("attack")!==-1){
			this.attack();

		}





	}
	changeFormation(newFormation){
		this.formation=newFormation;
		for(var i=0; i<11; i++){
			var newPlayer=new Player(field.xPos,field.yPos,field._width/50,field._width/50, field,newFormation.getRoles()[i],side);
			this.players.push(newPlayer);
		}

	}
}