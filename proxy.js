const net = require('net')
const stream = require('stream')

const transform = stream.Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().replace('localhost:3000', 'api.github.com'))
  }
})

const server = net.createServer((socket) => {
  const client = net.connect(80, 'api.github.com')
  socket.pipe(transform).pipe(client).pipe(socket)
})

server.listen(5050)