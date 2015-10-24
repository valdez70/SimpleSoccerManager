"use strict";

class Boundary{
	constructor(xPos, yPos, _width, _length){
	this.xPos=xPos;
	this.yPos=yPos;
	this._width=_width;
	this._length=_length;
	this.midx=xPos+(_width/2);
	this.midy=yPos+(_length/2);
}
	contains(xval,yval){
		
		return (xval>this.xPos)&&(xval<this.xPos+this._width)&&(yval>this.yPos)&&(yval<this.yPos+this._length);
		

	}
	animate(fillBool, strokeVal){
		push();
		if(fillBool){
			fill(255);
		}
		else{
			noFill();
			strokeWeight(strokeVal);
			stroke(255);
		}
		
		rect(this.xPos, this.yPos, this._width, this._length);
		this.midx=this.xPos+(this._width/2);
		this.midy=this.yPos+(this._length/2);
		pop();
	}

}




