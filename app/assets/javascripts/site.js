$(document).on("click", "paper-button#submit", function(){
  $('input#rememberme').prop("checked", $('paper-checkbox#rememberme').prop("checked"))
  console.log($('paper-checkbox#rememberme').prop("checked"))
  console.log($('input#rememberme').prop("checked"))
  $("#form").submit();
});
