const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const artistsRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Negozio Musicale attiva' });
});

// Routers
app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trovata' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Errore interno del server' });
});

app.listen(PORT, () => {
  console.log(`server in ascolto su porta ${PORT}`);
});
