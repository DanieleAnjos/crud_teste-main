import express from 'express';
import { 
    listarLivros, 
    criarLivroForm, 
    criarLivro, 
    editarLivroForm, 
    atualizarLivro, 
    deletarLivro, 
    emprestarLivro, 
    devolverLivro, 
    buscarLivros,
    buscarLivrosForm,
    atualizarDisponibilidade 
} from '../controllers/livroController.js';

const router = express.Router();

// Rota para buscar livros (renderiza a página de busca)
router.get('/search', buscarLivrosForm); // Adicionada para renderizar a página de busca

// Rota para buscar livros via API (se necessário)
router.get('/', buscarLivros); 
router.get('/create', criarLivroForm);
router.post('/', criarLivro);
router.get('/:id/edit', editarLivroForm);
router.post('/:id', atualizarLivro);
router.post('/:id/delete', deletarLivro);
router.post('/:id/borrow', emprestarLivro);
router.post('/:id/return', devolverLivro);
router.post('/:id/disponibilidade', atualizarDisponibilidade);

export default router;
