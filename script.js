const booksGrid = document.getElementById("booksGrid");
const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const addBookForm = document.getElementById("addBookForm");
const addBookToLibraryBtn = document.getElementById("add-to-libraryBtn");
const testBtn = document.getElementById("testBtn");

const myLibrary = [];

let uniqueID = 0;

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

Book.prototype.readToggle = function (Book) {
  console.log(Book);
  Book.isRead ? (Book.isRead = false) : (Book.isRead = true);
  updateBooksGrid();
};
// Functions -----------------------------------------------------------------------------------

// Modal functions

function openAddBookModal() {
  addBookForm.reset();
  addBookModal.classList.add("active");
}

function closeAddBookModal() {
  addBookModal.classList.remove("active");
}

// Test cards

function createTestCards() {
  let Atomic = new Book("Atomic Habits", "James Clear", 288, true);
  let Alchemist = new Book("The Alchemist", "Paulo Coelho", 208, false);
  let eatFrog = new Book("Eat That Frog", "Brian Tracy", 144, true);
  addBook(Atomic);
  addBook(Alchemist);
  addBook(eatFrog);
  createLibrary(myLibrary);
}

//Book functions

function addBook(newBook) {
  myLibrary.push(newBook);
}

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let checkState = document.getElementById("isRead");
  let isRead = checkState.checked;
  let newBook = new Book(title, author, pages, isRead);

  myLibrary.push(newBook);
  closeAddBookModal();
  updateBooksGrid();
}

function createLibrary() {
  let len = myLibrary.length;
  for (let i = 0; i < len; i++) {
    createCard(myLibrary[i], i);
  }
}
function updateBooksGrid() {
  booksGrid.innerHTML = "";
  createLibrary();
}

// Button Functions
function removeBook(index) {
  myLibrary.splice(index, 1);
  updateBooksGrid();
}
// Create card function

function createCard(Book, index) {
  var card = document.createElement("div");
  var info = document.createElement("div");
  var title = document.createElement("div");
  var author = document.createElement("div");
  var pages = document.createElement("div");

  var interaction = document.createElement("div");
  var readBtn = document.createElement("button");
  var delBtn = document.createElement("button");

  var progression = document.createElement("div");

  card.classList.add("card");
  info.classList.add("info");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  interaction.classList.add("interaction");
  readBtn.classList.add("button");
  readBtn.classList.add("readBtn");
  delBtn.classList.add("button");
  delBtn.classList.add("delBtn");

  progression.classList.add("progression");

  title.textContent = Book.title;
  author.textContent = "by " + Book.author;
  pages.textContent = "pages: " + Book.pages;
  delBtn.textContent = "Delete";
  if (Book.isRead) {
    readBtn.textContent = "Unread";
  } else {
    readBtn.textContent = "Read";
  }

  Book.isRead
    ? (progression.textContent = "Read")
    : (progression.textContent = "In Progress");

  booksGrid.appendChild(card);
  card.appendChild(info);
  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(pages);
  card.appendChild(interaction);
  interaction.appendChild(readBtn);
  interaction.appendChild(delBtn);
  card.appendChild(progression);

  delBtn.onclick = function () {
    removeBook(index);
  };

  readBtn.onclick = function () {
    Book.readToggle(Book);
  };
}

//Onclick Functions

addBookBtn.onclick = openAddBookModal;
addBookToLibraryBtn.onclick = addBookToLibrary;
testBtn.onclick = createTestCards;
