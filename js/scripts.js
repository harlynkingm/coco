jQuery(document).ready(function(){
  
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
    $(".selected").removeClass("selected");
    $(window.location.hash).addClass("selected");
    $.getJSON("/coco/works.json", function(data) {
      switch(window.location.hash){
        case "#collection1":
          setupContentPage(data.collections.collection1);
          break;
        case "#collection2":
          setupContentPage(data.collections.collection2);
          break;
        case "#collection3":
          setupContentPage(data.collections.collection3);
          break;
        default:
          setupHomepage(data.collections.home);
          break;
      }
    });
  }
  
  function setupHomepage(data){
    var carousel = $("<div></div>");
    carousel.addClass("carousel");
    $(".page-body").append(carousel);
    
    $.each( data.works, function( i, work ) {
      var newImg = $("<img></img>");
      newImg.addClass("carouselImage");
      newImg.attr("src", work.photo_url);
      $(".carousel").append(newImg);           
    });
    
    var newDesc = $("<h4></h4>");
    newDesc.addClass("page-desc");
    newDesc.text(data.desc);
    $(".page-body").append(newDesc);
    
    $('.carousel').slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      pauseOnFocus: false,
      pauseOnHover: false
    });
	
  }
  
  function setupContentPage(data){
    $.each( data.works, function( i, work ) {
      var newImg = $("<img></img>");
      newImg.addClass("page-image");
      newImg.attr("src", work.photo_url);
      $(".page-body").append(newImg);
      var p = $("<p></p>");
      p.addClass("page-art-desc");
      p.html(`<i>${work.name}</i> (${work.year}). ${work.medium}.<br>${work.desc}`);
      $(".page-body").append(p);
    });
  }
  
});