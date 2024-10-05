import express from 'express';
import { create } from 'express-handlebars';
import sequelize from './config/database.js';
import livroRoutes from './routes/livroRoutes.js';
import path from 'path';

const __dirname = path.resolve();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = create({
  defaultLayout: 'main',
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.get('/', (req, res) => {
  res.render('home', { title: 'Página Inicial' });
});

app.use('/books', livroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});

export default app;
