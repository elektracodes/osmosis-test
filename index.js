var osmosis = require('osmosis')
var json2xls = require('json2xls');
var fs = require('fs');
var nextLink;
var xls;
var json = [];
var array;
function open_page(url) {
    console.log("Opening " + url);
    osmosis.get(url)
        .find('#nav td:last a')
        .set({
            'nextLink': '@href'
        })    
        .find('.g')
        .set({
            'title':    '.r',
            'url':      'cite',
            'link':     '.r @href',
            'text':     '.st'
        })
        .follow('.r @href')
        .set({
            'pageText': 'title'
        })
        .data(function(l) {
		json.push(l);

            nextLink = l['nextLink'];
         //   console.log(l);

			})
        .error(console.log)
        .debug(console.log)
        .done(function() {
			console.log(json);
					xls = json2xls(json);
			write(xls)
        //    open_page('https://www.google.co.in/' + nextLink);
        })
}
function write(data) {
	fs.writeFileSync('data.xlsx', data, 'binary');
}
open_page('https://www.google.co.in/search?q=random+search');

