const minimunDistance = document.querySelector('.minimun-distance')
const minimumHeight = document.querySelector('.minimum-height')

//Caregamento dos dados do cálculo
function showCalculationResult() {
    fetch('http://localhost:3003/public/assets/data/results.json')
        .then(jsonD => jsonD.json())
        .then(objectJs => {
            minimunDistance.innerHTML = `Distância Mínima: ${objectJs.minimumDistance}`
            
            //Carregamento somente se houver altura
            if (objectJs.minimumHeight)
                minimumHeight.innerHTML = `Altura Mínima: ${objectJs.minimumHeight}`
        })
}

showCalculationResult()