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
            .find('#areaindex > ul')
            .set({
                'nomos': 'li.nomos',
                'poleis': 'li.poli',
            })
//            .find('ul.entries div.entry .actions> .site')
//            .follow('@href')
//            .find('body.subdomain table.contents')
//            .set({
//                'perioxi': 'span[itemprop=addressRegion]',
//                't.k': 'span[itemprop=postalCode]'
//            })


        //  .paginate('div.directory-catalog-paging a.next')
        //  .paginate('div.directory-catalog-paging a.next')
            .data(function (l) {
                json.push(l);

                //nextLink = l['nextLink'];
                //   console.log(l);

            })
            .error(console.log)
            .debug(console.log)
            .done(function () {

                // var standardsList = _.uniqBy(json, 'tel');
                // console.log(standardsList);
                xls = json2xls(json);
                write(xls)
                //    open_page('https://www.google.co.in/' + nextLink);
            })
}

function write(data) {
    fs.writeFileSync('ntypoleis.xlsx', data, 'binary');
}
open_page('https://www.4ty.gr/index.php?p=customers-areas');
