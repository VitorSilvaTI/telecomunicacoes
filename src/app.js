import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { Calculator } from './public/assets/js/calculate.js'

const calculator = new Calculator()

//dirname alternativo
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


//Página inicial da aplicação
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//Página da calculadora
app.get('/calculadora', (req, res) => {
    res.sendFile(__dirname + '/public/assets/html/calculation-page.html')
})

//Página responsavel pela coleta de dados e a exibição da página de resultados
app.post('/resultados', (req, res) => {
    const { firstTowerInput, secondTowerInput, checkboxHeight } = req.body
    calculator.saveData(checkboxHeight, firstTowerInput, secondTowerInput)

    res.status(200).sendFile(__dirname + '/public/assets/html/results-page.html')
})

export { app }