$(document).ready(function() {
  $('paper-button#submit').click(function() {
    $('input#rememberme').prop("checked", $('paper-checkbox#rememberme').prop("checked"))
    $("#form").submit();
  })
})
