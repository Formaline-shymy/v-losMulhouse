class Canvas{
    constructor(){
	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
	this.boundings = this.canvas.getBoundingClientRect();

	this.write = false;
	this.clearButton = document.getElementById("clear");
	this.confirmButton = document.getElementById("confirm");
	this.undoButton = document.getElementById("undo");
    this.context.lineWidth = 5; //  line width
	this.context.lineCap = "round";// line with rounded end caps
	this.context.strokeStyle = "green"//  line color
	this.context.beginPath();
	this.context.closePath();
	this.lastPosition = { x:0 , y:0 };
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseMoveEvent();
	this.startWriting();
	this.context.stroke();
	this.mouseUpEvent();
	this.clearCanvas();
	this.resetCanvas();
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.cancelReservCanvas();
	this.tactileWriting();
	};// -- end of constructor


 // Start Writing in the canvas when pressing a mouse button
	startWriting(){
	this.canvas.addEventListener("mousedown", (e) => {
	this.write = true;
	this.clearButton.classList.remove("invisible");
	this.confirmButton.classList.remove("invisible");
	this.mouseX = e.clientX - this.canvas.getBoundingClientRect().left;// Get the horizontal coordinates -The client area is the current window.
    this.mouseY = e.clientY - this.canvas.getBoundingClientRect().top; // Get the vertical coordinates
	this.lastPosition = {
                x: this.mouseX,
                y: this.mouseY
            };
    }); }//--- end of start writing

  
// Execute writing when moving the mouse pointer over the canvas:
    mouseMoveEvent(){
    this.canvas.addEventListener("mousemove" , (e) =>{
    if(this.write){
		this.write = true;
		this.mouseX = e.clientX - this.canvas.getBoundingClientRect().left;
        this.mouseY = e.clientY - this.canvas.getBoundingClientRect().top;
		this.context.beginPath();// creation of the path: necessary to it before starting to draw new items after calling clearRect().
		this.context.moveTo(this.lastPosition.x, this.lastPosition.y); // defines the starting point of the line
        this.context.lineTo(this.mouseX, this.mouseY);// defines the ending point of the line
        this.context.stroke();//filled with "ink"
		this.context.closePath();//close the path
		this.lastPosition = {
                  x: this.mouseX,
                  y: this.mouseY
                };                               
	    }
    });
    }; //-- end of  mouse Move Event
	
	
//Stop writing when releasing a mouse button
	mouseUpEvent(){
	document.addEventListener("mouseup", (e) => this.write = false );
	};//-- end of Mouse Up Event
	    
		
//Stop writing when moving the mouse pointer out of a canvas
	mouseLeaveEvent(){
	this.canvas.addEventListener("mouseleave", (e) => this.write = false ); 
	};// --end of mouseleave
	
	
//Writing on mobile with a finger 
	tactileWriting(){	
	this.canvas.addEventListener("touchstart", (e) => {
    let touch = e.touches[0];
    this.write = true;
	this.mouseX = touch.clientX - this.canvas.getBoundingClientRect().left;
    this.mouseY = touch.clientY - (this.canvas.getBoundingClientRect().top+window.scrollX);
    this.lastPosition = {
                x: this.mouseX,
                y: this.mouseY
    };
			
			e.preventDefault();// not to scroll while writing
        });

    this.canvas.addEventListener("touchmove", (e)=> {
    if(this.write){
        let touch = e.touches[0];
        this.mouseX = touch.clientX - this.canvas.getBoundingClientRect().left;
        this.mouseY = touch.clientY - (this.canvas.getBoundingClientRect().top+window.scrollX);
        this.context.beginPath();
        this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
        this.context.lineTo(this.mouseX, this.mouseY);
        this.context.closePath();
        this.context.strokeStyle;
        this.context.stroke();
        this.lastPosition = {
                 x: this.mouseX,
                 y: this.mouseY
                };
		e.preventDefault()
            }
        });

        this.canvas.addEventListener("touchend", (e) => this.write=false );

        this.canvas.addEventListener("touchleave", (e) =>this.write=false );

    }
  
// Clear the signature  
    clearCanvas() {
        const clearButton = document.getElementById("clear");
        this.clearButton.addEventListener("click", () => {
            this.resetCanvas();
        });         
    };//--end clearCanvas


    resetCanvas(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);//erases the pixels in a rectangular area .
		// parameters: (1:the x-axis, 2:the y-axis, 3: the rectangle's width and 4: it's height)
        this.write = false;
		this.clearButton.classList.add("invisible");
	    this.confirmButton.classList.add("invisible");
    };//--end reset 
  
  
  // Make the canvas reset and disapear when the reservation is canceled
  cancelReservCanvas(){
	  this.undoButton.addEventListener("click" , () =>{
	  this.resetCanvas();
		 
        });
  }//--end of cancelCanvas
  

}//--end of class Canvas
