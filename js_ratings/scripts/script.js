function body_onload() {
var list = document.querySelectorAll("span");
    for (i=0; i<list.length; i++){
        list[i].className += "star";
        list[i].addEventListener('click', starClick);
    }
}

function starClick(e) {
            //
            
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
