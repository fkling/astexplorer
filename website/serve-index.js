const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: "../out"
    });
})

const herokuPort = process.env.PORT
const port = herokuPort ? herokuPort : 8080

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});