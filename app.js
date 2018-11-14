const express = require('express');

const data = require('./data.json');
const projects = data.projects;
console.log(projects);
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
   console.log('root');
        res.render('index', { projects });
    
});

app.get('/about', (req, res) => {
    
    res.redirect('about');

});


app.listen(3000, () => {
    console.log('The application is listening on port 3000...');

});

module.exports = app;
