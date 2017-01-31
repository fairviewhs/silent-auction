// (c) Dallen 2017

// Most command buttons
$(".command").click(function(){
  $.ajax({
    url: '/user/update/'+$(e).attr("id"),
    data: { command: $(e).attr("command") },
    dataType: 'json',
    method: 'POST'
  }).done(function(data) {
    console.log(data);
    if(data.success){
      $(this).html(data.newName);
    }else{
      alert(data.errors);
      $(e).find(".errors").children().empty();
      $(e).show();
      data.errors.forEach(function(error){
        $(e).find(".errors").append("<li>"+error+"</li>");
      });
    }
  });
});

// Add perms to one auction
$(".setAdmin").click(function(){
  $.ajax({
    url: $(e).attr("action") + ':' + ,
    data: { command: 'addAdmin', auction: $('#select'+$(e).attr("id")).value() },
    dataType: 'json',
    method: 'POST'
  }).done(function(data) {
    console.log(data);
    if(data.success){
      $(this).html(data.newName);
    }else{
      alert(data.errors);
      $(e).find(".errors").children().empty();
      $(e).show();
      data.errors.forEach(function(error){
        $(e).find(".errors").append("<li>"+error+"</li>");
      });
    }
  });
});
