// Simple http server which receives a Get (any ?) request
// With a pdfUrl param, then spawns a puppeteer browser to convert the received pdfUrl
// into a pdf and send back the response

const http = require('http');
const url = require('url');

const PORT = 3001;


// Create server
http.createServer((req, res) => {
  const queryObj = url.parse(req.url, true).query;

  const pdfUrl = queryObj.pdfUrl;
  if (!pdfUrl) {
    res.writeHead(400, 'Bad Request');
    res.end(JSON.stringify({
      message: 'No pdfUrl param'
    }));
    return;
  }

  res.write(`Hello, there`);
  res.end();
})
.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
})