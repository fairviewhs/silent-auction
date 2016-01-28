$(document).ready(function() {
  $('paper-button#submit').click(function() {
    $('input#rememberme').prop("checked", $('paper-checkbox#rememberme').prop("checked"))
    $("#form").submit();
  })

  $('paper-item.auctions').mouseover(function() {
    $(this).css('background-color', '#EEE');
  });

  $('paper-item.auctions').mouseout(function() {
    $(this).css('background-color', '#FFF');
  })
})
