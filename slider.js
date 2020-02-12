class Slider{
    constructor(){
        this.currentSlide = 0;
		this.pauseButton();
		this.playButton();
		this.prevButton();
		this.nextButton();
		this.sliderAnimation();
		this.sliderKeyControl();
		this.sliderTouchPause();
		this.sliderTouchPrev();
		this.sliderTouchNext();
		this.slides = document.querySelectorAll(".slideElement");
		this.slides[this.currentSlide].classList.add("visible");
        this.slideInterval;
		this.changeSlide;
			
    }//-- -- end constructor 
    
    
	changeSlide(){
        this.slides[this.currentSlide].classList.remove("visible");// This property is to remove CSS classes on an element.
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;//modulo 
        this.slides[this.currentSlide].classList.add("visible");
    }//-- end change slide
    
	// timer slide animation
    sliderAnimation(){
        this.slideInterval = setInterval(() => this.changeSlide(), 5000);
    };//-- end slider animation 
	
// Next image
	nextImage(){
		this.changeSlide(this.currentSlide+1);
	};//-- end next image/
	
// Previous  image	
	previousImage(){
		this.changeSlide(this.currentSlide-1);
	};//-- end previous image
		
		
   // Pause image with touch - for tactile devices
	sliderTouchPause(){
        pause.addEventListener("touchstart" , () =>{
	    event.preventDefault();//
        clearInterval(this.slideInterval);
        document.getElementById("pause").style.display= "none";
        document.getElementById("play").style.display= "inline-block";
	    this.nextImage();
            
        });
    }//-- end touch pause
	
	
	// Previous image by touch
	sliderTouchPrev(){
		prev.addEventListener("touchstart", () =>{ 
		event.preventDefault();
		clearInterval(this.slideInterval);
		this.previousImage();
		this.sliderAnimation();
		 });
	}//-- end touch previous image
	
	
	// Next image by touch
	sliderTouchNext(){
		next.addEventListener("touchstart", () =>{ 
		event.preventDefault();
		clearInterval(this.slideInterval);
		this.nextImage();
		this.sliderAnimation();
		});		
	}//-- end touch next image		

		
		
 	//  Pause Button Mouse
	pauseButton(){
        pause.addEventListener("click" , () =>{
		event.preventDefault();
        clearInterval(this.slideInterval);
        document.getElementById("pause").style.display= "none";
        document.getElementById("play").style.display= "inline-block";
        }); 
	} //-- end pause
	
	
      // Play Button Mouse
	playButton(){
        play.addEventListener("click", () =>{
        this.slideInterval = setInterval(() => this.nextImage(), 5000);
        document.getElementById("pause").style.display= "inline-block";
        document.getElementById("play").style.display= "none";
        });
    };//-- end play
	 
	 
	 // Prevoius Button Mouse
	prevButton(){
		prev.addEventListener("click", () =>{ 
		clearInterval(this.slideInterval);
		this.previousImage();
		this.sliderAnimation();
		});
    };//--end prevoius
	
	
	// Next Button Mouse
	nextButton(){
		next.addEventListener("click", () =>{ 
		clearInterval(this.slideInterval);
		this.nextImage();
		this.sliderAnimation();
		});
    };//-- end next
	

	
	// Key Control
    sliderKeyControl(){
		document.addEventListener('keydown', e =>{
        switch(event.key){
          	case 'ArrowLeft': 
		    clearInterval(this.slideInterval);
            this.previousImage();
			this.sliderAnimation();
			break;
			case '4':// numpad 4 = arrow left
			clearInterval(this.slideInterval);
            this.previousImage();
			this.sliderAnimation();
			break;
            case 'ArrowRight': // > right
            clearInterval(this.slideInterval);
            this.nextImage();
			this.sliderAnimation();
            break;
			case '6':// numpad 6 = arrow right
			clearInterval(this.slideInterval);
            this.previousImage();
			this.sliderAnimation();
			break;
				
		default: // Do nothing
        }
		});
	};//-end key control

	
   
}//-- end class slider --



		  