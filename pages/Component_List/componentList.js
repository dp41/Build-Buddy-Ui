import { componentDataArray } from "../Data/componentData.js"; // Ensure the file path is correct
import { filterOptions } from '../Data/filterOptions.js';

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const componentType = urlParams.get("type") || "default";

    const componentTitles = {
        cpu: "CPU",
        gpu: "GPU",
        ram: "RAM",
        storage: "Storage",
        motherboard: "Motherboard",
        power_supply: "Power Supply",
        cabinet: "Cabinet",
        cooler: "Cooler",
    };

    const pageTitleElement = document.getElementById("page-title");
    pageTitleElement.textContent = componentTitles[componentType] || "Component List";
    pageTitleElement.classList.add("text-custom-dark");

    let componentList = componentDataArray[componentType] || [];
    const componentListElement = document.getElementById("component-list");

    // Function to create and append cards
    const createCard = ({ name, image, price }) => {
        return `
      <div class="component-card group flex flex-col items-center gap-4 rounded-lg bg-white p-6 border shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-custom-primary duration-300 cursor-pointer relative">
        <img src="${image}" alt="${name}" class="h-28 w-28 rounded-lg mb-4">
        <h3 class="text-xl font-semibold text-custom-dark">${name}</h3>
        <p class="text-lg text-gray-600">₹${price}</p>
        <a href="/pages/Component_Detail_Page/componentDetail.html?type=${componentType}&name=${encodeURIComponent(name)}"
           class="bg-custom-dark text-white rounded-full py-2 px-4 mt-4 text-center font-semibold hover:bg-blue-700 transition-colors duration-300">
          Show More
        </a>
      </div>
    `;
    };

    // Function to render components
    const renderComponentList = (filteredComponentList) => {
        componentListElement.innerHTML = filteredComponentList.map(createCard).join("");
    };

    // Initial render of component list
    renderComponentList(componentList);

    // Price range input
    const priceRangeInput = document.getElementById("price-range");
    const minPriceDisplay = document.getElementById("min-price");
    const maxPriceDisplay = document.getElementById("max-price");

    // Display initial price range values
    minPriceDisplay.textContent = priceRangeInput.min;
    maxPriceDisplay.textContent = priceRangeInput.max;

    // Function to filter components based on selected price range
    const filterByPrice = () => {
        const maxPrice = parseInt(priceRangeInput.value);
        const filteredByPrice = componentList.filter(component => component.price <= maxPrice);
        renderComponentList(filteredByPrice);
    };

    // Event listener for price range input
    priceRangeInput.addEventListener("input", () => {
        maxPriceDisplay.textContent = priceRangeInput.value;
        filterByPrice();
    });

    // Get the filter options
    const categoryListElement = document.getElementById("category-list");
    const selectedOptions = filterOptions[componentType] || {};

    // Populate the filter section with dynamic options
    for (const [category, options] of Object.entries(selectedOptions)) {
        const categoryHeader = document.createElement('h4');
        categoryHeader.classList.add('font-bold', 'mt-4');
        categoryHeader.textContent = category; // Header for nested category
        categoryListElement.appendChild(categoryHeader);
        
        options.forEach(option => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" id="${option}" data-category="${category}" class="filter-checkbox"/> <label for="${option}">${option}</label>`;
            categoryListElement.appendChild(li);
        });
    }

    // Function to filter components based on selected options
    const filterComponents = () => {
        // Get selected checkboxes
        const selectedFilters = {};
        const checkboxes = document.querySelectorAll(".filter-checkbox:checked");
        
        checkboxes.forEach((checkbox) => {
            const category = checkbox.getAttribute("data-category");
            const option = checkbox.id;

            if (!selectedFilters[category]) {
                selectedFilters[category] = [];
            }
            selectedFilters[category].push(option);
        });

        // Filter the component list based on selected filters
        const filteredList = componentList.filter((component) => {
            return Object.entries(selectedFilters).every(([category, selectedOptions]) => {
                return selectedOptions.includes(component[category]);
            });
        });

        renderComponentList(filteredList);
    };

    // Event listeners for filter checkboxes
    const filterCheckboxes = document.querySelectorAll(".filter-checkbox");
    filterCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", filterComponents);
    });
    
});
