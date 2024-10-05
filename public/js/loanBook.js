const form = document.getElementById('loanBookForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookId = document.getElementById('bookId').value;

  const response = await fetch(`/books/loan/${bookId}`, {
    method: 'POST'
  });

  const data = await response.json();

  const message = document.getElementById('message');
  if (response.ok) {
    message.textContent = 'Livro emprestado com sucesso!';
    form.reset();
  } else {
    message.textContent = 'Erro ao emprestar o livro.';
  }
});
