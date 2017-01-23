function expirator(time, msg){
	var now = new Date().getTime();
	return (';' + time + ';' + now + ';' + msg);
}

var ExpChecker = function(msg) {

	var dirtyMsg = msg;

	function needsExpCheck(){
		if (dirtyMsg.indexOf(';') == 0)
		return true;
		else 
			return false;
	}

	function isExpired() {

		var checkMsg = dirtyMsg;

		function getLimit() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';')+1,checkMsg.length);
			return checkMsg.substring(0, checkMsg.indexOf(';')) * 3600000;
		}

		function getOriginTime() {
			checkMsg = checkMsg.substring(checkMsg.indexOf(';')+1,checkMsg.length);
			return parseInt(checkMsg.substring(0,checkMsg.indexOf(';')));
		}

		var hourLimitMs = getLimit();
		var origTime = getOriginTime();

		var now = new Date().getTime();

		if (now-origTime > hourLimitMs)
			return true;
		else
			return false;
	}

	function clean(dirtyMsg) {
		// cut away everyting before the third ;
		for (i=0; i<3; i++) 
			dirtyMsg = dirtyMsg.substring(dirtyMsg.indexOf(';')+1, dirtyMsg.length);
		
		return dirtyMsg;
	}

	this.getMsgExpChecked = function() {

		if (!needsExpCheck())
			return dirtyMsg;

		if (isExpired())
			return 'THE MESSAGE BLEW UP! IT CANNOT BE DECIPHERED ANYMORE.';

		return clean(dirtyMsg);
	}
}



