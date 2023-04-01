function toggleMode() {
    var body = document.body;
    let head = document.querySelector(".head")
    let form = document.querySelector(".form-control")
    let text = document.querySelector("#mode-toggle")
    let group = document.querySelector(".input-group-prepend")
    var input = document.querySelector(".input-group-text")
    let filter = document.querySelector("#filter")
    head.classList.toggle("dark-mode");
    text.classList.toggle("dark-mode");
    form.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    input.classList.toggle("dark-mode");
    group.classList.toggle("dark-mode");
    filter.classList.toggle("dark-mode");

  }
 
// Define variables for search and filter inputs
const searchCountryInput = document.getElementById('search-country');
const filterRegionSelect = document.getElementById('filter-region');

// Define variable for country grid container
const countryGrid = document.getElementById('country-grid');

// Load data from local JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {

    // Render initial country grid
    renderCountryGrid(data);

    // Add event listeners to search and filter inputs
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

// Render country grid based on provided data
function renderCountryGrid(data) {
  let html = '';
  for (const country of data) {
    html += '<div class="grid-item">';
    html += '<img class="flag-img" src="' + country.flags.svg + '">';
    html += '<div class="country-name">' + country.name + '</div>';
    html += '<div class="country-region">' + country.region + '</div>';
    html += '<div class="country-population">' + country.population + '</div>';
    html += '<div class="country-capital">' + country.capital + '</div>';
    html += '</div>';
  }
  countryGrid.innerHTML = html;
}

  
  
  