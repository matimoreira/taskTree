$(function () {
	$('#button--search').click(search);
	/*$('body').on('click', '#button--search', search);*/





	function search() {

		var query = $('#query').val();

		genius_get('/search', query).done(function(data) {

			printTable(data);
		
		});

		/*
			$.ajax({
				url: 'https://genius.p.rapidapi.com/search',
				type: 'get',
				data: {
					q : query
				},
				headers:{
					'x-rapidapi-host': 'genius.p.rapidapi.com',
					'x-rapidapi-key': 'a6ec3401a8mshcb4faf17e6eb123p137240jsnbe2edb4cd9ad'
				},
				success: function (response) {
					console.log(response);
				}
			});
		*/
		
		/*
			var settings = {
				"async": true,
				"crossDomain": true,
				"data": {
					"q" : query 
				},
				"url": "https://genius.p.rapidapi.com/search",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "genius.p.rapidapi.com",
					"x-rapidapi-key": "a6ec3401a8mshcb4faf17e6eb123p137240jsnbe2edb4cd9ad"
				}
			}

			$.ajax(settings).done(function (response) {

				console.log(response);
			});
		*/	
	}

	function printTable(data) {
		
		var tbody = $('#tbody--query');
		tbody.html('');
		for (var i = 0; i < data.response.hits.length; i++) {
			tbody.append('<tr><td>' + data.response.hits[i].result.title + '</td><td>' + data.response.hits[i].result.primary_artist.name + '</td><td><a href="" data-song="'+ data.response.hits[i].result.id +'" data-artist="'+ data.response.hits[i].result.primary_artist.name +'" class="btn btn-primary"><i class="far fa-eye"></i></a></td></tr>');
			console.log('title: ' + data.response.hits[i].result.title + ' Artista: ' +  data.response.hits[i].result.primary_artist.name);

		}
		

	}

	function genius_get(url, query) {
		return $.ajax({
			url: 'https://genius.p.rapidapi.com' + url,
			type: 'get',
			dataType: 'json',
			data:{
				q: query
			},
			headers:{
				'x-rapidapi-host': 'genius.p.rapidapi.com',
				'x-rapidapi-key': 'a6ec3401a8mshcb4faf17e6eb123p137240jsnbe2edb4cd9ad'
			},
			beforeSend: showLoadingImg
		})
		.always(function() {
			// remove loading image maybe
			console.log('esto se ejecuta siempre');
		})
		.fail(function() {
			console.log('esto se ejecuta cuando hubo un error');
			// handle request failures
		});

	}

	function showLoadingImg(){
		console.log('showLoadingImg');
	}

	function hideLoadingImg() {
		console.log('hideLoadingImg');
	}

})