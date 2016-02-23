movieScript = function(){

	var movieData = "http://test.frontendhero.nl/movie-challenge/movies.json";
	var myRequest;

	//Test if XMLHttpRequest is available in active browser
	try{
		myRequest = new XMLHttpRequest();
	}
	catch(e){
		try{
			myRequest = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				myRequest = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				alert("Something broke!");
				return false;
			}
		}
	}

	myRequest.onreadystatechange = function(){

		if(myRequest.readyState == 4){	
			var jsonObj = JSON.parse(myRequest.responseText);

			var output = '<ul>';//Start of the unordered list
			var data = jsonObj.data; //Grabbing data objects from json
			var assets; //Will hold array of data objects
			var actionMovies =[]; //Array for actionMovie objects

			//Outer level of json
			for(var key in data){
				assets = data[key].assets;

				//Movie data of the json file
				for(var x in assets){
					if(assets[x].genre === "Action"){
						actionMovies[x] = assets[x];
					}
				}
			}

			//Unordered list for movies
			for(var key in actionMovies){
				output 
				+= '<li class="list-item"><h1 class="title">'
				+ actionMovies[key].title + '</h1>' 
				+ '<img src= " ' + actionMovies[key].img + ' "/>'
				+'</li>'
			}
			output += '</ul>'

			document.getElementById('output').innerHTML = output;
		}
	}
	myRequest.open("GET", movieData, true);
	myRequest.send();
};

document.addEventListener('DOMContentLoaded', function() {
	//Need to somehow change and add background colors 


}, false);

