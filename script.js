const forms = document.querySelectorAll('.input-form');
const inputBoxes = document.querySelectorAll('.label-and-input');
console.log(inputBoxes, forms)
document.addEventListener('click', function (e) {
    // e.preventDefault()
    console.log(e.target)
    console.log(e.target.closest('.label-and-input'))
    document.querySelectorAll('.label-and-input').forEach(el => el.classList.remove('focused'))

    if (e.target.closest('.label-and-input')) {
        console.log(e.target.parentElement)
        if (e.target.classList.contains('label-and-input')) {
            e.target.classList.add('focused')
        }
        else if (e.target.classList.contains('input-icon')) {
            e.target.parentElement.parentElement.classList.add('focused')
        }
        else {
            console.log('GELLO')
            e.target.parentElement.classList.add('focused')
        }
    }
})
// document.addEventListener('click', function (e) {
//     if (!e.target.classList.contains('.label-and-input')) {
//         forms.forEach((_, i) => inputBoxes[i].classList.remove('focused'))
//     }
// })