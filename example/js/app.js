var app = angular.module( "exampleApp", [ "ngBaseX" ] );

app.controller( "AppCtrl", function( $scope, $basex ){
	$scope.input = Math.floor( Math.random() * 1000000000 ); // generate a random number to start
	$scope.encoded = "";
	$scope.decoded = 0;
	$scope.dictionary = "DICTIONARY_52";
	$scope.padding = 2;
	$scope.dictionaries = $basex.getDictionaries();
	$scope.equality = true;
	$scope.chars_saved = 0;

	$scope.encodeIt = function(){
		if( $scope.input ){
			$scope.encoded = $basex.encode( $scope.input, $scope.dictionary, $scope.padding );
			$scope.decoded = $basex.decode( $scope.encoded, $scope.dictionary, $scope.padding ).toString();
			$scope.chars_saved = $scope.input.toString().length - $scope.encoded.length;
			$scope.equality = $scope.input == $scope.decoded;
		}
	};

	$scope.encodeIt();
});