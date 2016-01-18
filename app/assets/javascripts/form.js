$(document).ready(function() {
  $('input#newpassword').keyup(function() {
    $('paper-input-char-counter:first-child').text($(this).val().length);
  });
});
