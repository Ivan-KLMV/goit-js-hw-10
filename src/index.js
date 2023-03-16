import './css/styles.css';
import debounce from 'lodash.debounce';
const searchInput = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');

searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries(evt) {
  const currentInputValue = evt.target.value;
  if (currentInputValue === '') {
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
        return console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      console.log(countries);
      return countries;
    })
    .catch(error => {
      console.log('Oops, there is no country with that name');
    });
}

// function createTmplt(countries) {
//   countryList.insertAdjacentHTML('beforeend', countriesTemplate(countries));
// }
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов
// https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies
// ?fields=name.official,capital,population,flags.svg,languages
