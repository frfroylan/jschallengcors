var titles = [];//Will hold an array of titles
var imgs = [];//Will hold an array of imgs
var pos = 0;//Global position indicator which will be shared by all global arrays
var imgIndicators = document.getElementsByClassName('imgIndicator'); //Holds small circles under gallery
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
                        //Add each element to an array
                        for(var key in actionMovies){                                   
                                titles[pos] = actionMovies[key].title;
                                imgs[pos] = actionMovies[key].img;
                                pos++;
                        }
                        pos = 0;
                        imgIndicators[pos].style.backgroundColor = 'white';
                        document.addEventListener('DOMContentLoaded', newMovieItem(titles[pos], imgs[pos]), false);
                }
        }
        myRequest.open("GET", movieData, true);
        myRequest.send();
};

var currentLi;
var nextLi;
//This function creates a new li element for the movie
newMovieItem = function(singleTitle, singleImg){

        var currentMovie = ""; //Empty string for current movie
        currentMovie
        += '<li class="list-item" id="li"><h1 class="title" id="movieTitle">'
        + singleTitle + '</h1>'
        + '<img src= " ' + singleImg + ' "/>'
        +'</li>';
        document.getElementById('ul-list').innerHTML = currentMovie; //Add li to DOM
/*****
        nextLi = document.getElementById('movieTitle');
        nextLi.style.transition = 'opacity .5s linear 0s';
        nextLi.style.opacity = 1;
console.log("nextLi:  " + nextLi);
******Animation above is not working!
*/
        document.addEventListener("keydown", detectKey); //Listen for any keys being pushed
};
detectKey = function(eve){
        var keyPushed = eve.keyCode ? eve.keyCode : eve.charCode; //Code to evaluate which key was pressed
 /*** THIS ONE TOO BELOW: 
        currentLi = document.getElementById('movieTitle');
console.log("currentLi:  " + currentLi);
**/  
        if(39 == keyPushed && (pos+1) != titles.length){
                //Move to right next li element (next movie) unless nextElement = t.length or i.length
                // currentLi.style.transition = 'opacity .5s linear 0s';
                // currentLi.style.opacity = 0;

                imgIndicators[pos].style.backgroundColor = '#333';//Change current imgIndicator to normal color
                pos = pos + 1; //increment global position variable
                imgIndicators[pos].style.backgroundColor = 'white'; //Change the imgIndicator color of the next movie
                newMovieItem(titles[pos], imgs[pos], keyPushed); //Create a new movie positioned at pos
        }
        else if(37 == keyPushed && (pos-1) >= 0 ){
                //Move to left next element unless nextElement = 0
                imgIndicators[pos].style.backgroundColor = '#333';//Change current imgIndicator to normal color
                pos = pos - 1;//decrement global position variable
                imgIndicators[pos].style.backgroundColor = 'white';//Change the imgIndicator color of the next movie
                newMovieItem(titles[pos], imgs[pos], keyPushed);//Create a new movie positioned at pos
        }
        else if(39 == keyPushed  &&  (pos+1) == titles.length){
                //Case for no valid keys being pushed, dont do anything
                imgIndicators[pos].style.backgroundColor = '#333';
                pos = 0;
                newMovieItem(titles[pos], imgs[pos], keyPushed);
                imgIndicators[pos].style.backgroundColor = 'white';
        }
        else if( 37 == keyPushed && (pos-1) <0 ){
        		imgIndicators[pos].style.backgroundColor = '#333';
        		pos = titles.length - 1;
        		newMovieItem(titles[pos], imgs[pos], keyPushed);
        		imgIndicators[pos].style.backgroundColor = 'white';
        }
};
arrow = function(arrow){
        if(arrow === 'right' && (pos+1) != titles.length){
		//Move to right next element unless nextElement = t.length or i.length
		// titles[pos].style.transition = 'opacity 1s linear 0s';
		// titles[pos].style.opacity = 0;
		imgIndicators[pos].style.backgroundColor = '#333';
		pos = pos + 1;
		imgIndicators[pos].style.backgroundColor = 'white';
		newMovieItem(titles[pos], imgs[pos], 39);
        }
        else if(arrow === 'left' && (pos-1) >= 0 ){
		//Move to left next element unless nextElement = 0
		imgIndicators[pos].style.backgroundColor = '#333';
		pos = pos - 1;
		imgIndicators[pos].style.backgroundColor = 'white';
		newMovieItem(titles[pos], imgs[pos], 37);
        }
        else if(arrow === 'right'  &&  (pos+1) == titles.length){
		//Case for no valid keys being pushed, dont do anything
		imgIndicators[pos].style.backgroundColor = '#333';
		pos = 0;
		newMovieItem(titles[pos], imgs[pos], 39);
		imgIndicators[pos].style.backgroundColor = 'white';
	  }
	else if( arrow === 'left' && (pos-1) <0 ){
		imgIndicators[pos].style.backgroundColor = '#333';
		pos = titles.length - 1;
		newMovieItem(titles[pos], imgs[pos], 37);
		imgIndicators[pos].style.backgroundColor = 'white';
	}
}