var App = new (Backbone.View.extend({
  events: {
    'click a': function(e) {
      e.preventDefault();
      Backbone.history.navigate(e.target.pathname, { trigger: true });
    }
  }
}))({el: document.body});

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
  childViews: [],

  template: $("#songsTableTemplate").html(),

  initialize: function() {
    this.collection.on('change:votes', this.collection.sort, this.colletion);
    this.collection.on('sort', this.addAll, this);
    this.collection.on('reset', this.addAll, this);
  },

  addRow: function(song) {
    var songView = new App.SongRowView({model: song});
    this.childViews.push(songView);
    this.$('tbody').append(songView.render().el);
  },

  addAll: function() {
    this.render();
    this.collection.forEach(this.addRow, this);
  },

  delegateEvents: function() {
    this.childViews.forEach(function(childView) {
      childView.delegateEvents();
    });
  },

  render: function() {
    this.$el.html( this.template );
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
    var self = this;

    if (!this.songs) {
      this.songs = new App.Songs();
      this.songsView = new App.SongsTableView({collection: this.songs});
    } else {
      this.songsView.delegateEvents();
    }
    
    this.songs.fetch({
      success: function() {
        self.rootElement.html(self.songsView.el);
      }
    });
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
    Backbone.history.start({pushState: true});
  }

});

$(document).ready(function() {
  var router = new App.Router();
  router.start();
});
