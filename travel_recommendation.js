const destinationsContainer = document.getElementById("destinations");
const searchInput = document.getElementById("destination");
async function search() {
  try {
    const response = await fetch("travel_recommendation.json");

    if (!response.ok) {
      throw new Error("Failed to load JSON file");
    }
    
    const destinations = await response.json();
    console.log(destinations)
    
    let filteredDestinations = findDestination(destinations, searchInput)
    renderDestinations(filteredDestinations);
  } catch (error) {
    articlesContainer.innerHTML = `
      <p style="color:red;">
        Error loading articles: ${error.message}
      </p>
    `;
  }
}
function findDestination(data, searchWord){
    let target = searchWord.toLowerCase().trim();
    let result = [];
    data.Countries.forEach(country => {
        if(country.name.toLowerCase().includes(target)){
            result.push(country.cities)
        }
    } )
    data.temples.forEach(temple => {
        if(temple.toLowerCase().trim().includes(target)){
            result.push(data.temples)
        }
    })
    data.beaches.forEach(beach => {
        if(beach.toLowerCase().trim().includes(target)){
            result.push(data.beaches)
        }
    })
}

function renderDestinations(destinations) {
    destinationsContainer.innerHTML = "";
    if(destinations.length == 0){
        destinationElement.innerHTML = `
        <h1>
            Search results
        </h1>
        <div class='destination-items'>
          <h2>No destinations found</h2>
        </div>

    `;
    }
    destinations.forEach(d => {
    const destinationElement = document.createElement("div");

    destinationElement.innerHTML = `
        <h1>
            Search results
        </h1>
        <div class='destination-items'>
            <img src='${d.image}' alt='${d.name}' width='250px' height='150px'/>
            <h2>${d.name}</h2>
            <p>
            <strong>Description:</strong>
            ${d.description}
            </p>
        </div>

    `;

    destinationsContainer.appendChild(destinationElement);
    });
    }

search();