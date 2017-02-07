/* global QUnit */
QUnit.module("Obfuscation");

QUnit.test("1", function (assert) {
	var msg = 'Primo messaggio di prova! Vediamo cosa succede.'
	
	var result = obfuscate(msg);
	result = clarificate(result);

	assert.ok(msg==result, "it works!!");
});

QUnit.test("2", function (assert) {
	var msg = 'Messaggioooo!!!ooo ???';
	
	var result = obfuscate(msg);
	result = clarificate(result);

	assert.ok(msg==result, "it works!!");
});