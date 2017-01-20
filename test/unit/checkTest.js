/* global QUnit */
QUnit.module("Input Checks", {
    before: function() {
    window.alert = function () {}; //override alert to avoid displaying popup
}
});

QUnit.test("Check Clear Msg 1", function (assert) {
	var c = new MsgChecker('PIPPO AND PLUTO', /^[A-Z1-9'?!'\n ]*$/);
	assert.ok(c.check(), "true as expected");
});

QUnit.test("Check Clear Msg 2", function (assert) {

    var c = new MsgChecker('IPPO AND PLUTOè', /^[A-Z1-9'?!'\n ]*$/);
    assert.ok(!c.check(), "false as expected");
});

QUnit.test("Check Clear Msg 3", function (assert) {
    var c = new MsgChecker('', /^[A-Z1-9'?!'\n ]*$/);
    assert.ok(!c.check(), "false as expected");
});

QUnit.test("Check Field 1", function (assert) {
	var c = new FieldChecker('Field Name','LooongField');
	assert.ok(c.check(), "true as expected");
});

QUnit.test("Check Field 2", function (assert) {
    var c = new FieldChecker('Name','short');
    assert.ok(!c.check(), "false as expected");
});

QUnit.test("Check Field 3", function (assert) {
    var c = new FieldChecker('','');
    assert.ok(!c.check(), "false as expected");
});
