$(function () {
	$('#button--search').click(search);
	/*$('body').on('click', '#button--search', search);*/
	$('tbody').on('click', '.button--view', view);




	function search() {

		var query = $('#query').val();

		genius_get('/search?q=' + query).done(function(data) {

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


	function view() {
		var idSong = $(this).data('song');
		var idArtist = $(this).data('artist');

		console.log('idSong: ' + idSong + ' idArtist: ' +idArtist);

		genius_get('/songs/' + idSong).done(function(data) {
			
			printModal(data);

		});
	}

	
	function printTable(data) {
		
		var tbody = $('#tbody--query');
		tbody.html('');

		for (var i = 0; i < data.response.hits.length; i++) {
			tbody.append('<tr><td>' + data.response.hits[i].result.title + '</td><td>' + data.response.hits[i].result.primary_artist.name + '</td><td><a data-song="'+ data.response.hits[i].result.id +'" data-artist="'+ data.response.hits[i].result.primary_artist.id +'" class="btn btn-primary text-white button--view"><i class="far fa-eye"></i></a></td></tr>');
			console.log('title: ' + data.response.hits[i].result.title + ' Artista: ' +  data.response.hits[i].result.primary_artist.name);

		}

	}


	function printModal(data) {
		$('#modal--title').text(data.response.song.full_title);
		$('#modal--imagen').attr('src', data.response.song.header_image_thumbnail_url);
		$('#span--album').text(data.response.song.album.name);
		$('#div--media').html('<a href="'+data.response.song.media[1].url+'" class="btn btn-success text-white "><i class="fab fa-spotify"></i></a>&nbsp<a href="'+data.response.song.media[0].url+'" class="btn btn-danger text-white"><i class="fab fa-youtube"></i></a>&nbsp<a href="'+data.response.song.url+'" class="btn btn-warning text-dark">Genius</a>');
		$('#modal--song').modal();
	}


	function genius_get(url/*, query*/) {
		return $.ajax({
			url: 'https://genius.p.rapidapi.com' + url,
			type: 'get',
			dataType: 'json',
			/*data:{
				q: query
			},*/
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