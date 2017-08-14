
(function (window, angular) {
    angular.module("index_module", [
        "ngRoute",
        "maoyan_controllers"
    ])
        .config(["$routeProvider" , function ($routeProvider) {
            $routeProvider.when("/home", {
            templateUrl : "./route_page/home.html",
            controller : "homeCtrl"
        }).when("/hotspot", {
            templateUrl : "./route_page/hotspot.html",
            controller : "hotspotCtrl"
        }).when("/movies", {
            templateUrl : "./route_page/movies.html",
            controller : "moviesCtrl"
        }).otherwise({
            redirectTo : "/home"
        })
    }])
})(window, angular);

