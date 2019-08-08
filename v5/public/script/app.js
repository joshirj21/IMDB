document.querySelector(".dropdown").addEventListener("mouseenter", function () {
    this.classList.add("show");
    document.querySelector(".dropdown-menu").classList.add("show")
    document.querySelector(".dropdown-menu").classList.add("zoomInUp", "animated")
    this.classList.add("zoomInUp", "animated")
})
document.querySelector(".dropdown").addEventListener("mouseleave", function () {
    this.classList.remove("show");
    document.querySelector(".dropdown-menu").classList.remove("show")
})