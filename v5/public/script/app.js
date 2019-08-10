document.querySelector(".dropdown").addEventListener("mouseenter", function () {
    this.classList.add("show");
    document.querySelector(".dropdown-menu").classList.add("show")
    document.querySelector(".dropdown-menu").classList.add("zoomInLeft", "animated")
})
document.querySelector(".dropdown").addEventListener("click", function () {
    this.classList.toggle("show");
    document.querySelector(".dropdown-menu").classList.toggle("show")
})