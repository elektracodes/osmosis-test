var osmosis = require('osmosis')
var json2xls = require('json2xls');
var _ = require('lodash');
var fs = require('fs');
var nextLink;
var xls;
var json = [];
var array;
function open_page(url) {
    console.log("Opening " + url);
    osmosis.get(url)
            .find('ul.entries div.entry > .wrapper')
            .set({
                'buiness': 'div.description h2 a',
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
          .paginate('div.directory-catalog-paging a.next')
            .data(function (l) {
                json.push(l);

                //nextLink = l['nextLink'];
                //   console.log(l);
             
            })
            .error(console.log)
            .debug(console.log)
            .done(function () {
              
                var standardsList = _.uniqBy(json, 'tel');
                console.log(standardsList);
                xls = json2xls(standardsList);
                write(xls)
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



var arr = [{'a':'a'}, {'b':'b'},{'sfsdf':'a'},{'c':'c'}];    

while(_.find(myArray, {'urlTag':'Yahoo1'})){
  (_.find(myArray, {'urlTag':'Yahoo1'})).urlTag = 'x';
}

console.log(myArray);


function write(data) {
    fs.writeFileSync('nty4athens.xlsx', data, 'binary');
}
open_page('https://www.4ty.gr/index.php?l=el&p=business-categories&a=%CE%91%CE%B8%CE%B7%CE%BD%CE%B1');

