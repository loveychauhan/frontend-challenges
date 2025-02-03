const countryContainer = document.querySelector('.country-container');
const filterByRegion = document.querySelector('#filter-country');
const searchCountry = document.querySelector('.searchField');
const ldLogo = document.querySelector('.ld-logo')

let filteredCountries

fetchCountries()
async function fetchCountries() {
    try {
        loading() // load a skeleton till the data is being fetched
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json();
        renderCountry(data)
        filteredCountries = data;
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

filterByRegion.addEventListener('change', () => {
    loading()
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res) => res.json())
        .then(renderCountry)
})


function renderCountry(data) {
    countryContainer.innerHTML = ''
    const fragment = document.createDocumentFragment()
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.classList.add('country-card', 'skeleton');
        countryCard.innerHTML = `<img src="${country.flags.svg}" alt="flag">
                    <div class="card-text">
                        <h3 class="card-heading">${country.name.common}</h3>
                        <p><b>Population: </b><span>${country.population.toLocaleString('en-IN')}</span></p>
                        <p><b>Region: </b><span>${country.region}</span></p>
                        <p><b>Capital: </b><span>${country.capital}</span></p>
                    </div>`
        fragment.append(countryCard)
    });
    countryContainer.append(fragment)
    filterByRegion.selectedIndex = 0;

}




searchCountry.addEventListener('input', (e) => {
    // console.log(e.target.value);
    // console.log(filteredCountries)
    const searchedCountry = filteredCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountry(searchedCountry)
})

ldLogo.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        ldLogo.innerHTML = `<p class="ld-logo">
        <i class="fa-solid fa-sun"></i>
        &nbsp;Light Mode </p >`
    } else {
        ldLogo.innerHTML = `<p class="ld-logo">
            <i class="fa-regular fa-moon"></i>
            &nbsp;Dark Mode
        </p>`
    }
})


// skeleton loading

function loading() {
    countryContainer.innerHTML = ''
    for (let i = 0; i < 50; i++) {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-loading', 'skeleton');
        countryCard.innerHTML = `<p class="img"></p>
                    <div class="card-text">
                        <h3 class="card-heading"></h3>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>`
        countryContainer.append(countryCard)
    }

}
