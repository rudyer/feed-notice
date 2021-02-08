// const puppeteer = require('puppeteer-core');
// const firebase = require('firebase')

// //8E+ajqBGt?w-y-y
// var firebaseConfig = {
//     apiKey: "AIzaSyAAoalT4d0iStydqqAEzXUKEojP8wYQXsw",
//     authDomain: "central-sul.firebaseapp.com",
//     databaseURL: "https://central-sul.firebaseio.com",
//     projectId: "central-sul",
//     storageBucket: "central-sul.appspot.com",
//     messagingSenderId: "879485991227",
//     appId: "1:879485991227:web:dd450c01cd0aa6e053df1e",
//     measurementId: "G-ECJBYPZLDK"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   var db = firebase.firestore();

// const DB = [{
//   url_noticia: 'https://.riogrande.rs.gov.br/pagina/covid-19-secretaria-da-saude-em-rio-grande-apresenta-numeros-no-vacinometro/',
//   title: 'Covid-19: Secretaria da Saúde em Rio Grande apresenta números no Vacinômetro',
//   time: '5 de fevereiro de 2021',
//   description: 'A partir desta sexta-feira (5), e sempre neste mesmo dia da semana, a Secretaria de Município da Saúde (SMS) da Prefeitura do Rio Grande passa a divulgar o quantitativo de pessoas vacinadas no município contra a Covid-19. O meio da divulgação é o Vacinômetro, um documento gráfico, produzido pela Secretaria, no qual são apresentados dados […]'
// }];
// var contador = 0;
// getDados();
// var myVar = setInterval(getDados, 120000);
// //      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome',

// async function getDados(){
//   console.log('Entrei')
//   const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox']
//     });
//   const page = await browser.newPage();
//   page.setDefaultTimeout(0);
//   await page.goto('https://www.riogrande.rs.gov.br/pagina/category/noticias/#link');
//   //await page.screenshot({path: 'example.png'});
//   const name = await page.$eval('.site-main-home > div', el => el.innerText)
//   const url = await page.$eval("article > div > div > header > h2 > a", (el) => {
//     return el.getAttribute("href");
//   });
//   const Lite =await name.split('\n')
//   //Pegar primeira noticia
//   const title = Lite[1];
//   const time = Lite[2];
//   contador = contador + 1;
//    //Organizar Lista
//    const noticia = {
//     id: contador,
//     url_noticia: url,
//     title: title,
//     time : time,
//     description : "descriçaõ"
//   }
// //verificar ultima noticia
//   if(noticia.url_noticia != DB[0].url_noticia){
//     //pegar noticia completa
//     const page_news = await browser.newPage();
    
//     page_news.setDefaultTimeout(0);
//     await page_news.goto(noticia.url_noticia);
//     const description = await page_news.$eval('article > div > div:nth-child(2)', el => el.innerText)
//     const Description = description.split('\n')
//     //noticia.description = description;
//     noticia.description = (Description[0] + '\n' + Description[2]);
//     savedBD(noticia);
//     console.log(DB[0]);
//   }
//   //console.log(DB)
//   await browser.close();
// }
// //adicionar ultima noticia ao banco
// async function savedBD(props){
//   DB.pop()
//   DB.push(props)
// const docRef = db.collection('news').doc(DB[0].title);
// await docRef.set({
//   id: DB[0].id,
//   url_noticia: DB[0].url_noticia,
//   title: DB[0].title,
//   time : DB[0].time,
//   description : DB[0].description
// });
// }
const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const tab = await browser.newPage();
  const text = await (await tab.goto("http://example.com/")).text();
  console.log(text);
  console.log("done");
  browser.close();
}

main();
