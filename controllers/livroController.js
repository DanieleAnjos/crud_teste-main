import Livro from '../models/livro.js';
import { Op } from 'sequelize'; 

export const listarLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.render('books/lista', { livros });
  } catch (error) {
    res.status(500).send('Erro ao listar livros');
  }
};

export const criarLivroForm = (req, res) => {
  res.render('books/create');
};

export const criarLivro = async (req, res) => {
  const { titulo, autor, ano, categoria } = req.body;
  try {
    await Livro.create({ titulo, autor, ano, categoria });
    res.redirect('/books');
  } catch (error) {
    res.status(500).send('Erro ao criar livro');
  }
};

export const editarLivroForm = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }
    res.render('books/edit', { livro });
  } catch (error) {
    res.status(500).send('Erro ao encontrar livro');
  }
};

export const atualizarLivro = async (req, res) => {
  const { titulo, autor, ano, categoria } = req.body;
  try {
    const [updated] = await Livro.update(
      { titulo, autor, ano, categoria },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      console.log(`Livro com ID ${req.params.id} não encontrado.`);
      return res.status(404).send('Livro não encontrado');
    }

    console.log(`Livro com ID ${req.params.id} atualizado com sucesso.`);
    res.redirect('/books');
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).send('Erro ao atualizar livro');
  }
};


export const deletarLivro = async (req, res) => {
  try {
    console.log(`Tentando deletar livro com ID: ${req.params.id}`); 
    const deleted = await Livro.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).send('Livro não encontrado');
    }
    
    res.redirect('/books');
  } catch (error) {
    console.error('Erro ao deletar livro:', error); 
    res.status(500).send('Erro ao deletar livro');
  }
};


export const emprestarLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (!livro.disponibilidade) {
      return res.status(400).send('Livro já está emprestado');
    }

    await livro.update({ disponibilidade: false });

    res.redirect('/books?message=Livro emprestado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao emprestar o livro');
  }
};

export const devolverLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (livro.disponibilidade) {
      return res.status(400).send('Livro já está disponível');
    }

    await livro.update({ disponibilidade: true });

    res.redirect('/books?message=Livro devolvido com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao devolver o livro');
  }
};

export const buscarLivrosForm = (req, res) => {
  res.render('search'); 
};

export const buscarLivros = async (req, res) => {
  const { titulo, autor, categoria, ano } = req.query;

  const whereClause = {};

  if (titulo) {
    whereClause.titulo = { [Op.like]: `%${titulo}%` }; 
  }
  if (autor) {
    whereClause.autor = { [Op.like]: `%${autor}%` };
  }
  if (categoria) {
    whereClause.categoria = { [Op.like]: `%${categoria}%` }; 
  }
  if (ano) {
    whereClause.ano = { [Op.like]: `%${ano}%` };
  }

  try {
    const livros = await Livro.findAll({
      where: whereClause,
    });

    res.render('books/lista', {
      title: 'Lista de Livros',
      livros,
      message: req.query.message || null,
    });
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).send('Erro ao buscar livros');
  }
};

export const atualizarDisponibilidade = async (req, res) => {
  const { id } = req.params;

  try {
    const livro = await Livro.findByPk(id);
    
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }

    livro.disponibilidade = !livro.disponibilidade;
    
    await livro.save();

    res.redirect('/books'); 
  } catch (error) {
    console.error('Erro ao atualizar a disponibilidade:', error);
    res.status(500).send('Erro ao atualizar a disponibilidade');
  }
};
