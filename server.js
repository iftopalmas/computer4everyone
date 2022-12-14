const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const routes = require('./routes');

app.get('/', (_, res) => res.sendFile('/index.html'))
app.use('/api', routes);

const DEFAULT_PORT = 8080

//Porta usada externamente, quando o app é executado em um servidor como heroku.com
const PORT = process.env.PORT || DEFAULT_PORT
const HOST = process.env.SERVER || 'localhost'
const ADDRESS = PORT == 80 ? HOST : `${HOST}:${PORT}`

require('./swagger-setup')(app)

app.listen(PORT, () => {
    console.log(`\n\nServidor iniciado. Abra o navegador em http://${ADDRESS}\n`)
})
