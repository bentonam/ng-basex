# ng-basex

This is a Angular JS factory for encoding large numbers into shortened strings based on a pre-defined or custom dictionary. 


## Installing

Install via bower

`bower install https://github.com/bentonam/ng-basex.git`

Require it into your application (after Angular)

	<script src="angular.min.js"></script>
	<script src="ng-basex.min.js"></script>
	
## Usage

Add the module as a dependency to your app

	// set the app
	var app = angular.module( "yourApp", [ "ngBaseX" ] );

Inject it into your controller

	app.controller( "SomeController"", function( $scope, $basex ) {
		
		$basex.encode( 98230982309823 ); // 1qXWrrf7z
		
		$basex.decode( "1qXWrrf7z" ); // 98230982309823
		
	} );

## Methods

### encode

Takes a large number and converts it to a shorter encoded string style string i.e. 1TigYx

- `@input` The number to be encoded to a string
- `@dictionary` (optional) The dictionary to use for the encoding, default "DICTIONARY_52"
- `@padding` (optional) The padding (minimum length of the generated string) to use

**Usage:**

	$basex.encode( 999999999999, "DICTIONARY_16" ); // E8D4A50FFF
	$basex.encode( 999999999999, "DICTIONARY_32" ); // X4BBB4ZZ
	$basex.encode( 999999999999, "DICTIONARY_52" ); // yZ8fsBl
	$basex.encode( 999999999999, "DICTIONARY_62" ); // HbXm5a3
	$basex.encode( 999999999999, "DICTIONARY_PASS" ); // Kgcu7f5
	$basex.encode( 999999999999, "DICTIONARY_70" ); // 8Y&L~jn
	$basex.encode( 999999999999, "DICTIONARY_83" ); // 217K82F

### decode()

Decodes a shortened encoded string back into a number

- `@input` The number to be encoded to a string
- `@dictionary` (optional) The dictionary to use for the encoding, default "DICTIONARY_52"
- `@padding` (optional) The padding (minimum length of the generated string) to use

**Usage:**

	$basex.decode( "E8D4A50FFF", "DICTIONARY_16" ); // 999999999999
	$basex.decode( "X4BBB4ZZ", "DICTIONARY_32" ); // 999999999999
	$basex.decode( "yZ8fsBl", "DICTIONARY_52" ); // 999999999999
	$basex.decode( "HbXm5a3", "DICTIONARY_62" ); // 999999999999
	$basex.decode( "Kgcu7f5", "DICTIONARY_PASS" ); // 999999999999
	$basex.decode( "8Y&L~jn", "DICTIONARY_70" ); // 999999999999
	$basex.decode( "217K82F", "DICTIONARY_83" ); // 999999999999

### addDictionary()

Adds a new dictionary

- `@name` The name of the dictionary to add
- `@dictionary` The dictionary to use as an array of characters

**Usage:**

	$basex.addDictionary( "DICTIONARY_16",  ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"] );

### getDictionary()

Gets a dictionary or returns the default dictionary of "DICTIONARY_52"

- `@name` The dictionary get

**Usage:**

	$basex.getDictionary( "DICTIONARY_16" );		

### getDictionaries()

Gets all of the dictionaries

**Usage:**

	$basex.getDictionaries();
	
## Default Dictionaries

- `DICTIONARY_16` numbers and A-F only
- `DICTIONARY_32` numbers and uppercase letters A-Z
- `DICTIONARY_52` numbers, uppercase and lowercase B-Z minus vowels
- `DICTIONARY_62` numbers, uppercase and lowercase A-Z
- `DICTIONARY_PASS` numbers, uppercase and lowercase A-Z and ~!@#$%^& (minus 0,o,O,1,i,I,l,L useful to generate passwords)
- `DICTIONARY_70` numbers, uppercase and lowercase A-Z and ~!@#$%^& (useful to generate passwords)
- `DICTIONARY_89` numbers, uppercase and lowercase A-Z and +"@*#%&/|()=?'~[!]{}-_:.,;
