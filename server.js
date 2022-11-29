import { server } from './src/config/index.js'
import { app } from './src/app.js'

//server
app.listen(server.port, () => console.log('servidor funcionando na porta 3003'))