const initialValue = {
	data : [],
	isLoading : false,
	isError: false
}

export default (state = initialValue, action) => {
  	switch (action.type) {
	    case 'GET_SONGS_PENDING':
	    	return{
	    		...state,
	    		isLoading : true
	    	}

	    case 'GET_SONGS_FULFILLED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		data : action.payload.data
	    	}

	    case 'GET_SONGS_REJECTED':
	    	return{
	    		...state,
	    		isLoading : false,
	    		isError : true,
	    	}

	    default:
	    	return state;
	   
	}
}


