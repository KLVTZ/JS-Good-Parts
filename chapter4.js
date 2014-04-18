var add = function(a,b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}

console.log(add(2,4));

/**/

/*var myObject = function () {
	var value = 0;
	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function() {
			return value;
		}
	};
}();
*/

var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	},
	getValue: function() {
		return this.value;
	}
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment(2);
document.writeln(myObject.value);

/**/

myObject.double = function () {
	var that = this; // Workaround

	var helper = function() {
		that.value = add(that.value, that.value);
	};

	helper();
};

// Invoke double as a method

myObject.double();
document.writeln(myObject.getValue());

document.writeln("<br>");

/**/

// create a constructor function called Quo
// It makes an object with a status property

var Quo = function (string) {
	this.status = string;
}

// called get_status
Quo.prototype.get_status = function () {
	return this.status;
}

// make an instance of Quo

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status());

/*** The Apply invocation Pattern ***/

// make an array of 2 numbers and add them.
var array = [3,4];
var sum = add.apply(null, array);

console.log(sum);

// make an object with a status member.
var statusObject = {
	status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_Status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);
console.log(status);

/*** Arguments ***/

var sum = function () {
	console.log(arguments);
	var i, sum = 0;
	for(i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
};

document.writeln("<br>");
document.writeln(sum(4, 8, 15, 16, 23, 42));

var try_it = function () {
	try {
		add("seven");
	} catch (e) {
		document.writeln("<br>" + e.name + ': ' + e.message);
	}
}

try_it();
/*** Augmenting Types ***/
Function.prototype.method = function (name, func) {
	if(!this.prototype[name]) {
		this.prototype[name] = func; 
		return this;
	}
};

Number.method('integer', function() {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln("<br>");
document.writeln((-10 / 3).integer());

document.writeln("<br>");

String.method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "    neat   ".trim() + '"');

/*** Recursion ***/
document.writeln("<br>");

var hanoi = function (disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		document.writeln('Move disc ' + disc + 'from ' + src + ' to ' + dst);
		document.writeln("<br>");
		hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(3, 'Src', 'Aux', 'Dst');

// Define a walk_the_DOM function that visits every node of the tree in HTML
// source order

var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while(node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

var getElementsByAttribute = function (att, value) {
	var results = [];

	walk_the_DOM(document.body, function(node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if(typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});

	return results;
}

// factorialk function with tail recursion

var factorial = function factorial(i, a) {
	a = a || 1;
	if(i < 2) {
		return a;
	}
	return factorial(i - 1, a * i);
};

document.writeln(factorial(4));

/*** closure ***/
var quo = function(status) {
	return {
		get_status: function() {
			return status;
		}
	};
};

var myQuo = quo("amazed")

document.writeln("<br>");
document.writeln(myQuo.get_status());


// Define a fucntion that sets a DIOM node's color
// to yellow and then fades it to white.

var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if(level < 15) {
			level++;
			setTimeout(step, 100)
		}
	};
	setTimeout(step, 100);
};

fade(document.body);

/*** Module ***/

String.method('deentityify', function() {
	// the entity table. It maps entity names to characters

	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	return function() {
	// This is the deentityify method. It calls the string
	// replace method, looking for substrings that start
	// with '&' and end with ';'. If the characters in
	// between are in the entity table, then replace the
	// entity with the characters from the table. It uses
	// a regular expression (chapter 7)

		return this.replace(/&([^&;]+);/g,
			function(a, b) {
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			}
		);
	};
}());

document.writeln('&lt;&quot;&gt;'.deentityify());


var serial_maker = function () {
	// Produce an object that produces unique strings. A
	// unique string is made up of two parts: a prefix
	// and a sequence number. The object comes with
	// methods for setting the prefix sequence
	// number, and a gensym method that produce unique
	// strings.

	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function(p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq++;
			return result;
		}
	};
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
document.writeln("<br>");
document.writeln(seqer.gensym());

/*** Memoization ***/

// var fibonacci = function () {
// 	var memo = [0,1];
// 	var fib = function (n) {
// 		var result = memo[n];
// 		if(typeof result !== 'number') {
// 			result = fib(n-1) + fib(n-2);
// 			memo[n] = result;
// 		}
// 		return result;
// 	};
// 	return fib;
// }();
//

var memoizer = function (memo, fundamental) {
	var shell = function (n) {
		var result = memo[n];
		if(typeof result !== 'number') {
			result = fundamental(shell, n);
			memo[n] = result; 
		}
		return result;
	};
	return shell;
};


var fibonacci = memoizer([0,1], function(shell, n) {
	return shell(n - 1) + shell(n -2);
});

for(var i = 0; i <= 10; i++) { document.writeln('//' + i + ': ' + fibonacci(i)); }
