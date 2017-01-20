/* global QUnit */
QUnit.module("Slicer");

QUnit.test("Slice 1", function (assert) {
	var s = new Slicer('TRE');
	var result = s.getSlice();
	assert.deepEqual(['T','R','E',' ',' '], result, "short slice ok");
});

QUnit.test("Slice 2", function (assert) {
	var s = new Slicer('TRENTATRE');
	var result = s.getSlice();
	assert.deepEqual(['T','R','E','N','T'], result, "long slice ok");
});

QUnit.test("Slice 3", function (assert) {
	var s = new Slicer('TRENTATRE');
	var result = s.getSlice(); //waste the first
	result = s.getSlice(); //cause I want to test the second
	assert.deepEqual(['A','T','R','E',' '], result, "second slice ok");
});

QUnit.test("Slice 4", function (assert) {
	var s = new Slicer('TRENTATRE');
	var result = s.getSlice(); //waste
	result = s.getSlice(); //waste
	result = s.getSlice();
	assert.deepEqual([], result, "void as expected");
});

QUnit.test("Slice 5", function (assert) {
	var s = new Slicer('TRENTATRE');
	var result = s.getSlice(); //waste
	result = s.getSlice(); //waste
	result = s.getSlice();
	assert.ok(s.isEnd(), "true as expected");
});


/* global QUnit */
QUnit.module("Builder");

QUnit.test("Builder 1", function (assert) {
	var s = new Builder();
	var result = false;
	try {
		s.append(['T','R','E',' ',' ',' ']);
	}
	catch (error) {
		//console.log(error);
		result = true;
	}
	finally {
		assert.ok(result,'ok error');
	}
});

QUnit.test("Builder 2", function (assert) {
	var s = new Builder();
	s.append(['T','R','E',' ',' ']);
	assert.deepEqual(s.get(), 'TRE  ', "ok perfect slice");
});

QUnit.test("Builder 3", function (assert) {
	var s = new Builder();
	s.append(['T','R','E']);
	assert.deepEqual(s.get(), 'TRE  ', "ok short slice");
});

QUnit.test("Builder 4", function (assert) {
	var s = new Builder();
	s.append(['T','R','E','N','T']);
	s.append(['T','R','E','N','T']);
	assert.deepEqual(s.get(), 'TRENTTRENT', "ok composed slice");
});