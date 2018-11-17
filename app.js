const express = require('express');

const data = require('./data.json');
const projects = data.projects;

const app = express();

app.set('view engine', 'pug'); // let express know we're going to be using 'pug' to render html
app.use('/static', express.static('public')); //include path for the necessary css/html/images resources in the public folder

// Below app.get will render the approriate PUG template on page request
app.get('/', (req, res) => {
    console.log('root'); //just a visual anchor so that I can monitor page movement on terminal
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// render the project page that coincides with the project clicked (via id field)
app.get('/project_:id', (req, res) => { 
    res.render('project', { projects, id: req.params.id });
});

// Create page not found error message if one of the above routes is not request
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// If there is an error, render the the error page to display error message/status/stack
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

// Start the express server to serve the localhost at port 3000
app.listen(process.env.PORT, () => {
    console.log('The application is listening on port 3000...', process.env.PORT);

});

module.exports = app;
