"use strict";

class Formation{

	constructor(roles){
		this.roles=["K"];
		var numPlayers=0;
		for (var i = roles.length - 1; i >= 0; i--) {
			numPlayers+=roles[i]
		};
		if(roles.length==3 &&numPlayers==10){
			switch(roles[0]){
				case 4:
					this.roles.push("RCB");
					this.roles.push("LCB");
					this.roles.push("RB");
					this.roles.push("LB");
					break;
				case 3:
					this.roles.push("RCB");
					this.roles.push("CB");
					this.roles.push("LCB");
					break;
				}
			switch(roles[1]){
				case 4:
					this.roles.push("LCM");
					this.roles.push("RCM");
					this.roles.push("LM");
					this.roles.push("RM");
					break;
				case 3:
					this.roles.push("RCM");
					this.roles.push("CM");
					this.roles.push("LCM");
					break;
				case 5:
					this.roles.push("RCM");
					this.roles.push("AM");
					this.roles.push("LCM");
					this.roles.push("LM");
					this.roles.push("RM");
					break;

			}
			switch(roles[2]){
				case 2:
					this.roles.push("LCF");
					this.roles.push("RCF");
					break;
				case 3:
					this.roles.push("LF");
					this.roles.push("CF");
					this.roles.push("RF");
					break;
				case 1:
					this.roles.push("CF");
					break;


			}		
				

			
			
			
			

		}
		

	}
	getRoles(){
		return this.roles;

	}

}