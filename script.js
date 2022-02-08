const storedBooks = JSON.parse(localStorage.getItem('storedBook'));
const awsomeBooks = storedBooks;

const bookContainer = document.querySelector('.book-container');
const addBtn = document.forms[0].add;
const titleField = document.forms[0].title;
const authorField = document.forms[0].author;

const addBookToPage = (book) => {
  const newBook = document.createElement('div');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const button = document.createElement('button');
  const hr = document.createElement('hr');

  pTitle.classList.add('title');
  pAuthor.classList.add('author');
  button.classList.add('remove');

  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'Remove';

  newBook.appendChild(pTitle);
  newBook.appendChild(pAuthor);
  newBook.appendChild(button);
  newBook.appendChild(hr);

  bookContainer.appendChild(newBook);
};

storedBooks.forEach((book) => {
  addBookToPage(book);
});

addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const newBook = {
    title: titleField.value,
    author: authorField.value,
  };
  awsomeBooks.push(newBook);
  localStorage.setItem('storedBook', JSON.stringify(awsomeBooks));

  addBookToPage(newBook);
});

const removeBook = (event) => {
  if (event.target.classList.contains('remove')) {
    const bookToBeRemoved = awsomeBooks.find(
      (book) => book.title === event.target.parentElement.firstChild.textContent,
    );

    awsomeBooks.splice(awsomeBooks.indexOf(bookToBeRemoved), 1);
    localStorage.setItem('storedBook', JSON.stringify(awsomeBooks));

    bookContainer.innerHTML = '';
    awsomeBooks.forEach((book) => {
      addBookToPage(book);
    });
  }
};

bookContainer.addEventListener('click', removeBook);
