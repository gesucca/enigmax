function setLanguage(lang) {
	var known = { en: true, it: true};
	if(!known[lang])
		lang = 'en';

	//switch all divs class ltext 
	$('div.ltext[lang='  + lang + ']').show();
	$('div.ltext[lang!=' + lang + ']').hide(); 

	//switch unreachable text, such as placeholders
	if (lang=='en') {
		$('textarea[id=clearText]').attr('placeholder','The clear message goes here...');
		$('textarea[id=cryptText]').attr('placeholder','The crypted message goes here...');
		$('input[id=usn]').attr('placeholder','User Code');
	}
	if (lang=='it'){
		$('textarea[id=clearText]').attr('placeholder','Scrivi qui il messaggio in chiaro...');
		$('textarea[id=cryptText]').attr('placeholder','Incolla qui il messaggio cifrato...');
		$('input[id=usn]').attr('placeholder','Codice Utente');
	}
};