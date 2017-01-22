/*
* refactor this shit!
*/
function crypt(msg, usn, pwd, exp) {

	if (exp!=0)
		msg = expirator(exp, msg);

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


// why this need exp? no way, gonna fix it somaday
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

	var result = b.get();

	// console.log(result);

	var e = new ExpChecker(b.get());
	msg = e.getMsgExpChecked(b.get());

	//shit, even this sucks, but wathever for now
	if (msg==';')
	return 'THE MESSAGE HAS EXPIRED! IT CANNOT BE DECIPHERED ANYMORE.'

		// console.log(msg);

	//regex magic to get rid of double spaces
	return msg.replace(/\s\s+/g, ' ');
}