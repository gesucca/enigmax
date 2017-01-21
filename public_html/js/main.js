function crypt(msg, usn, pwd, exp) {

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(new FirstMap().get());
	var d = new ToMap(new LastMap().get());

	while (!s.isEnd()){
		var slice = s.getSlice();
		var temp = c.convert(slice); //temp is an int!

		// do crypt stuff
		if (temp!=0)
			temp -= getMagicNumber(usn, pwd);

		b.append(d.convert(temp));
	}
	//regex magic to get rid of double spaces
	return b.get().replace(/\s\s+/g, ' ');
}

function decrypt(msg, usn, pwd, exp) {

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(new LastMap().getReverse());
	var d = new ToMap(new FirstMap().getReverse());

	while (!s.isEnd()){
		var slice = s.getSlice();
		var temp = c.convert(slice);

		//decrypt stuff
		temp += getMagicNumber(usn, pwd);

		b.append(d.convert(temp));
	}

	//regex magic to get rid of double spaces
	return b.get().replace(/\s\s+/g, ' ');
}