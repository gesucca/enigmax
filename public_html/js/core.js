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

class Slicer {
	constructor(msg) {
		this._array = msg.split('');
		this._i = 0;
		this._finish = false;
	}

	getSlice() {
		var output = [];

		if (this._i == this._array.length)
			this._finish = true;

		if (this._finish)
			return output;

		// if 5 elements or more left, take everything
		if (this._i + 5 <= this._array.length) {
			for (var j = 0; j < 5; j++)
				output.push(this._array[this._i + j]);
			this._i += 5;
		}
		// if less than 5 elements has yet to be considered...
		else if ((this._array.length - this._i) < 5) {
			// take everything left
			for (; this._i < this._array.length; this._i++) {
				output.push(this._array[this._i]);
			}
			//then fill up to five
			for (var k = output.length; k < 5; k++) {
				output.push(' ');
			}
		}
		return output;
	}

	isEnd() {
		return this._finish;
	}
}

class Builder {
	constructor() {
		this._built = '';
	}

	get() {
		return this._built;
	}

	append(slice) {

		if (slice.length > 5)
		// nice, the only error thrown is the only one that keeps spawning in unit test from time to time
			throw "ERROR BUILDER: Slice too long! " + slice;

		if (slice.length < 5) {
			// fills up to five
			for (var i = slice.length; i < 5; i++) {
				slice.push(' ');
			}
		}

		this._built += slice.join('');
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

class ExpChecker {
	constructor(msg) {
		this._dirtyMsg = msg;
		this._expAlertEN = 'THE MESSAGE BLEW UP!\n \nIT CANNOT BE DECIPHERED ANYMORE!';
		this._expAlertIT = 'IL TUO MESSAGGIO E\' ESPLOSO\n \nNON PUO\' PIU\' ESSERE DECIFRATO!';
	}

	getMsgExpChecked() {

		function isExpired(checkMsg) {

			function getLimit() {
				checkMsg = checkMsg.substring(checkMsg.indexOf(';') + 1, checkMsg.length);
				return checkMsg.substring(0, checkMsg.indexOf(';')) * 3600000;
			}

			var hourLimitMs = getLimit();

			function getOriginTime() {
				checkMsg = checkMsg.substring(checkMsg.indexOf(';') + 1, checkMsg.length);
				return parseInt(checkMsg.substring(0, checkMsg.indexOf(';')));
			}

			var origTime = getOriginTime();

			var now = new Date().getTime();
			return (now - origTime > hourLimitMs);
		}

		function clean(dirtyMsg) {
			// cut away everyting before the third ;
			for (var i = 0; i < 3; i++)
				dirtyMsg = dirtyMsg.substring(dirtyMsg.indexOf(';') + 1, dirtyMsg.length);
			return dirtyMsg;
		}

		//needs expiration check?
		if (!this._dirtyMsg.indexOf(';') == 0)
			return this._dirtyMsg;

		if (isExpired(this._dirtyMsg)) {
			if (!this.lang)
				throw 'ERROR: ExpChecker lang should be set!';

			if (this.lang == 'en') {
				alert(this._expAlertEN);
				return '54-' + this._expAlertEN;
			}
			if (this.lang == 'it') {
				alert(this._expAlertIT);
				return '63-' + this._expAlertIT;
			}
		}
		return clean(this._dirtyMsg);
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

// add random characters into the message
function obfuscate(msg) {

	function rndChar() {
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?";
		return possible.charAt(Math.floor(Math.random() * possible.length));
	}

	var output = '';

	for (i = 0; i < msg.length; i++) {
		output += msg.charAt(i);
		if ((msg.charCodeAt(i) % 3) == 0)
			output += rndChar();
	}

	return output;
}

// clarificate obfuscated msg
function clarificate(msg) {

	var output = '';

	for (i = 0; i < msg.length; i++) {
		output += msg.charAt(i);
		if ((msg.charCodeAt(i) % 3) == 0)
			i++;
	}

	return output;
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
