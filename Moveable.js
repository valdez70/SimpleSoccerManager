"use strict";
class Moveable extends Boundary{

constructor(xPos,yPos,_width,_length,field){
  super(xPos,yPos,_width,_length);
  this.dx=0;
  this.dy=0;
  this.speed=2;
  this.angle=0;
  this.field=field;
  this.sprite; 
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
    this.dx=cos(angle)*this.speed;
    this.dy=sin(angle)*this.speed;
    //console.log(dist(xval,yval,this.xPos,this.yPos))

  }
  else{
    this.dx=0;
    this.dy=0;
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

}