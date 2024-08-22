// Import the component data from the module
import { componentData } from '../Data/componentData.js'; // Ensure the file extension is correct

// Cache DOM elements
const componentNameElem = document.getElementById('componentName');
const componentDescriptionElem = document.getElementById('componentDescription');
const componentImageElem = document.getElementById('componentImageSrc');
const specificationTableBody = document.getElementById('specificationTable').getElementsByTagName('tbody')[0];
let priceChart;

// Function to dynamically load component details
function loadComponentDetails(type, name) {
    const component = componentData[type]?.[name]; // Use optional chaining to handle missing data
    console.log(component);
    
    if (component) {
        componentNameElem.innerText = name;
        componentImageElem.src = component.image;

        // Update the price element
        const componentPriceElem = document.getElementById('componentPrice');
        componentPriceElem.innerText = `Price: ₹${component.price}`;

        // Clear the existing table rows
        specificationTableBody.innerHTML = '';
        Object.entries(component.specifications).forEach(([spec, detail]) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="py-2 px-4 text-sm text-gray-500">${spec}</td>
                             <td class="py-2 px-4 text-sm text-gray-500">${detail}</td>`;
            specificationTableBody.appendChild(row);
        });

        // Display the description as a list
        componentDescriptionElem.innerHTML = ''; // Clear existing content
        if (typeof component.description === 'string') {
            // Split the description into items based on a delimiter (e.g., period followed by a space)
            const items = component.description.split('. ').filter(item => item.trim() !== '');
            if (items.length > 0) {
                const ul = document.createElement('ul');
                ul.classList.add('list-disc', 'ml-5'); // Tailwind CSS classes for list styling
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    ul.appendChild(li);
                });
                componentDescriptionElem.appendChild(ul);
            } else {
                // Fallback if no valid items
                componentDescriptionElem.innerText = 'No description available.';
            }
        } else {
            // Fallback if description is not a string
            componentDescriptionElem.innerText = 'Invalid description format.';
        }

        // Load price history chart
        const ctx = document.getElementById('priceChart').getContext('2d');
        const labels = component.priceHistory.map(entry => entry.date);
        const data = component.priceHistory.map(entry => parseFloat(entry.price.replace(/,/g, '')));

        if (priceChart) {
            priceChart.destroy();
        }

        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Price History',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    } else {
        console.error('Component not found.');
    }
}

// Extract query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
const name = urlParams.get('name');

// Load the component details if type and name are provided
if (type && name) {
    loadComponentDetails(type, name);
} else {
    console.error('Component type and name are required in the URL query parameters.');
}

