/* Application */

var App = Em.Application.create();

/* Models */

App.Song = Em.Object.extend({
  id: null,
  title: "",
  artist: "",
  votes: 0,

  upVote: function() {
    self = this;
    $.post('/songs/up_vote/' + self.id, function(data) {
      self.set('votes', data.votes);
    });
  }
});

App.Song.reopenClass({

  find: function(song_id) {
    if (!song_id) {
      return this.all();
    }

    var song = App.Song.create({
      id: song_id
    });

    $.getJSON('/songs/show/' + song_id, function(data) {
      song.setProperties({
        title: data.title,
        artist: data.artist.name,
        votes: data.votes
      });
    });

    return song;
  },

  all: function() {
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
  }

});

/* Controllers */

App.ApplicationController = Em.Controller.extend();

App.SongsIndexController = Em.ArrayController.extend({
  sortProperties: ['votes'],
  sortAscending: false,

  upVote: function(song) {
    song.upVote();
  }
});

App.SongsSongController = Em.ObjectController.extend({
  back: function() {
    this.transitionTo('songs');
  }
});

/* Routes */

App.Router.map(function() {
  this.route('index');
  
  this.resource('songs', function() {
    this.route('song', { path: '/:song_id' });
  });
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('songs');
  }
});

App.SongsIndexRoute = Em.Route.extend({
  model: function() {
    return App.Song.find();
  }
});