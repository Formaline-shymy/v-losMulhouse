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
  }// - -end of constructor
	
	  displayMap() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);

            for (let i = 0; i < results.length; i++) {
                this.station = results[i];
                this.marker = L.marker([this.station.position.lat,this.station.position.lng]);
                this.marker.addTo(this.mymap);
				console.log(this.station)
                }
        })
    } //-- end of dispaly

}//--end of class
