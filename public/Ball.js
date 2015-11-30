"use strict";

class Ball extends Moveable{
	constructor(xPos,yPos,width,length,field){
		super(xPos,yPos,width,length,field);
		this.speed=this._width/2;
		this.velocity=[];


	}
	animate(){
		push();
		//rotate(this.angle);

		fill(255);
		ellipse(this.xPos,this.yPos,this._width,this._length);
		this.updatePosition();
		pop();
	}

	storeVelocity(){
		this.velocity[0]=this.dx;
		this.velocity[1]=this.dy;

	}
	moveWithStoredVelocity(){
		this.dx=this.velocity[0];
		this.dy=this.velocity[1];
	}
	

}