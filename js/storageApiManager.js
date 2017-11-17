var storageApiManager = (function(){

	var isSupported = function(item){
			if(typeof(item) !== "undefined" ){
				return true;
			}
			return false;
	}

	var localSetItem = function(item, data){
		localStorage.setItem(item, data);
		localStorage
		return true;
	}
	var localGetItem = function(item){
		var result = localStorage.getItem(item);
		if(result != null ){
			return result;
		}
		return false;
	}
	var sessionSetItem = function(item, data){
		sessionStorage.setItem(item, data);
		return true;
	}
	var sessionGetItem = function(item){
		var result = sessionStorage.getItem(item);
		if(result != null ){
			return result;
		}
		return false;
	}
	var localRemoveItem = function(item){
		localStorage.removeItem(item);
		return true;
	}
	var sessionRemoveItem = function(item){
		sessionStorage.removeItem(item);
		return true;
	}

	return{
		isSupported:isSupported,
		localSetItem:localSetItem,
		localGetItem:localGetItem,
		sessionSetItem:sessionSetItem,
		sessionGetItem:sessionGetItem,
		localRemoveItem:localRemoveItem,
		sessionRemoveItem:sessionRemoveItem
	}
})()