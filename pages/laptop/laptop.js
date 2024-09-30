// script.js
const laptopData = [
    {
        id: 1,
        category: "Gaming Laptops",
        name: "MSI Titan 18 HX",
        price: 1399.99,
        image: "https://cdn.mos.cms.futurecdn.net/2sxM45bUop33LkA8kaZjQL-320-80.jpg",
        description: "The MSI Titan 18 HX is a powerful gaming laptop with a 18-inch mini-LED display, Intel Core i9-14900HX processor, and Nvidia GeForce RTX 4090 Laptop GPU."
    },
    {
        id: 2,
        category: "Business Laptops",
        name: "Dell Inspiron 15 3520",
        price: 699.99,
        image: "https://i.dell.com/sites/imagecontent/app-merchandising/responsive/Shop/Browse/assets/en/PublishingImages/laptop-inspiron-14-3437-pdp-design-1_jpg.jpg",
        description: "The Dell Inspiron 15 3520 is a reliable business laptop with a 15.6-inch Full HD display, Intel Core i5-1135G7 processor, and 8GB of RAM."
    },
    {
        id: 3,
        category: "Budget Laptops",
        name: "Acer Aspire  3",
        price: 299.99,
        image: "https://www.acer.com/ac/en-US/content/aspire3/images/aspire3-hero.jpg",
        description: "The Acer Aspire 3 is a budget-friendly laptop with a 14-inch Full HD display, Intel Core i3-1115G4 processor, and 4GB of RAM."
    }
    // Add more laptops here...
];

const laptopGrids = document.querySelectorAll(".laptop-grid");

laptopData.forEach((laptop) => {
    const laptopCard = document.createElement("div");
    laptopCard.classList.add("laptop-card");

    const laptopImage = document.createElement("img");
    laptopImage.src = laptop.image;
    laptopCard.appendChild(laptopImage);

    const laptopName = document.createElement("h3");
    laptopName.textContent = laptop.name;
    laptopCard.appendChild(laptopName);

    const laptopPrice = document.createElement("p");
    laptopPrice.textContent = `$${laptop.price}`;
    laptopCard.appendChild(laptopPrice);

    const laptopDescription = document.createElement("p");
    laptopDescription.textContent = laptop.description;
    laptopCard.appendChild(laptopDescription);

    const laptopButton = document.createElement("button");
    laptopButton.textContent = "Buy Now";
    laptopCard.appendChild(laptopButton);

    const laptopGrid = laptopGrids.find((grid) => grid.parentNode.id === laptop.category.toLowerCase().replace(" ", "-"));
    laptopGrid.appendChild(laptopCard);
});