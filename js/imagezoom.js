let thumbs = document.getElementsByClassName('thumbnail');
imageZoom('pro-img');
for(var i=0; i<thumbs.length; i++){
    thumbs[i].addEventListener('mouseover', function(){
        document.getElementById('pro-img').src = this.href;
        imageZoom('pro-img');
    
    })
}

    function imageZoom(imgId) {
        
        let image = document.getElementById(imgId);
        let lens = document.getElementById('lens');
        //let zoomcon = document.getElementById('imagezoom');
        //setting background image in lens
        //let s=image.src;
        //console.log(s);
        lens.style.backgroundImage = "url('" + image.src + "')";
        //zoomcon.style.backgroundImage = "url('" + image.src + "')";
        //image zooming in lens
        let zoomratio = 3;
        //let zoomx = zoomcon.offsetWidth/lens.offsetWidth;
        //let zoomy = zoomcon.offsetHeight/lens.offsetHeight;
        //multiply with zoom-ratio
        lens.style.backgroundSize = (image.width *zoomratio) + 'px ' + (image.height*zoomratio) + 'px';
        //zoomcon.style.backgroundSize = (image.width *zoomx) + 'px ' + (image.height*zoomy) + 'px';
        //set the functions to event
        image.addEventListener("mousemove",movelens);
        lens.addEventListener("mousemove",movelens);
        image.addEventListener("touchmove",movelens);
        lens.addEventListener("mouseleave",remove);
        image.addEventListener("mouseleave",remove);
        //function for movement of lens
        function movelens() {
            lens.style.visibility = "visible";
            //zoomcon.style.visibility = "visible";
            let positionCursor = getCursor();
            //console.log("pos: ",positionCursor);
            //lens position
            let posleft = positionCursor.x - (lens.offsetWidth/2);
            let postop = positionCursor.y - (lens.offsetHeight/2);
            if(posleft<0){
                posleft = 0;
            }
            if(postop<0){
                postop = 0;
            }
            if(posleft > (image.width - lens.offsetWidth/2)){
                posleft = image.width - lens.offsetWidth/2;
            }
            if(postop > (image.height - lens.offsetHeight/2)){
                postop = image.height - lens.offsetHeight/2;
            }
            //setting the position of lens
            lens.style.left = posleft + 'px';
            lens.style.top = postop + 'px';
            //set background position of lens
            lens.style.backgroundPosition = "-" + (positionCursor.x*zoomratio) + "px -" + (positionCursor.y*zoomratio) + "px" ;
            //zoomcon.style.backgroundPosition = "-" + (positionCursor.x*zoomx) + "px -" + (positionCursor.y*zoomy) + "px" ;
        }
        //function for getting the co-ordinate of mouse cursor over image
        function getCursor() {
            let e = window.event;
            let boundary = image.getBoundingClientRect();
            let x = e.pageX - boundary.left;
            let y = e.pageY - boundary.top;
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {'x':x, 'y':y}
        }
        //remove mouse and lens
        function remove(){
            lens.style.visibility = "hidden";
            //zoomcon.style.visibility = "hidden";
        }
    }
    