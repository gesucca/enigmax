/* global QUnit */
QUnit.module("Maps");

QUnit.test("First Map", function (assert) {
	assert.ok(FirstMap['A']==1, "true as expected");
});

QUnit.test("First Map reversed", function (assert) {
	assert.ok(reverse(FirstMap)[41]==' ', "true as expected");
});

QUnit.test("Last Map", function (assert) {
	assert.ok(LastMap[7]=='g', "true as expected");
});

QUnit.test("Last Map reversed", function (assert) {
	assert.ok(reverse(LastMap)['B']==28, "true as expected");
});