angular.module('app.controllers', [])
  
.controller('hyperLoopCtrl', ['$scope', '$stateParams','$rootScope','$state', '$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state,$cordovaGeolocation) {
	$scope.luggage="0";
	$scope.traveller ="1";
	/**
	 * method to check and store Traveller and luggage values
	 */
	$scope.checkValues = function(){
		/**
		 * to check whether user has presses get your location button or not
		 */
		if($rootScope.userLat == undefined || $rootScope.userLng == undefined)
		{
			alert("Get your Location atLeast!");
		}
		else{
			$rootScope.travel = document.getElementById("travel").value;
			$rootScope.lug = document.getElementById("lug").value;
			$state.go('result');
		}
		
		
	} 
	/**
	 * to fetch the current location
	 */
	$scope.location = function()
	{
		$cordovaGeolocation.getCurrentPosition().then(function(position){
			$rootScope.userLat = position.coords.latitude;
			$rootScope.userLng = position.coords.longitude;
			alert("location fetched");
		}, function(error){
		    alert("Could not get location, switch on your gps");
		  });
	
	}
	
}])
   
.controller('resultCtrl', ['$scope', '$stateParams', '$rootScope','$cordovaGeolocation',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$rootScope,$cordovaGeolocation) {
	var selectedMode;
	/**
     * bus taxi and cycle logic
     */
	var luggage = $rootScope.lug;
	var traveller = $rootScope.travel;
	if(luggage == traveller)
	{
		selectedMode="DRIVING";
		
	}
	if(luggage > traveller)
	{
		selectedMode="DRIVING";
	}
	if(luggage < traveller)
	{
		//considering luggage to be handbags
		if(luggage >= 1)
		{
			console.log("transit");
			selectedMode="DRIVING";
		}
		if(luggage < 1)
		{
			console.log("take a bicycle");
			selectedMode="BICYCLING";
		}
	}
	$scope.mode= "Preferred Mode: "+selectedMode;
	/**
	 * map data
	 */
	$scope.init = function()
	{
		 
			var geocoder = new google.maps.Geocoder();
			var directionsDisplay = new google.maps.DirectionsRenderer();
			var directionsService = new google.maps.DirectionsService();
			var userLocation = new google.maps.LatLng($rootScope.userLat,$rootScope.userLng);
			var hdHbf = new google.maps.LatLng(49.411951, 8.658790);
		    var mapOptions = {
		      zoom: 8,
		      center: userLocation
		    }
		    map = new google.maps.Map(document.getElementById('map'), mapOptions);
		    directionsDisplay.setMap(map);
		    
		    var request = {
		        origin: userLocation,
		        destination: hdHbf,
		        // Note that Javascript allows us to access the constant
		        // using square brackets and a string value as its
		        // "property."
		        travelMode: google.maps.TravelMode[selectedMode]
		    };
		    directionsService.route(request, function(response, status) {
		      if (status == 'OK') {
		        directionsDisplay.setDirections(response);
		      }
		    });
		 
		
		
	}
	
    
    
			console.log($rootScope.lug);	
			console.log($rootScope.travel);
}])
 