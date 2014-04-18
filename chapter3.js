var stooge = {
	first_name : "Jerome",
	last_name : "Howard",
	nickname : 'curly'
}

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}

var another_stooge = Object.create(stooge);

another_stooge.first_name = 'Harry';
another_stooge.middle_name = 'Page';
another_stooge.nickname = 'Moe';

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};

var name;
for(name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	}
}

document.writeln('<br>');

var i;

var properties = [
	'first_name',
	'middle_name',
	'last_name',
	'nickname'
];
for(i = 0; i < properties.length; i++) {
	document.writeln(properties[i] + ': ' +
		another_stooge[properties[i]]);
}

var MYAPP = {};

MYAPP.stooge = {
	"fist-name" : "Joe",
	"last-name" : "WhatDoYouKnow"
}

MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};
