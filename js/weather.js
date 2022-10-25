const APIKey = `eA7GA49G4kA1i1Vhe6sp5OybLGsM0BWG`
const baseUrl = `http://dataservice.accuweather.com/`

const getCityUrl = cityName => 
  `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getCityWeatherUrl = cityKey => 
  `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Nao foi possivel obter os dados')
    }

    return response.json()
  
  } catch ({ error, message }) {
    alert(`Erro: ${error} ${message}`)
  }

}

const getCityName = cityName => fetchData(getCityUrl(cityName))

const getCityWeather = cityKey => fetchData(getCityWeatherUrl(cityKey))