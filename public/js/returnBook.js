const form = document.getElementById('returnBookForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookId = document.getElementById('bookId').value;

  const response = await fetch(`/books/return/${bookId}`, {
    method: 'POST'
  });

  const data = await response.json();

  const message = document.getElementById('message');
  if (response.ok) {
    message.textContent = 'Livro devolvido com sucesso!';
    form.reset();
  } else {
    message.textContent = 'Erro ao devolver o livro.';
  }
});
