/*OBJECTS DEFINITIONS*/

var FirstMap = {
	'A': 1,
	'B': 2,
	'C': 3,
	'D': 4,
	'E': 5,
	'F': 6,
	'G': 7,
	'H': 8,
	'I': 9,
	'J': 10,
	'K': 11,
	'L': 12,
	'M': 13,
	'N': 14,
	'O': 15,
	'P': 16,
	'Q': 17,
	'R': 18,
	'S': 19,
	'T': 20,
	'U': 21,
	'V': 22,
	'W': 23,
	'X': 24,
	'Y': 25,
	'Z': 26,
	'1': 27,
	'2': 28,
	'3': 29,
	'4': 30,
	'5': 31,
	'6': 32,
	'7': 33,
	'8': 34,
	'9': 35,
	'0': 36,
	'?': 37,
	'!': 38,
	'\'': 39,
	'\n': 40,
	' ': 41,
	'.': 42,
	':': 43,
	',': 44,
	';': 45, // expiration char
	'-': 46, // length char
	'_': 47, // this is a void one, without it conversion will not work!
};

var LastMap = {
	0: ' ',
	1: 'a',
	2: 'b',
	3: 'c',
	4: 'd',
	5: 'e',
	6: 'f',
	7: 'g',
	8: 'h',
	9: 'i',
	10: 'j',
	11: 'k',
	12: 'l',
	13: 'm',
	14: 'n',
	15: 'o',
	16: 'p',
	17: 'q',
	18: 'r',
	19: 's',
	20: 't',
	21: 'u',
	22: 'v',
	23: 'w',
	24: 'x',
	25: 'y',
	26: 'z',
	27: 'A',
	28: 'B',
	29: 'C',
	30: 'D',
	31: 'E',
	32: 'F',
	33: 'G',
	34: 'H',
	35: 'I',
	36: 'J',
	37: 'K',
	38: 'L',
	39: 'M',
	40: 'O',
	41: 'N',
	42: 'P',
	43: 'Q',
	44: 'R',
	45: 'S',
	46: 'T',
	47: 'U',
	48: 'V',
	49: 'W',
	50: 'X',
	51: 'Y',
	52: 'Z',
	53: '1',
	54: '2',
	55: '3',
	56: '4',
	57: '5',
	58: '6',
	59: '7',
	60: '8',
	61: '9',
	62: '0'
}

class ToTen {

	constructor(basicMap) {
		this._basicMap = basicMap;
		this._basic = Object.keys(basicMap).length;
	}

	convert(msg) {
		var output = 0,
			pos = null;
		for (var i = 0; i < msg.length; i++) {
			pos = msg[i];
			output += (Math.pow(this._basic, i) * this._basicMap[pos]);
		}
		return output;
	}
}

class ToMap {

	constructor(targetMap) {
		this._tMap = targetMap;
		this._target = Object.keys(targetMap).length;
	}

	convert(int) {
		var converted = [],
			rem = 0;
		while (Math.floor(int / this._target) > 0) {
			rem = int % this._target;
			converted.push(this._tMap[rem]);
			int = Math.floor(int / this._target);
		}
		converted.push(this._tMap[int]);
		return converted;
	}
}

var Slicer = function(msg) {

	var array = msg.split('');

	var i = 0;
	var finish = false;

	this.getSlice = function() {

		var output = [];

		if (i == array.length)
			finish = true;

		if (finish)
			return output;

		// ok, I won't refactor this, let's document it:
		// if 5 elements or more left, take everything
		if (i + 5 <= array.length) {
			output = [array[i + 0], array[i + 1], array[i + 2], array[i + 3], array[i + 4]];
			i += 5;
		}
		// if less than 5 elements has yet to be considered...
		else if ((array.length - i) < 5) {
			// take everything left
			for (; i < array.length; i++) {
				output.push(array[i]);
			}
			//then fill up to five
			for (k = output.length; k < 5; k++) {
				output.push(' ');
			}
		}

		return output;
	}

	this.isEnd = function() {
		return finish;
	}
}


var Builder = function() {

	var built = '';

	this.get = function() {
		return built;
	}

	this.append = function(slice) {

		if (slice.length > 5)
		// nice, the only error thrown is the only one that keeps spawning in unit test from time to time
			throw "ERROR BUILDER: Slice too long! " + slice;

		if (slice.length < 5) {
			for (i = slice.length; i < 5; i++) {
				slice.push(' ');
			}
		}

		built += slice.join('');
	}
}

class Expirator {

	constructor(time, msg) {
		this._time = time;
		this._msg = msg;
		this._now = new Date().getTime();
	}

	getExpMsg() {
		return (';' + this._time + ';' + this._now + ';' + this._msg);
	}
}

var ExpChecker = function(msg) {

	var dirtyMsg = msg;

	function needsExpCheck() {
		if (dirtyMsg.indexOf(';') == 0)
			return true;
		else
			return false;
	}

	function isExpired() {

		var checkMsg = dirtyMsg;

		function getLimit() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';') + 1, checkMsg.length);
			return checkMsg.substring(0, checkMsg.indexOf(';')) * 3600000;
		}

		function getOriginTime() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';') + 1, checkMsg.length);
			return parseInt(checkMsg.substring(0, checkMsg.indexOf(';')));
		}

		var hourLimitMs = getLimit();
		var origTime = getOriginTime();

		var now = new Date().getTime();

		if (now - origTime > hourLimitMs)
			return true;
		else
			return false;
	}

	function clean(dirtyMsg) {
		// cut away everyting before the third ;
		for (i = 0; i < 3; i++)
			dirtyMsg = dirtyMsg.substring(dirtyMsg.indexOf(';') + 1, dirtyMsg.length);

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


/*FUNCTIONS*/

//reversees an object: used for maps
function reverse(map) {
	var ret = {};
	for (var key in map) {
		ret[map[key]] = key;
	}
	return ret;
};

// String hashing: thanks SO
String.prototype.hashCode = function() {
	var hash = 0,
		i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

function getMagicNumber(usn, pwd) {
	var theMagicNumber = usn.hashCode() + pwd.hashCode();
	return Math.abs(theMagicNumber) % 9991;
}

//regex magic to get rid of double spaces
function noDoubleSpace(msg) {
	return msg.replace(/\s\s+/g, ' ');
}

// it gets rid of those phantom chars at the end
function decodeLength(msg) {
	var splitPoint = msg.indexOf('-');
	var l = parseInt(msg.substring(0, splitPoint));

	return msg.substring(splitPoint + 1, splitPoint + 1 + l);
}
