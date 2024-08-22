import { componentDataArray } from "../Data/componentData.js"; // Ensure the file extension is correct

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
  pageTitleElement.textContent =
    componentTitles[componentType] || "Component List";
  pageTitleElement.classList.add("text-custom-dark");

  const componentList = componentDataArray[componentType] || [];
  const componentListElement = document.getElementById("component-list");

  // Create and append cards
  const createCard = ({ name, image, price }) => {
    return `
      <div class="component-card group flex flex-col items-center gap-4 rounded-lg bg-white p-6 border shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-custom-primary duration-300 cursor-pointer relative">
        <!-- Icons for like and chain link -->
        <div class="icon-group absolute top-2 right-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <!-- Heart Icon -->
          <svg class="icon heart-icon w-6 h-6 mb-2 cursor-pointer text-custom-dark hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <!-- Image and Component Info -->
        <img src="${image}" alt="${name}" class="h-28 w-28 rounded-lg mb-4">
        <h3 class="text-xl font-semibold text-custom-dark">${name}</h3>
        <p class="text-lg text-gray-600">₹${price}</p>
        <!-- Show More Button -->
        <a href="/pages/Component_Detail_Page/componentDetail.html?type=${componentType}&name=${encodeURIComponent(name)}"
           class="bg-custom-dark text-white rounded-full py-2 px-4 mt-4 text-center font-semibold hover:bg-blue-700 transition-colors duration-300">
          Show More
        </a>
      </div>
    `;
  };

  componentListElement.innerHTML = componentList.map(createCard).join("");

  // Heart icon toggle functionality
  componentListElement.addEventListener("click", (event) => {
    const heartIcon = event.target.closest(".heart-icon");
    if (heartIcon) {
      event.stopPropagation(); // Prevent the card click event from triggering
      const card = heartIcon.closest(".component-card");
      const isFilled = heartIcon.classList.toggle("text-red-600");
      card.classList.toggle("card-favorite", isFilled);
      heartIcon.innerHTML = isFilled
        ? `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="red" />`
        : `<path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />`;
    }
  });
});
