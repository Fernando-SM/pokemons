const express = require('express');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const app = express();

// Body parser middleware
app.use(express.json());

// Primer endpoint: GET /pokemons
app.get('/pokemons', async (req, res) => {
    try {
        const limit = req.query.limit || 100;
        const offset = req.query.page ? (req.query.page - 1) * limit : 0;
        const search = req.query.search || '';

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

        const pokemons = response.data.results
            .filter(pokemon => pokemon.name.includes(search))
            .sort((a, b) => a.name.localeCompare(b.name));

        res.json(pokemons);
    } catch (error) {
        res.status(500).send('Ha ocurrido un error en el servidor');
    }
});

// Segundo endpoint: POST /pokemon
app.post('/pokemon', async (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).send({ error: 'Se necesita un nombre de pokemon' });
    }

    // Solicita el pokemon por nombre
    let pokemon;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        pokemon = response.data;
    } catch (error) {
        return res.status(404).send({ error: 'Pokemon no encontrado' });
    }

    // Crea el PDF
    const doc = new PDFDocument();

    // Establece el nombre del archivo en la cabecera 'Content-Disposition'
    res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`);

    doc.pipe(res);
    doc.text(`Nombre: ${pokemon.name}`);
    doc.text(`Altura: ${pokemon.height}`);
    doc.text(`Peso: ${pokemon.weight}`);
    doc.end();
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
