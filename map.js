class Map{

  constructor(url, stations, markers) {
    this.mymap = L.map('mapid').setView([47.747600, 7.335980], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17, minZoom: 13,
    id: 'mapbox/streets-v11',
	accessToken: 'pk.eyJ1IjoiZm9ybWFsaW5lIiwiYSI6ImNrNGUwemd0dDA4NHYzbmxoMTAxb2lqZG8ifQ.KRrk14Oh8FHzS9NxUickFw',
    }).addTo(this.mymap);
    
    this.url = url;  
    this.station = stations;
	this.marker = markers;	
	this.possibleReservation = null;
	this.form = document.getElementById("idform");
	this.confirmButton = document.getElementById("confirm");
	this.prenomField = document.getElementById("prenom");
	this.displayMap();
	this.init();
	this.confirmStation();
	
	
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
	
       
	displayMap() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);
			/*for (let i = 0; i < results.length; i++) {
                this.station = results[i];
                this.marker = L.marker([this.station.position.lat,this.station.position.lng]);
                this.marker.addTo(this.mymap);
				console.log(this.station)}*/
         results.forEach(station => {
                this.latLng = [station.position.lat, station.position.lng];
                if(station.status === "CLOSED"){
                    this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.blackIcon});
					this.marker.addTo(this.mymap).bindPopup(station.name);
					this.possibleReservation = false;
				} 
				
				else if(station.status === "OPEN" && station.available_bikes ===0){
					this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.redIcon});
					this.marker.addTo(this.mymap);
					this.possibleReservation = false;
				}
				
				else if(station.status === "OPEN" &&  station.available_bikes <=3){
					this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.orangeIcon});
					this.marker.addTo(this.mymap);
					this.possibleReservation = true;
				}
				
                else {
                    this.marker = L.marker([station.position.lat,station.position.lng] ,{icon: this.greenIcon});
					this.marker.addTo(this.mymap);
					this.possibleReservation = true;
		        }
				
				//Station staus French translation
				this.marker.addEventListener('click', ()=> {
                    let status
                    if (station.status == "OPEN") {
                        status = "ouverte."
                    } else if (station.status == "CLOSED") {
                        status = "fermée."
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
					
					

                })//-- end of marker.addEventListener
 
					
    	
		 })//--end of results.forEach
		  
		 
		})//-- end of ajaxGet
		
	}//--end of displayMap

   
    


 confirmStation(){
	 
	       this.confirmButton.addEventListener("click", () => {
           this.form.classList.remove("invisible");
        });
               
    };
	
 
	
		 
}//--end of class