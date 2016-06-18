var surveyFactory = function($resource) {
	return $resource('/survey/:id', { id: '@_id' }, {
	    update: {
	      method: 'PUT' // this method issues a PUT request
	    }		
	}); // Note the full endpoint address
}
