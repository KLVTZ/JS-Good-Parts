// Arrays

/*** avoiding confusion for is_arraty ***/
var is_array = function (value) {
	return value &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		typeof value.splice === 'function' &&
		!(value.propertyIsEnumerable('length'));
};

var array = [2, 3, 4];
var value;
if(is_array(array)) { document.writeln('is array'); }

/*** avoiding confusion for is_arraty ***/

array.sum= function() {
	return this.reduce(function(previousVal, currentVal) {
		return previousVal + currentVal;
	});
}

array.product= function() {
	return this.reduce(function(previousVal, currentVal) {
		return previousVal * currentVal;
	});
}

var totalSum = array.sum();
var totalProd = array.product();



// sum = array.reduce(function(previousVal, currentVal) {
// 	return previousVal + currentVal;
// });
//
// product = array.reduce(function(previousVal, currentVal) {
// 	return previousVal * currentVal;
// });


// make a 4 x 4 matrix filled with zeros
Array.matrix = function (m, n, initial) {
	var a, i, j, mat = [];
	for(i = 0; i < m; i++) {
		a = [];
		for (j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};

var myMatrix = Array.matrix(4, 4, 0);
document.write(myMatrix[3][3]);

// method to make an identity matrix.

Array.identity = function (n) {
	var i, mat = Array.matrix(n, n, 0);
	for (i=0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
};

myMatrix = Array.identity(4);
document.write(myMatrix[3][3]);

