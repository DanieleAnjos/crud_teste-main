import '@babel/register';
import request from 'supertest';
import app from '../../app.js';
import Livro from '../../models/livro.js';

jest.mock('../../models/livro.js');

describe('Livro Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const livroMock = {
    id: 1,
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    ano: 1954,
    categoria: 'Fantasia',
    disponibilidade: true,
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const livrosMock = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954, categoria: 'Fantasia' },
    { id: 2, titulo: '1984', autor: 'George Orwell', ano: 1949, categoria: 'Distopia' },
  ];

  const novoLivro = { titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', ano: 1937, categoria: 'Fantasia' };

  it('deve listar todos os livros', async () => {
    Livro.findAll.mockResolvedValue(livrosMock);

    const res = await request(app).get('/books');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('O Senhor dos Anéis');
    expect(res.text).toContain('1984');
  });

  it('deve renderizar o formulário de criação de livro', async () => {
    const res = await request(app).get('/books/create');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Criar Livro');
  });

  it('deve criar um novo livro', async () => {
    Livro.create.mockResolvedValue(novoLivro);

    const res = await request(app)
      .post('/books')
      .send(novoLivro);

    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/books');
    expect(Livro.create).toHaveBeenCalledWith(novoLivro);
  });

  it('deve renderizar o formulário de edição de livro', async () => {
    Livro.findByPk.mockResolvedValue(livroMock);

    const res = await request(app).get('/books/1/edit');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Editar Livro');
    expect(res.text).toContain(livroMock.titulo);
  });


it('deve atualizar um livro existente', async () => {
  const livroMock = { id: 1 };
  Livro.update.mockResolvedValue([1]); 

  const livroAtualizado = { titulo: 'Livro Teste Atualizado', autor: 'Autor Teste', ano: 2020, categoria: 'Ficção' };

  const res = await request(app).post('/books/1').send(livroAtualizado);

  expect(res.statusCode).toBe(302);
  expect(Livro.update).toHaveBeenCalledWith(livroAtualizado, { where: { id: '1' } }); 
});


  it('deve emprestar um livro', async () => {
    const livroEmprestadoMock = { ...livroMock, disponibilidade: true };
    Livro.findByPk.mockResolvedValue(livroEmprestadoMock);

    const res = await request(app).post('/books/1/borrow');

    expect(livroEmprestadoMock.update).toHaveBeenCalledWith({ disponibilidade: false });
    expect(res.statusCode).toBe(302);
    expect(decodeURIComponent(res.header.location)).toBe('/books?message=Livro emprestado com sucesso');
  });

  it('deve devolver um livro', async () => {
    const livroDevolvidoMock = { ...livroMock, disponibilidade: false };
    Livro.findByPk.mockResolvedValue(livroDevolvidoMock);

    const res = await request(app).post('/books/1/return');

    expect(livroDevolvidoMock.update).toHaveBeenCalledWith({ disponibilidade: true });
    expect(res.statusCode).toBe(302);
    expect(decodeURIComponent(res.header.location)).toBe('/books?message=Livro devolvido com sucesso');
  });

it('não deve emprestar um livro já emprestado', async () => {
  const livroEmprestadoMock = { ...livroMock, disponibilidade: false };
  Livro.findByPk.mockResolvedValue(livroEmprestadoMock);

  const res = await request(app).post('/books/1/borrow');

  expect(res.statusCode).toBe(400); 
  expect(res.text).toContain('Livro já está emprestado');
});


  it('deve buscar livros com filtros', async () => {
    Livro.findAll.mockResolvedValue(livrosMock);

    const res = await request(app).get('/books?titulo=O Senhor dos Anéis');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('O Senhor dos Anéis');
  });

  it('deve retornar vazio ao buscar livros que não existem', async () => {
    Livro.findAll.mockResolvedValue([]);

    const res = await request(app).get('/books?titulo=Inexistente');

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Nenhum livro encontrado');
  });



  it('deve deletar um livro', async () => {
    Livro.findByPk.mockResolvedValue(livroMock); 
    Livro.destroy.mockResolvedValue(1); 
  
    const res = await request(app).delete('/books/1');
  
    expect(res.statusCode).toBe(302); 
    expect(Livro.destroy).toHaveBeenCalledWith({ where: { id: '1' } }); 
  });

  


});
