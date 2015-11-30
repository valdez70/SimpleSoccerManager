"use strict";
class Moveable extends Boundary{

constructor(xPos,yPos,_width,_length,field){
  super(xPos,yPos,_width,_length);
  this.direction;
  this.dx=0;
  this.dy=0;
  this.speed=_width/5;
  this.angle=0;
  this.field=field;
  this.sprite; 
  this.morale=1;
}



inContactWith(moveableObject){
 var bool= this.contains(moveableObject.xPos,moveableObject.yPos);
 bool=bool||this.contains(moveableObject.xPos+moveableObject._width,moveableObject.yPos);
 bool=bool||this.contains(moveableObject.xPos+moveableObject._width,moveableObject.yPos+moveableObject._length);
 bool=bool||this.contains(moveableObject.xPos,moveableObject.yPos+moveableObject._length);
 return bool;

}

moveTo(xval,yval){
  if(this.xPos!=xval||this.yPos!=yval){
    var angle=this.angleTo(xval,yval);
    this.angle=angle;
    this.moveAtAngle(angle);
    //console.log(dist(xval,yval,this.xPos,this.yPos))

  }
  else{
    this.stop();
  }
  


}

angleTo(xval,yval){
  var distX=xval-this.xPos;
  var distY=yval-this.yPos;
  var angle=atan2(distY,distX);
  return angle;

}

distanceTo(xval,yval){
  return dist(this.xPos,this.yPos,xval,yval);

}

isOutOfBounds(){
  return (this.xPos<this.field.xPos)||(this.xPos>this.field.xPos+this.field._width)||(this.yPos<this.field.yPos)||(this.yPos>this.field.yPos+this.field._length);
}

stop(){
  this.dx=0;
  this.dy=0;
}

moveForward(){
  this.dx=this.speed*this.direction*this.morale;
  this.dy=0;
}
moveBackward(){
  this.dx=-this.speed*this.direction*this.morale;
  this.dy=0;

}
moveLeft(){
  this.dy=-this.speed*this.morale;
  this.dx=0;
}
moveRight(){
  this.dy=this.speed*this.morale;
  this.dx=0;
}

moveAtAngle(angle){
  this.dx=cos(angle)*this.speed*this.morale;
  this.dy=sin(angle)*this.speed*this.morale;

}

updateMid(){
  this.midx=this.xPos+(this._width/2);
  this.midy=this.yPos+(this._length/2);
}

updatePosition(){
  this.xPos+=this.dx;
  this.yPos+=this.dy;

}


}