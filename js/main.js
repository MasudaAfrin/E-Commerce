$(document).ready(function(){
    $('.navbar-nav .nav-item a').click(function(){
      $(this).closest('.nav-item').siblings().removeClass('active');
      $(this).closest('.nav-item').addClass('active');  
    });
    //set slider
    var slideCurrent = 1;
    var $slider = $('.slides');
    var slideCount = $slider.children().length;
    var animateSpeed=2000;
    var intervalTime=4000;
    //console.log(slideCount);
    
    setInterval(function(){
        $slider.animate({
            marginLeft:'-=1000px'
        },animateSpeed,function(){
            slideCurrent++;
            if(slideCurrent === slideCount){
                slideCurrent=1;
                $(this).css("margin-left","0px");
            }
            
        });
    },intervalTime)

    //image zoom
    /*$('.zoomcontainer').mousemove(function(){
        $('.imagezoom').css("visibility","visible");
    })
    $('.zoomcontainer').mouseleave(function(){
        $('.imagezoom').css("visibility","hidden");
    })*/
    /*understanding pageX and pageY.It gives mouse position of the page respect to left.
    $( document ).on( "mousemove", function( hello ) {
  $( ".imagezoom" ).text( "pageX: " + hello.pageX + ", pageY: " + hello.pageY );
});
*/
//content width
  /*var width = $('.zoomcontainer').width();
  console.log(width);*/
  
});
    
