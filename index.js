var osmosis = require('osmosis')
var json2xls = require('json2xls');
var _ = require('lodash');
var fs = require('fs');
var mysql = require('mysql');
var nextLink;
var xls;
var json = [];
var array;
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'osmosis'
});

connection.connect();

function open_page(url) {
  console.log("Opening " + url);
  osmosis.get(url)
    .find('ul.entries div.entry > .wrapper')
    .set({
      'business': 'div.description h2 a',
      'tel': '.phone span',
      'category': 'div.description h3 a',
      'fulladdress': '.details .address'
    })
    //            .find('ul.entries div.entry .actions> .site')
    //            .follow('@href')
    //            .find('body.subdomain table.contents')
    //            .set({
    //                'perioxi': 'span[itemprop=addressRegion]',
    //                't.k': 'span[itemprop=postalCode]'
    //            })


    //  .paginate('div.directory-catalog-paging a.next')
    .paginate('div.directory-catalog-paging a.next', 2)
    .data(function(l) {
      json.push(l);

      //nextLink = l['nextLink'];
      //   console.log(l);

    })
    .error(console.log)
    .debug(console.log)
    .done(function() {

      var standardsList = _.uniqBy(json, 'tel');
      var values = [];

      for (var i = 0; i < standardsList.length; i++)
        values.push([standardsList[i].business, standardsList[i].tel, standardsList[i].category, standardsList[i].fulladdress]);
      console.log(values);
      var sql = "INSERT INTO customers (business, tel, category, fulladdress) VALUES ?";
      connection.query(sql, [values], function(err) {
          if (err) throw err;
          connection.end();
      });
      //
      // console.log(standardsList);
      // xls = json2xls(standardsList);
      // write(xls)
      //    open_page('https://www.google.co.in/' + nextLink);
    })
}

var myArray = [{
  "urlTag": "Google",
  "urlTitle": "Users",
  "status": 6,
  "nested": {
    "id": 2,
    "title": "http:\/\/www.google.com",
  }
}, {
  "urlTag": "Bing",
  "tabTitle": "BingUsers"
}, {
  "urlTag": "Yahoo1",
  "tabTitle": "BingUsers"
}];



var arr = [{
  'a': 'a'
}, {
  'b': 'b'
}, {
  'sfsdf': 'a'
}, {
  'c': 'c'
}];

while (_.find(myArray, {
    'urlTag': 'Yahoo1'
  })) {
  (_.find(myArray, {
    'urlTag': 'Yahoo1'
  })).urlTag = 'x';
}

function valuesToArray(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
}

function write(data) {
  fs.writeFileSync('nty4athens.xlsx', data, 'binary');
}
open_page('https://www.4ty.gr/index.php?l=el&p=business-categories&a=%CE%91%CE%B8%CE%B7%CE%BD%CE%B1');
