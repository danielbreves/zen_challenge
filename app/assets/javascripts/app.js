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
  songs: [],
  find: function() {
    self = this;
    self.songs = [];

    $.getJSON('/songs', function(data) {
      $.each(data, function(i, val) {
        var song = App.Song.create({
          id: val.id,
          title: val.title,
          artist: val.artist.name,
          votes: val.votes
        });

        self.songs.addObject(song);
      });
    });

    return self.songs;
  }
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

App.SongsController = Em.ArrayController.extend();

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
        router.get('applicationController').connectOutlet('songs', App.Song.find());
      }
    })

  })
  
});

App.initialize();