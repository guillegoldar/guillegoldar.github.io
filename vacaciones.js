// Definir la URL de la API
const apiUrGeckoTerminal = 'https://api.geckoterminal.com/api/v2/networks/';
const apiUrlBitget = 'https://api.bitget.com/api/v2/spot/market/tickers?symbol=';
const apiUrlDolar = 'https://dolarapi.com/v1/dolares/cripto';
const USDCSimbol = 'USDCUSDT';
const PAXGSimbol = 'PAXGUSDT';
const BTCSimbol = 'BTCUSDT';
const ETHSimbol = 'ETHUSDT';
const KeetaId = 'base/pools/0xd9edc75a3a797ec92ca370f19051babebfb2edee';
const tenenciaUSDC = document.getElementById('tUSDC').innerText;
const tenenciaBTC = document.getElementById('tBTC').innerText;
const tenenciaPAXG = document.getElementById('tPAXG').innerText;
const tenenciaETH = document.getElementById('tETH').innerText;
const tenenciaKeeta = document.getElementById('tKeeta').innerText;

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
  let cotPAXG = document.getElementById('spCotPAXG').innerText;  
  let cotETH = document.getElementById('spCotETH').innerText;    
  let cotKeeta = document.getElementById('spCotKeeta').innerText;
  let total = (tenenciaUSDC * cotUSDC
                    + tenenciaPAXG * cotPAXG
                    + tenenciaKeeta * cotKeeta
                    + tenenciaBTC * cotBTC
                    + tenenciaETH * cotETH
				)
  return total;
};

let calcularPesoUSDC=() => {  
  let cotUSDC = document.getElementById('spCotUSDC').innerText;  
  let dUSDC = tenenciaUSDC * cotUSDC;
  let peso = dUSDC * 100 / calcularTotal();
  return peso;
};

let calcularPesoBTC=() => {  
  let cotBTC = document.getElementById('spCotBTC').innerText;  
  let dBTC = tenenciaBTC * cotBTC;
  let peso = dBTC * 100 / calcularTotal();
  return peso;
};

let calcularPesoPAXG=() => {  
  let cotPAXG = document.getElementById('spCotPAXG').innerText;  
  let dPAXG = tenenciaPAXG * cotPAXG;
  let peso = dPAXG * 100 / calcularTotal();
  return peso;
};

let calcularPesoETH=() => {  
  let cotETH = document.getElementById('spCotETH').innerText;  
  let dETH = tenenciaETH * cotETH;
  let peso = dETH * 100 / calcularTotal();
  return peso;
};

let calcularPesoKeeta=() => {  
  let cotKeeta = document.getElementById('spCotKeeta').innerText;  
  let dKeeta = tenenciaKeeta * cotKeeta;
  let peso = dKeeta * 100 / calcularTotal();
  return peso;
};

let inicializar=()=>{
  document.getElementById('spCotUSDC').textContent = obtenerCotBitget(USDCSimbol);
  document.getElementById('spCotBTC').textContent = obtenerCotBitget(BTCSimbol);
  document.getElementById('spCotPAXG').textContent = obtenerCotBitget(PAXGSimbol);
  document.getElementById('spCotETH').textContent = obtenerCotBitget(ETHSimbol);  
  document.getElementById('spCotKeeta').textContent =  obtenerCotGeckoTerminal(KeetaId);
}

let refrescar=()=>{
  inicializar();
  document.getElementById('USDC').textContent = formatoNum(parseFloat(document.getElementById('spCotUSDC').innerText),3);
  document.getElementById('pUSDC').textContent = ' (' + formatoNum(parseFloat(calcularPesoUSDC()),2) +  '%)';
  document.getElementById('tUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC),0);
  document.getElementById('vUSDC').textContent = formatoNum(parseFloat(tenenciaUSDC)*parseFloat(document.getElementById('spCotUSDC').innerText),0);
  document.getElementById('BTC').textContent = formatoNum(parseFloat(document.getElementById('spCotBTC').innerText),0);
  document.getElementById('pBTC').textContent = ' (' + formatoNum(parseFloat(calcularPesoBTC()),2) +  '%)';
  document.getElementById('tBTC').textContent = formatoNum(parseFloat(tenenciaBTC),5);
  document.getElementById('vBTC').textContent = formatoNum(parseFloat(tenenciaBTC)*parseFloat(document.getElementById('spCotBTC').innerText),0);
  document.getElementById('PAXG').textContent = formatoNum(parseFloat(document.getElementById('spCotPAXG').innerText),0);
  document.getElementById('pPAXG').textContent = ' (' + formatoNum(parseFloat(calcularPesoPAXG()),2) +  '%)';
  document.getElementById('tPAXG').textContent = formatoNum(parseFloat(tenenciaPAXG),5);
  document.getElementById('vPAXG').textContent = formatoNum(parseFloat(tenenciaPAXG)*parseFloat(document.getElementById('spCotPAXG').innerText),0);
  document.getElementById('ETH').textContent = formatoNum(parseFloat(document.getElementById('spCotETH').innerText),0);
  document.getElementById('pETH').textContent = ' (' + formatoNum(parseFloat(calcularPesoETH()),2) +  '%)';
  document.getElementById('tETH').textContent = formatoNum(parseFloat(tenenciaETH),5);
  document.getElementById('vETH').textContent = formatoNum(parseFloat(tenenciaETH)*parseFloat(document.getElementById('spCotETH').innerText),0);
  document.getElementById('Keeta').textContent = formatoNum(parseFloat(document.getElementById('spCotKeeta').innerText),3);
  document.getElementById('pKeeta').textContent = ' (' + formatoNum(parseFloat(calcularPesoKeeta()),2) +  '%)';
  document.getElementById('tKeeta').textContent = formatoNum(parseFloat(tenenciaKeeta),0);
  document.getElementById('vKeeta').textContent = formatoNum(parseFloat(tenenciaKeeta)*parseFloat(document.getElementById('spCotKeeta').innerText),0);
  document.getElementById('total').textContent = formatoNum(calcularTotal(),0);
  document.getElementById('dATH').textContent = ' (desde ATH ' + formatoNum((calcularTotal()-8500)*100/8500,0) + '%)';
  document.getElementById('despues').textContent = formatoNum(916
                                                      +parseFloat(document.getElementById('pBitcoin').innerText)*parseFloat(document.getElementById('spCotBTC').innerText)
                                                      +parseFloat(document.getElementById('pEthereum').innerText)*parseFloat(document.getElementById('spCotETH').innerText),0);
  document.getElementById('dif').textContent = formatoNum((916
                                                      +parseFloat(document.getElementById('pBitcoin').innerText)*parseFloat(document.getElementById('spCotBTC').innerText)
                                                      +parseFloat(document.getElementById('pEthereum').innerText)*parseFloat(document.getElementById('spCotETH').innerText))
                                                      -parseFloat(document.getElementById('antes').innerText),0);
  document.getElementById('antes').textContent = formatoNum(parseFloat(document.getElementById('antes').textContent.replace(',','.')),0);
}

