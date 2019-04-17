//get a poster image from imdb api
function getPoster(searchTitle, image) {
    fetch("https://www.omdbapi.com/?t=" + searchTitle + "&apikey=3f7b97cf")
                            .then(response => response.json())
                            .then(json =>{
                                let str = json.Poster;
                                var a = document.querySelectorAll('.product-title');
                                    image.src=str;
                                }
                        )
                        }


function restoreRating(movieFav) {
            movieParent = movieFav.parentNode.getAttribute('data-item');
			ratingValue = localStorage.getItem("movie"+movieParent);
	        children= movieFav.children;
			rating=movieFav.getAttribute('data-item');
			if (ratingValue){
			for(var i=0;i<5;i++){	
				var current= children[i];
				var rating= 5-current.getAttribute('data-rating');
				if (ratingValue>= rating){
					 current.classList.add("hover");   
				}
			}}
	
        }
						 
function starClick(e) {
		//localStorage.clear();
	     rating=e.target.getAttribute("data-rating");
		 starParent= e.target.parentNode;
		 movieParent = starParent.parentNode.getAttribute('data-item');
	     children= e.target.parentElement.children;
	     for(var i=0;i<5;i++){
           var current= children[i];
           if(i>=rating){
             current.classList.add("hover")
           }else{
             current.classList.remove("hover"); 
          }
		 localStorage.setItem("movie"+movieParent, 5-rating);
			 
        }
}

function createStars(movieFav){
		movieParent = movieFav.parentNode.getAttribute('data-item');
		ratingValue = localStorage.getItem("movie"+movieParent);
		for (i=0; i<5; i++){
		
			var newStar = document.createElement("span");
			movieFav.appendChild(newStar);
			newStar.className += "star rating-"+i;
			newStar.setAttribute("data-rating",i);
			newStar.addEventListener('click', starClick);
    }
}

function showDetails(link){
	link.addEventListener("click",function() {
		document.querySelector('#product-container-grid').style.display = "none";
		var details = document.querySelector('.details');
		details.style.display = "inherit";
		var wrapper = link.parentNode;
		wrapper.className += " product-details";		
		wrapper.querySelector('.product-desc').style.display = "inline";
		details.appendChild(wrapper);
		var btn = document.createElement('a');
		btn.className += "nav-btn";
		btn.setAttribute("href", "index.html");
		wrapper.appendChild(btn);
	})
}
function resetGrid(){
	if (document.querySelector('#product-container-grid').style.display = "none"){
		document.querySelector('#product-container-grid').style.display = "inherit";
		document.querySelector('.details').style.display = "none";
		var item = document.querySelector('.product-details');
	if (item) {
		item.querySelector('.product-desc').style.display = "none";
		item.querySelector('.nav-btn').style.display = "none";
		item.classList.remove('product-details');
		document.querySelector('#product-container-grid').appendChild(item);
		}
	
}
}
                          
//get title, description, year, etc. from ghibliapi
function getContent(){
fetch("https://ghibliapi.herokuapp.com/films")
			.then(status)
            .then(response => response.json())
            .then(json =>{              
                
                for (var item in json){
                    var movie = json[item];
                    //create new div and elements
                    var container = document.createElement("div");
                    container.className += " product-grid";
					//add unique attribute to each div
					container.setAttribute("data-item",item);
                    document.getElementById('product-container-grid').appendChild(container);
					var movieLink = document.createElement("a");
					movieLink.className += "product-link";
                    var moviePoster = document.createElement("img");
                    moviePoster.className += "product-poster";
                    var movieTitle = document.createElement("p");
                    movieTitle.className += "product-title";
					var movieDirector = document.createElement("p");
                    movieDirector.className += "product-director";
                    var movieDesc = document.createElement("p");
                    movieDesc.className += "product-desc";
                    var movieDate = document.createElement("p");
                    movieDate.className += "product-date";
					var movieFav = document.createElement("div");
                    movieFav.className += "rating";
                    //add elements to container
					container.appendChild(movieLink);
                    movieLink.appendChild(moviePoster);
                    container.appendChild(movieTitle);
					container.appendChild(movieDirector);
                    container.appendChild(movieDesc);
                    container.appendChild(movieDate);
					container.appendChild(movieFav);
                    //add container to the page
                    document.getElementById('product-container-grid').appendChild(container);
                    //add data to elements
                    var newTitle = document.createTextNode(movie.title); 
                    movieTitle.appendChild(newTitle);
					var newDirector = document.createTextNode(movie.director);
                    movieDirector.appendChild(newDirector);
                    var newDesc = document.createTextNode(movie.description);
                    movieDesc.appendChild(newDesc);
                    var newDate = document.createTextNode(movie.release_date);
                    movieDate.appendChild(newDate);
					moviePoster.setAttribute("alt",newTitle.nodeValue+" poster");
					movieLink.setAttribute("href", "#details");
					movieLink.onclick = showDetails(movieLink); 
					//add favourites rating
					createStars(movieFav);
					restoreRating(movieFav);
                    //add poster
                    getPoster(movie.title,moviePoster);
                }          
        })
}
       

function randomList(){
	
    var list = document.querySelectorAll('.product-grid');
    //get an array from DOM nodelist
    var arr = Array.prototype.slice.call(list);
    var currentIndex = arr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    //random index element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //interchange the values for new random values
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;        
  }
    //add random divs to the grid
    for(var i = 0; i < arr.length; i++){
		//arr[i].style.display = "inline-grid"
        document.querySelector('#product-container-grid').appendChild(arr[i]);
   	}
}
	
//sorting functions
function compareTitles(a,b){
	
   var one= a.querySelector('.product-title').innerHTML;
   var two= b.querySelector('.product-title').innerHTML;
  // returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order
	return one.localeCompare(two)
}
function compareDirector(a,b){
   var one= a.querySelector('.product-director').innerHTML;
   var two= b.querySelector('.product-director').innerHTML;
  // return one.localeCompare(two)*-1;
	return one.localeCompare(two)
}
function compareDates(a,b){
   var one= a.querySelector('.product-date').innerHTML;
   var two= b.querySelector('.product-date').innerHTML;
  	return one.localeCompare(two)*-1;
}
/*
function getSortingFunction(argument){
	return function(a,b){
		var one= a.querySelector(argument).innerHTML;
		var two= b.querySelector(argument).innerHTML;
		return one.localeCompare(two);
}
}
arr.sort(getSortingFunction('.product-director'))
*/
function sortStuff(arguments){
	var list = document.querySelectorAll('.product-grid');
    var arr = Array.prototype.slice.call(list);
    var result = arr.sort(arguments);
	for (i=0;i<arr.length;i++){
		document.querySelector('#product-container-grid').appendChild(arr[i]);
		}	
}
//get a list of movies with rating
function favList(nmb){
	resetGrid();
	if (nmb % 2 === 0){
	var list = document.querySelectorAll('.product-grid');
    //get an array from DOM nodelist
    var arr = Array.prototype.slice.call(list);
	for (i=0;i<arr.length;i++){
		var item = arr[i].getAttribute('data-item');
		var fav = localStorage.getItem("movie"+item);
		if (fav == 5) {
			arr[i].style.display = "inline-grid"
		}	
		else {
			arr[i].style.display = "none"
		}
		}
	}
	else {
		var list = document.querySelectorAll('.product-grid');
    	var arr = Array.prototype.slice.call(list);
    
    	for(var i = 0; i < arr.length; i++){
			arr[i].style.display = "inline-grid";
          document.querySelector('#product-container-grid').appendChild(arr[i]);
   	}}

	}

document.addEventListener("DOMContentLoaded", function(event) {
	getContent();
	
document.querySelector(".dropdown").addEventListener("click",function(e) {
	resetGrid();
	// call the function to get a random list of movies
  	if (e.target && e.target.matches("a#drop-1")) {
		//resetGrid();
       randomList();
	}
	// call the function to sort by title
	if (e.target && e.target.matches("a#drop-2")) {
	  //resetGrid();	
      sortStuff(compareTitles);
	}
	// call the function to sort by director
	if (e.target && e.target.matches("a#drop-3")) {
		//resetGrid();
       sortStuff(compareDirector);
	}
	// call the function to sort by date
	if (e.target && e.target.matches("a#drop-4")) {
		//resetGrid();
       sortStuff(compareDates);
	}
});
let count=0;	
document.querySelector('a.menu-btn').addEventListener("click",function(e) {
	// call the function to get a list of favourite movies
		favList(count);
	//toggle favourites on second click
		count = count+1;
});

})


//Remove star rating if clicked outside the rating
/*window.addEventListener('click', function(e){   
  if (!document.querySelector('.rating').contains(e.target)){
      //console.log('You clicked outside');
      clearRating();
  }
});*/

/*function clearRating(list) {
            var stars = Array.prototype.slice.call(list);
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.remove('hover');
                
            }
        }*/



