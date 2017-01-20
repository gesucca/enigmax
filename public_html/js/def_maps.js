function reverse(map) {
	var ret = {};
	for(var key in map){
		ret[map[key]] = key;
	}
	//console.log(ret);
	return ret;
};


var FirstMap = function() {

	var innerMap = {
		'A' : 1,
		'B' : 2,
		'C' : 3,
		'D' : 4,
		'E' : 5,
		'F' : 6,
		'G' : 7,
		'H' : 8,
		'I' : 9,
		'J' : 10,
		'K' : 11,
		'L' : 12,
		'M' : 13,
		'N' : 14,
		'O' : 15,
		'P' : 16,
		'Q' : 17,
		'R' : 18,
		'S' : 19,
		'T' : 20,
		'U' : 21,
		'V' : 22,
		'W' : 23,
		'X' : 24,
		'Y' : 25,
		'Z' : 26,
		'1' : 27,
		'2' : 28,
		'3' : 29,
		'4' : 30,
		'5' : 31,
		'6' : 32,
		'7' : 33,
		'8' : 34,
		'9' : 35,
		'0' : 36,
		'?' : 37,
		'!' : 38,
		'\'': 39,
		'\n': 40,
		' ' : 41,
		'.' : 42,
		':' : 43,
		',' : 44,
		';' : 45,
		'*' : 46   // eventual expiration char
	};

	this.get = function() {
		return innerMap;
	}

	this.getReverse = function() {
		return reverse(innerMap);
	};
}

var LastMap = function(){
	var innerMap = {
		0  : ' ',
		1  : 'a',
		2  : 'b',
		3  : 'c',
		4  : 'd',
		5  : 'e',
		6  : 'f',
		7  : 'g',
		8  : 'h',
		9  : 'i',
		10 : 'j',
		11 : 'k',
		12 : 'l',
		13 : 'm',
		14 : 'n',
		15 : 'o',
		16 : 'p',
		17 : 'q',
		18 : 'r',
		19 : 's',
		20 : 't',
		21 : 'u',
		22 : 'v',
		23 : 'w',
		24 : 'x',
		25 : 'y',
		26 : 'z',
		27 : 'A',
		28 : 'B',
		29 : 'C',
		30 : 'D',
		31 : 'E',
		32 : 'F',
		33 : 'G',
		34 : 'H',
		35 : 'I',
		36 : 'J',
		37 : 'K',
		38 : 'L',
		39 : 'M',
		40 : 'O',
		41 : 'N',
		42 : 'P',
		43 : 'Q',
		44 : 'R',
		45 : 'S',
		46 : 'T',
		47 : 'U',
		48 : 'V',
		49 : 'W',
		50 : 'X',
		51 : 'Y',
		52 : 'Z',
		53 : '1',
		54 : '2',
		55 : '3',
		56 : '4',
		57 : '5',
		58 : '6',
		59 : '7',
		60 : '8',
		61 : '9',
		62 : '0'
	}

	this.get = function() {
		return innerMap;
	}

	this.getReverse = function() {
		return reverse(innerMap);
	};
}
