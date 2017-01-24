/*GUI*/

function setLanguage(lang) {
	var known = { en: true, it: true};
	if(!known[lang])
		lang = 'en';

	//switch all divs class ltext 
	$('div.ltext[lang='  + lang + ']').show();
	$('div.ltext[lang!=' + lang + ']').hide(); 

	//switch unreachable text, such as placeholders
	if (lang=='en') {
		$('textarea[id=clearText]').attr('placeholder','The clear message goes here...');
		$('textarea[id=cryptText]').attr('placeholder','The crypted message goes here...');
		$('input[id=usn]').attr('placeholder','User Code');
	}
	if (lang=='it'){
		$('textarea[id=clearText]').attr('placeholder','Scrivi qui il messaggio in chiaro...');
		$('textarea[id=cryptText]').attr('placeholder','Incolla qui il messaggio cifrato...');
		$('input[id=usn]').attr('placeholder','Codice Utente');
	}
};

/*BACK*/

// String hashing: thanks SO
String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function getMagicNumber(usn, pwd) {
	var theMagicNumber = usn.hashCode() + pwd.hashCode();
	return Math.abs(theMagicNumber) % 9991;
}

function noDoubleSpace(msg) {
	//regex magic to get rid of double spaces
	return msg.replace(/\s\s+/g, ' ');
}

function encodeLength(msg) {
	return msg.length + "-" + msg;
}

function decodeLength(msg) {
	var splitPoint = msg.indexOf('-');
	var l = parseInt(msg.substring(0, splitPoint));

	return msg.substring(splitPoint+1, splitPoint+1+l);
}

