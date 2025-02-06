async function getConfig() {
    const response = await fetch("conf.json")
        .catch(error => console.error("Erreur lors du chargement de la configuration: ", error));

    if (!response.ok) { throw new Error(`Erreur HTTP ! Status: ${response.status}`); }
    
    return await response.json();
}

async function getWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    
    const response = await fetch(url)
        .catch(error => console.error("Erreur lors de la requête: ", error));
    
    if (!response.ok) { throw new Error(`Erreur HTTP ! Status: ${response.status}`); }

    return await response.json();
}


async function main() {
    const config = await getConfig();

    weather = await getWeather(config.city, config.apiKey);
    
    document.getElementById("city").innerHTML = `${weather.name} (${weather.sys.country})`;
    document.getElementById("description").innerHTML = `${weather.weather[0].description}`;
    document.getElementById("temperature").innerHTML = `Température ${weather.main.temp} °C`;
    document.getElementById("feelslike").innerHTML = `Ressentie ${weather.main.feels_like} °C`;
    document.getElementById("humidity").innerHTML = `Humidité ${weather.main.humidity}%`;
    document.getElementById("wind").innerHTML = `Vent ${weather.wind.speed} m/s`;
}

document.addEventListener("DOMContentLoaded", () => {
    main();
  });
