class Map{

  constructor(url, stations, markers) {
    this.mymap = L.map('mapid').setView([47.747600, 7.335980], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: 'mapbox/streets-v11',
	accessToken: 'pk.eyJ1IjoiZm9ybWFsaW5lIiwiYSI6ImNrNGUwemd0dDA4NHYzbmxoMTAxb2lqZG8ifQ.KRrk14Oh8FHzS9NxUickFw',
    }).addTo(this.mymap);
    
    this.url = url;  
    this.displayMap(); 
	this.station = stations;
	this.marker = markers;	
	this.init();
	
  }// - -end of constructor
  
  
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
	 /*for (let i = 0; i < results.length; i++) {
                this.station = results[i];
                this.marker = L.marker([this.station.position.lat,this.station.position.lng]);
                this.marker.addTo(this.mymap);
				console.log(this.station) }*/
       
	  displayMap() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);
				
         results.forEach(station => {
                this.latLng = [station.position.lat, station.position.lng];
                if(station.status === "CLOSED"){
                    this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.blackIcon});
                    this.marker.addTo(this.mymap);
                } 
				else if(station.status === "OPEN" && station.available_bikes ===0){
                    this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.redIcon});
                    this.marker.addTo(this.mymap);
                }
				else if(station.status === "OPEN" &&  station.available_bikes <=3){
                    this.marker = L.marker([station.position.lat,station.position.lng], {icon: this.orangeIcon});
                    this.marker.addTo(this.mymap);
                }
                else {
                    this.marker = L.marker([station.position.lat,station.position.lng] ,{icon: this.greenIcon});
                    this.marker.addTo(this.mymap);
                }
				
		 })//--end of results.forEach
		})//-- end of ajaxGet
		 }//--end of displayMap
		 
}//--end of class