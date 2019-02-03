//const tBody = document.getElementById('book-list');
const tBody = document.querySelector('#book-list');
//var bookList = [];
var newBook = {};

// Get book list
const bookSubmit = document.querySelector('#bs-form');

bookSubmit.addEventListener('submit', function(e){

	e.preventDefault();

	let title = document.querySelector('#title').value;
	let author = document.querySelector('#author').value;
	let isbn = document.querySelector('#isbn').value;	

	newBook['title']= title; 
	newBook['author']= author; 
	newBook['isbn']= isbn;

	addBooks();
	addBookToTable(title, author, isbn);

	// Remove field value
	document.querySelector('#title').value = '';
	document.querySelector('#author').value = '';
	document.querySelector('#isbn').value = '';

});

// Add Books to the Local Storage
function addBooks(){

	var storedBook = JSON.parse(window.localStorage.getItem('bookApp'));

	if(storedBook == null){
		var aBook = [];
		aBook.push(newBook);
		window.localStorage.setItem('bookApp', JSON.stringify(aBook));
	}else{
		storedBook.push(newBook);
		window.localStorage.setItem('bookApp', JSON.stringify(storedBook));
	}

}

// Add Book to table
function addBookToTable(title, author, isbn){

	var newBookTr = document.createElement('tr');

	newBookTr.innerHTML = `
	<td>${title}</td>
	<td>${author}</td>
	<td>${isbn}</td>
	<td><a href="#" class="delete dl">X</a></td>`;
	tBody.appendChild(newBookTr);

}

// Retrieve book from local storage and display into the table
function showBooks(){

	var bookStorage = JSON.parse(window.localStorage.getItem('bookApp'));

	if(bookStorage != null){
		
	bookStorage.forEach(function(book){
	var newBookTr = document.createElement('tr');
	newBookTr.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="#" class="delete dl">X</a></td>`;
	tBody.appendChild(newBookTr);
	});

	}	

}

window.addEventListener('DOMContentLoaded', showBooks);

// Remove Book from the Table
tBody.addEventListener('click', function(e){

	const removalA = e.target;
	if(removalA.classList.contains('delete')){
		removalA.parentElement.parentElement.remove();
		removeBook(removalA.parentElement.previousElementSibling.textContent);
		//console.log(removalA.parentElement.previousElementSibling.textContent);
	}

});

// Remove Book from the Storage
function removeBook(isbn){

	let books = JSON.parse(localStorage.getItem('bookApp'));
	
	books.forEach(function(book, i){
		if(isbn == book.isbn){
			books.splice(i, 1);
			localStorage.setItem('bookApp', JSON.stringify(books));
		}
	});
	//console.log(JSON.parse(localStorage.getItem('bookApp')));
}

removeBook();