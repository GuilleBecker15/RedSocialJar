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
	var update = function(resource, data, id){
		console.log("-----------DATA-=----------");
		console.log(data);
		console.log(JSON.stringify(data))
		console.log("-----------DATA-=----------");
		var url = URLBASE+resource+"/"+id;
		var request = $.ajax({
			url: url,
			// type: 'PUT',
			type: 'PATCH',
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
	var busqueda = function(resource, data){
		var url = URLBASE+resource+"?"+data;
		console.log("---------------------")
		var request = $.getJSON(url);
		return request;
	};
	var allWithFilter = function(resource, field, value){
		var url = URLBASE+resource+"?"+field+"="+value;
		var request = $.getJSON(url);
		return request;
	}
	return {
		all: all,
		show: show,
		create: create,
		update: update,
		destroy: destroy,
		sign_in: sign_in,
		busqueda: busqueda,
		allWithFilter: allWithFilter
	}
})()