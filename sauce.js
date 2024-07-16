// Definir la URL de la API
const apiUrlHedera = 'https://api.saucerswap.finance/tokens/';
const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const XSauceId = '0.0.1460200';
const SauceId = '0.0.731861';
const HBARId = '0.0.1456986';
const HLQTId = '0.0.6070128';
const HCHFId = '0.0.6070123';
const WETHId = '0.0.541564';
const OTIAId = '0.0.5023135';
const WBTCId = '0.0.1055483';
const USDCId = '0.0.456858';
const ONDOsymbol = 'ONDOUSDT';
const BTCsymbol = 'BTCUSDT';
const tenenciaHBAR = 102.938;
const tenenciaXSauce = 0;
const tenenciaSauce = 28207.201;
const tenenciaHLQT = 0;
const tenenciaHCHF = 0;
const tenenciaWETH = 1.87488842;
const tenenciaWBTC = 0.05137385;
const tenenciaUSDC = 0;
const tenenciaOTIA = 293.46385494;
const tenenciaONDO = 3013.21798809;

let obtenerCotHedera = (tokenId) => {
    try {
      let resultado;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrlHedera+tokenId, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
      xhr.send();
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resultado = data;
      } else {
          console.error('Error fetching data:', xhr.statusText);
      }
      let cot = resultado.priceUsd;
      return cot;
    }
    catch(error) {
      console.log('Error fetching data Hedera:', error);
    }
};

let obtenerCotBitget = (symbol) => {
    try {
      let resultado;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrlBitget+symbol, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
      xhr.send();
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resultado = data;
      } else {
          console.error('Error fetching data:', xhr.statusText);
      }
      let cot = resultado.data[0].lastPr;
      return cot;
    }
    catch(error) {
      console.log('Error fetching data Bitget:', error);
    }
};

let obtenerCotDolar=()=> {
  try {
    let resultado;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrlDolar, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
    xhr.send();
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resultado = data;
    } else {
        console.error('Error fetching data:', xhr.statusText);
    }
    let cot = resultado.compra;
    return cot;
  }
  catch(error) {
    console.log('Error fetching data Hedera:', error);
  }
};

let calcularTotal=(Ind) => {  
  let cotXSauce = document.getElementById('spCotXSauce').innerText;
  let cotSauce = document.getElementById('spCotSauce').innerText;
  let cotHBAR = document.getElementById('spCotHBAR').innerText;
  let cotHLQT = document.getElementById('spCotHLQT').innerText;  
  let cotHCHF = document.getElementById('spCotHCHF').innerText;  
  let cotWETH = document.getElementById('spCotWETH').innerText;  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let cotBTC = document.getElementById('spCotBTC').innerText;  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let cotOTIA = document.getElementById ('spCotOTIA').innerText;
  let cotONDO = document.getElementById ('spCotONDO').innerText;
  
  let part = 0.005
  if(Ind=='yo') 
    part = 0.995;
  let total = (tenenciaXSauce * cotXSauce 
				   + tenenciaSauce * cotSauce 
				   + tenenciaHBAR * cotHBAR 
				   + tenenciaHLQT * cotHLQT 
				   + tenenciaHCHF * cotHCHF 
				   + tenenciaWETH * cotWETH 
				   + tenenciaWBTC * cotWBTC
				   + tenenciaUSDC * cotUSDC
				   + tenenciaOTIA * cotOTIA
				   + tenenciaONDO * cotONDO)*part
  return total;
};

let calcularPesoXSauce=() => {  
  let cotXSauce = document.getElementById('spCotXSauce').innerText;  
  let cotSauce = document.getElementById('spCotSauce').innerText;  
  let cotHBAR = document.getElementById('spCotHBAR').innerText;  
  let dXSauce = tenenciaXSauce * cotXSauce;
  let dSauce = tenenciaSauce * cotSauce;
  let dHBAR = tenenciaHBAR * cotHBAR;
  let peso = (dXSauce + dSauce + dHBAR) * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoHQLT=() => {  
  let cotHLQT = document.getElementById('spCotHLQT').innerText;  
  let dHQLT = tenenciaHLQT * cotHLQT;
  let peso = dHQLT * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoHCHF=() => {  
  let cotHCHF = document.getElementById('spCotHCHF').innerText;  
  let dHCHF = tenenciaHCHF * cotHCHF;
  let peso = dHCHF * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoOTIA=() => {  
  let cotOTIA = document.getElementById('spCotOTIA').innerText;  
  let dOTIA = tenenciaOTIA * cotOTIA;
  let peso = dOTIA * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoONDO=() => {  
  let cotONDO = document.getElementById('spCotONDO').innerText;  
  let dONDO = tenenciaONDO * cotONDO;
  let peso = dONDO * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoWETH=() => {  
  let cotWETH = document.getElementById('spCotWETH').innerText;  
  let dWETH = tenenciaWETH * cotWETH;
  let peso = dWETH * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoWBTC=() => {  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let dWBTC = tenenciaWBTC * cotWBTC;
  let peso = (dWBTC * 0.995 * 100) / calcularTotal('yo');
  return peso;
};

let calcularPesoUSDC=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let dUSDC = tenenciaUSDC * cotUSDC;
  let peso = (dUSDC * 0.995 * 100) / calcularTotal('yo');
  return peso;
};

let formatoNum = (num, cantDec) => {
  let numForm = num.toLocaleString('es-AR', {
    minimumFractionDigits: cantDec,
    maximumFractionDigits: cantDec
  });
  return numForm;
};

let formatoMoneda = (num, mon, cantDec) => {
  let numForm = num.toLocaleString('es-AR', { 
    style: 'currency', currency: mon 
  });
  return numForm;
};

let inicializar=()=>{
  //document.getElementById('body').setAttribute('backgroundColor', 'red');
  document.getElementById('spCotXSauce').textContent = obtenerCotHedera(XSauceId);
  document.getElementById('spCotSauce').textContent = obtenerCotHedera(SauceId);
  document.getElementById('spCotHBAR').textContent = obtenerCotHedera(HBARId);
  document.getElementById('spCotHLQT').textContent = obtenerCotHedera(HLQTId);
  document.getElementById('spCotHCHF').textContent = obtenerCotHedera(HCHFId);
  document.getElementById('spCotWETH').textContent = obtenerCotHedera(WETHId);
  document.getElementById('spCotWBTC').textContent = obtenerCotHedera(WBTCId);
  document.getElementById('spCotBTC').textContent = obtenerCotBitget(BTCsymbol);
  document.getElementById('spCotOTIA').textContent = obtenerCotHedera(OTIAId);
  document.getElementById('spCotONDO').textContent = obtenerCotBitget(ONDOsymbol);
  document.getElementById('spCotUSDC').textContent = obtenerCotHedera(USDCId);
  document.getElementById('spCotDolar').textContent = obtenerCotDolar();
}


let refrescar=()=>{
  inicializar();
  document.getElementById('xsauce').textContent = formatoNum(parseFloat(document.getElementById('spCotXSauce').innerText),3);
  document.getElementById('pXSauce').textContent = ' (' + formatoNum(parseFloat(calcularPesoXSauce()),2) +  '%)';
  document.getElementById('sauce').textContent = formatoNum(parseFloat(document.getElementById('spCotSauce').innerText),3);
  document.getElementById('hbar').textContent = formatoNum(parseFloat(document.getElementById('spCotHBAR').innerText),3);
  //document.getElementById('HLQT').textContent = formatoNum(parseFloat(document.getElementById('spCotHLQT').innerText),3);
  //document.getElementById('pHQLT').textContent = ' (' + formatoNum(parseFloat(calcularPesoHQLT()),2) +  '%)';
  //document.getElementById('HCHF').textContent = formatoNum(parseFloat(document.getElementById('spCotHCHF').innerText),2);
  //document.getElementById('pHCHF').textContent = ' (' + formatoNum(parseFloat(calcularPesoHCHF()),2) +  '%)';
  document.getElementById('WETH').textContent = formatoNum(parseFloat(document.getElementById('spCotWETH').innerText),2);
  document.getElementById('pWETH').textContent = ' (' + formatoNum(parseFloat(calcularPesoWETH()),2) +  '%)';
  document.getElementById('OTIA').textContent = formatoNum(parseFloat(document.getElementById('spCotOTIA').innerText),3);
  document.getElementById('pOTIA').textContent = ' (' + formatoNum(parseFloat(calcularPesoOTIA()),2) +  '%)';
  document.getElementById('ONDO').textContent = formatoNum(parseFloat(document.getElementById('spCotONDO').innerText),3);
  document.getElementById('pONDO').textContent = ' (' + formatoNum(parseFloat(calcularPesoONDO()),2) +  '%)';  
  document.getElementById('WBTC').textContent = formatoNum(parseFloat(document.getElementById('spCotWBTC').innerText),2);
  document.getElementById('BTC').textContent = formatoNum(parseFloat(document.getElementById('spCotBTC').innerText),2);
  document.getElementById('pWBTC').textContent = ' (' + formatoNum(parseFloat(calcularPesoWBTC()),2) +  '%)';
  document.getElementById('dolar').textContent = formatoMoneda(parseFloat(document.getElementById('spCotDolar').innerText),'ARS');
  //document.getElementById('pUSDC').textContent = ' (' + formatoNum(parseFloat(calcularPesoUSDC()),2) +  '%)';
  document.getElementById('total').textContent = formatoMoneda(calcularTotal('yo'),'USD');
  document.getElementById('x').textContent = ' (' + Math.trunc(calcularTotal('yo')/5000) + 'x)';
  document.getElementById('totalXSauce').textContent = formatoNum(parseFloat(calcularTotal('yo')/document.getElementById('spCotXSauce').innerText),2);
  document.getElementById('totalWBTC').textContent = formatoNum(parseFloat(calcularTotal('yo')/document.getElementById('spCotWBTC').innerText),2);
  document.getElementById('lea').textContent = formatoMoneda(calcularTotal('lea'),'USD');
  document.getElementById('xLea').textContent = ' (' + Math.trunc(calcularTotal('lea')/44) + 'x)';
  //document.getElementById('pLea').textContent = formatoMoneda(calcularTotal('lea')*document.getElementById('spCotDolar').innerText,'ARS');
}

