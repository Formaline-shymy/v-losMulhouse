class Timer{
    constructor(ms=1200000, minTimer="min", secTimer="sec"){
    this.time = ms/1000;    
    this.minTimer = document.getElementById("min");       
    this.secTimer = document.getElementById("sec");
	this.textReservation = document.getElementById("timer");
	this.nobooking = document.getElementById("nobooking");
	this.bookingResult = document.getElementById("bookingresult");
	this.identification = document.getElementById("identification");
	this.drawform= document.getElementById("drawform");
	this.minTimer.textContent = this.minute;  
    this.secTimer.textContent = this.second;
	this.confirmButton = document.getElementById("confirm");	
    this.start();
	this.titlebooking = document.getElementById("titlebooking");
	this.undoButton = document.getElementById("undo");
	this.cancel();
	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
	this.nameStation = document.getElementById("stationName");
	this.addressStation = document.getElementById("address");
	this.infoStation = document.getElementById("infoStation");
	}//--end of constructor
   


   start(){
        this.confirmButton.addEventListener("click", () => {// click on 'Confirmer votre choix' Button
	     //Storage
            let autoSurname = document.getElementById("surname")
            let autoName = document.getElementById("name")
           	if(localStorage){
			autoSurname.value = localStorage.getItem("your family name :");
			autoName.value = localStorage.getItem("your name :");
			} else {
			autoSurname.value = ""
			autoName.value = ""
			}
            sessionStorage.setItem("your station :", this.nameStation.textContent);
			sessionStorage.setItem("station address :", this.addressStation.textContent);
			sessionStorage.getItem("your station :");
			sessionStorage.getItem("station address :");
			
	    this.titlebooking.scrollIntoView();
	    this.nobooking.style.display="none";
		this.undoButton.style.opacity = "1";
		this.infoStation.style.opacity = "0";
		this.drawform.style.display = "none";
	    this.identification.style.display = "none";
		
		let x = window.matchMedia("(max-width: 767px)")
		if (x.matches) { // If media query matches the application container (section id = "search") becomes shorter on small devices 
		document.getElementById("search").style.height = "865px"; 
		} 

		this.countDown();
		this.calcMinutes();       
		this.calcSeconds();
	   
     })
	}//--end of start

  
    countDown(){ 
	   clearInterval(this.chronoInterval);
	    this.time = 1200000/1000;  
	    this.chronoInterval = setInterval(() => { 		
        this.time--; // (decrement)
        if(this.time >= 0){    
            this.bookingResult.classList.remove("invisible"); 		
            this.calcMinutes();     
            this.calcSeconds();
            this.minTimer.textContent = this.minute;       
            this.secTimer.textContent = this.second;
			this.textReservation.classList.remove("invisible");
			sessionStorage.setItem("resting time min :" , this.minute);
			sessionStorage.setItem("resting time sec :" , this.second);
	        sessionStorage.getItem("resting time min :");
		    sessionStorage.getItem("resting time sec :");
				
				
	// The expiration of the reservation
		} else {
			clearInterval(this.chronoInterval);
			this.time = 1200000/1000;
			this.nobooking.style.display="none";
            this.textReservation.classList.add("invisible");
		    this.bookingResult.classList.add("invisible"); 
			this.context.clearRect(0,0, this.canvas.width, this.canvas.height);  // Make the canvas reset and disapear when the reservation request expired
			this.nobooking.style.display="block"; 
			alert("Votre réservation a expirée! Veuillez effectuer une nouvelle réservation");
			this.infoStation.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
			this.drawform.style.display = "none";
			this.identification.style.display = "none";
			this.undoButton.style.opacity = "0";
			this.infoStation.style.opacity = "1";
			document.getElementById("search").style.height = "initial"; 
			sessionStorage.clear();
			}	
	   }, 1000);
	
    }//--end countDown
	

    
    calcMinutes(){
        this.minute = Math.floor(this.time/60);
    }//-- end of calcMinutes
    
    calcSeconds(){
        this.second = Math.floor(this.time-(this.minute*60));
    }//--end of calcSconds
  
 
	//To cancel the reservation before it expires
	cancel(){
		this.undoButton.addEventListener("click" , () =>{
		clearInterval(this.chronoInterval);
		this.time = 1200000/1000;  
		alert ("Votre annulation de réservation vélo a bien été prise en compte.");
		this.nobooking.style.display="block";
        this.textReservation.classList.add("invisible");
		this.bookingResult.classList.add("invisible"); 
		this.drawform.style.display = "none";
		this.identification.style.display = "none";
		this.undoButton.style.opacity = "0";
		this.infoStation.style.opacity = "1";
		this.infoStation.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
		document.getElementById("search").style.height = "initial"; 
		sessionStorage.clear();
	 })
	}//--end of cancel
	

	
}//--end of Class Timer
	