import fs from 'fs'
import { URL } from 'url'

//dirname alternativo
const __dirname = new URL('../', import.meta.url).pathname
//coloque o caminho para o arquivo results.json aqui caso dê erro 
const filePath = `${__dirname.replace('/', '')}` + 'data/results.json' 

class Calculator {
    constructor() {
        this._attributesTower = { minimumDistance: "", minimumHeight: "" }
    }

    //função para calcular a raiz quadrada
    squareRoot = (tower) => Math.sqrt(12.7 * tower)

    //função para salvar os resultados do cálculo no JSON(Javascript Object Notation)
    saveJson() {
        return fs.writeFile(filePath, JSON.stringify(this.attributesTower), err => {
            console.log(err || '')
        })
    }

    //função para calcular a distância mínima
    calculateMinimumDistance(firstTower, secondTower) {
        const firstTowerDistance = parseFloat(this.squareRoot(firstTower))
        const secondTowerDistance = parseFloat(this.squareRoot(secondTower))
        const minimumDistance = (firstTowerDistance + secondTowerDistance).toFixed(2)
        return minimumDistance
    }

    //função para calcular a altura minima
    calculateMinimumHeight(calculateMinimumDistance) {
        const minimumDistance = calculateMinimumDistance
        const distancePow = Math.pow(minimumDistance, 2)
        const minimunHeight = (distancePow / 12.7).toFixed(2)
        return minimunHeight
    }

    //função para calcular a altura e distância mínima
    calculateMinimumDistanceAndHeight(calculateMinimumDistance, calculateMinimumHeight) {
        const minimumDistance = calculateMinimumDistance
        const minimumHeight = calculateMinimumHeight
        return { minimumDistance, minimumHeight }
    }

    //função para salvar a distância
    saveDataWithoutHeight(firstTower, secondTower) {
        const distance = this.calculateMinimumDistance(firstTower, secondTower)
        this._attributesTower.minimumDistance = distance
        this.saveJson()

        return this.attributesTower
    }

    //função para salvar a altura e a distância
    saveDataWithHeight(firstTower, secondTower) {
        const tower = this.calculateMinimumDistanceAndHeight(
            this.calculateMinimumDistance(firstTower, secondTower),
            this.calculateMinimumHeight(this.calculateMinimumDistance(firstTower, secondTower))
        )
        Object.entries(this.attributesTower).forEach(([key]) => this.attributesTower[key] = tower[key])
        this.saveJson()

        return this.attributesTower
    }

    //função que decide se irá somente salvar a distância ou a distância e altura
    saveData(checkbox, firstTower, secondTower) {
        return checkbox === 'on' ? this.saveDataWithHeight(firstTower, secondTower) : this.saveDataWithoutHeight(firstTower, secondTower)
    }

    get attributesTower() {
        return this._attributesTower
    }

    set attributesTower(attribute) {
        this._attributesTower = attribute
    }

}

export { Calculator }