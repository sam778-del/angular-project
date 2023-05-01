const { Pool } = require('pg');
const express = require('express');
const app = express();
const controller = require('./controller');
const { db } = require('./config');
const tailwindcss = require('tailwindcss');
const postcss = require('postcss');

const pool = new Pool(db);

app.use(express.json());

// Use the controller to handle endpoint data
app.get('/users', controller.getUsers);
app.post('/users', controller.addUser);
app.put('/users/:id', controller.updateUser);
app.delete('/users/:id', controller.deleteUser);

// Use Tailwind CSS to style the application
app.use('/public', express.static('public'));
app.use('/tailwind.css', (req, res) => {
    const css = postcss(tailwindcss('./tailwind.config.js')).process('').css;
    res.send(css);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('App running at '+ PORT);
});
