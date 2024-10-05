const form = document.getElementById('searchBookForm');
const results = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;

  const queryParams = new URLSearchParams({
    title,
    author,
    category
  }).toString();

  const response = await fetch(`/books/search?${queryParams}`);
  const data = await response.json();

  results.innerHTML = '';

  if (data.length > 0) {
    data.forEach(book => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${book.title} by ${book.author} (Categoria: ${book.category})`;
      results.appendChild(listItem);
    });
  } else {
    results.textContent = 'Nenhum livro encontrado.';
  }
});
