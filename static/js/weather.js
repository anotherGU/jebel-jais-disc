// === Weather Widget with Custom Icons ===

// Маппинг кодов погоды OpenWeatherMap на кастомные эмодзи иконки
const weatherIcons = {
  // Ясно
  "01d": "☀️", // clear sky day
  "01n": "🌙", // clear sky night

  // Малооблачно
  "02d": "🌤️", // few clouds day
  "02n": "☁️", // few clouds night

  // Облачно
  "03d": "☁️", // scattered clouds
  "03n": "☁️",
  "04d": "☁️", // broken clouds
  "04n": "☁️",

  // Дождь
  "09d": "🌧️", // shower rain
  "09n": "🌧️",
  "10d": "🌦️", // rain day
  "10n": "🌧️", // rain night

  // Гроза
  "11d": "⛈️", // thunderstorm
  "11n": "⛈️",

  // Снег
  "13d": "❄️", // snow
  "13n": "❄️",

  // Туман
  "50d": "🌫️", // mist
  "50n": "🌫️",
};

async function loadWeather() {
  const apiKey = "b2ba65ef58ec0db1ed6ba3f0da256d85";
  const city = "Ras Al Khaimah City";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data:", data);

    // Получаем данные
    const temp = Math.round(data.main.temp);
    const iconCode = data.weather[0].icon;
    const customIcon = weatherIcons[iconCode] || "🌡️"; // Резервная иконка

    // Обновляем элемент с иконкой
    const weatherIconElement = document.getElementById("weather-icon");

    // Проверяем, это <img> или обычный элемент
    if (weatherIconElement.tagName === "IMG") {
      // Если это картинка, меняем на текстовое содержимое не получится
      // Создаем span вместо img
      const newIcon = document.createElement("span");
      newIcon.id = "weather-icon";
      newIcon.textContent = customIcon;
      newIcon.style.fontSize = "25px";
      newIcon.style.lineHeight = "1";
      newIcon.style.display = "inline-block";
      weatherIconElement.parentNode.replaceChild(newIcon, weatherIconElement);
    } else {
      // Если это уже текстовый элемент
      weatherIconElement.textContent = customIcon;
      weatherIconElement.style.fontSize = "40px";
      weatherIconElement.style.lineHeight = "1";
    }

    // Обновляем температуру и город
    document.getElementById("weather-temp").textContent = `${temp}°C`;
    document.getElementById("weather-city").textContent = "Ras Al Khaimah";
  } catch (error) {
    console.error("Weather load error:", error);
    document.getElementById("weather-temp").textContent = "21°C";

    // Показываем резервную иконку при ошибке
    const weatherIconElement = document.getElementById("weather-icon");
    if (weatherIconElement.tagName === "IMG") {
      weatherIconElement.style.display = "none";
    } else {
      weatherIconElement.textContent = "🌡️";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadWeather(); // первый вызов сразу при загрузке
  setInterval(loadWeather, 3600000); // каждые 10 минут (3600000 мс)
});
