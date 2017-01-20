function crypt(msg, usn, pwd, exp) {

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(new FirstMap().get());
	var d = new ToMap(new LastMap().get());

	while (!s.isEnd()){
		var temp = c.convert(s.getSlice()); //temp is an int!

		// do crypt stuff
		temp += hasher(usn, pwd);

		b.append(d.convert(temp));
	}

	return b.get().replace(/\s\s+/g, ' ');
}

function decrypt(msg, usn, pwd, exp) {

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(new LastMap().getReverse());
	var d = new ToMap(new FirstMap().getReverse());

	while (!s.isEnd()){
		var temp = c.convert(s.getSlice());

		//decrypt stuff
		temp -= hasher(usn, pwd);

		b.append(d.convert(temp));
	}

	return b.get().replace(/\s\s+/g, ' ');
}