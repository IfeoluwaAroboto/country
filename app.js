function toggleMode() {
    var body = document.body;
    let head = document.querySelector(".head")
    let form = document.querySelector(".form-control")
    let text = document.querySelector("#mode-toggle")
    let group = document.querySelector(".input-group-prepend")
    var input = document.querySelector(".input-group-text")
    const bodys = document.querySelector('#body');
    let filter = document.querySelector("#filter")
    head.classList.toggle("dark-mode");
    text.classList.toggle("dark-mode");
    form.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    input.classList.toggle("dark-mode");
    group.classList.toggle("dark-mode");
    filter.classList.toggle("dark-mode");
    bodys.classList.toggle('dark-mode');

  }
 
const searchCountryInput = document.getElementById('search-country');
const filterRegionSelect = document.getElementById('filter-region');

const countryGrid = document.getElementById('country-grid');

fetch('data.json')
  .then(response => response.json())
  .then(data => {

    renderCountryGrid(data);

    searchCountryInput.addEventListener('input', () => {
      const searchTerm = searchCountryInput.value.toLowerCase().trim();
      const filteredData = data.filter(country => country.name.toLowerCase().includes(searchTerm));
      renderCountryGrid(filteredData);
    });

    filterRegionSelect.addEventListener('change', () => {
      const filterValue = filterRegionSelect.value;
      const filteredData = filterValue ? data.filter(country => country.region === filterValue) : data;
      renderCountryGrid(filteredData);
    });

  })
  .catch(error => console.log(error));

  function renderCountryGrid(data) {
    let html = '';
    for (const country of data) {
      html += '<a href="country.html?name=' + country.name + '" class="grid-item">';
      html += '<img class="flag-img" src="' + country.flags.svg + '">';
      html += '<div class="country-name">' + country.name + '</div>';
      html += '<div class="country-region">'+ "<span> Region: </span>" + "  " + country.region + '</div>';
      html += '<div class="country-population">' + "<span> Population: </span>" + "  " + country.population + '</div>';
      html += '<div class="country-capital">' + "<span> Capital: </span>" + "  " + country.capital + '</div>';
      html += '</a>';
    }
    countryGrid.innerHTML = html;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get('name');
  
  fetch('https://restcountries.com/v2/name/' + countryName + '?fullText=true')
    .then(response => response.json())
    .then(data => {
      const country = data[0]; // assuming that the API returns an array with one element
      const countryNameElement = document.getElementById('country-name');
      countryNameElement.textContent = country.name;
      const nativeElement = document.getElementById('nativename');
      nativeElement.textContent = country.nativeName;
      const populationElement = document.getElementById('population');
      populationElement.textContent = country.population;
      const regionElement = document.getElementById('region');
      regionElement.textContent = country.region;
      const capitalElement = document.getElementById('capital');
      capitalElement.textContent = country.capital;
      const subElement = document.getElementById('sub-region');
      subElement.textContent = country.subregion;
      const flagElement = document.getElementById('flag-img');
      flagElement.src = country.flags.svg;
      const currenciesElement = document.getElementById('currencies');
      currenciesElement.textContent = country.currencies[0].code;
      const languageElement = document.getElementById('language');
      languageElement.textContent = country.languages[0].name;
      const topElement = document.getElementById('top');
      topElement.textContent = country.topLevelDomain
    })
    .catch(error => console.log(error));
  
  