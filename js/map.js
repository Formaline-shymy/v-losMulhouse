class Map{

  constructor(url, stations, markers) {
    this.mymap = L.map('mapid').setView([45.75 , 4.85], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17, minZoom: 13,
    id: 'mapbox/streets-v11',
	accessToken: 'pk.eyJ1IjoiZm9ybWFsaW5lIiwiYSI6ImNrNGUwemd0dDA4NHYzbmxoMTAxb2lqZG8ifQ.KRrk14Oh8FHzS9NxUickFw',
    }).addTo(this.mymap);
    
    this.url = url;  
    this.station = stations;
	this.marker = markers;	
	this.drawform = document.getElementById("drawform");
	this.reservationButton= document.getElementById ("reservationButton");
	this.identification = document.getElementById("identification");
	this.userName = document.getElementById("name");
    this.userSurname = document.getElementById("surname");
	this.bookingResult =  document.getElementById("bookingresult");
	this.bookButton = document.getElementById("book");
	this.undoButton = document.getElementById("undo"); 
	this.displayMap();
	this.init();
	this.prefillForm();
  
		
   }// --end of constructor
  
  
    init(){
	     this.redIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [23, 39],
            iconAnchor: [12, 39],
           	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
          });
           this.greenIcon = new L.Icon({
            iconUrl: 'Images/markergreen.png',
            iconSize: [23, 39],
            iconAnchor: [12, 39],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
          });
		  this.blackIcon = new L.Icon({
			iconUrl :'Images/markerblack.png',
            iconSize: [23, 39],
            iconAnchor: [12, 39],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
          });
		  this.orangeIcon = new L.Icon({
			iconUrl :'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
            iconSize: [23, 39],
            iconAnchor: [12, 39],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
          });	
	} //--end init   
	
//Fill in the idform --if the data has been already registerd before//
   prefillForm(){
	        this.undoButton.style.opacity = "0";
				if((localStorage.getItem("your family name :")) && (localStorage.getItem("your name :"))) {
					this.userSurname.value = localStorage.getItem("your family name :");
					this.userName.value = localStorage.getItem("your name :");
					sessionStorage.removeItem("your station :");
					sessionStorage.removeItem("station address :");
					sessionStorage.removeItem("resting time min :");
					sessionStorage.removeItem("resting time sec :");
				}
	}
    
	
	displayMap() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);
			
			results.forEach(station => {
			    this.latLng = [station.position.lat, station.position.lng];
				
                if(station.status === 'CLOSED'){
                    this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.blackIcon});
					this.marker.addTo(this.mymap);
				} 
				
				else if(station.status === 'OPEN'){
					if (station.available_bikes <=3 && station.available_bikes > 0 ){
					this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.orangeIcon});
					this.marker.addTo(this.mymap);
					}
			
				
				else if(station.available_bikes === 0){
					this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.redIcon});
					this.marker.addTo(this.mymap);
				}
				
				else {
                    this.marker = L.marker([station.position.lat,station.position.lng] ,{icon: this.greenIcon});
					this.marker.addTo(this.mymap);
			     }
				}
				
				
				
				//Station staus: translation into French 
				this.marker.addEventListener('click', ()=> {
					 //Renommage du status de la station en Français
                    let status
                    if (station.status == "OPEN" && station.available_bikes === 0) {
                        status = "Aucun vélo n'est disponible";
					
                    } else if (station.status == "CLOSED") {
                        status = "Cette station est actuellement fermée."
						
					// prevent from booking second time when you didn't cancel or your reservation didn't expired	
					} else if (sessionStorage.getItem("your station :") !=null){ 
                       alert("Vous avez deja une réservation en cours, annulez la avant d'en faire une nouvelle !")
					   				 
                    }else if (station.status == "OPEN") {
                        status = "Station est ouverte"
					}

					 
				//Show station details
			        let stationNameField = document.getElementById("stationName");
                    let adresseField = document.getElementById("address");
                    let nbrePlacesField = document.getElementById("bikestandNumber");
                    let nbreVelosField = document.getElementById("bikeNumber");
                    let stationStatusField = document.getElementById("stationStatus");

                    stationNameField.textContent = station.name;
                    adresseField.textContent = station.address;
					nbrePlacesField.textContent = station.available_bike_stands;
                    nbreVelosField.textContent = station.available_bikes;
					stationStatusField.textContent = status;
				
					                    
					if(station.status === 'CLOSED'){
						console.log("black");
						 document.getElementById("stationStatus").style.color = "black";
						 document.getElementById("stationStatus").style.textTransform = "uppercase";
						 this.identification.style.display = "none";
							 if (station.status == "CLOSED"&& sessionStorage.getItem("your station :") !=null){ 
                                   alert("Vous avez deja une réservation en cours, annulez la avant d'en faire une nouvelle !")  						   
					         }  		 
						 						 
						
					} else if (station.status === 'OPEN' ){
						    if (station.available_bikes <= 0) {
					     	console.log("red");
                            document.getElementById("stationStatus").style.color = "red";
						    document.getElementById("stationStatus").style.textTransform = "uppercase"; 
							this.identification.style.display = "none"; 	
								if(station.status == "OPEN" && station.available_bikes === 0 && sessionStorage.getItem("your station :") !=null){ 
                                   alert("Vous avez deja une réservation en cours, annulez la avant d'en faire une nouvelle !")  						   
						        } 
                    
										
						 }else if (station.available_bikes > 0) {
						   console.log("green or orange");
                           this.identification.style.display = "block"; 
				       
						   document.getElementById("stationStatus").style.color = "green";
						   document.getElementById("stationStatus").style.textTransform = "initial"; 
						   
						  			
				
				//verification if the identification form is empty or full = click on "Réservez!"Button
                    this.bookButton.addEventListener("click", () =>{
					if (this.userSurname.value != "" && this.userName.value != "" ){ //form filled in entirely
					 this.drawform.style.display = "block"; 
					 document.getElementById("myCanvas").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
					 
					
					 
					  // Local Storage
					  localStorage.setItem("your family name :",this.userSurname.value );
                      localStorage.setItem("your name :",this.userName.value);
					    
					 
			                     								 
					 
					 	// Insert the station name in the booking results.
				     this.bookingResult.querySelector("span").innerHTML = this.userSurname.value + "  " + this.userName.value;
		             this.bookingResult.querySelector("strong").innerHTML = station.name;
					 
			         
					}	
					
					else if (this.userSurname.value === "" && this.userName.value === ""){// empty form
                    alert("Merci de renseigner le formulaire");	
					
				    }
					else if (this.userSurname.value == "" || this.userName.value == "" ){// not entirely filled form
                    alert("Vous ayez oublié de renseigner un champ");
     				} //-end of else if
					
					
				
					
                })//--this.bookButton.addEventListener
				}	// --end of else this.marker
					 }//-- end of else "OPEN"
					 
					
				      
				 })//-- end of marker.addEventListener	
				 
                 
				})//--end of results.forEach
		  
		 
		})//-- end of ajaxGet
		
	}//--end of displayMap
	

	
 
}//--end of class