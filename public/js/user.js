$(function(){
  var data;
  $(".portfolio").hover(function(){
    var txt = $(this).html().split("id=\"");
    data = txt[1].split("\"");

    $("#"+data[0]).removeClass("hide")
  },
  function(){
    $("#"+data[0]).addClass("hide");
  });
});
