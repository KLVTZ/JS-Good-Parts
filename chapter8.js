// Chapter 7 ~ Methods

var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.push(b, true, false);

document.writeln(c);

var a = a.reverse();

// sort numbers --by default, alpha numeric
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
m.sort(function(a,b) {
	return a-b;
});

// sort object by one property --not fully stable
var by = function (name, minor) {
	return function (o, p) {
		var a, b;
		if(o  && p && typeof o === 'object' && typeof p === 'object') {
			a = o[name];
			b = p[name];
			if(a === b) {
				return typeof minor === 'function' ? minor(o, p) : 0;
			}
			if (typeof a  === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw {
				name : 'Error',
				message: 'Expected an object when sorting by ' + name
			};
		}
	};
};

var s = [
	{first: 'Joe', last: 'Besser'},
	{first: 'Moe', last: 'Howard'},
	{first: 'Joe', last: 'Derita'},
	{first: 'Shemp', last: 'Howard'},
	{first: 'Larry', last: 'Fine'},
	{first: 'Curly', last: 'Howard'}
];

s.sort(by('last', by('first')));

// Regular expressions
var text = '<html><body bgcolor=linen><p>' + 'This is <b>bold<\/b>!<\/p><\/body><\/html>';

var tags = /[^<>]+|<(\/?)([A-Za-z]+)([^<>]*)>/g;

while((a = tags.exec(text))) {
	for(i = 0; i < a.length; i++) {
		console.log('[' + i + ']' + ' ' +  a[i]);
	}
}

a = text.match(tags);
for(i = 0; i < a.length; i++) {
	console.log('[' + i + ']' + ' ' +  a[i]);
}
