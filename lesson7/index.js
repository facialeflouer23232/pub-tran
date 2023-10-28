window.addEventListener("load", function() {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1W8i7VQY9BF1nudGIBgpHRfil1_vWjzg&callback=initMap";
    script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1W8i7VQY9BF1nudGIBgpHRfil1_vWjzg&libraries=places&callback=initMap"
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
});
var destination
var map;
var marker;
function findLocation() {
    var placeInput = document.getElementById('placeInput').value;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': placeInput }, function (results, status) {
        if (status === 'OK') {
            var location = results[0].geometry.location;
            alert('Место  найдено: ' + location);
            destination=new google.maps.LatLng(location.lat(), location.lng())
           initMap()
        } else {
            alert('Место не найдено: ' + status);
        }
    });
}
function initMap() {
    if ("geolocation" in navigator) {
        console.log("k")


        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;


              // destination = new google.maps.LatLng(50.108902164629114, 14.510171625106938)
            console.log(destination)

            var map = new google.maps.Map(document.getElementById("map"), {
                center: {lat: latitude, lng: longitude}, // Replace with your desired map center coordinates
                zoom: 18, // You can adjust the zoom level
            });

            var marker = new google.maps.Marker({
                position:{lat: latitude, lng: longitude},
                map:map,
            })

            var directionService = new google.maps.DirectionsService();

            var request={
                origin: new google.maps.LatLng(latitude,longitude),
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            }

            directionService.route(request,function (result, status){
                if(status === google.maps.DirectionsStatus.OK){
                    var directionsDisplay= new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map)
                    directionsDisplay.setDirections(result)
                }
            })
        });
    } else {
        console.log("j")
        var map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: 37.7749, lng: -122.4194}, // Replace with your desired map center coordinates
            zoom: 14, // You can adjust the zoom level
        });
    }

}
