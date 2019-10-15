
/*                    Tried this, but it flickers                     */


// const hoverBg = document.querySelectorAll(".slider-1-bg,.slider-1-info");
// console.log(hoverBg)
// hoverBg.forEach((event) => {
//     event.addEventListener("mouseover", function () {
//         anime({
//             targets: '.slider-1-bg',
//             scale: 1.27,
//             duration: 100,
//             easing: 'linear',
//             delay: 0
//         });
//     })
// })

// hoverBg.forEach((event) => {
//     event.addEventListener("mouseout", function () {
//         anime({
//             targets: '.slider-1-bg',
//             scale: 1,
//             duration: 100,
//             easing: 'linear',
//             delay: 0
//         });
//     })
// })
// hoverBg.addEventListener("mouseover", function () {
//     anime({
//         targets: this,
//         scale: 1.27,
//         duration: 500,
//         easing: 'linear',
//         delay: 0
//     });
//     anime({
//         targets: '.slider-1-info',
//         translateY: '-30px'
//     });
// })

// hoverBg.addEventListener("mouseout", function () {
//     anime({
//         targets: this,
//         scale: 1
//     });
//     anime({
//         targets: '.slider-1-info',
//         translateY: '0'
//     });
// })