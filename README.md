# PDF - Service

A minimal microservice for generating pdf from a requested URL.

## Running with Docker

This project was built to run inside Docker (although it can run fine without it).

1) Build the image
```bash
docker build -t pdf-service-image .
```

2) Start a container
```bash
docker run -d --restart=always -p 3001:3000 --name pdf-service pdf-service-image
```

This will attach the pdf service to port 3001 (if available, check for errors).

Now that the service is up and running, you can make a (GET) request to that port with a query param specifying the webpage you want returned as pdf.

ex.
```bash
GET localhost:3001?pdfUrl=www.google.com
```

This will return a pdf as a response.

How you handle this response is up to you.

The code is simple enough that you can take a look [index.js](index.js) and figure things out.