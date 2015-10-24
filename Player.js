"use strict";
var oldTime=0;
var timeCounter=0;

class Player extends Moveable{
	constructor(xPos,yPos,_width,_length,field,position,side) {
		super(xPos,yPos,_width,_length,field);
		
		
		this.field=field;
		this.leftlegLength;
		this.rightLegLength;

		this.ball=this.field.ball;

		

		this.defaultFieldRegionXIndex;
		this.defaultFieldRegionYIndex;
		this.side=side;

		this.objectives=[];
		this.position=position;
		switch(position){
			case "K": //keeper
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
		this.xPos=this.defaultFieldRegion.midx;
		this.yPos=this.defaultFieldRegion.midy;
		// this.xPos=this.field.xPos;
		// this.yPos=this.field.yPos;
		
	}


	animate(colors){
		var time=millis();

		timeCounter=timeCounter+((time-oldTime)/1000);
		this.executeObjective();


		this.xPos+=this.dx;
		this.yPos+=this.dy;


		push();
		//rectMode(CENTER);
		fill(colors[0],colors[1],colors[2]);
		//fill(255,255,0);
		rect(this.xPos,this.yPos,this._width,this._length);
		fill(0);
		rect(this.xPos+this._width/4,this.yPos+this._length/4,this._width/2,this._length/2);
	//ellipse(,2*this._width/5,2*this._length/5);
	

	//legs
	

	if(timeCounter<2){
		var leftLegLength=timeCounter*this._width/5*abs(this.dx);
		var rightLegLength=(2-timeCounter)*this._width/8*abs(this.dx);
		//add eight legs

		fill(0);
		rect(this.xPos+this._width,this.yPos,leftLegLength,this._length/2.5);
		rect(this.xPos+this._width,this.yPos+3*this._length/5,rightLegLength,this._length/2.5);

	}

	else{
		
		timeCounter=0;
		oldTime=time;

		



	}
	
	pop();
	
	
}

changeVelocity(dx,dy){
	this.dx=dx;
	this.dy=dy;

}

executeObjective(){
	if (this.objectives.indexOf("up")!==-1){
		this.dx=1;
		this.dy=0;

	}
	else if(this.objectives.indexOf("down")!==-1){
		this.dx=-1;
		this.dy=0;

	}

	else if(this.objectives.indexOf("left")!==-1){
		this.dx=0;
		this.dy=-1;

	}

	else if(this.objectives.indexOf("right")!==-1){
		this.dx=0;
		this.dy=1;

	}

	else if(this.objectives.indexOf("chase")!==-1){
		this.chaseBall(this.field.ball);

	}
	
	else if(this.objectives.indexOf("attack")!==-1){
		if(this.side=="left"){
			this.dx=1;


		}
		else{
			this.dx=-1;

		}
		
		this.dribble(this.field.ball);

	}

	else if(this.objectives.indexOf("Pass")!==-1){
		this.passTo(this.field.player,this.field.ball);

	}

	else if(this.objectives.indexOf("move")!==-1){
		//this.passTo(this.field.player,this.field.ball);
		this.field.player.dx=-1;


	}
	


}

passTo(player){
	if(this.hasBall()){
		var x=player.xPos;
		var y=player.yPos;
		//player.wait();
		this.ball.moveTo(x,y);
		console.log("has ball");

	}
	if(player.hasBall()){
		this.ball.dx=player.dx;
		this.ball.dy=player.dy;

	}

}

hasBall(){
	//return true;
	return super.inContactWith(this.ball);
}

shoot(){
	//add distance error
	//add angle difficulty
	//add hitting off the bar
	if(this.hasBall()){
		if(this.side=="left"){
			this.ball.moveTo(this.field.rightPost.midx,this.field.rightPost.midy);
		}
		else{
			this.ball.moveTo(this.field.leftPost.midx,this.field.leftPost.midy);

		}

	}

}


dribble(){
	if (this.hasBall()) {
		//sort out orientation
		this.ball.dx=this.dx;
		this.ball.dy=this.dy;
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

distanceToPlayer(player){
	return super.distanceTo(player.xPos,player.yPos);
}

moveToDefaultPosition(){
	this.moveTo(this.defaultFieldRegion.midx,this.defaultFieldRegion.midy);
}

moveToDefensivePosition(){
	if (this.position!="K") {
		this.moveTo(this.defaultFieldRegion.midx-this.field._width/18,this.defaultFieldRegion.midy);
	};
}


}
