(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      // const $current = $('<div>').addClass('current');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $('form').submit(function(event) {
    event.preventDefault();
    movies.length = 0
    var value = ($(search).val())
    var $xhr = $.getJSON('http://www.omdbapi.com/?s=' + value);
    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      var search = data.Search
      for (var i=0;i<search.length;i++){
        var movieInfo = new Object();
        movieInfo.id = data.Search[i].imdbID
        movieInfo.poster = data.Search[i].Poster
        movieInfo.title = data.Search[i].Title
        movieInfo.year = data.Search[i].Year


        $.getJSON('http://www.omdbapi.com/?i=' + data.Search[i].imdbID) .done(function(data2){
          if ($xhr.status !== 200) {
            return;
          }
          // console.log('data2 ', data2)
          // var movieInfo2 = new Object();
          // console.log('data2.plot ', data2.Plot);
          movieInfo.plot = data2.Plot
          // console.log(movieInfo)
          // movies.push(movieInfo)
          console.log(movies);
          renderMovies()

          $xhr.fail(function(err) {
            console.log(err);
          });

        });

        movies.push(movieInfo)
        renderMovies()
        // console.log(movieInfo)
      }
      var clear = document.getElementById('search').value='';


      // var movieInfo = new Object();
      // movieInfo.id = data.Search.imdbID
      // movieInfo.poster = data.Search.Poster
      // movieInfo.title = data.Search.Title
      // movieInfo.year = data.Search.Year
      // console.log(movieInfo)
      //
    });

    $xhr.fail(function(err) {
      console.log(err);
    });

  })

})();
