var App = {};

// avoid conflict with rails
_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

App.Song = Backbone.Model.extend({
  urlRoot: "/songs",

  vote: function() {
    var votes = this.get('votes');
    this.set({'votes': ++votes});
    this.save();
  }
});

App.Songs = Backbone.Collection.extend({
  url: "/songs",
  model: App.Song
});

App.SongsTableView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('add', this.addRow, this);
  },

  addRow: function(song) {
    var songView = new App.SongRowView({model: song});
    this.$('tbody').append(songView.render().el);
  },

  render: function() {
    this.$el.html( $("#songsTableTemplate").html() );
    return this;
  }
});

App.SongRowView = Backbone.View.extend({
  tagName: 'tr',

  className: 'song',

  template: _.template( $("#songRowTemplate").html() ),

  events: {
    "click .vote": "vote"
  },

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  vote: function() {
    this.model.vote();
  },

  render: function() {
    this.$el.html( this.template({song: this.model.toJSON()}) );
    return this;
  }
});

App.Router = Backbone.Router.extend({

  routes: {"": "index"},

  initialize: function() {
    this.songs = new App.Songs(),
    this.songsView = new App.SongsTableView({collection: this.songs});
    $('#app').append(this.songsView.render().el);
  },

  index: function() {
    this.songs.fetch();
  },

  start: function() {
    Backbone.history.start({pushState: true});
  }

});

$(document).ready(function() {
  var router = new App.Router();
  router.start();
});
