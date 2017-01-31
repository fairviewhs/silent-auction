$(function(){

  $(".auctionSelector").change(function(){
    $(this).find(".default").remove();
    var btn = $("#"+$(this).attr("id")+".setAdmin");
    btn.show();
    if($(this).attr("isadmin")){
      btn.html("Remove Admin");
    }else{
      btn.html("Make Admin");
    }
  });

  // Add perms to one auction
  $(".setAdmin").click(function(){
    $.ajax({
      url: $(this).attr("action"),
      data: { command: 'addAdmin', auction: $("#"+$(this).attr("id")+".auctionSelector").val() },
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

})
