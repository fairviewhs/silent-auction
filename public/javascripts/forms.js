// (c) Dallen 2015

$(document).ready(function() {
  // ensures forms are parsed by submitForm and that polymer submits actually work
  $("form").each(function() {
    let form = $(this);
    form.attr("onsubmit", "return submitForm(this)");
    form.find("#submit").click(function(){
      form.submit();
    });
  });
});

// pretends to submit the form with ajax so the server can validate that the required fields accurate
function submitForm(e){
  if($(e).attr("method") !== "post"){
    console.error("You must use post in your form for it to be used");
    return false;
  }
  let formDataArray = $(e).serializeArray();
  let formData = {};
  formDataArray.forEach(function(e){
    formData[e.name] = e.value;
  });
  $.ajax({
    url: $(e).attr("action"),
    data: formData,
    dataType: 'json',
    method: 'POST'
  }).done(function(data) {
    console.log(data);
    if(data.success){
      // Do something with the message, or maybe pin it in the session so they see it on the next page
      $(e).hide();
      window.location.href = data.redir;
    }else{
      alert(data.errors);
      $(e).find(".errors").children().empty();
      $(e).show();
      data.errors.forEach(function(error){
        $(e).find(".errors").append("<li>"+error+"</li>");
      });
    }
  });
  return false;
}
