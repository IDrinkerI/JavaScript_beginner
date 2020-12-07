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
        alert("Image \"" + e.target.src.match(/(?<=\/big\/).*$/) + "\" not found.");
        e.target.src = safePath;
    }
}