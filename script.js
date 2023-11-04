function getIndex (n) {
  return Math.log2(n)
}

function buildStr(n, binP, resV, multR, divR, restoD, restoInt, mod) {
    const op = `${n}^${binP}`;
    const index = getIndex(binP === 1 ? 1 : binP / 2);
    const exp = binP === 1 ? 1 : 2;
    const pot = `${resV[index]}^${exp}`;

    const resultStep = document.createElement('div');
    resultStep.className = 'result-step';

    const stepLabel = document.createElement('p');
    stepLabel.className = 'result-label';
    stepLabel.textContent = `${binP}:`;
    resultStep.appendChild(stepLabel);

    const opResult = document.createElement('p');
    opResult.textContent = `Operação: ${op}`;
    resultStep.appendChild(opResult);

    const potResult = document.createElement('p');
    potResult.textContent = `Potência: ${pot}`;
    resultStep.appendChild(potResult);

    const multResult = document.createElement('p');
    multResult.textContent = `Resultado da potência: ${multR}`;
    resultStep.appendChild(multResult);

    const divOperation = document.createElement('p');
    divOperation.textContent = `Divisão: ${multR} / ${mod}`;
    resultStep.appendChild(divOperation);
  
    const divResult = document.createElement('p');
    divResult.textContent = `Resultado da divisão: ${divR}`;
    resultStep.appendChild(divResult);

    const restoResult = document.createElement('p');
    restoResult.textContent = `Resto da divisão: ${restoD}`;
    resultStep.appendChild(restoResult);

    const restoIntResult = document.createElement('p');
    restoIntResult.textContent = `Resto arredondado: ${restoInt} (mod ${mod})`;
    resultStep.appendChild(restoIntResult);

    return resultStep;
}


function rsa (n, exp, mod){
  const until = Math.pow(2, Math.round(Math.log2(exp)));

  let res = [n]
  let resStr = [buildStr(n, 1, res, n, n, n, n, mod)]
  for(let i = 2; i <= until; i *= 2) { 
    const mult = Math.pow(res[getIndex(i/2)], 2)
    const div = mult / mod;
    const restoDecimal = div % 1;
    const restoInt = Math.floor(restoDecimal * mod);
    res[getIndex(i)] = restoInt;
    resStr.push(buildStr(n, i, res, mult, div, restoDecimal, restoInt, mod))
  }
  
  return resStr;
}

function rsaHtmlConnect() {
    const n = parseInt(document.getElementById('n').value);
    const exponent = parseInt(document.getElementById('exponent').value);
    const modulo = parseInt(document.getElementById('modulo').value);

    const results = rsa(n, exponent, modulo);

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach((result, index) => {
        resultsContainer.appendChild(result);
    });
}