appointBehavior();

function appointBehavior() {
    let ViewImage = document.querySelector(".view_image");
    ViewImage.addEventListener("error", errorHandler);
    let safePath = ViewImage.src;

    for (let thambImage of document.querySelectorAll(".thambnail"))
        thambImage.addEventListener("click", changeImage);

    function changeImage(e) {
        let path = e.target.src.replace(/\/small\//, "\/big\/");
        ViewImage.setAttribute("src", path);
    }

    function errorHandler(e) {
        console.log("Image not found.\n" + e.target.src);
        e.target.src = safePath;
    }
}