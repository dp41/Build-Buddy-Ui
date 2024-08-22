import {components} from "../Data/compareComponentList.js"

// Function to generate cards
function generateCards() {
    const container = document.getElementById('cards-container');
    components.forEach(component => {
        const card = `
            <div class="card flex flex-col items-center gap-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-custom-light overflow-hidden">
                <div class="card-bg w-full h-48 bg-center bg-cover" style="background-image: url('${component.image}');"></div>
                <div class="card-content p-4 flex flex-col justify-between items-center text-center text-custom-dark sm:hidden">
                    <h3 class="text-xl font-semibold">${component.name}</h3>
                    <a href="${component.link}" class="text-custom-primary hover:underline compare-link">Compare →</a>
                </div>
                <div class="card-content p-4 flex flex-col justify-between items-center text-center text-custom-dark sm:flex hidden">
                    <h3 class="text-xl font-semibold">${component.name}</h3>
                    <p class="text-sm">
                        ${component.description}
                        <a href="${component.link}" class="text-custom-primary hover:underline compare-link">Compare →</a>
                    </p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Generate the cards when the page loads
window.onload = generateCards;
