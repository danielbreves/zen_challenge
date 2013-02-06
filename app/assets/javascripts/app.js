/* Application */

var App = Em.Application.create();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.RESTAdapter'
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
    song.get('transaction').commit();
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