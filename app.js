window.addEventListener("load", () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let degreeSection = document.querySelector(".temperature");
    let degreeSpan = document.querySelector(".temperature span");
    let humidity = document.querySelector(".humidity");
    let windSpeed = document.querySelector(".windSpeed");
    let uvIndex = document.querySelector(".uvIndex");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/2348089ef0b5ec251f440016d7c38a8e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const {temperature, icon} = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = data.currently.summary; 
                    locationTimezone.textContent = data.timezone.replace("America/", " ").replace(/_/, " ");
                    humidity.textContent = data.currently.humidity;
                    windSpeed.textContent = data.currently.windSpeed;
                    uvIndex.textContent = data.currently.uvIndex;

                    let celsius = (temperature - 32) * (5 / 9);

                    setIcons(icon, document.querySelector(".icon"));
                    
                    degreeSection.addEventListener("click", () => {
                        if (degreeSpan.textContent === "F"){
                            degreeSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        });
    }

        function setIcons (icon, iconID){
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }


});
