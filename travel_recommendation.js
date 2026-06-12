const destinationsContainer = document.getElementById("destinations");
const searchInput = document.getElementById("search-word").value;

async function search() {
  try {
    const response = await fetch("travel_recommendation_api.json");

    if (!response.ok) {
      throw new Error("Failed to load JSON file");
    }
    
    const destinations = await response.json();
    
    let filteredDestinations = findDestination(destinations, searchInput)
    renderDestinations(filteredDestinations);
  } catch (error) {
    destinationsContainer.innerHTML = `
      <p style="color:red; ">
        Error loading articles: ${error.message}
      </p>
    `;
  }
}
function findDestination(data, searchWord){
    let target = searchWord.toLowerCase().trim();
    let result = [];
    data.countries.forEach(country => {
        console.log(country.name)
        if(target.length > 0 && country.name.toLowerCase().includes(target)){
            result.push(country.cities)
        }
    } )
    if(target.length > 0 && target.includes("temple")){
        result.push(data.temples)
    }
    if(target.length > 0 && target.includes("beach")){
        result.push(data.beaches)
    }
    return result
}

function renderDestinations(destinations) {
    destinationsContainer.innerHTML = "";
    if(!destinations){
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
    console.log(d)
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

