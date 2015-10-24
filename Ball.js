"use strict";

class Ball extends Moveable{
	constructor(xPos,yPos,width,length,field){
		super(xPos,yPos,width,length,field);


	}
	animate(){
		push();
		//rotate(this.angle);
		
		fill(255);
		rect(this.xPos,this.yPos,this._width,this._length);
		this.xPos+=this.dx;
		this.yPos+=this.dy;
		pop();
	}

}