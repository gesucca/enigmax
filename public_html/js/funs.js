/*GUI*/

function setLanguage(lang) {
	var known = { en: true, it: true};
	if(!known[lang])
		lang = 'en';

	//switch all divs class ltext 
	$('div.ltext[lang='  + lang + ']').show();
	$('div.ltext[lang!=' + lang + ']').hide(); 

	//switch unreachable text, such as placeholders
	if (lang=='en') {
		$('form[class=expiration_form]').attr('title','N.B.:  0 hours means the message will never self-destruct');
		$('button[class=actionb]').attr('title','This may not work on certain browsers or devices!');
		$('#clearText').attr('placeholder','The clear message goes here...');
		$('#cryptText').attr('placeholder','The crypted message goes here...');
		$('#usn').attr('placeholder','User Code');
	}
	if (lang=='it'){
		$('form[class=expiration_form]').attr('title','N.B.:  0 ore significa che il messaggio non si autodistruggerà mai');
		$('button[class=actionb]').attr('title','Questa cosa potrebbe non funzionare su qualche browser o dispositivo!');
		$('#clearText').attr('placeholder','Scrivi qui il messaggio in chiaro...');
		$('#cryptText').attr('placeholder','Incolla qui il messaggio cifrato...');
		$('#usn').attr('placeholder','Codice Utente');
	}
};

// thanks SO
function copyToClipboard(elem) {
	// create hidden text element, if it doesn't already exist
	var targetId = "_hiddenCopyText_";
	var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
	var origSelectionStart, origSelectionEnd;
	if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
        	var target = document.createElement("textarea");
        	target.style.position = "absolute";
        	target.style.left = "-9999px";
        	target.style.top = "0";
        	target.id = targetId;
        	document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	succeed = document.execCommand("copy");
    } catch(e) {
    	succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
    	currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

function sendMail(){
	window.location.href="mailto:?body=" + getCryptMsg();
}

function sendWa(){
	window.location.href="whatsapp://send?text=" + getCryptMsg();
}

// erase content of all user input fields
function clearAll() {
	$('#clearText').val('');
	$('#cryptText').val('');
	$('#usn').val('');
	$('#pwd').val('');
	$('#expiration').val('0');
}

// close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.actionb')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		for (var i = 0; i < dropdowns.length; i++) {
			if (dropdowns[i].classList.contains('show'))
				dropdowns[i].classList.remove('show');
		}
	}
}


/*BACK*/

// String hashing: thanks SO
String.prototype.hashCode = function() {
	var hash = 0, i, chr, len;
	if (this.length === 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr   = this.charCodeAt(i);
		hash  = ((hash << 5) - hash) + chr;
    	hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function getMagicNumber(usn, pwd) {
	var theMagicNumber = usn.hashCode() + pwd.hashCode();
	return Math.abs(theMagicNumber) % 9991;
}

//regex magic to get rid of double spaces
function noDoubleSpace(msg) {
	return msg.replace(/\s\s+/g, ' ');
}

// it gets rid of those phantom chars at the end
function decodeLength(msg) {
	var splitPoint = msg.indexOf('-');
	var l = parseInt(msg.substring(0, splitPoint));

	return msg.substring(splitPoint+1, splitPoint+1+l);
}

//reversees an object: used for maps
function reverse(map) {
	var ret = {};
	for(var key in map){
		ret[map[key]] = key;
	}
	return ret;
};

