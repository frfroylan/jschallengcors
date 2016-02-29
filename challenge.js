var titles = [];
var imgs = [];
var pos = 0;
movieScript = function(keyEvent){
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
			var jsonObj = JSON.parse(myRequest.responseText);//Grabs json object
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
			//Version 3 add each element to an array
			for(var key in actionMovies){                                    
				titles[pos] = actionMovies[key].title;
				imgs[pos] = actionMovies[key].img;
				pos++;
			}
			pos = 0;
			document.addEventListener('DOMContentLoaded', newMovieItem(titles[pos], imgs[pos]), false);
			/*********************************************************/
		}
	}
	myRequest.open("GET", movieData, true);
	myRequest.send();
};
newMovieItem = function(singleTitle, singleImg){
	var currentMovie = ""; //Empty string for current movie
	currentMovie
	+= '<li class="list-item"><h1 class="title">'
	+ singleTitle + '</h1>'
	+ '<img src= " ' + singleImg + ' "/>'
	+'</li>';
	document.getElementById('ul-list').innerHTML = currentMovie;
	document.addEventListener("keydown", detectKey);
};

detectKey = function(e){
        var keyPushed = e.keyCode ? e.keyCode : e.charCode;
        if(39 == keyPushed && (pos+1) != titles.length){
		//Move to right next element unless nextElement = t.length or i.length
		pos = pos + 1;
		newMovieItem(titles[pos], imgs[pos], keyPushed);
	}
	else if(37 == keyPushed && (pos-1) >= 0 ){
		//Move to left next element unless nextElement = 0
		pos = pos - 1;
		newMovieItem(titles[pos], imgs[pos], keyPushed);
	}
	else if( (pos+1) == titles.length || (pos-1) == 0 ){
		newMovieItem(titles[pos], imgs[pos], keyPushed);
	}
	else{
		console.log("Right nor the left arrow keys were pressed");
	}
};