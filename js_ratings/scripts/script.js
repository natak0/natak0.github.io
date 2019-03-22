document.addEventListener('DOMContentLoaded', (event) => createStars());

//Remove star rating if clicked outside the rating
window.addEventListener('click', function(e){   
  if (!document.querySelector('.rating').contains(e.target)){
      //console.log('You clicked outside');
      var list = document.querySelectorAll("span");
      var stars = Array.prototype.slice.call(list);
      clearRating(stars);
  }
});

function createStars(){
    for (i=0; i<5; i++){
        var newStar = document.createElement("span");
        document.querySelector(".rating").appendChild(newStar);
        newStar.className += "star";
        newStar.addEventListener('click', starClick);
    }
}
function starClick(e) {
            var list = document.querySelectorAll("span");
            var stars = Array.prototype.slice.call(list);
            clearRating(stars);
            if (this === e.target) {
                var starClicked = stars.indexOf(e.target);
                for (i=starClicked; i<stars.length; i++){
                stars[i].classList.add('hover');
                rating = stars.length-starClicked;
                    console.log('rating is ', rating);
                }
            }
}
function clearRating(stars) {
            for (var i = 0; i < stars.length; i++) {
                stars[i].classList.remove('hover');
                
            }
        }
