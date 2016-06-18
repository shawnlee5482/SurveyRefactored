var UserFactory = function($resource) {
	return $resource('/user/:id'); // Note the full endpoint address
}