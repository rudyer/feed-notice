//import puppeteer, { Browser } from 'puppeteer-core';
import puppeteer, { Browser } from 'puppeteer'
import {Saved,Get} from './firebase';
const DB:News[] = [];

interface News{
    id: number,
    title: string,
    description?: string,
    url_news: string,
    time: string
}
var cont = 0;

getDados();
setInterval(getDados,120000)
async function getDados(){
    console.log('Iniciando')
    const browser = await puppeteer.launch({
        //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome',
        headless: true,
        args: ['--no-sandbox']
      });
    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    await page?.goto('https://www.riogrande.rs.gov.br/pagina/category/noticias/#link');
    //await page.screenshot({path: 'example.png'});
    const title = await page.$eval('article > div > div > header > h2 > a', (el) => el?.textContent || '')
    const time = await page.$eval("article > div > div> header > div > div > span > a > time", (el) => el?.textContent || '')
    const url = await page.$eval("article > div > div > header > h2 > a", (el) => {
      return el?.getAttribute("href") || '';
    });
    const noticia:News = {
        id: cont,
        url_news: url,
        title: title,
        time : time,
      }

    if(cont == 0){
        if(await GetBD(title) == null){
            await GetPageDescription(browser,noticia);
            await savedBD(noticia)
            cont = cont + 1;
        }
    }
    //verificar ultima noticia
    if(noticia.url_news != DB[0].url_news){
      //pegar noticia completa
      await GetPageDescription(browser,noticia)
      await savedBD(noticia);
      cont = cont + 1;
      console.log(noticia);
    }else{
        console.log('Nao a novas noticias')
    }
    //console.log(DB)
    await browser.close();
  }

  async function savedBD(props:News){
    console.log('Salvando')
    DB.pop();
    DB.push(props);
   await Saved(props)
  }

  async function GetBD(props:string) {
    console.log('Verificando')
    var teste = await Get(props)
    if(teste != null){
    DB.push({
        id:teste?.id || '',
        title:teste?.title || '',
        description:teste?.description  || '',
        time:teste?.time || '',
        url_news:teste?.url_news || '',

    })
    cont = DB[0].id;
    return DB;
}else return null
  }

  async function GetPageDescription(browser:Browser,noticia:News) {
    console.log('pegando descricao')
    const page_news = await browser.newPage();
    page_news.setDefaultTimeout(0);
    await page_news.goto(noticia.url_news);
    const description = await page_news.$eval('article > div > div:nth-child(2)', el => el?.textContent || null)
    const Description = description?.split('\n') || '';    
    noticia.description = (Description[0]+Description[1]);
  }