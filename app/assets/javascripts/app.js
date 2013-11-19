/* Application */

var App = Em.Application.create({
  rootElement: '#application'
});

App.Adapter = DS.RESTAdapter.extend();

App.Adapter.configure("App.Artist", {
  sideloadAs: 'artists'
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.Adapter.create()
});

/* Models */

App.Artist = DS.Model.extend({
  name: DS.attr('string'),
  songs: DS.hasMany('App.Song')
});

App.Song = DS.Model.extend({
  title: DS.attr('string'),
  votes: DS.attr('number'),
  artist: DS.belongsTo('App.Artist')
});

/* Controllers */

App.ApplicationController = Em.Controller.extend();

App.SongsIndexController = Em.ArrayController.extend({
  sortProperties: ['votes'],
  sortAscending: false,

  upVote: function(song) {
    song.incrementProperty('votes');
    this.saveVotesFor(song);
  },

  saveVotesFor: _.debounce(function(song) {
    song.get('transaction').commit();
  }, 500)
});

App.SongsSongController = Em.ObjectController.extend({
  back: function() {
    this.transitionTo('songs');
  }
});

/* Routes */

App.Router.map(function() {
  this.resource('songs', function() {
    this.route('song', { path: '/:song_id' });
  });
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    if (window.location.pathname === "/") {
      this.transitionTo('songs');
    }
  }
});

App.SongsIndexRoute = Em.Route.extend({
  model: function() {
    return App.Song.find();
  }
});
