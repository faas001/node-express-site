const express = require('express');

const data = require('./data.json');
const projects = data.projects;

const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/', (req, res, next) => {
    console.log('root');
    res.render('index', { projects });
    next();
});

app.get('/about', (req, res, next) => {
    res.render('about');
    next();
});

app.get('/project_:id', (req, res, next) => { 
    res.render('project', { projects, id: req.params.id });
    next();
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});


app.listen(3000, () => {
    console.log('The application is listening on port 3000...');

});

module.exports = app;
