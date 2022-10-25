const cityForm = document.querySelector('form')
const cardContainer = document.querySelector(`[data-js="city-card"]`)
const cityNameContainer = document.querySelector(`[data-js="city-name"]`)
const cityWeatherContainer = document.querySelector(`[data-js="city-weather"]`)
const cityTemperatureContainer = document.querySelector(`[data-js="city-temperature"]`)
const timeImg = document.querySelector(`[data-js="time"]`)
const timeIconContainer = document.querySelector(`[data-js="time-icon"]`)

const showCard = () => {
  const hideCard = cardContainer.classList.contains('d-none')
  if (hideCard) {
    cardContainer.classList.remove('d-none')
  }
}

const showWeatherIcon = icon => {
  const weatherIcon = `<img src="./src/icons/${icon}.svg" >`
  timeIconContainer.innerHTML = weatherIcon
}

const fetchCityWeatherInfo = async cityName => {
  const [{ Key, LocalizedName }] = await getCityName(cityName)
  const [{ 
    WeatherText, 
    WeatherIcon, 
    Temperature, 
    IsDayTime 
  }] = await getCityWeather(Key)

  return { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon }
}

const showCityWeatherInfo = async cityName => {
  const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } 
    = await fetchCityWeatherInfo(cityName)

  showCard()
  showWeatherIcon(WeatherIcon)

  timeImg.src = IsDayTime ? `./src/day.svg` : `./src/night.svg`

  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText 
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const showLocalStorageCity = () => {
  const city = localStorage.getItem('city')

  if (city) {
    showCityWeatherInfo(city)
  }
}

const handleCityForm = event => {
  event.preventDefault()
  const inputValue = event.target.city.value

  showCityWeatherInfo(inputValue)
  localStorage.setItem('city', inputValue)

  cityForm.reset()
}

cityForm.addEventListener('submit', handleCityForm)

showLocalStorageCity()