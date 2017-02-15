import {config as userConfig} from './config'




declare var fetch
export function weatherRequest(city) {

  return new Promise(function (resolve, reject) {

    const apiKey: string = 'fbdccfd084f3904f4953985dd358c569'
    const city = 'London'
    const endPoint: string = `http://api.openweathermap.org/data/2.5/forecast?q=${city},uk&mode=json&appid=${apiKey}`
    fetch(endPoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      //body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.text()
      })
      .then(function (result) {
        try {
          var parsedJson = JSON.parse(result)
        } catch (e) {
          throw new Error(e.message)
        }

        resolve(parsedJson)
      })
      .catch(function (err) {
        console.log(err)
        reject(err)
      })
  })

}
