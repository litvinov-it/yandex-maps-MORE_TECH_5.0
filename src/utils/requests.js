import GetHourMinutes from "./getHourMinutes";

// Получает город по координатам
const GetCityByPosition = async (position) => {
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=3c5c7df6-cd58-4459-a5d7-f551e1489928&geocode=${position['longitude']},${position['latitude']}&skip=0&results=1&kind=locality&format=json`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    });
    const result = await response.json();

    if (result['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['AddressDetails']['Country']['AdministrativeArea']['SubAdministrativeArea']) {
        return result['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['AddressDetails']['Country']['AdministrativeArea']['SubAdministrativeArea']['Locality']['LocalityName']
    } else {
        return result['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['AddressDetails']['Country']['AdministrativeArea']['Locality']['LocalityName']
    }
}

// Получает список филиалов 
const GetDepartments = async (city, lat, lon) => {
    const current_time = GetHourMinutes();

    const response = await fetch(`/api/departments/city`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {current_time, city, lon, lat} )
    });
    const result = await response.json();

    return result
}

const CreateRouteRequest = async (type, from, to) => {
    const time = GetHourMinutes();

    const response = await fetch(`https://api.routing.yandex.net/v2/route?waypoints=${from[0]},${from[1]}|${to[0]},${to[1]}&mode=${type}&apikey=ccebb76e-0f67-4693-ba3a-74497e1c8de1`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });

    let result = await response.json();

    let routes = []

    result['route']['legs'][0]['steps'].map((step) => {
        return step['polyline']['points'].map(point => routes.push(point))
    })

    return routes

    
}

export { GetCityByPosition, CreateRouteRequest, GetDepartments }