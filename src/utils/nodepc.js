// const superagent = require('superagent')
// const cheerio = require('cheerio')

// const mainUrl = 'https://www.mi.com' //天涯论坛主域名
// let url = '/category/list' //重庆区域域名

// superagent.get(mainUrl + url).end(function (err, res) {
//     // 抛错拦截
//     if (err) {
//         return
//         throw Error(err)
//     }
//     console.log(res)
// })

// let $ = cheerio.load(res.text)
// $('.category-list li a').each((index, item) => {
//     //这里是每一项的信息
//     console.log(item);
// })