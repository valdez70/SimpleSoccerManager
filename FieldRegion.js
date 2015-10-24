"use strict";

class FieldRegion extends Boundary{
	constructor(xPos, yPos, _width, _length,xname, yname){
		super(xPos, yPos, _width, _length);
		this.xname=xname;
		this.yname=yname;

	}

	animate(){
		super.animate(false);
		//do nothing

	}

	
}