
const currencyForm = document.querySelector('#currencyForm')
const wrong = document.querySelector('#wrong')
const countrySender = document.querySelector('.countrySender')
const countryReceiver = document.querySelector('.countryReceiver')
const amount = document.querySelector('.amount')
const updated = document.querySelector('.updated')
const date = document.querySelector('.date')
const localtime = document.querySelector('.localtime')
const summary = document.querySelector('.summary')
const loaded = document.querySelector('.loaded')

// const countrySender = document.querySelector('.countrySender')
// <div class="countrySender"></div>
// <div class="countryReceiver"></div>
// <div class="amount"></div>
// <div class="updated"></div>
// <div class="date"></div>

summary.classList.add('hide')

const array = [countrySender, countryReceiver, amount, updated, date]

currencyForm.addEventListener('submit', (e) => {
    loaded.classList.add('spinner-border')
    e.preventDefault()


    const origin = e.target.elements.origin.value
    const destination = e.target.elements.destination.value
    const money = e.target.elements.money.value

    array.forEach(arr => {
        arr.textContent = ''
    })
    // console.log(origin, destination, money)
    wrong.innerHTML = ''
    summary.classList.add('hide')

    fetch(`/currencycheck?origin=${origin}&destination=${destination}`).then(response => {


        response.json().then(data => {

            if (data.error) {
                const p = document.createElement('h3')
                p.textContent = data.error
                wrong.appendChild(p)
                summary.classList.add('hide')
                loaded.classList.remove('spinner-border')

            } else {
                loaded.classList.remove('spinner-border')

                summary.classList.remove('hide')

                // console.log(data.summary)
                const dataCurrency = Object.entries(data.summary)

                const toCurrency = dataCurrency.find((arr) => {
                    return arr[0] === 'toCurrency'
                })[1]
                // toCurrency
                // console.log(toCurrency)
                // console.log(dataCurrency)

                // console.log('data', array)
                array.forEach((arr, i) => {




                    const array = ['Origin', 'Destination', 'Estimates', 'Updated Time', "Today's date"]
                    const p2 = document.createElement('p')

                    p2.textContent = array[i]

                    arr.appendChild(p2)
                    const p = document.createElement('h4')
                    if (dataCurrency[i][0] === 'amount') {
                        const span = document.createElement('span')

                        span.textContent = toCurrency

                        p.textContent = (dataCurrency[i][1] * money).toFixed(2)

                        amount.appendChild(p)
                        amount.appendChild(span)
                    } else {
                        p.textContent = dataCurrency[i][1]
                        arr.appendChild(p)

                    }


                    // console.log(p)
                })
                e.target.elements.origin.value = ''
                e.target.elements.destination.value = ''
                e.target.elements.money.value = ''

            }

        })
    })
})



// {
//     "summary": {
//     "countrySender": "United States",
//     "toCurrency": "XOF",
//     "amount": "546.491704",
//     "base": "USD",
//     "countryCodeFrom": "US",
//     "countryCodeTo": "SN",
//     "countryReceiver": "Senegal",
//     "localTime": "6:22pm",
//     "date": "Wednesday, May 5th 2021"
//     }
//     }
//bfgbf
// // {
// //     "summary": {
// //     "countrySender": "United States",
// //     "toCurrency": "XOF",
// //     "amount": "546.491704",
//     "base": "USD",
//     "countryCodeFrom": "US",
//     "countryCodeTo": "SN",
//     "countryReceiver": "Senegal"
//     }
//     }