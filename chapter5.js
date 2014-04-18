/*** Prototypal Pattern ***/

var myMammal = {
	name: 'Herb the Mammal',
	get_name: function () {
		return this.name;
	},
	says: function () {
		return this.saying || '';
	}
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
	var i, s = '';
	for (i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};

myCat.get_name = function() {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

/*** Functional Pattern ***/
var mammal = function (spec) {
	var that = {};

	that.get_name = function () {
		return spec.name;	
	};

	that.says = function () {
		return spec.saying || '';
	};

	return that;
};

var myMammal = mammal({name: 'Cookie'});

var cat = function (spec) {
	spec.saying = spec.saying || 'meow';
	var that = mammal(spec);
	that.purr = function (n) {
		var i, s = '';
		for (i = 0; i < n; i++) {
			if (s) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};
	that.get_name = function () {
		return that.says() + ' ' + spec.name + ' ' + that.says();
	}
	return that;
}

var myCat = cat({name: 'Rita'});

// Object.method('superior', function (name) {
// 	var that = this,
// 	method = that[name];
// 	return function () {
// 		return method.apply(that, arguments);
// 	};
// });
//
//
// var coolcat = function (spec) {
// 	var that = cat(spec),
// 		super_get_name = that.superior('get_name');
// 	that.get_name = function (n) {
// 		return 'like ' + super_get_name() + ' baby';
// 	};
// 	return that;
// }
//
// var myCoolCat = coolcat({name: 'Bix'});
// var name = myCoolCat.get_name();
