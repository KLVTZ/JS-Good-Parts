/* Chapter 7 */
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.google.com:80/goodparts?q#fragment";

var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];

var blanks = "       ";
var i;

for(i = 0; i < names.length; i++) {
	document.writeln(names[i] + ':' + blanks.substring(names[i].length), result[i]);
}


var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

var test = function (num) {
	document.writeln(parse_number.test(num));
};

test('98.6');
