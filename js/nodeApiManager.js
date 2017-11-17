var nodeApiManager = (function(){
	var URLBASE = "http://localhost:4000/";
	var all = function(resource){
		var url = URLBASE+resource;
		var request = $.getJSON(url);
		return request;
	};
	var show = function(resource, id){
		var url = URLBASE+resource+"/"+id;
		var request = $.getJSON(url);
		return request;
	};
	var create = function(resource, data){
		var url = URLBASE+resource;
		var request = $.ajax({
			type: 'POST',
			url: url,
			data: data,
			contentType:"application/json",
			dataType:"json",
		});
		return request;
	};	
	var update = function(resource, data){
		var url = URLBASE+resource+"/"+id;
		var request = $.ajax({
			url: url,
			type: 'PUT',
			contentType: "application/json",
			data: data
		});
		return request;
	};
	var destroy = function(resource, id){
		var url = URLBASE+resource+"/"+id;
		var request = $.ajax({
			url: url,
			type: 'DELETE',
			contentType:"application/json",
		});
		return request;
	};
	var sign_in = function(data){
		var url = URLBASE+"sign_in";
		var request = $.ajax({
			type: 'POST',
			url: url,
			data: data,
			contentType:"application/json",
			dataType:"json",
		})
		return request;
	};
	return {
		all: all,
		show: show,
		create: create,
		update: update,
		destroy: destroy,
		sign_in: sign_in
	}
})()

// function ajaxCall(type, url, data, )
