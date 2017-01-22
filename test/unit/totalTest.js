//for random tests
function makeRandString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?";

    for( var i=0; i < 79; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function makeRandUSNPWD() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,:;!?";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/* global QUnit */
QUnit.module("TOTAL TEST");

QUnit.test("1", function (assert) {
	var msg = 'Primo messaggio di prova! Vediamo cosa succede.'
	msg = msg.toUpperCase();
	var usn = 'ProvaUsn1';
	var pwd = 'thePassword';
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("2", function (assert) {
	var msg = 'Un po\' di esclamazioni!!!1!!!! Kaffeee?'
	msg = msg.toUpperCase();
	var usn = 'poRRva33!';
	var pwd = 'hheRRe&6';
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("3", function (assert) {
	var msg = 'Un po\' di punteggiatura... Non si sa mai; chissa se un giorno, fortunatamente: o no?'
	msg = msg.toUpperCase();
	var usn = 'po00==444r';
	var pwd = 'poppppreeeeeeeeeee';
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("4", function (assert) {
	var msg = 'Un';
	msg = msg.toUpperCase();
	var usn = 'èèp99iiiiuuiaaaaaaaaaaau';
	var pwd = 'nulllll';
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("5", function (assert) {
	var msg = 'cinque';
	msg = msg.toUpperCase();
	var usn = 'pplllllllllYYYY';
	var pwd = 'TGRHHHRttt';
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("random 1", function (assert) {
	var msg = makeRandString();
	msg = msg.toUpperCase();
	var usn = makeRandUSNPWD();
	var pwd = makeRandUSNPWD();
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("random 2", function (assert) {
	var msg = makeRandString();
	msg = msg.toUpperCase();
	var usn = makeRandUSNPWD()+makeRandUSNPWD();
	var pwd = makeRandUSNPWD();
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("random 3", function (assert) {
	var msg = makeRandString();
	msg = msg.toUpperCase();
	var usn = makeRandUSNPWD();
	var pwd = makeRandUSNPWD()+makeRandUSNPWD();
	var exp = 0;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok!");
});

QUnit.test("With expiration", function (assert) {
	var msg = makeRandString();
	msg = msg.toUpperCase();
	var usn = makeRandUSNPWD();
	var pwd = makeRandUSNPWD()+makeRandUSNPWD();
	var exp = 5;

	var result = crypt(msg, usn, pwd, exp);
	result = decrypt(result, usn, pwd, exp);

	var ok = result.indexOf(msg);

	assert.ok(ok==0, "that's ok! even with the pesky expiration");
});
