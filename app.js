const express = require('express');
const app = express();
const port = 3000;
const katanas = require('./MOCK_DATA.json');  // Import the katana data

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Route for the index page
app.get('/', (req, res) => {
    res.render('index', { katanas: katanas });
});

// Route for the product detail page
app.get('/product/:name', (req, res) => {
    const katanaName = req.params.name;
    const katana = katanas.find(k => k.katana_name === katanaName);

    if (katana) {
        res.render('productDetail', { katana: katana });
    } else {
        res.status(404).send('Katana not found');
    }
});

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`));
