//get a poster image from imdb api
function getPoster(searchTitle, image) {
    fetch("http://www.omdbapi.com/?t=" + searchTitle + "&apikey=3f7b97cf")
                            .then(response => response.json())
                            .then(json =>{
                                let str = json.Poster;
                                var a = document.querySelectorAll('.product-title');
                                    image.src=str;
                                }
                        )
                        }
                                         
                          
//get title, description, year, etc. from ghibliapi
fetch("https://ghibliapi.herokuapp.com/films")
            .then(response => response.json())
            
            .then(json =>{              
                
                for (var item in json){
                    var movie = json[item];
                    
                    //create new div and elements
                    var container = document.createElement("div");
                    container.className += " product-grid";
                    document.getElementById('product-container-grid').appendChild(container);
                    
                    var moviePoster = document.createElement("img");
                    moviePoster.className += "product-poster";
                    
                    var movieTitle = document.createElement("p");
                    movieTitle.className += "product-title";
                    
                    var movieDesc = document.createElement("p");
                    movieDesc.className += "product-desc";
                    
                    var movieDate = document.createElement("p");
                    movieDate.className += "product-date";
                    //add elements to container
                    container.appendChild(moviePoster);
                    container.appendChild(movieTitle);
                    container.appendChild(movieDesc);
                    container.appendChild(movieDate);
                    //add container to the page
                    document.getElementById('product-container-grid').appendChild(container);
                    //add data to elements
                    var newTitle = document.createTextNode(movie.title); 
                    movieTitle.appendChild(newTitle)
                    var newDesc = document.createTextNode(movie.description);
                    movieDesc.appendChild(newDesc);
                    var newDate = document.createTextNode(movie.release_date);
                    movieDate.appendChild(newDate);
                    //add poster
                    getPoster(movie.title,moviePoster);

                }          

        })
       
document.addEventListener("DOMContentLoaded", function(event) {
document.getElementById("drop-1").addEventListener("click",function(e) {
   
    })
})
                          
//document.addEventListener("DOMContentLoaded", function(event) {
//document.getElementById("drop-1").addEventListener("click", 
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
        document.querySelector('#product-container-grid').appendChild(arr[i]);
    }}

document.addEventListener("DOMContentLoaded", function(event) {
document.querySelector(".dropdown").addEventListener("click",function(e) {
	// call the function to get a random list of movies
  if (e.target && e.target.matches("a#drop-1")) {
      randomList();
	}
});
})



