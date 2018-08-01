jQuery(document).ready(function(){
  
  // change to "/coco/works.json" when uploading
  var jsonPath = "../works.json";
  var currentHash = "#home";
  
  if (window.location.hash == ""){
    window.location.hash = currentHash;
  }
  handleHashChange();
  
  $(window).on('hashchange',function(){ 
    if (window.location.hash == currentHash){
      //console.log("changed to same");
      return;
    } else {
      $(".page-body").empty();
      currentHash = window.location.hash;
      handleHashChange();
    }
  });
  
  function handleHashChange(){
//    $(".selected").removeClass("selected");
//    $(window.location.hash).addClass("selected");
    $.getJSON(jsonPath, function(data) {
      if (window.location.hash && data.collections[window.location.hash]) {
        setupContentPage(data.collections[window.location.hash]);
      } else {
        setupHomepage(data.collections);
      }
    });
  }
  
  function setupHomepage(data){
    var collections = Object.keys(data);
    for (hash in collections) {
      var collection = data[collections[hash]];
      var newWrapper = $("<div></div>");
      newWrapper.addClass("collection-wrapper");
      var imageWrapper = $("<div></div>");
      imageWrapper.addClass("collection-image-wrapper");
      var image = $("<div></div>");
      image.addClass("collection-image");
      image.css("background-image", `url(${collection.primary_photo_url})`);
      imageWrapper.append(image);
      var p = $("<p></p>");
      p.addClass("collection-name");
      p.text(collection.name);
      var hrefWrapper = $("<a></a>");
      hrefWrapper.attr("href", collections[hash]);
      image.append(hrefWrapper);
      newWrapper.append(imageWrapper);
      newWrapper.append(p);
      $(".page-body").append(newWrapper);
    }
  }
  
  function setupContentPage(data){
    var bodyWrapper = $("<div></div>");
    bodyWrapper.addClass("body-wrapper");
    var contentName = $("<h4></h4>");
    contentName.addClass("content-name");
    contentName.text(data.name);
    bodyWrapper.append(contentName);
    var contentDesc = $("<p></p>");
    contentDesc.addClass("content-desc");
    contentDesc.text(data.desc);
    bodyWrapper.append(contentDesc);
    var contentWrap = $("<div></div>");
    contentWrap.addClass("content-wrapper");
    $.each( data.works, function( i, work ) {
      var workWrapper = $("<div></div>");
      workWrapper.addClass("work-wrapper");
      var newImg = $("<img></img>");
      newImg.addClass("page-image");
      newImg.attr("src", work.photo_url);
      workWrapper.append(newImg);
      var p = $("<p></p>");
      p.addClass("page-art-desc");
      p.html(`<i>${work.name}</i> (${work.year}). ${work.medium}.<br>${work.desc}`);
      workWrapper.append(p);
      contentWrap.append(workWrapper);
    });
    bodyWrapper.append(contentWrap);
    var linkBack = $("<p class='link-back'><a href='/index.html'>< Back to Works</a></p>");
    bodyWrapper.append(linkBack);
    $(".page-body").append(bodyWrapper);
  }
  
  $(".menu-button").click(function(){
    if ($(".menu-button").attr("aria-expanded") == "true"){
      $(".mobile-nav").attr("aria-expanded", false);
      $(".menu-button").attr("aria-expanded", false);
    } else {
      $(".mobile-nav").attr("aria-expanded", true);
      $(".menu-button").attr("aria-expanded", true);
    }
  });
  
});