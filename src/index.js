import './css/styles.css';
import './css/country-info.css';

import debounce from 'lodash.debounce';
const searchInput = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
const countriesList = document.querySelector('.country-list');
const countriyCard = document.querySelector('.country-info');
searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries(evt) {
  const currentInputValue = evt.target.value;
  if (currentInputValue === '') {
    // countriesList.innerHTML = '';

    return;
  }

  fetchCountries(currentInputValue);
}

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        countriesList.innerHTML = '';
        return console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        return createTmpltList(countries);
      }
      countriesList.innerHTML = '';

      return createTmpltCard(countries);
      // console.log(countries);
    })
    .catch(error => {
      console.log('Oops, there is no country with that name');
    });
}

function createTmpltList(countries) {
  countriesList.innerHTML = '';
  countriesList.insertAdjacentHTML('beforeend', countriesTmpltList(countries));
}

function createTmpltCard(countries) {
  countriyCard.innerHTML = '';
  countriyCard.insertAdjacentHTML('beforeend', countriesTmpltCard(countries));
}

function countriesTmpltList(countries) {
  return countries
    .map(
      country =>
        `<li><img src="${country.flags.png}" alt="${country.name.official}" srcset="">
  <p>${country.name.official}</p>
</li>`
    )
    .join('');
}

function countriesTmpltCard(countries) {
  return countries
    .map(country => {
      const languagesList = Object.values(country.languages);
      const languagesListTmplt = languagesList
        .map(item => `<li class="item-value">${item}</li>`)
        .join('');
      return `<h1 class="card-title"><img src="${country.flags.png}" alt="">
      ${country.name.official}</h1>
      <p class="item_title">capital: <span class="item-value">${country.capital}</span></p>
      <p class="item_title">population: <span class="item-value">${country.population}</span></p>
      <ul class="item_title">languages:${languagesListTmplt}</ul>
`;
    })
    .join('');
}

{
  /* <h1 class="card-title"><img src="${country.flags.png}" alt="">
${country.name.official}</h1>
<p class="item_title">capital: <span class="item-value">${country.capital}</span></p>
<p class="item_title">population: <span class="item-value">${country.population}</span></p>
<ul class="item_title">languages:${languagesListTmplt}</ul>   */
}

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов
// https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies
// ?fields=name.official,capital,population,flags.svg,languages
