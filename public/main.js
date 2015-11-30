$("#selectTeam").click(function () {
	$(".selectTeam").width("100%");
	$('#selectTeam').hide();
	// $('#selectFormation').hide();
	// $('#learnCommands').hide();
	// $('#callToAction').hide();
	
	
	// $().hide();


	// body...
})

function getTeamPlayers(teamCode){
	 var soccerAPIURL='http://api.football-data.org/v1/teams/'+teamCode+'/players';
	 console.log("yo");
	$.ajax({
  		headers: { 'X-Auth-Token': 'ce9c0231018b49bbb409699476f2b638' },
  		url: soccerAPIURL,
  		dataType: 'json',
  		type: 'GET',
  		error: function(data){
  			console.log("error");
  			console.log(data);
  		},
  		success: function(data){
  			console.log(data);
  		}
		})
	}

