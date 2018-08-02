jQuery(document).ready(function(){
  
  // change to "/coco/page-content.json" when uploading
  // change to "../page-content.json" when local
  var jsonPath = "/coco/page-content.json";
  var currentHash = "#about";
  
  if (window.location.hash == ""){
    window.location.hash = currentHash;
  }
  handleHashChange();
  
  $(window).on('hashchange',function(){ 
    if (window.location.hash == currentHash){
      //console.log("changed to same");
      return;
    } else {
      $(".photo-block").empty();
      $(".content-block").empty();
      currentHash = window.location.hash;
      handleHashChange();
    }
  });

  $(".menu-button").click(function(){
    if ($(".menu-button").attr("aria-expanded") == "true"){
      $(".mobile-nav").attr("aria-expanded", false);
      $(".menu-button").attr("aria-expanded", false);
    } else {
      $(".mobile-nav").attr("aria-expanded", true);
      $(".menu-button").attr("aria-expanded", true);
    }
  });
  
  function handleHashChange(){
    $(".selected").removeClass("selected");
    var hashWithoutHash = window.location.hash.substr(1);
    $(`.${hashWithoutHash}`).addClass("selected");
    $.getJSON(jsonPath, function(data) {
      if (window.location.hash && data[window.location.hash]) {
        populatePage(data[window.location.hash]);
      } else {
        populatePage(data["#about"]);
      }
    });
  }
            
  function populatePage(data) {
    var newImg = $("<img></img>");
    newImg.attr("src", data.image_url);
    $("#photo").append(newImg);
    var newHeader = $("<h4></h4>");
    newHeader.text(data.body_title);
    $("#text").append(newHeader);
    var newBody = $("<p></p>");
    newBody.html(data.body_text);
    $("#text").append(newBody);
  }
  
  $(".mobile-nav .page-section").click(function(){
    $(".mobile-nav").attr("aria-expanded", false);
    $(".menu-button").attr("aria-expanded", false);
  });
  
});