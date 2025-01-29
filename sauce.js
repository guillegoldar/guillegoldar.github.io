// Definir la URL de la API
const apiUrlHedera = 'https://api.saucerswap.finance/tokens/';
//const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const USDCId = '0.0.456858';
const WBTCId = '0.0.1055483';
const HBARId = '0.0.1456986';
const XSauceId = '0.0.1460200';
const DINOId = '0.0.7907968';
const IVYId = '0.0.8105204';
const tenenciaUSDC = 0;
const tenenciaWBTC = 0;
const tenenciaHBAR = 16833.686;
const tenenciaXSauce = 43394.673;
const tenenciaDINO = 634303.55;
const tenenciaIVY = 689264.85;

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

let calcularTotal=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let cotHBAR = document.getElementById('spCotHBAR').innerText;    
  let cotXSauce = document.getElementById('spCotXSauce').innerText;
  let cotDINO = document.getElementById('spCotDINO').innerText;
  let cotIVY = document.getElementById('spCotIVY').innerText;  
  let total = (tenenciaUSDC * cotUSDC
  				   + tenenciaWBTC * cotWBTC
  				   + tenenciaHBAR * cotHBAR				   
				   + tenenciaXSauce * cotXSauce 
     			   + tenenciaDINO * cotDINO
				   + tenenciaIVY * cotIVY
				)
  return total;
};

let calcularPesoUSDC=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let dUSDC = tenenciaUSDC * cotUSDC;
  let peso = dUSDC * 100 / calcularTotal();
  return peso;
};

let calcularPesoWBTC=() => {  
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let dWBTC = tenenciaWBTC * cotWBTC;
  let peso = dWBTC * 100 / calcularTotal();
  return peso;
};

let calcularPesoHBAR=() => {  
  let cotHBAR = document.getElementById('spCotHBAR').innerText;  
  let dHBAR = tenenciaHBAR * cotHBAR;
  let peso = dHBAR * 100 / calcularTotal();
  return peso;
};

let calcularPesoXSauce=() => {  
  let cotXSauce = document.getElementById('spCotXSauce').innerText;  
  let dXSauce = tenenciaXSauce * cotXSauce;
  let peso = dXSauce * 100 / calcularTotal();
  return peso;
};

let calcularPesoDINO=() => {  
  let cotDINO = document.getElementById('spCotDINO').innerText;  
  let dDINO = tenenciaDINO * cotDINO;
  let peso = dDINO * 100 / calcularTotal();
  return peso;
};

let calcularPesoIVY=() => {  
  let cotIVY = document.getElementById('spCotIVY').innerText;  
  let dIVY = tenenciaIVY * cotIVY;
  let peso = dIVY * 100 / calcularTotal();
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
  document.getElementById('spCotHBAR').textContent = obtenerCotHedera(HBARId);  
  document.getElementById('spCotXSauce').textContent = obtenerCotHedera(XSauceId);
  document.getElementById('spCotDINO').textContent =  obtenerCotHedera(DINOId);
  document.getElementById('spCotIVY').textContent =  obtenerCotHedera(IVYId);
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
  document.getElementById('HBAR').textContent = formatoNum(parseFloat(document.getElementById('spCotHBAR').innerText),3);
  document.getElementById('pHBAR').textContent = ' (' + formatoNum(parseFloat(calcularPesoHBAR()),2) +  '%)';
  document.getElementById('tHBAR').textContent = formatoNum(parseFloat(tenenciaHBAR),0);
  document.getElementById('vHBAR').textContent = formatoNum(parseFloat(tenenciaHBAR)*parseFloat(document.getElementById('spCotHBAR').innerText),0);
  document.getElementById('xsauce').textContent = formatoNum(parseFloat(document.getElementById('spCotXSauce').innerText),3);
  document.getElementById('pXSauce').textContent = ' (' + formatoNum(parseFloat(calcularPesoXSauce()),2) +  '%)';
  document.getElementById('tXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce),0);
  document.getElementById('vXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce)*parseFloat(document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('DINO').textContent = formatoNum(parseFloat(document.getElementById('spCotDINO').innerText),5);
  document.getElementById('pDINO').textContent = ' (' + formatoNum(parseFloat(calcularPesoDINO()),2) +  '%)';
  document.getElementById('tDINO').textContent = formatoNum(parseFloat(tenenciaDINO),0);
  document.getElementById('vDINO').textContent = formatoNum(parseFloat(tenenciaDINO)*parseFloat(document.getElementById('spCotDINO').innerText),0);
  document.getElementById('IVY').textContent = formatoNum(parseFloat(document.getElementById('spCotIVY').innerText),5);
  document.getElementById('pIVY').textContent = ' (' + formatoNum(parseFloat(calcularPesoIVY()),2) +  '%)';
  document.getElementById('tIVY').textContent = formatoNum(parseFloat(tenenciaIVY),0);
  document.getElementById('vIVY').textContent = formatoNum(parseFloat(tenenciaIVY)*parseFloat(document.getElementById('spCotIVY').innerText),0);
  document.getElementById('total').textContent = formatoNum(calcularTotal(),0);
  document.getElementById('x').textContent = ' (' + Math.trunc(calcularTotal()/5000) + 'x)';
  document.getElementById('totalXSauce').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('totalWBTC').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotWBTC').innerText),5);
}

