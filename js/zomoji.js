function Zomoji( config ) {
    var type = ( config && config.type ) || "workplace";
    this.type = type === "workplace" ? "w" : "f";
    this.default_size = ( config && config.default_size ) || 72;
    this.along_text_size = ( config && config.along_text_size ) || 24;
    var animation_config = config && config.animation;
    this.animation_disabled = animation_config === "disabled" ? true : false;
    this.animation_default_size = ( animation_config && animation_config.default_size ) || 72;
    this.animation_along_text_size = ( animation_config && animation_config.along_text_size ) || 24;

    this.symbol_lookup = {
        ":)": "smile",
        ":-)": "smile",
        ":^)": "smile",
        ":]": "smile",

        ":(": "sad",
        ":-(": "sad",
        ":[": "sad",

        ":D": "happy",
        ":-D": "happy",
        ":))": "happy",
        ":-))": "happy",

        "X-(": "angry",
        ":-@": "angry",
        ":@": "angry",

        ":P": "razz",
        ":-P": "razz",
        ":-p": "razz",
        ":p": "razz",

        ";)": "wink",
        ";-)": "wink",

        ":/": "smirk",
        ":-/": "smirk",

        ":o": "surprise",
        ":-o": "surprise",
        ":O": "surprise",
        ":-O": "surprise",

        ":-s": "worry",
        ":s": "worry",
        ":-S": "worry",
        ":S": "worry",

        "I-)": "sleepy",
        "|-)": "sleepy",

        ":-X": "keep-quiet",
        ":-#": "keep-quiet",

        "(a)": "peace",
        "(A)": "peace",
        "O-)": "peace",
        "O:)": "peace",
        "O:-)": "peace",

        ":+1:": "thumbsup",
        "(y)": "thumbsup",
        "(Y)": "thumbsup",
        ":x-": "thumbsup",

        ":-1:": "thumbsdown",
        "(N)": "thumbsdown",
        "(n)": "thumbsdown",

        "B-)": "cool",
        ":xs": "love",
        ":-?": "thinking",
        "*-:)": "idea",
        "-_-": "relaxed",
        "D:": "anxious",
        "-.-": "stressed-out",
        "(=_=)": "tired",
        "?D": "doubt",
        "(6.6)": "faint",
        "(({..}))": "headache",
        "+o(": "sick",
        ":-{}": "feeling-cold",
        ":v:": "victory",
        "C(_)": "coffee-cup"
    };

    //Animation supported smiley codes are appended with exclamation
    this.textcodes = [ "smile!", "happy!", "joy!", "grinning!", "cool!", "love!", "curious!", "awe!", "thinking!", "search!", "idea!", "wink!", "razz!", "relaxed!", "peace!", "blush!", "yummy!", "yuck!", "sad!", "upset!", "anxious!", "worry!", "stressed-out!", "angry!", "tensed!", "tired!", "bored!", "sleepy!", "jealous!", "evil!", "facepalm!", "doubt!", "surprise!", "faint!", "headache!", "sick!", "injured!", "neutral!", "smirk!", "keep-quiet!", "feeling-warm!", "feeling-cold!", "thumbsup!", "thumbsdown!", "namaste!", "super!", "victory!", "yoyo!", "raising-hand!", "clap!", "bye-bye!", "fist!", "biceps!", "birthday!", "champagne", "chicken", "christmas-tree!", "coffee-cup!", "eid-mubarak!", "fireworks!", "food!", "gift-box!", "kaaba!", "new-year!", "party!", "peanuts", "santa-hat!", "fire!", "fire-extinguisher", "first-aid-box", "medicine!", "poop!", "gold-medal", "silver-medal", "bronze-medal", "refugee-olympic-team", "archer!", "badminton!", "baseball!", "basketball!", "boxer!", "canoeing!", "chess!", "cricket!", "discus-throw!", "diver!", "equestrian!", "fencer!", "flag!", "foosball!", "football!", "golf", "hammer-throw", "high-jump!", "hockey!", "hurdler!", "javelin-throw!", "judo!", "long-jump!", "pole-vault!", "athlete!", "rhythmic-gymnastics!", "shooter", "shotput-throw!", "snooker!", "table-tennis!", "target", "tennis", "volleyball", "weightlifting", "wrestling", "badminton-player", "basketball-player", "batsman", "batter", "bowler", "break-boy", "break-girl", "chess-player", "football-player", "female-tennis-player", "female-tabletennis-player", "female-volleyball-player", "golfer", "gymnast", "hockey-player", "karate", "man-dancing", "man-cycling", "man-running", "man-swimming", "male-tabletennis-player", "male-volleyball-player", "male-tennis-player", "pitcher", "singing", "snooker-player", "woman-dancing", "woman-cycling", "woman-running", "woman-swimming", "yoga", "bicycle", "sports-bike", "cruiser-bike", "motor-scooter", "car", "taxi", "bus", "train", "police-car", "ambulance", "fire-engine", "aeroplane", "passenger-ship", "parking", "cafeteria", "bug", "milestone", "calendar", "security", "processor", "laptop", "server", "garden", "playground", "home", "office", "library", "auditorium", "store", "mail-room", "pharmacy", "task", "report", "gym", "americas", "europe-africa", "asia-pacific" ];
    if( this.type === "p" ){
        this.textcodes = ["smile!","happy!","joy!","grinning!","cool!","love!","curious!","awe!","thinking!","search!","idea!","wink!","razz!","relaxed!","peace!","blush!","yummy!","yuck!","sad!","upset!","anxious!","worry!","stressed-out!","angry!","tensed!","tired!","bored!","sleepy!","jealous!","evil!","facepalm!","doubt!","surprise!","faint!","headache!","sick!","injured!","neutral!","smirk!","keep-quiet!","feeling-warm!","feeling-cold!","thumbsup!","thumbsdown!","namaste!","super!","victory!","yoyo!","raising-hand!","clap!","bye-bye!","fist!","biceps!","birthday!","champagne","christmas-tree!","coffee-cup!","eid-mubarak!","fireworks!","food!","gift-box!","kaaba!","new-year!","party!","peanuts","santa-hat!","fire!","medicine!","poop!","archer!","badminton!","baseball!","basketball!","boxer!","canoeing!","chess!","cricket!","discus-throw!","diver!","equestrian!","fencer!","flag!","foosball!","football!","high-jump!","hockey!","hurdler!","javelin-throw!","judo!","long-jump!","pole-vault!","athlete!","rhythmic-gymnastics!","shooter","shotput-throw!","snooker!","table-tennis!"];
    }
    this.textcodes_lookup = {};
    this.textcodes.forEach( function( textcode ) {
        if ( textcode.charAt( textcode.length - 1 ) === "!" ) {
            if( this.animation_disabled === false ) {
                this.textcodes_lookup[ ":" + textcode + ":" ] = textcode;
            }
            textcode = textcode.replace( "!", "" );
        }
        this.textcodes_lookup[ ":" + textcode + ":" ] = textcode;
    }, this );

    this.smiley_lookup = {};
    for ( var symbol in this.symbol_lookup ) {
        this.smiley_lookup[ symbol ] = this.symbol_lookup[ symbol ];
    }

    for ( var textcode in this.textcodes_lookup ) {
        this.smiley_lookup[ textcode ] = this.textcodes_lookup[ textcode ];
    }

    var smileycodes_regex = "";
    for ( var smiley in this.smiley_lookup ) {
        if ( smileycodes_regex !== "" ) {
            smileycodes_regex += "|" + smiley;
        } else {
            smileycodes_regex = smiley;
        }
    }
    smileycodes_regex = smileycodes_regex.replace( /\|-\)/g, "\\|-)" );
    smileycodes_regex = smileycodes_regex.replace( /[[\]()*+.?^]/g, function( match ) {
        return "\\" + match;
    } );
    smileycodes_regex = "(" + smileycodes_regex + ")";

    this.smiley_regex = new RegExp( "([ >\n]|^)" + smileycodes_regex + "(?=[ <\n]|$)", "g" );
}

Zomoji.prototype._isAnimationCode = function( text ) {
    if ( text.indexOf( "!:" ) !== -1 ) {
        return true;
    }
    return false;
};

Zomoji.prototype._replacer = function( match, p1 ) {
    match = match.replace( p1, "" );
    var smiley_name = this.smiley_lookup[ match ];
    for ( var smiley in this.textcodes_lookup ) {
        if ( smiley == match ) {
            smiley_name = smiley.replace( /:/g, "" );
        }
    }
    var originalstring = arguments[ arguments.length - 1 ];
    originalstring = originalstring && originalstring.trim();
    var alongtext = originalstring.replace( match, "" ).length !== 0 ? true : false;
    var size = this.default_size;
    if ( this._isAnimationCode( match ) ) {
        smiley_name = smiley_name.replace( "!", "" );
        size = this.animation_default_size;
        if ( alongtext ) {
            size = this.animation_along_text_size;
        }
        return p1 + "<em title=" + smiley_name + " class='zomojianim-" + size + "-" + smiley_name + "'></em>";
    } else {
        if ( alongtext ) {
            size = this.along_text_size;
        }
        return p1 + "<em title=" + smiley_name + " class='zomoji-" + this.type + "-" + size + "-" + smiley_name + "'></em>";
    }
};

Zomoji.prototype.replace = function( text ) {
    return ( typeof text === "string" ) ? text.replace( this.smiley_regex, this._replacer.bind( this ) ) : text;
};
