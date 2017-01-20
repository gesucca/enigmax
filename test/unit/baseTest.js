/* global QUnit */
QUnit.module("Base Changes");

/*
Precise tests are pointless now that we have a full one, imho

QUnit.test("From 1st to base 10", function (assert) {
	var m = new FirstMap().get();
	var c = new ToTen(m);
	assert.ok(c.convert(['A','A'])==43, "true as expected");
});

QUnit.test("From final to base 10", function (assert) {
	var m = new LastMap().getReverse();
	var c = new ToTen(m);
	assert.ok(c.convert(['a','a'])==66, "true as expected");
});

QUnit.test("From base 10 to First Map", function (assert) {
	var m = new FirstMap().getReverse();
	var c = new ToMap(m);
	assert.deepEqual(c.convert(43), ['A','A'], "equal as expected");
});

QUnit.test("From base 10 to final Map", function (assert) {
	var m = new LastMap().get();
	var c = new ToMap(m);
	assert.deepEqual(c.convert(66), ['a','a'], "equal as expected");
});
*/

QUnit.test("Full test 1", function (assert) {
	// convert
	var start = ['?','B','A','!',' '];

	var c = new ToTen(new FirstMap().get());
	var temp = c.convert(start);

	c = new ToMap(new LastMap().get());
	temp = c.convert(temp);

	//reverse
	c = new ToTen(new LastMap().getReverse());
	temp = c.convert(temp);

	c = new ToMap(new FirstMap().getReverse());
	temp = c.convert(temp);

	assert.deepEqual(temp, start, "incredible!");
});

// cannot bother to factorize common parts in unit tests, 
// here's a copypaste and there you go
QUnit.test("Full test 2", function (assert) {
	// convert
	var start = ['G',':',';',',','.'];

	var c = new ToTen(new FirstMap().get());
	var temp = c.convert(start);

	c = new ToMap(new LastMap().get());
	temp = c.convert(temp);

	//reverse
	c = new ToTen(new LastMap().getReverse());
	temp = c.convert(temp);

	c = new ToMap(new FirstMap().getReverse());
	temp = c.convert(temp);

	assert.deepEqual(temp, start, "incredible!");
});