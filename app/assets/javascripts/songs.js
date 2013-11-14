// Javascript document

$(document).ready(function() {
  var count = $('tbody tr').length;

  $('tbody tr:last-child')
      .find('a.remove_song')
      .replaceWith('<a href="#" class="insert_song btn btn-small"><i class="icon-plus-sign"></i> More</a>');

  $("tbody").on("click", 'a.remove_song', function(e) {
    var row = $(this).parents('tr');
    row.hide('slow', function() {
      if (row.next('input[type=hidden]').val()) {
        var input = row.next('input[type=hidden]');
        input.clone().insertAfter(change(input));
      } else {
        row.remove();
      }
    });
    e.preventDefault();
  });

  $("tbody").on("click", 'a.insert_song', function(e) {
    var row = $(this).parents('tr');
    row.clone()
      .insertBefore(format(row, count))
      .find('a.insert_song')
      .replaceWith('<a href="#" class="remove_song btn btn-small btn-danger">Remove</a>');
    count++;
    e.preventDefault();
  });

});

function change(input) {
  var id = input.prop('id');
  var name = input.prop('name');
  input.prop('id',id.replace('id','_destroy'))
     .prop('name',name.replace('id','_destroy'))
     .prop('type','checkbox')
     .prop('checked','checked').hide()
     .val(1);

  return input;
}

function format(row, count) {
  return row.find('input[type=text]').val('').end()
        .find('input.title').prop('id','artist_songs_attributes_'+ count +'_title').end()
        .find('input.title').prop('name','artist[songs_attributes]['+ count +'][title]').end()
        .find('input.youtube').prop('id','artist_songs_attributes_'+ count +'_youtube').end()
        .find('input.youtube').prop('name','artist[songs_attributes]['+ count +'][youtube]').end()
        .find('input.soundcloud').prop('id','artist_songs_attributes_'+ count +'_soundcloud').end()
        .find('input.soundcloud').prop('name','artist[songs_attributes]['+ count +'][soundcloud]').end();
}
