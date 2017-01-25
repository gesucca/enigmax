function cryptButton() {
	var m = new MsgChecker(getClearMsg(), /^[A-Z0-9'?!,.:\n ]*$/, true);
	if (!checkFor(m))
		return;

	var result = crypt(getClearMsg(), getUsn(), getPwd(), getExpiration());
	writeMsg(result,'cryptText');
}

function decryptButton() {
	var m = new MsgChecker(getCryptMsg(),/^[a-zA-Z0-9 ]*$/, true);
	if (!checkFor(m)){
		return;
	}

	var result = decrypt(getCryptMsg(), getUsn(), getPwd(), getExpiration());
	writeMsg(result,'clearText');
}

function getCryptMsg() {
	return document.getElementById('cryptText').value;
}

function getClearMsg() {
	return document.getElementById('clearText').value.toUpperCase();
}

function writeMsg(msg, id) {
	document.getElementById(id).value = msg;
}

function getExpiration() {
	var a = document.getElementById('expiration').value;
	if (!a)
		return 0;
	else return a;
}

function getUsn() {
	return document.getElementById('usn').value;
}

function getPwd() {
	return document.getElementById('pwd').value;
}

function checkFor(msgCheck) {
	var u = new FieldChecker('User Code',getUsn());
	var p = new FieldChecker('password',getPwd());
	
	if (!msgCheck.check() || !u.check() || !p.check())
		return false;
	return true;
}