const countryName = new URLSearchParams(window.location.search).get('name');

const nativeName = document.querySelector('.native-name')
const countryImg = document.querySelector('.image-container img');
const countryHeading = document.querySelector('.country-heading');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const tld = document.querySelector('.tld');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borders = document.querySelector('.border-countries');
const main = document.querySelector('main')
const backBtn = document.querySelector('.back-button')


backBtn.addEventListener('click', () => {
    history.back()
})

fetchcountry()
async function fetchcountry() {
    main.classList.add('loading')
    const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const [data] = await res.json();
    main.classList.remove('loading')
    countryImg.src = data.flags.svg;
    countryImg.alt = data.name.common
    countryHeading.innerText = data.name.common;
    nativeName.innerText = data.name.nativeName ? Object.values(data.name.nativeName)[0].common : data.name.common;
    population.innerText = data.population.toLocaleString('en-IN')
    region.innerText = data.region
    if (data.subRegion) subRegion.innerText = data.subregion;
    if (data.capital) {
        capital.innerText = data.capital
    }
    tld.innerText = data.tld.join(', ');
    if (data.currencies) currencies.innerText = Object.values(data.currencies)[0].name;
    if (data.languages) languages.innerText = Object.values(data.languages).join(', ');

    if (data.borders) {
        data.borders.forEach(country => {
            fetch(`https://restcountries.com/v3.1/alpha/${country}`).then((res) => res.json())
                .then(([borderCountry]) => {
                    const borderCountryTag = document.createElement('a')
                    borderCountryTag.innerText = borderCountry.name.common;
                    borderCountryTag.href = `/country.html?name=${borderCountry.name.common}`
                    borders.append(borderCountryTag)

                })
        });
    }
}


const ldLogo = document.querySelector('.ld-logo')


let isDark = 0;

isDark = parseInt(localStorage.getItem('isDark'))

if (isDark === 1) {
    document.body.classList.add('dark');
    ldLogo.innerHTML = `<p class="ld-logo">
    <i class="fa-solid fa-sun"></i>
    &nbsp;Light Mode </p >`
} else {
    document.body.classList.remove('dark');
    ldLogo.innerHTML = `<p class="ld-logo">
    <i class="fa-regular fa-moon"></i>
    &nbsp;Dark Mode
</p>`
}

ldLogo.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        isDark = 1;
        localStorage.setItem('isDark', isDark)
    } else {
        isDark = 0;
        localStorage.setItem('isDark', isDark)
    }

    if (isDark === 1) {
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
