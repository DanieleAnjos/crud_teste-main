const form = document.getElementById('addBookForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const category = document.getElementById('category').value;

  const response = await fetch('/books/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author, year, category })
  });

  const data = await response.json();

  const message = document.getElementById('message');
  if (response.ok) {
    message.textContent = 'Livro cadastrado com sucesso!';
    form.reset();
  } else {
    message.textContent = 'Erro ao cadastrar livro.';
  }
});
