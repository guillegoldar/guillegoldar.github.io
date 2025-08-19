// Definir la URL de la API
const apiUrGeckoTerminal = 'https://api.geckoterminal.com/api/v2/networks/';
const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const USDCSimbol = 'USDCUSDT';
const BTCSimbol = 'BTCUSDT';
const WBTCId = 'hedera-hashgraph/pools/0x29450f04b7ab6ff1cbcc199c3b992f79001e7621';
const ETHSimbol = 'ETHUSDT';
const HBARSimbol = 'HBARUSDT';
const XSauceId = 'hedera-hashgraph/pools/0xc5767b107579abc10304ca1913b45ee7ac03fe7f';
const KeetaId = 'base/pools/0xd9edc75a3a797ec92ca370f19051babebfb2edee';
const DosaId = 'hedera-hashgraph/pools/0xcba362fea1145be558833ffae29cb110cc55a62e';
const HertId = 'hedera-hashgraph/pools/0x974115f8cb66b694d39b5fc5c9bc8ef8bddff029';
//const ZAPId = 'hedera-hashgraph/pools/0x978a12f0b7e4b5b7739c9c3b032cf0e29584e5c6';
const tenenciaUSDC = document.getElementById('tUSDC').innerText;
const tenenciaBTC = document.getElementById('tBTC').innerText;
const tenenciaWBTC = document.getElementById('tWBTC').innerText;
const tenenciaETH = document.getElementById('tETH').innerText;
const tenenciaHBAR = document.getElementById('tHBAR').innerText;
const tenenciaXSauce = document.getElementById('tXSauce').innerText;
const tenenciaKeeta = document.getElementById('tKeeta').innerText;
const tenenciaDosa = document.getElementById('tDosa').innerText;
//const tenenciaZAP = document.getElementById('tZAP').innerText;
const tenenciaHert = document.getElementById('tHert').innerText;

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

let obtenerCotGeckoTerminal = (Id) => {
    try {
      let resultado;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrGeckoTerminal+Id, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
      xhr.send();
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resultado = data;
      } else {
          console.error('Error fetching data Hedera (1):' + xhr.statusText);
          return 0;
      }
      let cot = resultado.data.attributes.base_token_price_usd;
      return cot;
    }
    catch(error) {
      console.error('Error fetching data Hedera (2):' + error);
      return 0;
    }
};
/*
let obtenerPorHedera = (Id, temp) => {
    try {
      //vpa
      let resultado;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiUrGeckoTerminal+Id, false); // Establecer el tercer parámetro en 'false' para hacer la solicitud síncrona
      xhr.send();
      if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resultado = data;
      } else {
          console.error('Error fetching data porcentaje Hedera (1):' + xhr.statusText);
          return 0;
      }
      let cot = resultado.data.attributes.price_change_percentage[temp];
      return formatoNum(parseFloat(cot),1);
    }
    catch(error) {
      console.error('Error fetching data porcentaje Hedera (2):' + error);
      return 0;
    }
};
*/
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
  let cotKeeta = document.getElementById('spCotKeeta').innerText;
  let cotDosa = document.getElementById('spCotDosa').innerText;  
  //let cotZAP = document.getElementById('spCotZAP').innerText;
  let cotHert = document.getElementById('spCotHert').innerText;
  let total = (tenenciaUSDC * cotUSDC
  				   + tenenciaWBTC * cotWBTC
  				   + tenenciaHBAR * cotHBAR				   
				     + tenenciaXSauce * cotXSauce 
     			   + tenenciaKeeta * cotKeeta
				     + tenenciaDosa * cotDosa
				     //+ tenenciaZAP * cotZAP
				     + tenenciaHert * cotHert
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

let calcularPesoKeeta=() => {  
  let cotKeeta = document.getElementById('spCotKeeta').innerText;  
  let dKeeta = tenenciaKeeta * cotKeeta;
  let peso = dKeeta * 100 / calcularTotal();
  return peso;
};

let calcularPesoDosa=() => {  
  let cotDosa = document.getElementById('spCotDosa').innerText;  
  let dDosa = tenenciaDosa * cotDosa;
  let peso = dDosa * 100 / calcularTotal();
  return peso;
};
/*
let calcularPesoZAP=() => {  
  let cotZAP = document.getElementById('spCotZAP').innerText;  
  let dZAP = tenenciaZAP * cotZAP;
  let peso = dZAP * 100 / calcularTotal();
  return peso;
};
*/
let calcularPesoHert=() => {  
  let cotHert = document.getElementById('spCotHert').innerText;  
  let dHert = tenenciaHert * cotHert;
  let peso = dHert * 100 / calcularTotal();
  return peso;
};

let inicializar=()=>{
  document.getElementById('spCotUSDC').textContent = obtenerCotBitget(USDCSimbol);
  document.getElementById('spCotBTC').textContent = obtenerCotBitget(BTCSimbol);
  document.getElementById('spCotWBTC').textContent = obtenerCotGeckoTerminal(WBTCId);
  document.getElementById('spCotETH').textContent = obtenerCotBitget(ETHSimbol);  
  document.getElementById('spCotHBAR').textContent = obtenerCotBitget(HBARSimbol);  
  document.getElementById('spCotXSauce').textContent = obtenerCotGeckoTerminal(XSauceId);
  document.getElementById('spCotKeeta').textContent =  obtenerCotGeckoTerminal(KeetaId);
  document.getElementById('spCotDosa').textContent =  obtenerCotGeckoTerminal(DosaId);
  //document.getElementById('spCotZAP').textContent =  obtenerCotGeckoTerminal(ZAPId);
  document.getElementById('spCotHert').textContent =  obtenerCotGeckoTerminal(HertId);
  /*
  document.getElementById('h6XSauce').textContent =  obtenerPorHedera(XSauceId, 'h6');
  document.getElementById('h24XSauce').textContent =  obtenerPorHedera(XSauceId, 'h24');
  document.getElementById('h6Keeta').textContent =  obtenerPorHedera(KeetaId, 'h6');
  document.getElementById('h24Keeta').textContent =  obtenerPorHedera(KeetaId, 'h24');
  document.getElementById('h6Dosa').textContent =  obtenerPorHedera(DosaId, 'h6');
  document.getElementById('h24Dosa').textContent =  obtenerPorHedera(DosaId, 'h24');
  document.getElementById('h6Hert').textContent =  obtenerPorHedera(HertId, 'h6');
  document.getElementById('h24Hert').textContent =  obtenerPorHedera(HertId, 'h24');
  document.getElementById('h6CKNBLZ').textContent =  obtenerPorHedera(CKNBLZId, 'h6');
  document.getElementById('h24CKNBLZ').textContent =  obtenerPorHedera(CKNBLZId, 'h24');*/
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
  document.getElementById('Keeta').textContent = formatoNum(parseFloat(document.getElementById('spCotKeeta').innerText),5);
  document.getElementById('pKeeta').textContent = ' (' + formatoNum(parseFloat(calcularPesoKeeta()),2) +  '%)';
  document.getElementById('tKeeta').textContent = formatoNum(parseFloat(tenenciaKeeta),0);
  document.getElementById('vKeeta').textContent = formatoNum(parseFloat(tenenciaKeeta)*parseFloat(document.getElementById('spCotKeeta').innerText),0);
  document.getElementById('Dosa').textContent = formatoNum(parseFloat(document.getElementById('spCotDosa').innerText),2);
  document.getElementById('pDosa').textContent = ' (' + formatoNum(parseFloat(calcularPesoDosa()),2) +  '%)';
  document.getElementById('tDosa').textContent = formatoNum(parseFloat(tenenciaDosa),0);
  document.getElementById('vDosa').textContent = formatoNum(parseFloat(tenenciaDosa)*parseFloat(document.getElementById('spCotDosa').innerText),0);
  /*document.getElementById('ZAP').textContent = formatoNum(parseFloat(document.getElementById('spCotZAP').innerText),5);
  document.getElementById('pZAP').textContent = ' (' + formatoNum(parseFloat(calcularPesoZAP()),2) +  '%)';
  document.getElementById('tZAP').textContent = formatoNum(parseFloat(tenenciaZAP),0);
  document.getElementById('vZAP').textContent = formatoNum(parseFloat(tenenciaZAP)*parseFloat(document.getElementById('spCotZAP').innerText),0);
  */document.getElementById('Hert').textContent = formatoNum(parseFloat(document.getElementById('spCotHert').innerText),5);
  document.getElementById('pHert').textContent = ' (' + formatoNum(parseFloat(calcularPesoHert()),2) +  '%)';
  document.getElementById('tHert').textContent = formatoNum(parseFloat(tenenciaHert),0);
  document.getElementById('vHert').textContent = formatoNum(parseFloat(tenenciaHert)*parseFloat(document.getElementById('spCotHert').innerText),0);  
  document.getElementById('total').textContent = formatoNum(calcularTotal(),0);
  document.getElementById('dATH').textContent = ' (desde ATH ' + formatoNum((calcularTotal()-8500)*100/8500,0) + '%)';
  document.getElementById('totalXSauce').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotXSauce').innerText),0);
  document.getElementById('totalWBTC').textContent = formatoNum(parseFloat(calcularTotal()/document.getElementById('spCotWBTC').innerText),5);
  document.getElementById('totalMeme').textContent = formatoNum((0
                                                     +parseFloat(tenenciaDosa)*parseFloat(document.getElementById('spCotDosa').innerText)
                                                     +parseFloat(tenenciaKeeta)*parseFloat(document.getElementById('spCotKeeta').innerText)
                                                     +parseFloat(tenenciaHert)*parseFloat(document.getElementById('spCotHert').innerText))
                                                     /parseFloat(calcularTotal())*100,2);
}

