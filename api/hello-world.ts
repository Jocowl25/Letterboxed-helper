export async function GET(request: Request) {
  console.log("async function loaded")
    const cheerio = require("cheerio")
    const axios = require("axios")
	const url = `https://www.nytimes.com/puzzles/letter-boxed`;
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);
	let nyt=$('body').text();
    let startstring=nyt.indexOf("{")
    let startparens = startstring + nyt.substring(startstring).indexOf("{")
    let endstring = startparens + nyt.substring(startparens).indexOf("}")
    let metadata = JSON.parse(nyt.substring(startparens,endstring)+"}")
    let string=nyt.substring(startparens,endstring)+"}"
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: string,
      }),
    }
}