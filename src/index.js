import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import './css/country-info.css';
import './css/country-list.css';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriyCard = document.querySelector('.country-info');

searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY, { trailing: true })
);

function searchCountries(evt) {
  const currentInputValue = evt.target.value.trim();
  if (currentInputValue === '') {
    clearTmplt();
    return;
  }

  return fetchCountries(currentInputValue)
    .then(countries => {
      if (countries.length > 10) {
        clearTmplt();

        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        clearTmplt();
        return createTmpltList(countries);
      }

      clearTmplt();
      return createTmpltCard(countries);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createTmpltList(countries) {
  clearTmplt();
  countriesList.insertAdjacentHTML('beforeend', countriesTmpltList(countries));
}

function createTmpltCard(countries) {
  clearTmplt();
  countriyCard.classList.add('has-content');
  countriyCard.insertAdjacentHTML('beforeend', countriesTmpltCard(countries));
}

function clearTmplt() {
  countriyCard.classList.remove('has-content');
  countriesList.innerHTML = '';
  countriyCard.innerHTML = '';
}

function countriesTmpltList(countries) {
  return countries
    .map(
      country =>
        `<li class="list-item"><img src="${country.flags.png}" alt="${country.name.official}">
  <p>${country.name.official}</p>
</li>`
    )
    .join('');
}

function countriesTmpltCard(countries) {
  return countries
    .map(country => {
      return `<h1 class="card-title"><img src="${country.flags.png}" alt="">
      ${country.name.official}</h1>
      <p class="item_title">capital: <span class="item-value">${
        country.capital
      }</span></p>
      <p class="item_title">population: <span class="item-value">${
        country.population
      }</span></p>
      <ul class="item_title">languages:${createLanguagesList(
        country.languages
      )}</ul>`;
    })
    .join('');
}

function createLanguagesList(languages) {
  const languagesList = Object.values(languages);
  const languagesListTmplt = languagesList
    .map(item => `<li class="item-value">${item}</li>`)
    .join('');
  return languagesListTmplt;
}
