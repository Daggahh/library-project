const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement("p");
    readStatus.textContent = book.isRead ? "Status: Read" : "Status: Not Read";

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read";
    toggleButton.classList.add("toggle-read");
    toggleButton.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayBooks();
    });

    buttonDiv.appendChild(toggleButton);
    buttonDiv.appendChild(deleteButton);


    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(buttonDiv);
    // bookCard.appendChild(toggleButton);
    // bookCard.appendChild(deleteButton);

    booksContainer.appendChild(bookCard);
  });
}

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    event.target.reset();
    toggleFormVisibility();
  });

document
  .getElementById("newBookButton")
  .addEventListener("click", toggleFormVisibility);

function toggleFormVisibility() {
  const form = document.getElementById("bookForm");
  form.classList.toggle("hidden");
}

displayBooks();
