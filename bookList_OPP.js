// Class Book: To add new book into book store
class Book{
	constructor(title, author, isbn){
		this.title = title,
		this.author = author,
		this.isbn = isbn
	}
}

// Class BookStorage: Reserce and Display Stored Book
class BookStorage{
	static displayBooks(){
		const storedBooks = [
			{
				title: 'C Programming',
				author: 'Tamim Shariar Subin',
				isbn: 3290
			},
			{
				title: 'Bolod To Boos',
				author: 'Jhankar Mahbub',
				isbn: 39029022
			},
			{
				title:'Rich Dad Poor Dad',
				author: 'Robert T. Kaysaki',
				isbn: 90233242
			},
		];
		//console.log(storedBooks);
		const books = storedBooks;

		books.forEach(function(book){
			//console.log(book);
			UI.addBookToList(book);
		});
	}
}

// Class UI: To Display or Remove Book and other user interactions
class UI{
	static addBookToList(book){
		const tBody = document.querySelector('#book-list');
		const tRow = document.createElement('tr');
		
		tRow.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="delete">X</a></td>
		`;

		tBody.appendChild(tRow);
	}

	static clearBookFormFilds(){
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
	/*static addBookToStorage(newBook){
		BookStorage.displayBooks().storedBooks.push(newBook);
		console.log(storedBooks);
	}*/

	static deleteBook(el){
		el.remove();
	}
}

// Event(DOMContentLoaded) : Event to display books
document.addEventListener('DOMContentLoaded', function(){
	BookStorage.displayBooks();
});

// Event(submit) : Event to add book into storage
document.querySelector('#book-form').addEventListener('submit', function(e){
	// Prevent Defualt form Submission
	e.preventDefault();
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	const newBook = new Book(title, author, isbn);
	//console.log(newBook);

	// Clear form fields
	UI.clearBookFormFilds();
	//UI.addBookToStorage(newBook);
});

// Event(click) : To remove a book
document.querySelector('#book-list').addEventListener('click', function(e){
	console.log(e.target);
	const removalRow = e.target.parentElement.parentElement;
	//console.log(removalRow);
	
	if(e.target.classList.contains('delete')){
		UI.deleteBook(removalRow);
	}
});