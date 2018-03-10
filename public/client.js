// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  //console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    //$('<li></li>').text('Thank you for your feedback !').appendTo('ul#dreams');
    /*dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });*/
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val
    //prompt('Your ID was sent, please allow up to 48 hours for a response if you hear nothing please resubmit with the correct discord tag')
  $.post('/dreams?' + $.param({dream: dream}), function() {
      $('input').val('');
      $('input').focus();
    });
  });

});
