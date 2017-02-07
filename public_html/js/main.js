function crypt(msg, usn, pwd, exp) {

	msg = msg.length + "-" + msg;

	if (exp!=0)
		msg = new Expirator(exp, msg).getExpMsg();

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(FirstMap);
	var d = new ToMap(LastMap);

	while (!s.isEnd()){
		var temp = c.convert(s.getSlice()); //temp is an int!

		if (temp!=0)
			temp -= getMagicNumber(usn, pwd);

		b.append(d.convert(temp));
	}

	return noDoubleSpace(b.get());
}


function decrypt(msg, usn, pwd) {

	var s = new Slicer(msg);
	var b = new Builder();

	var c = new ToTen(reverse(LastMap));
	var d = new ToMap(reverse(FirstMap));

	while (!s.isEnd()){
		var temp = c.convert(s.getSlice()); //temp is an int!

		temp += getMagicNumber(usn, pwd);

		b.append(d.convert(temp));
	}

	var e = new ExpChecker(b.get());
	msg = e.getMsgExpChecked();

	msg = decodeLength(msg);
	
	return noDoubleSpace(msg);
}