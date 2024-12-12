const bookDisplay = document.querySelector('#book-display');
const myLibrary = [];
const dialog = document.querySelector('.dialog');
const openDialog = document.querySelector('.open-dialog');
const form = document.querySelector('.new-book-form');
const addBook = document.querySelector('.add-book');

// construct book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };
};

// listen for user to begin adding new book
openDialog.addEventListener('click', () => {
    dialog.showModal();
});

// listen for user to finish adding new book
addBook.addEventListener('click', addBookToLibrary);

// show books
function displayBooks() {
    
    // clear book display
    bookDisplay.innerHTML = "";

    // create new book display
    for (let i = 0; i < myLibrary.length; i++) {

        // get array of book details
        bookDetails = myLibrary[i];

        // get index of book in array
        const bookIndex = myLibrary.indexOf(bookDetails);
        
        // create card for each book
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');

        // create place for book title on each each book card
        const bookTitleDiv = document.createElement('div');
        bookTitleDiv.classList.add('book-title');
        bookDiv.appendChild(bookTitleDiv);

        // create place for book author on each book card
        const bookAuthorDiv = document.createElement('div');
        bookAuthorDiv.classList.add('book-details');
        bookDiv.appendChild(bookAuthorDiv);

        // create place for book pages on each book card
        const bookPagesDiv = document.createElement('div');
        bookPagesDiv.classList.add('book-details');
        bookDiv.appendChild(bookPagesDiv);

        // create place for book status on each book card
        const bookReadDiv = document.createElement('div');
        bookReadDiv.classList.add('book-details');
        bookDiv.appendChild(bookReadDiv);

        // create button for deleting book
        const bookDelete = document.createElement('button');
        bookDelete.classList.add('button');
        bookDelete.classList.add('remove-book');
        bookDelete.setAttribute('book-array-index',bookIndex);
        bookDelete.textContent = "Remove Book";
        bookDiv.appendChild(bookDelete);

        // add event listener to new button for removing book
        bookDelete.addEventListener('click', removeBookFromLibrary);

        // create button for changing read status
        const readStatus = document.createElement('button');
        readStatus.classList.add('button');
        readStatus.classList.add('read-status');
        readStatus.setAttribute('book-array-index',bookIndex);
        readStatus.textContent = "Change Read Status";
        bookDiv.appendChild(readStatus);

        // add event listener to new button for changing read status
        readStatus.addEventListener('click', changeReadStatus);

        // prepare book details
        const bookTitle = bookDetails.title;
        const bookAuthor = "Author: " + bookDetails.author;
        const bookPages = "Pages: " + bookDetails.pages;
        const bookRead = "Read Status: " + bookDetails.read
        
        // add text to book card
        bookTitleDiv.textContent = bookTitle;
        bookAuthorDiv.textContent = bookAuthor;
        bookPagesDiv.textContent = bookPages;
        bookReadDiv.textContent = bookRead;

        // update list of buttons
        buttons = document.querySelectorAll('.button');

        console.log(buttons);

        // add card to book display
        bookDisplay.appendChild(bookDiv);
    }
};

// add book to library
function addBookToLibrary() {
    
    // store information from form
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value;

    // add form details to new book object
    const newBook = new Book(title, author, pages, read);

    // add new book object to array
    myLibrary.push(newBook);

    // update library
    displayBooks();
};

// remove book from library
function removeBookFromLibrary() {
    // get book index in myLibrary array
    const bookIndex = document.activeElement.getAttribute('book-array-index');
    
    // remove book from myLibrary based on book index
    myLibrary.splice(bookIndex,1);
    
    // update library
    displayBooks();
};

// change read status of book
function changeReadStatus() {
    // get book index in myLibrary array
    const bookIndex = document.activeElement.getAttribute('book-array-index');

    // change read status of book
    if (myLibrary[bookIndex].read == "read") {
        myLibrary[bookIndex].read = "not read yet"
    } else myLibrary[bookIndex].read = "read"

    // update library
    displayBooks();

}

// populate page with books to start
const book1 = new Book('title1', 'author1', '200', 'read');
const book2 = new Book('title2', 'author2', '400', 'not read yet');
myLibrary.push(book1, book2);

// display initial set of books
displayBooks();