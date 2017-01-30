/**
 * Angular main application
 */
var myApp = angular.module('myApp', []);

/**
 * myApp controller
 */
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    /**
     * Retrieve the contacts again
     */
    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };
    refresh();

    /**
     * Add contact to database
     */
    $scope.addContact = function() {
    console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
    });
    };

    /**
     * Delete a contact
     * @param id
     */
    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh();
        });
    };

    /**
     * Edit a contact
     * @param id
     */
    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    /**
     * Update a contact information
     */
    $scope.update = function() {
            console.log($scope.contact._id);
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
                refresh();
            })
        };

    /**
     * Clear the inputs for contact
     */
    $scope.deselect = function() {
        $scope.contact = "";
    }
}]);﻿