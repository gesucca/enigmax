var ToTen = function(basicMap) {

	var basic = Object.keys(basicMap).length;

	this.convert = function(msg){
		var base10 = 0;
		for (i=0; i<msg.length; i++) {
			base10 += (Math.pow(basic, i) * basicMap[msg[i]]);
			//console.log('tobase10: step '+i+' value '+Math.pow(basic, i) * basicMap[msg[i]]);
		}
		return base10;
	}
}


var ToMap = function(targetMap) {

	var target = Object.keys(targetMap).length;

	this.convert = function(int){
		var converted = [];
		while (Math.floor(int/target)>0)
		{
			converted.push(targetMap[int%target]);
			int = Math.floor(int/target);
		}
		converted.push(targetMap[int]);
		return converted;
	}
}