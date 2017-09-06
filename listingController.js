angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo;
    $scope.names = [];
    $scope.map;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      $("#addCode").show();
      $("#addName").show();
      $("#addLat").show();
      $("#addLon").show();
      $("#addAddress").show();
      $("#addButton").show();

    };

    $scope.storeListing = function() {
      $("#addCode").hide();
      $("#addName").hide();
      $("#addLat").hide();
      $("#addLon").hide();
      $("#addAddress").hide();
      $("#addButton").hide();

      var listObject = {
        code: $scope.addCode,
        name: $scope.addName,
        coordinates: {
          latitude: $scope.addLat,
          longitude: $scope.addLon
        }, 
        address: $scope.address
      };

      $scope.listings.push(listObject);

    };


    $scope.removeListing = function(index) {
      $scope.listings.splice(index, 1);
      $scope.showListings();
    };


    $scope.showDetails = function(index) {
      $scope.detailedInfo = {
        code: $scope.listings[index]['code'],
        name: $scope.listings[index]['name'],
        coordinates: $scope.listings[index]['coordinates'],
        address: $scope.listings[index]['address']
      };

      $scope.initMap(
        $scope.listings[index]['name'],
        $scope.listings[index]['coordinates']['latitude'], 
        $scope.listings[index]['coordinates']['longitude']);

      $("#googleMap").show();

    };


    $scope.showListings = function() {

      $scope.detailedInfo = {
        code: "",
        name: "",
        coordinates: "",
        address: ""
      };

      $("#googleMap").hide();


      if ($scope.searchEntry != "")
      {
        //clear list to reset for next search
        $scope.names = [];

        for (var row in $scope.listings)
        {
          if ($scope.listings[row]['name'].toLowerCase().search
            ($scope.searchEntry.toLowerCase()) != -1
            || $scope.listings[row]['code'].toLowerCase().search
            ($scope.searchEntry.toLowerCase()) != -1)
          {
            var listObject = {
              code: $scope.listings[row]['code'], 
              name: $scope.listings[row]['name'],
              index: row
            };

            $scope.names.push(listObject);
          }
        }
      }
      else
      {
        $scope.names = [];
      }
      
    };


    $scope.initMap = function(name, lat, lon) {
      var mapProp = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.HYBRID
      };

      $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          map: $scope.map,
          title: name
        });

    };


  }
]);