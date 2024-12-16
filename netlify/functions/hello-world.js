exports.handler = async () => {
    const cheerio = require("cheerio")
    const axios = require("axios")
	const url = `https://www.nytimes.com/puzzles/letter-boxed`;
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);
	let nyt=$('body').text();
    startstring=nyt.indexOf("{")
    startparens = startstring + nyt.substring(startstring).indexOf("{")
    endstring = startparens + nyt.substring(startparens).indexOf("}")
    metadata = JSON.parse(nyt.substring(startparens,endstring)+"}")
    string=nyt.substring(startparens,endstring)+"}"
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: string,
      }),
    }
}