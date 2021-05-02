// Simple http server which receives a Get (any ?) request
// With a pdfUrl param, then spawns a puppeteer browser to convert the received pdfUrl
// into a pdf and send back the response

const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer');


const PORT = 3001;


// Create server
http.createServer(async (req, res) => {
  const queryObj = url.parse(req.url, true).query;

  const pdfUrl = queryObj.pdfUrl;
  if (!pdfUrl) {
    res.writeHead(400, 'Bad Request');
    res.end(JSON.stringify({
      message: 'No pdfUrl param'
    }));
    return;
  }

  try {
    const pdf = await generatePDF(pdfUrl);

    res.write(pdf);
    res.end();
  } catch (err) {
    res.writeHead(500, 'Internal Server Error');
    res.end(JSON.stringify({
      message: err.message
    }))
  }
})
.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});



async function generatePDF(pdfUrl) {
  
  let browser;
  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV || NODE_ENV === 'development') {
    browser = await puppeteer.launch({
      headless: true
    })
  } else {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox']
    })
  }

  const page = await browser.newPage();
  await page.goto(pdfUrl, {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    'format': 'a4'
  })

  browser.close();

  return pdf;
}