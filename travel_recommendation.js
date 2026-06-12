const destinationsContainer = document.getElementById("destinations");

async function search() {
    try {
        const searchInput = document.getElementById("search-word").value.trim();

        const response = await fetch("travel_recommendation_api.json");

        if (!response.ok) {
            throw new Error("Failed to load JSON file");
        }
        const destinations = await response.json();
        const filteredDestinations = findDestination(destinations,searchInput);
        renderDestinations(filteredDestinations);

    } catch (error) {
        destinationsContainer.innerHTML = `
            <p style="color:red;">
                ${error.message}
            </p>
        `;
    }
}

function findDestination(data, searchWord) {
    const target = searchWord.toLowerCase().trim();
    const results = [];

    data.countries.forEach(country => {
        if (country.name.toLowerCase() === target) {
            results.push(...country.cities);
            return;
        }
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(target)) {
                results.push(city);
            }
        });
    });
    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(target)) {
            results.push(temple);
            return;
        }
    });
    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(target)) {
            results.push(beach);
            return;
        }
    });

    if (target.includes("temple")) {
        results.push(...data.temples);
    }

    if (target.includes("beach")) {
        results.push(...data.beaches);
    }

    return results;
}
function renderDestinations(destinations) {
    destinationsContainer.innerHTML = `
        <h1>Search Results</h1>
    `;

    if (destinations.length === 0) {
        destinationsContainer.innerHTML += `
            <p>No destinations found.</p>
        `;
        return;
    }

    destinations.forEach(destination => {
        const destinationElement = document.createElement("div");

        destinationElement.classList.add("destination-items");

        destinationElement.innerHTML = `
            <img
                src="${destination.imageUrl}"
                alt="${destination.name}"
                width="250"
                height="150"
            />
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
        `;

        destinationsContainer.appendChild(destinationElement);
    });
}