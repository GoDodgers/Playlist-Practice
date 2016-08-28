angular.module('app', [])
	.controller('appController', function($scope, $http) {
		$scope.playlists = [];
		$http.get("/api/playlist")
			.success(function(response) {
				$scope.playlists = response;
			});
		$scope.removeList = function(id) {
			alert(id)
			/*$http.delete("/api/playlist/" + id)
				.success(function(response) {
					//response ==  remaining playlists
					$scope.playlists = response;
				})*/
		}
	})
	
