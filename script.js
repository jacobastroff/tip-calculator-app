const forms = document.querySelectorAll('.input-form');
const inputBoxes = document.querySelectorAll('.label-and-input');
const tipSelectionForm = document.querySelector('.tip-selection')
const resetBtn = document.querySelector('.reset-btn');
// console.log(inputBoxes, forms)
document.addEventListener('click', function (e) {
    // e.preventDefault()
    // console.log(e.target)
    // console.log(e.target.closest('.label-and-input'))
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
let curTipSelectionElement = document.querySelector('.active-btn');
let curTipSelectionAmount = Number.parseInt(curTipSelectionElement.textContent) / 100;
// console.log(curTipSelectionAmount, curTipSelectionElement)
const changeActiveButton = function (e) {
    console.log(e)
    e.preventDefault();
    const errorText = e.target.parentElement.parentElement.querySelector('.error-message')
    console.log(errorText)
    if (e.target.closest('.tip-amount-button') && e.pointerType.length > 0) {
        curTipSelectionElement = e.target;
        curTipSelectionAmount = Number.parseInt(e.target.textContent) / 100
        curTipSelectionElement.blur();
        errorText.classList.add('hidden')
    }
    else if (e.target.closest('.custom-tip')) {
        if (!Number.isNaN(Number.parseInt(e.target.value))) {
            curTipSelectionElement = e.target;
            curTipSelectionAmount = Number.parseInt(e.target.value) / 100
            errorText.classList.add('hidden')


        }
        else {
            errorText.classList.remove('hidden')
            errorText.textContent = 'Invalid input'
        }
    }

    document.querySelectorAll('.tip-amount-button').forEach(button => button.classList.remove('active-btn'))
    document.querySelector('.custom-tip').classList.remove('active-btn')
    curTipSelectionElement.classList.add('active-btn')


    console.log(curTipSelectionElement, curTipSelectionAmount)
    tipCalculation()
}
const tipCalculation = function () {
    document.querySelectorAll('.error-message').forEach(text => text.classList.add('hidden'))

    const billAmount = Number.parseFloat(document.querySelectorAll('.input-box')[0].value);
    const numPeople = Number.parseInt(document.querySelectorAll('.input-box')[1].value);
    if (Number.isFinite(billAmount) && Number.isFinite(numPeople)) {
        const total = (billAmount * (1 + curTipSelectionAmount)) / numPeople
        document.querySelectorAll('.total')[1].textContent = `$${total.toFixed(2)}`
        // const tip
        const tip = (billAmount * (1 + curTipSelectionAmount) - billAmount) / numPeople
        document.querySelector('.total').textContent = `$${tip.toFixed(2)}`
    }
    else {
        if (!Number.isFinite(billAmount)) {
            document.querySelectorAll('.error-message')[0].classList.remove('hidden')
            document.querySelectorAll('.error-message')[0].textContent = 'Invalid Input'
        }
        else {
            document.querySelectorAll('.error-message')[2].classList.remove('hidden')
            document.querySelectorAll('.error-message')[2].textContent = 'Invalid Input'
        }
    }


}
// document.querySelectorAll('tip-amount-button').forEach(button => button.blur())
document.querySelector('.custom-tip').addEventListener('change', changeActiveButton)
tipSelectionForm.addEventListener('submit', changeActiveButton)
inputBoxes.forEach(input => input.addEventListener('change', tipCalculation))
forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
document.querySelectorAll('.tip-amount-button').forEach(button => button.addEventListener('click', changeActiveButton))
document.querySelectorAll('.tip-amount-button').forEach(button => button.addEventListener('touch', changeActiveButton))

console.log(resetBtn)
const resetUI = function () {
    document.querySelectorAll('input').forEach(input => {
        input.blur()
        input.value = '';

        curTipSelectionElement = document.querySelectorAll('.tip-amount-button')[2];
        curTipSelectionAmount = Number.parseInt(curTipSelectionElement.textContent) / 100;

        document.querySelectorAll('.tip-amount-button').forEach(button => button.classList.remove('active-btn'))
        document.querySelector('.custom-tip').classList.remove('active-btn')
        curTipSelectionElement.classList.add('active-btn')
        document.querySelectorAll('.total').forEach(total => total.textContent = `$0.00`)
        document.querySelectorAll('.error-message').forEach(errorText => errorText.classList.add('hidden'))

    })
}
resetBtn.addEventListener('click', resetUI)
resetBtn.addEventListener('touch', resetUI)
