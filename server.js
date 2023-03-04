const app = require('./src/app')
const PORT = process.env.APP_DEV_PORT || 3000

const server = app.listen( PORT, () => {
    console.log(`The server running at ${PORT}`)
})

process.on('SIGINT', () => {
    server.close( () => {
        console.log('Exit  server express!')
    }) 
})