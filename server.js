const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8765;

const server = http.createServer((req, res) => {
    // Construye la ruta del archivo a servir
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    console.log(`Request for: ${filePath}`); // Mensaje de depuración

    // Extensiones soportadas y sus tipos MIME
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mp3',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml',
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    // Agregar charset=UTF-8 para archivos de texto
    if (contentType.startsWith('text/')) {
        contentType += '; charset=UTF-8';
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (error404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
                    res.end(content404, 'utf-8');
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
                res.end(`Error del servidor: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
