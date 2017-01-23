/* global QUnit */
QUnit.module("Expiration");

QUnit.test("Checker 1", function (assert) {

	var msg = ';12;'+ new Date().getTime() + ';messaggio';
	var after = new ExpChecker(msg).getMsgExpChecked();

	assert.deepEqual(after, 'messaggio', 'surprisingly, it works');
});

QUnit.test("Checker 2", function (assert) {

	var msg = ';1;'+ 1485021466275 + ';messaggio';
	var after = new ExpChecker(msg).getMsgExpChecked();

	assert.deepEqual(after, 'THE MESSAGE BLEW UP! IT CANNOT BE DECIPHERED ANYMORE.', 'surprisingly, this works too');
});