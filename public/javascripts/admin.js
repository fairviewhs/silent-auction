$(function(){

  $(".auctionSelector").change(function(){
    $(this).find(".default").remove();
    var btn = $("#"+$(this).attr("id")+".setAdmin");
    btn.show();
    console.log($(this).find(":selected").attr("isadmin"));
    if($(this).find(":selected").attr("isadmin") === "true"){
      btn.html("Remove Admin");
    }else{
      btn.html("Make Admin");
    }
  });

  // Add perms to one auction
  $(".setAdmin").click(function(){
    var btn = $(this);
    var opt = $("#"+$(this).attr("id")+".auctionSelector").find(":selected");
    $.ajax({
      url: '/users/update',
      data: {
        auction: $("#"+$(this).attr("id")+".auctionSelector").find(":selected").attr("id"),
        user: $(this).attr("id")
      },
      dataType: 'json',
      method: 'POST'
    }).done(function(data) {
      console.log(data);
      if(data.success){
        if(opt.attr("isadmin") !== "true"){
          btn.html("Remove Admin");
          opt.attr("isadmin", true);
        }else{
          btn.html("Make Admin");
          opt.attr("isadmin", false);
        }
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
