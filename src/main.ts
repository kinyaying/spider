const axios = require('axios')
const cheerio = require('cheerio')
const xlsx = require('node-xlsx')
const fs = require('fs')
async function init() {
  const response = await axios.get('http://quotes.money.163.com/f10/zycwzb_600519.html');
  const $ = cheerio.load(response.data);
  let title = $('.limit_sale').html()
  const titleArr = []
  const result = []
  const target = '净利润(扣除非经常性损益后)(万元)'
  let index = 0, targetIndex = 0
  title.replace(/<td\s+class="td_1">([\S\s]*?)<\/td>/gi, function($0, $1){
    titleArr.push($1);
    result.push([]);   
    if (target === $1) {
      targetIndex = index
    }
    index++
    return $0;
  }, "");  
  const body = $('.scr_table').html()
  const bodyArr = []
  const dateArr = []
  index=-1
  body.replace(/<tr[\S\s]*?>([\S\s]*?)<\/tr>/gi, function($0, $1, $2){
    if (index === -1) {
      $0.replace(/<th>([\S\s]*?)<\/th>/gi, function(s1, s2) {
        dateArr.push(s2)
        return s1
      }, '')
    }
    if (index === targetIndex) {
      $0.replace(/<td>([\S\s]*?)<\/td>/gi, function(s1, s2) {
        bodyArr.push(s2)
        return s1
      }, '')
    }
    index++
    return $0;
  }, "");  
  var xlsx = require('node-xlsx');
  var fs = require('fs');
  var data = [
      {
          name : 'sheet1',
          data : [
            ['报告日期', ...dateArr],
            [target, ...bodyArr]
          ]
      }
  ]
  var buffer = xlsx.build(data);
  fs.writeFile('./resut.xls', buffer, function (err) {
      if (err)
          throw err;
      console.log('Write to xls has finished');
      var obj = xlsx.parse("./" + "resut.xls");
      console.log(JSON.stringify(obj));
  });
}
init();
