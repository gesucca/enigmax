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