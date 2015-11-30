"use strict";

class FieldRegion extends Boundary{
	constructor(xPos, yPos, _width, _length,xname, yname,field){
		super(xPos, yPos, _width, _length);
		this.xname=xname;
		this.yname=yname;
		this.field=field;

	}

	animate(){
		super.animate(false);
		//do nothing

	}

	congestion(){
		var counter=0;
		for (var i = this.field.allPlayers.length - 1; i >= 0; i--) {
			if(this.containsPlayer(this.field.allPlayers[i])){
				counter++;

			}
		};
		return counter;

	}

	congestionWith(team){
		var counter=0;
		for (var i = team.players.length - 1; i >= 0; i--) {
			if(this.containsPlayer(team.players[i])){
				counter++;

			}
		};
		return counter;

	}

	containsPlayer(player){
		return this.contains(player.xPos,player.yPos);
	}

	
}