/* global QUnit */
QUnit.module("Maps");

QUnit.test("First Map", function (assert) {
	var m = new FirstMap();
	var map = m.get();
	assert.ok(map['A']==1, "true as expected");
});

QUnit.test("First Map reversed", function (assert) {
	var m = new FirstMap();
	var map = m.getReverse();
	assert.ok(map[41]==' ', "true as expected");
});

QUnit.test("Last Map", function (assert) {
	var m = new LastMap();
	var map = m.get();
	assert.ok(map[7]=='g', "true as expected");
});

QUnit.test("Last Map reversed", function (assert) {
	var m = new LastMap();
	var map = m.getReverse();
	assert.ok(map['B']==28, "true as expected");
});