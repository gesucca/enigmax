/*OBJECTS DEFINITIONS*/

class Checker {
    constructor(msg, chars) {
        this._msg = msg;
        this._chars = chars;
    }

    //popups text will be defined in subclasses
    check() {
        if (!this._msg) {
            if (!this.lang)
                throw 'ERROR: Checker lang should be set!';
            if (this.lang == 'en')
                alert(this.popUpVoidEN);
            if (this.lang == 'it')
                alert(this.popUpVoidIT);
            return false;
        }
        if (!this._chars.test(this._msg)) {
            if (this.lang == 'en')
                alert(this.popUpIllegalEN);
            if (this.lang == 'it')
                alert(this.popUpIllegalIT);
            return false;
        }
        return true;
    }
}

class MsgChecker extends Checker {
    constructor(msg, chars) {
        super(msg, chars);

        this.popUpVoidEN = 'Your message is empty!\n \nNothing will be done...\n ';
        this.popUpIllegalEN = 'Your message contains illegal characters.\n \nOnly plain letters, numbers and basic puntuation are permitted.\n ';

        this.popUpVoidIT = 'Il tuo messaggio è vuoto!\n \nNon cripto proprio niente...\n ';
        this.popUpIllegalIT = 'Il tuo messaggio contiene caratteri non permessi.\n \nUsa solo lettere senza accenti, numeri e punteggiatura di base.\n ';
    }
}

class FieldChecker extends Checker {
    constructor(fieldName, fieldValue) {
        super(fieldValue, /^[a-zA-Z0-9'?!,.:;\n ]*$/);

        this._fieldName = fieldName;
        this._fieldValue = fieldValue;
        this._minLength = 7;

        this.popUpVoidEN = 'The field \'' + fieldName + '\' is empty!\n ';
        this.popUpIllegalEN = 'Your ' + fieldName + ' contains illegal characters.\n \nOnly plain letters, numbers and basic puntuation are permitted.\n ';
        this.popUpShortEN = 'Your ' + fieldName + ' is too short!\n \nChoose one with at least ' + this._minLength + ' characters.\n ';

        this.popUpVoidIT = 'Il campo \'' + fieldName + '\' è vuoto!\n ';
        this.popUpIllegalIT = 'Il campo\'' + fieldName + '\' messaggio contiene caratteri non permessi.\n \nUsa solo lettere senza accenti, numeri e punteggiatura di base.\n ';
        this.popUpShortIT = 'Il campo \'' + fieldName + '\' è composto da troppi pochi caratteri!\n \nDevono essere almeno ' + this._minLength + ' per poter cifrare un messaggio.\n ';
    }

    check() {
        var preResult = super.check();
        if (!preResult)
            return preResult;

        if (this._fieldValue.length < this._minLength) {
            if (this.lang == 'en')
                alert(this.popUpShortEN);
            if (this.lang == 'it')
                alert(this.popUpShortIT);
            return false;
        }

        return true;
    }
}


/*FUNCTIONS*/

function setLanguage(lang) {
    var known = { en: true, it: true };
    if (!known[lang])
        lang = 'en';

    //switch all divs class ltext
    $('div.ltext[lang=' + lang + ']').show();
    $('div.ltext[lang!=' + lang + ']').hide();

    //switch unreachable text, such as placeholders
    if (lang == 'en') {
        $('form[class=expiration_form]').attr('title', 'N.B.:  0 hours means the message will never self-destruct');
        $('button[class=send]').attr('title', 'This may not work on certain browsers or devices!');
        $('textarea[id=clearText]').attr('placeholder', 'The clear message goes here...');
        $('textarea[id=cryptText]').attr('placeholder', 'The crypted message goes here...');
        $('input[id=usn]').attr('placeholder', 'User Code');

        //for the popups
        Checker.prototype.lang = 'en';
        ExpChecker.prototype.lang = 'en';
    }
    if (lang == 'it') {
        $('form[class=expiration_form]').attr('title', 'N.B.:  0 ore significa che il messaggio non si autodistruggerà mai');
        $('button[class=send]').attr('title', 'Questa cosa potrebbe non funzionare su qualche browser o dispositivo!');
        $('textarea[id=clearText]').attr('placeholder', 'Scrivi qui il messaggio in chiaro...');
        $('textarea[id=cryptText]').attr('placeholder', 'Incolla qui il messaggio cifrato...');
        $('input[id=usn]').attr('placeholder', 'Codice Utente');

        //for the popups
        Checker.prototype.lang = 'it';
        ExpChecker.prototype.lang = 'it';
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
    } catch (e) {
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

function sendEmail() {
    window.location.href = "mailto:?body=" + getCryptMsg();
}

function sendWhatsApp() {
    window.location.href = "whatsapp://send?text=" + getCryptMsg();
}

function cryptButton() {
    var m = new MsgChecker(getClearMsg(), /^[A-Z0-9'?!,.:\n ]*$/, true);
    if (!checkFor(m))
        return;

    var result = crypt(getClearMsg(), getUsn(), getPwd(), getExpiration());
    writeMsg(result, 'cryptText');
}

function decryptButton() {
    var m = new MsgChecker(getCryptMsg(), /^[a-zA-Z0-9 ]*$/, true);
    if (!checkFor(m)) {
        return;
    }

    var result = decrypt(getCryptMsg(), getUsn(), getPwd(), getExpiration());
    writeMsg(result, 'clearText');
}

function getCryptMsg() {
    return document.getElementById('cryptText').value;
}

function getClearMsg() {
    return document.getElementById('clearText').value.toUpperCase();
}

function writeMsg(msg, id) {
    document.getElementById(id).value = msg;
}

function getExpiration() {
    var a = document.getElementById('expiration').value;
    if (!a)
        return 0;
    else return a;
}

function getUsn() {
    return document.getElementById('usn').value;
}

function getPwd() {
    return document.getElementById('pwd').value;
}

function checkFor(msgCheck) {
    var u = new FieldChecker('User Code', getUsn());
    var p = new FieldChecker('password', getPwd());

    if (!msgCheck.check() || !u.check() || !p.check())
        return false;
    return true;
}
