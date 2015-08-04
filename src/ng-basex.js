angular
.module( "ngBaseX", [] )
.factory( "$basex", [ function() {
	var self = this,
		dictionaries = {};
	/**
	* Takes a large number and converts it to a shorter encoded string style string i.e. 1TigYx
	* @input The number to be encoded to a string
	* @dictionary (optional) The dictionary to use for the encoding, default "DICTIONARY_52"
	* @padding (optional) The padding (minimum length of the generated string)
	*/
	self.encode = function( input, dictionary, padding ) {
		var result = [],
			dictionary = self.getDictionary( dictionary ),
			base = dictionary.length,
			exponent = 1,
			remaining = parseInt( input ),
			a = 0,
			b = 0,
			c = 0,
			d = 0;
		padding = padding || 0;
		// check if padding is being used
		if( padding ) {
			remaining += Math.pow( base, padding );
		}
		// generate the encoded string
		while( true ) {
		 a = Math.pow( base, exponent ); //16^1 = 16
		 b = remaining % a; //119 % 16 = 7 | 112 % 256 = 112
		 c = Math.pow( base, exponent - 1);
		 d = b / c;
		 result.push( dictionary[ parseInt( d ) ] );
		 remaining = remaining - b; //119 - 7 = 112 | 112 - 112 = 0
		 if(remaining === 0){
		  break;
		 }
		 exponent++;
		}
		result = result.reverse().join( "" );
		return result;
	};
	/**
	* Decodes a shortened encoded string back into a number
	* @input The encoded string to be decoded
	* @dictionary The dictionary to use for the encoding, default "DICTIONARY_52"
	* @padding The padding (minimum length of the generated string) to use
	*/
	self.decode = function( input, dictionary, padding ) {
		var chars = input.split( "" ).reverse(),
			dictionary = self.getDictionary( dictionary ),
			base = dictionary.length,
			result = 0,
			map = {},
			exponent = 0;
		padding = padding || 0;
		// create a map lookup
		for( var m = 0; m < base; m++ ) {
			map[ dictionary[ m ] ] = m;
		}
		// generate the number
		for( var n = 0; n < input.length; n++ ) {
		 result += Math.pow( base, exponent ) * map[ chars[ n ] ];
		 exponent++;
		}
		// check if padding is being used
		if( padding ){
		 result -= Math.pow( base, padding );
		}
		return result;
	};
	/**
	* Gets a dictionary or returns the default dictionary of "DICTIONARY_52"
	* @dictionary The dictionary get
	*/
	self.getDictionary = function( dictionary ) {
		return dictionaries[ dictionary ] || dictionaries.DICTIONARY_52;
	};
	/**
	* Gets all of the dictionaries
	*/
	self.getDictionaries = function() {
		return dictionaries;
	};
	/**
	* Adds a new dictionary
	* @name The name of the dictionary to add
	* @dictionary The dictionary to use as an array of characters
	*/
	self.addDictionary = function( name, dictionary ){
		dictionaries[ name ] = dictionary;
		return;
	};

	// add default dictionarys
	// numbers and A-F only
	self.addDictionary( "DICTIONARY_16",  ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"] );
	// numbers and uppercase letters A-Z
	self.addDictionary( "DICTIONARY_32", ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"] );
	// numbers, uppercase and lowercase B-Z minus vowels
	self.addDictionary( "DICTIONARY_52", ["0","1","2","3","4","5","6","7","8","9","B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z","b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"] );
	// numbers, uppercase and lowercase A-Z
	self.addDictionary( "DICTIONARY_62", ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"] );
	// numbers, uppercase and lowercase A-Z and ~!@#$%^& (minus 0,o,O,1,i,I,l,L useful to generate passwords)
	self.addDictionary( "DICTIONARY_PASS", ["2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","M","N","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z","~","!","@","#","$","%","^","&"] );
	// numbers, uppercase and lowercase A-Z and ~!@#$%^& (useful to generate passwords)
	self.addDictionary( "DICTIONARY_70", ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","!","@","#","$","%","^","&"] );
	// numbers, uppercase and lowercase A-Z and +"@*#%&/|()=?'~[!]{}-_:.,;
	self.addDictionary( "DICTIONARY_89", ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","+","\"","@","*","#","%","&","/","|","(",")","=","?","~","[","]","{","}","$","-","_",".",":",",",";","<",">"] );

	return self;
} ] );