// Definir la URL de la API
const apiUrlHedera = 'https://api.saucerswap.finance/tokens/';
//const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const USDCId = '0.0.456858';
const WBTCId = '0.0.1055483';
const XSauceId = '0.0.1460200';
const DINOId = '0.0.7907968';
const tenenciaUSDC = 0;
const tenenciaWBTC = 0.03071481;
const tenenciaXSauce = 0;
const tenenciaDINO = 3596393.663;

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
/*
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
*/
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
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let cotXSauce = document.getElementById('spCotXSauce').innerText;
  let cotDINO = document.getElementById('spCotDINO').innerText;
  let part = 0.005
  if(Ind=='yo') 
    part = 0.995;
  let total = (tenenciaUSDC * cotUSDC
  				   + tenenciaWBTC * cotWBTC
				   + tenenciaXSauce * cotXSauce 
   				   + tenenciaDINO * cotDINO
				)*part

  return total;
};

let calcularPesoUSDC=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let dUSDC = tenenciaUSDC * cotUSDC;
  let peso = (dUSDC * 0.995 * 100) / calcularTotal('yo');
  return peso;
};

let calcularPesoWBTC=() => {  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let dWBTC = tenenciaWBTC * cotWBTC;
  let peso = (dWBTC * 0.995 * 100) / calcularTotal('yo');
  return peso;
};

let calcularPesoXSauce=() => {  
  let cotXSauce = document.getElementById('spCotXSauce').innerText;  
  let dXSauce = tenenciaXSauce * cotXSauce;
  let peso = dXSauce * 0.995 * 100 / calcularTotal('yo');
  return peso;
};

let calcularPesoDINO=() => {  
  let cotDINO = document.getElementById('spCotDINO').innerText;  
  let dDINO = tenenciaDINO * cotDINO;
  let peso = dDINO * 0.995 * 100 / calcularTotal('yo');
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
  document.getElementById('spCotUSDC').textContent = obtenerCotHedera(USDCId);
  document.getElementById('spCotWBTC').textContent = obtenerCotHedera(WBTCId);
  document.getElementById('spCotXSauce').textContent = obtenerCotHedera(XSauceId);
  document.getElementById('spCotDINO').textContent =  obtenerCotHedera(DINOId);
  document.getElementById('spCotDolar').textContent = obtenerCotDolar();
}


let refrescar=()=>{
  inicializar();
  document.getElementById('USDC').textContent = formatoNum(parseFloat(document.getElementById('spCotUSDC').innerText),3);
  document.getElementById('pUSDC').textContent = ' (' + formatoNum(parseFloat(calcularPesoUSDC()),2) +  '%)';
  document.getElementById('tUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC),0);
  document.getElementById('vUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC)*parseFloat(document.getElementById('spCotUSDC').innerText),0);
  document.getElementById('WBTC').textContent = formatoNum(parseFloat(document.getElementById('spCotWBTC').innerText),0);
  document.getElementById('pWBTC').textContent = ' (' + formatoNum(parseFloat(calcularPesoWBTC()),2) +  '%)';
  document.getElementById('tWBTC').textContent = formatoNum(parseFloat(tenenciaWBTC),5);
  document.getElementById('vWBTC').textContent = formatoNum(parseFloat(tenenciaWBTC)*parseFloat(document.getElementById('spCotWBTC').innerText),0);
  document.getElementById('xsauce').textContent = formatoNum(parseFloat(document.getElementById('spCotXSauce').innerText),3);
  document.getElementById('pXSauce').textContent = ' (' + formatoNum(parseFloat(calcularPesoXSauce()),2) +  '%)';
  document.getElementById('tXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce),0);
  document.getElementById('vXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce)*parseFloat(document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('DINO').textContent = formatoNum(parseFloat(document.getElementById('spCotDINO').innerText),5);
  document.getElementById('pDINO').textContent = ' (' + formatoNum(parseFloat(calcularPesoDINO()),2) +  '%)';
  document.getElementById('tDINO').textContent = formatoNum(parseFloat(tenenciaDINO),0);
  document.getElementById('vDINO').textContent = formatoNum(parseFloat(tenenciaDINO)*parseFloat(document.getElementById('spCotDINO').innerText),0);
  document.getElementById('dolar').textContent = formatoMoneda(parseFloat(document.getElementById('spCotDolar').innerText),'ARS');
  document.getElementById('total').textContent = formatoNum(calcularTotal('yo'),0);
  document.getElementById('x').textContent = ' (' + Math.trunc(calcularTotal('yo')/5000) + 'x)';
  document.getElementById('totalXSauce').textContent = formatoNum(parseFloat(calcularTotal('yo')/document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('totalWBTC').textContent = formatoNum(parseFloat(calcularTotal('yo')/document.getElementById('spCotWBTC').innerText),5);
  document.getElementById('lea').textContent = formatoMoneda(calcularTotal('lea'),'USD');
  document.getElementById('xLea').textContent = ' (' + Math.trunc(calcularTotal('lea')/44) + 'x)';
  document.getElementById('pLea').textContent = formatoMoneda(calcularTotal('lea')*document.getElementById('spCotDolar').innerText,'ARS');
}

