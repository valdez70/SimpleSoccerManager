"use strict";
class Game{
	constructor(){
		this.field=new Field(width/5,height/5,3*width/5,3*height/5);
		this.ball=this.field.ball;
		this.teamA=this.field.teamA;
		this.teamB=this.field.teamB;

	}
	animate(){
		this.field.animate();
		//this.teamA.attack();
		this.teamA.defend();

	}

	

}