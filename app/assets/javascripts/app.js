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
  model: App.Song,
  comparator: function(song) {
    return -song.get('votes');
  }
});

App.SongsTableView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('change:votes', this.collection.sort, this.colletion);
    this.collection.on('sort', this.addAll, this);
  },

  addRow: function(song) {
    var songView = new App.SongRowView({model: song});
    this.$('tbody').append(songView.render().el);
  },

  addAll: function() {
    this.render();
    this.collection.forEach(this.addRow, this);
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

App.SongView = Backbone.View.extend({
  template: _.template( $("#songViewTemplate").html() ),

  initialize: function() {
    this.model.on('sync', this.render, this);
  },

  render: function() {
    this.$el.html( this.template({song: this.model.toJSON()}) );
    return this;
  }
});

App.Router = Backbone.Router.extend({
  rootElement: $('#app'),

  routes: {
    "": "index",
    "song/:id": "song"
  },

  index: function() {
    if (!this.songsView) {
      this.songs = new App.Songs(),
      this.songsView = new App.SongsTableView({collection: this.songs});
    }
    
    this.rootElement.append(this.songsView.el);
    this.songs.fetch();
  },

  song: function(id) {
    var self = this,
        song, songView;

    if (this.songs) {
      song = this.songs.get(id);
    } else {
      song = new App.Song({id: id});
    }

    song.fetch({
      success: function() {
        songView = new App.SongView({model: song});
        self.rootElement.html(songView.render().el);
      }
    });
  },

  start: function() {
    Backbone.history.start();
  }

});

$(document).ready(function() {
  var router = new App.Router();
  router.start();
});
