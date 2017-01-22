/*
* refactor this shit!
*/
function expirator(time, msg){
	var now = new Date().getTime();
	return (';' + time + ';' + now + ';' + msg);
}

var ExpChecker = function(msg) {

	function needsExpCheck(){
		if (msg.indexOf(';') == 0)
		return true;
		else 
			return false;
	}

	function isExpired() {
		//this is a mess, try to write it a little better
		var index1, index2;

		index1 = msg.indexOf(';');
		msg = msg.substring(index1+1,msg.length);
		index2 = msg.indexOf(';');

		var hourLimitMs = msg.substring(0,index2) * 3600000;

		msg = msg.substring(index2+1,msg.length);

		var origTime = parseInt(msg.substring(0,msg.indexOf(';')));
		var now = new Date().getTime();

		msg = msg.substring(msg.indexOf(';')+1, msg.legnth)

		if (now-origTime > hourLimitMs)
			return true;
		else
			return false;
	}

	/*function returnSlicedMsg() {
		msg = msg.substring(msg.indexOf(';')+1, msg.length);
		msg = msg.substring(msg.indexOf(';')+1, msg.length);
		msg = msg.substring(msg.indexOf(';')+1, msg.length);
	}*/

	this.getMsgExpChecked = function() {

		//again, this is awful, I am modifying things while I am checking them...
		//hell, I totally need some sleep

		if (!needsExpCheck())
			return msg;

		// console.log('exp'+needsExpCheck());

		if (isExpired())
			return ';';

		// console.log('exp'+isExpired());
		// console.log('exp'+msg);

		return msg;
	}
}



