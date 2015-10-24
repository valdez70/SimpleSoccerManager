"use strict";
class Field {
	constructor(xPos,yPos,_width,_length){
		this.xPos=xPos;
		this.yPos=yPos;
		this._length=_length;
	 	this._width=_width;
	 	this.margin=_length/100;
	 	
	 	

	 	


	 	this.midx=xPos+_width/2;
	 	this.midy=yPos+_length/2;
	 	this.centrecircle_size=int(this._width/5);

	 	this.postLength=_length/5;
	 	this.postWidth=_width/100;
	 	this.leftPost=new Boundary(xPos+this.margin,yPos+((_length-(this.postLength))/2),this.postWidth,this.postLength);
	 	this.rightPost=new Boundary(xPos+_width-(this.margin+this.postWidth),yPos+(_length-(this.postLength))/2,this.postWidth,this.postLength);

	 	this.box18Width=_width/6;
	 	this.box18Length=_length/1.7;
	 	this.leftBox18=new Boundary(xPos+this.margin,yPos+(_length-this.box18Length)/2,this.box18Width,this.box18Length);
	 	this.rightBox18=new Boundary(xPos+_width-(this.margin+this.box18Width),yPos+(_length-this.box18Length)/2,this.box18Width,this.box18Length);

	 	this.box6Width=_width/20;
	 	this.box6Length=_length/3.8;
	 	this.leftBox6=new Boundary(xPos+this.margin,yPos+(_length-this.box6Length)/2,this.box6Width,this.box6Length);
	 	this.rightBox6=new Boundary(xPos+_width-(this.margin+this.box6Width),yPos+(_length-this.box6Length)/2,this.box6Width,this.box6Length);

	 	this.fieldRegions=new Array();
	 	this.createFieldRegions();

	
	 	this.ball=new Ball(xPos, yPos,_width/100, _width/100,this);
	 	

	 	this.teamA=new Team(new Formation(new Array(4,3,3)),this,"A","left",new Array(255,255,0));
	 	this.teamB=new Team(new Formation(new Array(3,5,2)),this,"B","right",new Array(255,0,0));


	}
 	


 	animate(){

 		this.createField();
 		this.createCenterLine();
 		this.createCenterCircle();	
 		this.createFieldMargin();
 		this.createPosts(); 
 		this.createBoxes();
 		//this.player.animate();
 		//this.player2.animate();
 		this.teamA.animate();
 		this.teamB.animate();
 		this.ball.animate();

 		
 		
 		for(var i=0; i<81; i++){
 			this.fieldRegions[i].animate();
 		}

	}

	createField(){
		push();
		fill(30,200,30);
 		rect(this.xPos,this.yPos,this._width,this._length);
 		pop();

	}

	createCenterLine(){
		push();
		fill(255);
		rect(this.midx-this.margin/2,this.yPos,this.margin,this._length);
		pop();

	}

	createCenterCircle(){
		push();
		stroke(255);
		strokeWeight(this.margin);
		noFill();
	    ellipse(this.midx,this.midy,this.centrecircle_size,this.centrecircle_size);
	    fill(255);
	    ellipse(this.midx,this.midy, this.centrecircle_size/100, this.centrecircle_size/100);
		pop();

	}
	createPosts(){
		push();
		this.leftPost.animate(true);
		this.rightPost.animate(true);		
		pop();

	}

	createFieldMargin(){
		push();
		stroke(255);
		strokeWeight(this.margin);
		noFill();
    	rect(this.xPos,this.yPos,this._width,this._length);

		pop();
	}

	createBoxes(){
		push();
		this.leftBox6.animate(false, this.margin);
		this.rightBox6.animate(false, this.margin);
		this.leftBox18.animate(false, this.margin);
		this.rightBox18.animate(false, this.margin);
		pop();
	}

	createFieldRegions(){
		var fieldRegionxPos=this.xPos+this.margin;
		var fieldRegionyPos=this.yPos+this.margin;
		var fieldRegionLength=(this._length-(2*this.margin))/9;
		var fieldRegionWidth=(this._width-(2*this.margin))/9;

		var xIndexBase9=0;
		var yIndexBase9=0;

	 	for(var i=0; i<81; i++){
	 		// var xIndexBase8=(fieldRegionxPos-this.xPos)/8;
	 		// var yIndexBase8=(fieldRegionyPos-this.yPos)/8;

	 		var newFieldRegion= new FieldRegion(fieldRegionxPos,fieldRegionyPos,fieldRegionWidth,fieldRegionLength,xIndexBase9,yIndexBase9);
	 		this.fieldRegions.push(newFieldRegion);
	 		//console.log(newFieldRegion);

	 		if(yIndexBase9<8){
	 			yIndexBase9++;
	 			fieldRegionyPos+=fieldRegionLength;

	 		}
	 		else{
	 			yIndexBase9=0;
	 			fieldRegionyPos=this.yPos;
	 			fieldRegionxPos+=fieldRegionWidth;
	 			xIndexBase9++;
	 		}
	 		


	 	}
	 	//console.log(this.fieldRegions);
	}
 }