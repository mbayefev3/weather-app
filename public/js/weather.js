
const weatherForm = document.querySelector('#weather-form')
const loader = document.querySelector('#loader')
const weather = document.querySelector('.weather')
const country = document.querySelector('.country')
const region = document.querySelector('.region')
const date = document.querySelector('.date')
const localTime = document.querySelector('.localtime')
const showSummary = document.querySelector('#show-summary')
const bad = document.querySelector('.bad')
const load = document.querySelector('.load')
const overcast = document.querySelector('.overcast')
const weatherItems = [overcast, weather, localTime, country, region, date]

weatherForm.addEventListener('submit', (e) => {

    // const p = document.createElement('p')
    // p.textContent = 'loading'

    load.classList.add('spinner-border')

    e.preventDefault()


    bad.classList.add('hide')
    weatherItems.forEach(item => {
        console.log(item)
        item.classList.add('hide')
        item.innerHTML = ''
    })
    loader.textContent = ''

    const address = e.target.elements.address.value

    fetch(`/weather?location=${address}`).then(response => {

        response.json().then(data => {

            if (data.error) {

                const p = document.createElement('h2')
                p.textContent = data.error
                loader.appendChild(p)
                // load.innerHTML = ''
                load.classList.remove('spinner-border')

            } else {
                load.classList.remove('spinner-border')

                // loading.innerHTML = ''
                loader.innerHTML = ''

                showSummary.classList.remove('not-summary')
                bad.classList.remove('hide')

                // console.log(data.forcast)
                const Data = Object.entries(data.forcast)

                weatherItems.forEach((item, i) => {

                    const puThis = ['weather Description', 'temparature', 'localtime', 'country', 'region', 'date']
                    const pd = document.createElement('h3')
                    const p = document.createElement('p')

                    item.classList.remove('hide')
                    p.textContent = Data[i][1]
                    pd.textContent = puThis[i]
                    // console.log(item)
                    item.appendChild(pd)
                    item.appendChild(p)


                })



            }
            e.target.elements.address.value = ''

        })
    })
})



// {
//     "forcast": {
//     "temperature": "72 farenheit",
//     "localTime": "8:09 pm",
//     "country": "Senegal",
//     "region": "Dakar",
//     "date": "Wednesday, May 5th 2021"
//     }
//     }