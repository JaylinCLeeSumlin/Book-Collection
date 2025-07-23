// const { createElement } = require("react");

const books = [];

window.addEventListener("DOMContentLoaded", () => {
    fetch("books.json")
        .then(response => response.json())
        .then(data =>{
            for (let i = 0; i < data.length; i++) {
                books.push(data[i]);
            }
            displayAllBooks();
        });

})

function displayAllBooks () {
    books.sort((a, b) => a.properties.title.localeCompare(b.properties.title));

    // To track which sections already have headers
    const addedSections = new Set();
    const sectionGrids = {};

    books.forEach(b => {
        const firstChar = b.properties.title[0].toUpperCase();
        // To check if the first character is a number
        const isNumeric = parseFloat(firstChar);

        // If firstChar is a number, sectionID is "numBooks" and sectionLabel is "0-9".
        // Otherwise, both are assigned firstChar
        const sectionId = isNumeric ? "numBooks" : firstChar;
        const sectionLabel = isNumeric ? "0-9" : firstChar;

        // Find the sections with the assigned id
        const bookContainer = document.getElementById(sectionId);

        const grid = document.createElement("div");

        // If the section has NOT been created yet, create the header; add the label; add the header to the section; add the new section to set
        if (!addedSections.has(sectionId)) {
            const sectionHeader = document.createElement("h2");
            sectionHeader.textContent = sectionLabel;
            bookContainer.appendChild(sectionHeader);

            const grid = document.createElement("div");
            grid.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";
            bookContainer.appendChild(grid);

            sectionGrids[sectionId] = grid;
            addedSections.add(sectionId);

        }
        sectionGrids[sectionId].appendChild(createBookElement(b));
    });
}

function createBookElement(b) {
    var col = document.createElement("div");
    col.className = "col";

    var bookCard = document.createElement("div");
    bookCard.className = "card";
    bookCard.style = "width: 18rem;";

    var bookOwned = b.properties.owned ? "images/owned/" : "images/notOwned/";
    bookOwned += `${b.properties.imgURL}.png`;

    var img = document.createElement("img");
    img.src = bookOwned;
    img.className = "card-img-top";
    img.alt = `${b.properties.title} book cover`;
    bookCard.appendChild(img);

    var innerDiv = document.createElement("div");
    innerDiv.className = "card-body";

    bookTitle = document.createElement("h5");
    bookTitle.textContent = b.properties.title;
    bookTitle.className = "card-title";
    innerDiv.appendChild(bookTitle);

    bookInfo = document.createElement("p");
    bookInfo.className = "card-text";
    // console.log(b.properties);
    innerDiv.appendChild(bookInfo);

    bookLink = document.createElement("a");
    bookLink.href = b.properties.link;
    bookLink.target = "__blank";
    bookLink.className = "btn btn-primary";
    bookLink.textContent = "Click here to purchase"
    innerDiv.appendChild(bookLink);

    bookCard.appendChild(innerDiv);
    col.appendChild(bookCard);

    return col;
}