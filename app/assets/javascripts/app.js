/* Application */

var App = Em.Application.create({
  rootElement: '#main'
});

/* Models */

App.Song = Em.Object.extend({
  id: null,
  title: "",
  artist: "",
  votes: 0
});

App.Song.reopenClass({
  findAll: function() {
    var songs = [];

    $.getJSON('/songs', function(data) {
      $.each(data, function(i, val) {
        var song = App.Song.create({
          id: val.id,
          title: val.title,
          artist: val.artist.name,
          votes: val.votes
        });

        songs.addObject(song);
      });
    });

    return songs;
  },

  find: function(song_id) {
    var song = App.Song.create({
      id: song_id
    });

    $.getJSON('/songs/show/' + song_id, function(data) {
      console.log(data);
      song.setProperties({
        title: data.title,
        artist: data.artist.name,
        votes: data.votes
      });
    });

    return song;
  }

});

/* Views */

App.ApplicationView = Em.View.extend({
  templateName: 'application'
});

App.SongsView = Em.View.extend({
  templateName: 'songs'
});

App.SongView = Em.View.extend({
  templateName: 'song'
});

/* Controllers */

App.ApplicationController = Em.Controller.extend();

App.SongsController = Em.ArrayController.extend();

App.SongController = Em.ObjectController.extend();

/* Routes */

App.Router = Em.Router.extend({
  
  root: Em.Route.extend({

    index: Em.Route.extend({
      route: '/',
      redirectsTo: 'songs'
    }),

    songs: Em.Route.extend({
      route: '/songs',

      showSong: Ember.Route.transitionTo('song'),

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('songs', App.Song.findAll());
      }
    }),

    song: Em.Route.extend({
      route: '/song/:song_id',

      showSongs: Ember.Route.transitionTo('songs'),

      connectOutlets: function(router, song) {
        router.get('applicationController').connectOutlet('song', song);
      }
    })

  })
  
});

App.initialize();