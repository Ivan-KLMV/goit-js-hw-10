!function(){var e=document.querySelector("#search-box");document.querySelector(".country-list");e.addEventListener("input",(function(e){var n=e.target.value;if(""===n)return;console.log(""===n),o=n,fetch("https://restcountries.com/v3.1/name/".concat(o,"?fields=name,capital,population,flags,languages")).then((function(e){if(console.log(e),!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return e.length>10?console.log("Too many matches found. Please enter a more specific name."):(console.log(e),e)})).catch((function(e){console.log("Oops, there is no country with that name")}));var o}))}();
//# sourceMappingURL=index.4a520cde.js.map
