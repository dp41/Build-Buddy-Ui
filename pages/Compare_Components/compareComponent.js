import { componentDataArray } from "../Data/componentData.js";

function getComponentTypeFromURL() {
  return new URLSearchParams(window.location.search).get('type');
}

function populateDropdowns() {
  const dropdowns = document.querySelectorAll('.product-dropdown');
  const componentType = getComponentTypeFromURL();

  const selectedValues = Array.from(dropdowns)
    .map(dropdown => dropdown.value)
    .filter(Boolean);

  dropdowns.forEach(dropdown => {
    const previousSelection = dropdown.value;
    dropdown.innerHTML = '<option value="" disabled selected>Select Product</option>';

    if (componentType && componentDataArray[componentType]) {
      componentDataArray[componentType].forEach(component => {
        if (!selectedValues.includes(component.name) || component.name === previousSelection) {
          const optionElement = new Option(component.name, component.name);
          if (component.name === previousSelection) {
            optionElement.selected = true;
          }
          dropdown.add(optionElement);
        }
      });
    } else {
      dropdown.add(new Option('No components available', ''));
    }
  });
}

function updateComponentDetails(dropdown) {
  const componentType = getComponentTypeFromURL();
  const componentDetailsDiv = dropdown.closest('.comparison-column').querySelector('.component-details');
  const selectedComponent = componentDataArray[componentType]?.find(c => c.name === dropdown.value);

  if (selectedComponent) {
    componentDetailsDiv.querySelector('#component-image').src = selectedComponent.image || '';
    componentDetailsDiv.querySelector('#component-name').textContent = selectedComponent.name || 'No name available';
    componentDetailsDiv.querySelector('#component-description').textContent = selectedComponent.description || 'No description available';
    componentDetailsDiv.querySelector('#component-price').textContent = selectedComponent.price ? `₹${selectedComponent.price}` : 'No price available';
    componentDetailsDiv.classList.remove('hidden');
  } else {
    componentDetailsDiv.classList.add('hidden');
  }

  populateDropdowns();
}

function updateAddButtonState() {
  const comparisonSection = document.getElementById('comparison-section');
  const addButton = document.getElementById('add-comparison');
  const removeButtons = document.querySelectorAll('.remove-column');

  const maxColumnsReached = comparisonSection.children.length >= 4; // 3 components + 1 "+" button
  addButton.disabled = maxColumnsReached;
  addButton.classList.toggle('opacity-50', maxColumnsReached); // Adjust opacity when disabled

  // Enable/disable remove buttons based on the number of columns
  removeButtons.forEach(button => {
    button.disabled = !maxColumnsReached;
    button.classList.toggle('opacity-50', !maxColumnsReached);
  });
}

function addComparisonColumn() {
  const comparisonSection = document.getElementById('comparison-section');

  if (comparisonSection.children.length < 5) { // Limit to 3 components
    const newColumn = document.createElement('div');
    newColumn.className = 'comparison-column relative flex flex-col items-center p-4 bg-white shadow-lg rounded-lg w-full md:w-1/2 lg:w-1/4';
    newColumn.innerHTML = `
      <button class="remove-column absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-lg flex items-center justify-center opacity-50" disabled>x</button>
      <select class="product-dropdown p-2 border border-gray-300 rounded w-full mt-10">
        <option value="" disabled selected>Select Product</option>
      </select>
      <div class="component-details mt-4 p-2 border border-gray-300 rounded w-full hidden">
        <img src="" alt="Product Image" class="w-full h-auto mb-2" id="component-image">
        <h2 id="component-name" class="text-xl font-bold mb-2"></h2>
        <p id="component-description" class="text-gray-700"></p>
        <p id="component-price" class="text-lg font-semibold mt-2"></p>
      </div>
    `;
    comparisonSection.insertBefore(newColumn, document.getElementById('add-comparison-container'));
    populateDropdowns();

    newColumn.querySelector('.product-dropdown').addEventListener('change', (event) => updateComponentDetails(event.target));
    updateAddButtonState();
  }
}

function removeComparisonColumn(event) {
  if (event.target.classList.contains('remove-column')) {
    const columns = document.querySelectorAll('.comparison-column');
    
    if (columns.length > 2) {
      event.target.closest('.comparison-column').remove();
      populateDropdowns();
      updateAddButtonState();
    } else {
      showNotification("At least 2 comparison columns are required.");
    }
  }
}

function hideNotification() {
  document.getElementById('notification').classList.add('hidden');
}

function closeNotification() {
  hideNotification();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  
  document.getElementById('add-comparison').addEventListener('click', addComparisonColumn);
  document.getElementById('comparison-section').addEventListener('click', removeComparisonColumn);
  document.getElementById('close-notification').addEventListener('click', closeNotification);

  document.querySelectorAll('.product-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', (event) => updateComponentDetails(event.target));
  });

  updateAddButtonState();
});
