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

    document.getElementById("city").innerHTML = config.city;
    
    weather = await getWeather(config.city, config.apiKey);
    
    document.getElementById("temperature").innerHTML = weather.main.temp + " °C";
}

document.addEventListener("DOMContentLoaded", () => {
    main();
  });
