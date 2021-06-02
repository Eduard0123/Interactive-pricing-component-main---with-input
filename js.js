const button = document.getElementById('button')

const zeroViewPricing = {
    views: '0k pageviews',
    month: '0'
}

const arrayViewPricing = [{
        views: '10k pageviews',
        month: '8.00'
    },
    {
        views: '50K pageviews',
        month: '12.00'
    },
    {
        views: '100K pageviews',
        month: '16.00'
    },
    {
        views: '500K pageviews',
        month: '24.00'
    },
    {
        views: '1M pageviews',
        month: '36.00'
    }
]

const arrayParadas = [20, 40, 60, 80, 99]

const view = document.getElementById('view')
const month = document.getElementById('month')


const createSpanMonth = () => {
    const spanMonth = document.createElement('span')
    spanMonth.classList.add('month-span')
    spanMonth.textContent = '/ month'
    month.appendChild(spanMonth)
}

const modifyContent = (key) => {
    view.textContent = arrayViewPricing[key].views
    month.textContent = '$' + arrayViewPricing[key].month
    createSpanMonth()
}
const modifyContentFirst = () => {
    view.textContent = arrayViewPricing[0].views
    month.textContent = '$' + arrayViewPricing[0].month
    createSpanMonth()
}

const justModifyContentBegin = () => {
    view.textContent = zeroViewPricing.views
    month.textContent = '$' + zeroViewPricing.month
    createSpanMonth()
}

const activeDiscount = document.getElementById('active-discount')
const ball = activeDiscount.children[0]
const inputRange = document.getElementById('input-range')
const bubble = document.querySelector('.bubble')

const firstDiscountMonth = () => {
    month.textContent = `$${parseInt(arrayViewPricing[0].month) - (parseInt(arrayViewPricing[0].month) * 0.25)}.00`
    createSpanMonth()
}
const discountMonthAll = (key) => {
    month.textContent = `$${parseInt(arrayViewPricing[key].month) - (parseInt(arrayViewPricing[key].month) * 0.25)}.00`
    createSpanMonth()
}

inputRange.value = 20
const colorFirst = `linear-gradient(90deg, hsl(174, 77%, 80%) ${inputRange.value}%, hsl(224, 65%, 95%) ${inputRange.value}%)`
inputRange.style.setProperty('background', colorFirst)

activeDiscount.addEventListener('click', () => {
    ball.classList.toggle('activated')


    if (ball.classList.item(1) == 'activated') {
        firstDiscountMonth()
        setBubble(inputRange, bubble, null)
    } else {
        modifyContentFirst()
        bubble.style.opacity = '0'
    }
})



function setBubble(range, bubble, key) {
    bubble.style.opacity = '1'
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));

    if (key) {
        bubble.textContent = '$' + arrayViewPricing[key].month;
    } else {
        bubble.textContent = '$' + arrayViewPricing[0].month;
    }

    bubble.style.left = `calc(${newVal}% + (${23 - newVal * 0.48}px))`;
}



inputRange.addEventListener('input', () => {

    let inputValue = inputRange.value

    let color = `linear-gradient(90deg, hsl(174, 77%, 80%) ${inputValue}%, hsl(224, 65%, 95%) ${inputValue}%)`
    inputRange.style.setProperty('background', color)

    for (const key in arrayParadas) {

        if (inputValue > arrayParadas[key]) {
            modifyContent(key)
            if (ball.getAttribute('class') == 'ball activated') {
                discountMonthAll(key)
                setBubble(inputRange, bubble, key)
            }
        }

        activeDiscount.addEventListener('click', () => {
            if (ball.getAttribute('class') == 'ball activated' && inputValue < arrayParadas[0]) {
                justModifyContentBegin()
                setBubble(inputRange, bubble, null)
                bubble.textContent = '$' + zeroViewPricing.month;
            }
            if (ball.getAttribute('class') == 'ball' && inputValue < arrayParadas[0]) {
                justModifyContentBegin()
                bubble.style.opacity = '0'
            }

            if (inputValue > arrayParadas[key]) {
                view.textContent = arrayViewPricing[key].views
                if (ball.getAttribute('class') == 'ball activated') {
                    discountMonthAll(key)
                    setBubble(inputRange, bubble, key)
                } else {
                    modifyContent(key)
                    bubble.style.opacity = '0'
                }
            }
        })

        if (inputValue < arrayParadas[0]) {
            justModifyContentBegin()
            if (ball.getAttribute('class') == 'ball activated') {
                setBubble(inputRange, bubble, null)
                bubble.textContent = '$' + zeroViewPricing.month;
            }
        }
    }
})
