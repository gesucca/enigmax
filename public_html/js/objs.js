/*BASES*/

var ToTen = function(basicMap) {

	var basic = Object.keys(basicMap).length;

	this.convert = function(msg){
		var base10 = 0;
		for (i=0; i<msg.length; i++) {
			base10 += (Math.pow(basic, i) * basicMap[msg[i]]);
		}
		return base10;
	}
}

var ToMap = function(targetMap) {

	var target = Object.keys(targetMap).length;

	this.convert = function(int){
		var converted = [];
		while (Math.floor(int/target)>0)
		{
			converted.push(targetMap[int%target]);
			int = Math.floor(int/target);
		}
		converted.push(targetMap[int]);
		return converted;
	}
}

/*CHECKER*/
var MsgChecker = function (msg, chars) {

	var popUpVoid = 'Your message is empty!\nNothing will be done...';
	var popUpIllegal = 'Your message contains illegal characters.\nOnly plain letters, numbers and basic puntuation are permitted.';

	this.check = function() {
		if (!msg) { 
			alert(popUpVoid);
			return false;
		}
		if (!chars.test(msg)) {
			alert(popUpIllegal);
			return false;
		}
		return true;
	}
}

var FieldChecker = function (fieldName, fieldValue) {

	var popUpVoid = 'The field \'' + fieldName + '\' is empty!\n';
	var popUpShort = 'Your ' + fieldName + ' is too short!\nChoose one with at least ' + this.minLength + ' characters.';

	this.minLength = 7;

	this.check = function() {
		if (!fieldValue) {
			alert(popUpVoid);
			return false;
		}
		if (fieldValue.length < this.minLength) {
			alert(popUpShort);
			return false;
		}
		return true;
	}
}

/*EXPIRATION*/

var Expirator = function(time, msg){

	var now = new Date().getTime();

	this.getExpMsg = function() {
		return (';' + time + ';' + now + ';' + msg);
	}
}

var ExpChecker = function(msg) {

	var dirtyMsg = msg;

	function needsExpCheck(){
		if (dirtyMsg.indexOf(';') == 0)
		return true;
		else 
			return false;
	}

	function isExpired() {

		var checkMsg = dirtyMsg;

		function getLimit() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';')+1,checkMsg.length);
			return checkMsg.substring(0, checkMsg.indexOf(';')) * 3600000;
		}

		function getOriginTime() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';')+1,checkMsg.length);
			return parseInt(checkMsg.substring(0,checkMsg.indexOf(';')));
		}

		var hourLimitMs = getLimit();
		var origTime = getOriginTime();

		var now = new Date().getTime();

		if (now-origTime > hourLimitMs)
			return true;
		else
			return false;
	}

	function clean(dirtyMsg) {
		// cut away everyting before the third ;
		for (i=0; i<3; i++) 
			dirtyMsg = dirtyMsg.substring(dirtyMsg.indexOf(';')+1, dirtyMsg.length);
		
		return dirtyMsg;
	}

	this.getMsgExpChecked = function() {

		var expAlert = 'THE MESSAGE BLEW UP!\n \nIT CANNOT BE DECIPHERED ANYMORE!';
		
		if (!needsExpCheck())
			return dirtyMsg;

		if (isExpired()) {
			alert(expAlert);
			return '54-' + expAlert;
		}

		return clean(dirtyMsg);
	}
}

/*MAPS*/

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
		';' : 45,  // expiration char
		'-' : 46,  // length char
		'_' : 47   // this is a void one, without it conversion will not work!
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

function reverse(map) {
	var ret = {};
	for(var key in map){
		ret[map[key]] = key;
	}
	return ret;
};

/*SLICER*/

var Slicer = function(msg){

	var array = msg.split('');

	var i = 0;
	var finish = false;

	this.getSlice = function(){

		var output = [];

		if (i == array.length)
			finish = true;

		if (finish)
			return output;

		if (i+5 <= array.length) {
			output = [ array[i+0], array[i+1], array[i+2], array[i+3], array[i+4] ];
			i += 5;
		}
		else if ((array.length-i) < 5) {
			for (; i < array.length; i++) {
				output.push(array[i]);
			}
			//fill up to five
			for (k = output.length; k < 5; k++) {
				output.push(' ');
			}
		}

		return output;
	}

	this.isEnd = function(){
		return finish;
	}
}


var Builder = function(){

	var built = '';

	this.get = function(){
		return built;
	}

	this.append = function(slice){

		if (slice.length > 5)
			throw "ERROR BUILDER: Slice too long! " + slice;

		if (slice.length < 5) {
			for (i = slice.length; i < 5; i++) {
				slice.push(' ');
			}
		}

		built += slice.join('');
	}
}
