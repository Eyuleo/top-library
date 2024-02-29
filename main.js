import './style.css'
let library = []

function Book(title, author, pages) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = false
}

const saveToLocalStorage = () => {
	localStorage.setItem('books', JSON.stringify(library))
}

document.addEventListener('DOMContentLoaded', () => {
	const storedLibrary = localStorage.getItem('books')

	if (storedLibrary) {
		library = JSON.parse(storedLibrary)
	}
	upDateUi()
})

const openModal = document.querySelector('#open-modal')
const closeModal = document.querySelector('#close-modal')
const modal = document.querySelector('dialog')
const bookForm = document.querySelector('form')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const pages = document.querySelector('#pages')

openModal.addEventListener('click', () => {
	modal.showModal()
})
closeModal.addEventListener('click', () => {
	modal.close()
})

bookForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const book = new Book(title.value, author.value, pages.value)
	library.push(book)
	upDateUi()
	saveToLocalStorage()
	clearForm()
	modal.close()
})

const upDateUi = () => {
	const booksContainer = document.querySelector('#books')

	booksContainer.innerHTML = ''

	library.forEach((book) => {
		const bookContainer = document.createElement('div')
		bookContainer.setAttribute(
			'class',
			'text-center font-bold text-xl bg-white  shadow-md p-4 rounded my-3 w-11/12 md:w-[400px]'
		)

		const bookTitle = document.createElement('p')
		const bookAuthor = document.createElement('p')
		const bookPage = document.createElement('p')
		const readCheck = document.createElement('button')
		readCheck.textContent = book.read ? 'Read' : 'Not Read'
		readCheck.setAttribute(
			'class',
			'bg-red-100 py-2 px-3 text-xl font bold w-full rounded-md my-2'
		)

		const removeBook = document.createElement('button')
		removeBook.setAttribute(
			'class',
			'bg-red-500 text-white text-xl w-full py-2 px-3 rounded-md hover:bg-red-600'
		)
		removeBook.textContent = 'Remove'
		removeBook.id = 'remove'

		bookTitle.textContent = `Title: ${book.title}`
		bookAuthor.textContent = `Author: ${book.author}`
		bookPage.textContent = `${book.pages} pages`

		bookContainer.appendChild(bookTitle)
		bookContainer.appendChild(bookAuthor)
		bookContainer.appendChild(bookPage)
		bookContainer.appendChild(readCheck)
		bookContainer.appendChild(removeBook)

		booksContainer.appendChild(bookContainer)

		readCheck.addEventListener('click', () => {
			book.read = !book.read
			readCheck.textContent = book.read ? 'Read' : 'Not Read'
			readCheck.classList.toggle('bg-green-200', book.read)
			readCheck.classList.toggle('bg-red-100', !book.read)
			saveToLocalStorage()
		})
		readCheck.classList.toggle('bg-green-200', book.read)
		readCheck.classList.toggle('bg-red-100', !book.read)

		removeBook.addEventListener('click', () => {
			const bookIndex = library.indexOf(book)
			if (bookIndex !== -1) {
				library.splice(bookIndex, 1)
				saveToLocalStorage()
			}
			bookContainer.remove()
		})
	})
}

const clearForm = () => {
	title.value = ''
	author.value = ''
	pages.value = ''
}
