// Definir la URL de la API
const apiUrlHedera = 'https://api.geckoterminal.com/api/v2/networks/hedera-hashgraph/pools/';
const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const USDCSimbol = 'USDCUSDT';
const BTCSimbol = 'BTCUSDT';
const WBTCId = '0x29450f04b7ab6ff1cbcc199c3b992f79001e7621';
const ETHSimbol = 'ETHUSDT';
const HBARSimbol = 'HBARUSDT';
const XSauceId = '0xc5767b107579abc10304ca1913b45ee7ac03fe7f';
const GIBId = '0x5ae4d338e5c763a89dd29da5dbeaaebbdd0a390b';
const DosaId = '0xcba362fea1145be558833ffae29cb110cc55a62e';
const CKNBLZId = '0x81ca544318cef07b92ffa54eb96cbce657d3bca5';
//const BobId = '';
const tenenciaUSDC = 0;
const tenenciaBTC = 0;
const tenenciaWBTC = 0;
const tenenciaETH = 0;
const tenenciaHBAR = 12.134;
const tenenciaXSauce = 67956.342
const tenenciaGIB = 0;
const tenenciaDosa = 2534208.08;
const tenenciaCKNBLZ = 3414625.047;
//const tenenciaBob = 3507191.584;

let obtenerCotHedera = (Id) => {
    try {
      let resultado;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrlHedera+Id, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
      xhr.send();
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resultado = data;
      } else {
          alert('Error fetching data Hedera (1):' + xhr.statusText);
      }
      alert(resultado.data.attributes);
      alert('1');
      let cot = resultado.base_token_price_usd;
      return cot;
    }
    catch(error) {
      alert('Error fetching data Hedera (2):' + error);
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

let calcularTotal=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let cotBTC = document.getElementById('spCotBTC').innerText;  
  let cotETH = document.getElementById('spCotETH').innerText;    
  let cotWBTC = document.getElementById('spCotWBTC').innerText;  
  let cotHBAR = document.getElementById('spCotHBAR').innerText;    
  let cotXSauce = document.getElementById('spCotXSauce').innerText;
  //let cotDINO = document.getElementById('spCotDINO').innerText;
  //let cotIVY = document.getElementById('spCotIVY').innerText;  
  //let cotLeemon = document.getElementById('spCotLeemon').innerText;
  let total = (tenenciaUSDC * cotUSDC
  				   + tenenciaWBTC * cotWBTC
  				   + tenenciaHBAR * cotHBAR				   
				   + tenenciaXSauce * cotXSauce 
     			   //+ tenenciaDINO * cotDINO
				   //+ tenenciaIVY * cotIVY
				   //+ tenenciaLeemon * cotLeemon
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

let calcularPesoBTC=() => {  
  let cotBTC = document.getElementById('spCotBTC').innerText;  
  let dBTC = tenenciaBTC * cotBTC;
  let peso = dBTC * 100 / calcularTotal();
  return peso;
};

let calcularPesoETH=() => {  
  let cotETH = document.getElementById('spCotETH').innerText;  
  let dETH = tenenciaETH * cotETH;
  let peso = dETH * 100 / calcularTotal();
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
/*
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

let calcularPesoLeemon=() => {  
  let cotLeemon = document.getElementById('spCotLeemon').innerText;  
  let dLeemon = tenenciaLeemon * cotLeemon;
  let peso = dLeemon * 100 / calcularTotal();
  return peso;
};
*/

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
  document.getElementById('spCotUSDC').textContent = obtenerCotBitget(USDCSimbol);
  document.getElementById('spCotBTC').textContent = obtenerCotBitget(BTCSimbol);
  document.getElementById('spCotWBTC').textContent = obtenerCotHedera(WBTCId);
  document.getElementById('spCotETH').textContent = obtenerCotBitget(ETHSimbol);  
  document.getElementById('spCotHBAR').textContent = obtenerCotBitget(HBARSimbol);  
  document.getElementById('spCotXSauce').textContent = obtenerCotHedera(XSauceId);
  //document.getElementById('spCotDINO').textContent =  obtenerCotHedera(DINOId);
  //document.getElementById('spCotIVY').textContent =  obtenerCotHedera(IVYId);
  //document.getElementById('spCotLeemon').textContent =  obtenerCotHedera(LeemonId);
}


let refrescar=()=>{
  inicializar();
  document.getElementById('USDC').textContent = formatoNum(parseFloat(document.getElementById('spCotUSDC').innerText),3);
  document.getElementById('pUSDC').textContent = ' (' + formatoNum(parseFloat(calcularPesoUSDC()),2) +  '%)';
  document.getElementById('tUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC),0);
  document.getElementById('vUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC)*parseFloat(document.getElementById('spCotUSDC').innerText),0);
  document.getElementById('BTC').textContent = formatoNum(parseFloat(document.getElementById('spCotBTC').innerText),0);
  document.getElementById('pBTC').textContent = ' (' + formatoNum(parseFloat(calcularPesoWBTC()),2) +  '%)';
  document.getElementById('tBTC').textContent = formatoNum(parseFloat(tenenciaBTC),5);
  document.getElementById('vBTC').textContent = formatoNum(parseFloat(tenenciaBTC)*parseFloat(document.getElementById('spCotBTC').innerText),0);
  document.getElementById('WBTC').textContent = formatoNum(parseFloat(document.getElementById('spCotWBTC').innerText),0);
  document.getElementById('pWBTC').textContent = ' (' + formatoNum(parseFloat(calcularPesoWBTC()),2) +  '%)';
  document.getElementById('tWBTC').textContent = formatoNum(parseFloat(tenenciaWBTC),5);
  document.getElementById('vWBTC').textContent = formatoNum(parseFloat(tenenciaWBTC)*parseFloat(document.getElementById('spCotWBTC').innerText),0);
  document.getElementById('ETH').textContent = formatoNum(parseFloat(document.getElementById('spCotETH').innerText),0);
  document.getElementById('pETH').textContent = ' (' + formatoNum(parseFloat(calcularPesoETH()),2) +  '%)';
  document.getElementById('tETH').textContent = formatoNum(parseFloat(tenenciaETH),5);
  document.getElementById('vETH').textContent = formatoNum(parseFloat(tenenciaETH)*parseFloat(document.getElementById('spCotETH').innerText),0);
  document.getElementById('HBAR').textContent = formatoNum(parseFloat(document.getElementById('spCotHBAR').innerText),3);
  document.getElementById('pHBAR').textContent = ' (' + formatoNum(parseFloat(calcularPesoHBAR()),2) +  '%)';
  document.getElementById('tHBAR').textContent = formatoNum(parseFloat(tenenciaHBAR),0);
  document.getElementById('vHBAR').textContent = formatoNum(parseFloat(tenenciaHBAR)*parseFloat(document.getElementById('spCotHBAR').innerText),0);
  document.getElementById('xsauce').textContent = formatoNum(parseFloat(document.getElementById('spCotXSauce').innerText),3);
  document.getElementById('pXSauce').textContent = ' (' + formatoNum(parseFloat(calcularPesoXSauce()),2) +  '%)';
  document.getElementById('tXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce),0);
  document.getElementById('vXSauce').textContent = formatoNum(parseFloat(tenenciaXSauce)*parseFloat(document.getElementById('spCotXSauce').innerText),0);
/*  document.getElementById('DINO').textContent = formatoNum(parseFloat(document.getElementById('spCotDINO').innerText),5);
  document.getElementById('pDINO').textContent = ' (' + formatoNum(parseFloat(calcularPesoDINO()),2) +  '%)';
  document.getElementById('tDINO').textContent = formatoNum(parseFloat(tenenciaDINO),0);
  document.getElementById('vDINO').textContent = formatoNum(parseFloat(tenenciaDINO)*parseFloat(document.getElementById('spCotDINO').innerText),0);
  document.getElementById('IVY').textContent = formatoNum(parseFloat(document.getElementById('spCotIVY').innerText),5);
  document.getElementById('pIVY').textContent = ' (' + formatoNum(parseFloat(calcularPesoIVY()),2) +  '%)';
  document.getElementById('tIVY').textContent = formatoNum(parseFloat(tenenciaIVY),0);
  document.getElementById('vIVY').textContent = formatoNum(parseFloat(tenenciaIVY)*parseFloat(document.getElementById('spCotIVY').innerText),0);
  document.getElementById('Leemon').textContent = formatoNum(parseFloat(document.getElementById('spCotLeemon').innerText),5);
  document.getElementById('pLeemon').textContent = ' (' + formatoNum(parseFloat(calcularPesoLeemon()),2) +  '%)';
  document.getElementById('tLeemon').textContent = formatoNum(parseFloat(tenenciaLeemon),0);
  document.getElementById('vLeemon').textContent = formatoNum(parseFloat(tenenciaLeemon)*parseFloat(document.getElementById('spCotLeemon').innerText),0);*/
  document.getElementById('total').textContent = formatoNum(calcularTotal(),0);
  document.getElementById('x').textContent = ' (' + Math.trunc(calcularTotal()/5000) + 'x)';
  document.getElementById('totalXSauce').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('totalWBTC').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotWBTC').innerText),5);
}

