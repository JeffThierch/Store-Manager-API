const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsRoutes = require('./routes/productsRoutes');

app.use('/products', productsRoutes);

const salesRoutes = require('./routes/salesRoutes');

app.use('/sales', salesRoutes);

const { errorController } = require('./controllers/errorController');

app.use(errorController);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
