/* Application */

var App = Em.Application.create({
  rootElement: '#main',
  ready: function() {
    App.songsController.loadSongs();
  }
});

/* Models */

App.Song = Em.Object.extend({
  id: null,
  title: "",
  artist: "",
  votes: 0
});

/* Views */

App.ApplicationView = Em.View.extend({
  templateName: 'application'
});

App.SongsView = Em.View.extend({
  templateName: 'songs'
});

/* Controllers */

App.ApplicationController = Em.Controller.extend();

App.songsController = Em.ArrayController.create({
  content: [],
  loadSongs: function() {
    var songs = this;

    $.getJSON('/songs', function(data) {
      $.each(data, function(i, val) {
        var song = App.Song.create({
          id: val.id,
          title: val.title,
          artist: val.artist.name,
          votes: val.votes
        });

        songs.pushObject(song);
      });
    });
  }
});

/* Routes */

App.Router = Em.Router.extend({

  root: Em.Route.extend({

    index: Em.Route.extend({
      route: '/',
      redirectsTo: 'songs'
    }),

    songs: Em.Route.extend({
      route: '/songs',
      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('songs');
      }
    })

  })
  
});

App.initialize();