var Slicer = function(msg){

	var array = msg.split('');

	var i = 0;
	var finish = false;

	this.getSlice = function(){

		var output = [];
		
		if (i == array.length)
			finish = true;

		if (finish)
			return output;

		if (i+5 <= array.length) {
			output = [ array[i+0], array[i+1], array[i+2], array[i+3], array[i+4] ];
			i += 5;
		}
		else if ((array.length-i) < 5) {
			for (; i < array.length; i++) {
				output.push(array[i]);
			}
			//fill up to five
			for (k = output.length; k < 5; k++) {
				output.push(' ');
			}
		}

		return output;
	}

	this.isEnd = function(){
		return finish;
	}
}


var Builder = function(){

	var built = '';

	this.get = function(){
		return built;
	}

	this.append = function(slice){

		if (slice.length > 5)
			throw "ERROR BUILDER: Slice too long! " + slice;

		if (slice.length < 5) {
			for (i = slice.length; i < 5; i++) {
				slice.push(' ');
			}
		}

		built += slice.join('');
	}
}