// Javascript document

$(document).ready(function() {
  $("tr td.up_vote a").on("click", function(e) {
    updateVotes($(this));
    e.preventDefault();
  });
});

function updateVotes(song) {
  $.ajax({
    url: song.prop('href'),
    type: 'POST',
    dataType: 'json',
    success: function(data){
      song.parent().prev().html(data.votes);
    },
    error: function(data){
      console.log(data);
      alert('Error: please check console log');
    }
  });
}
