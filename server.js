const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();


server.use(middlewares);
server.use(jsonServer.bodyParser);

// custom middleware can go here
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body,createdAt = Date.now();
    }
    next();
});

server.use(router);

//use PORT environment variable or default to 3000

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});