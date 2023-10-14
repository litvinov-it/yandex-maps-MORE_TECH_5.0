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

    const response = await fetch(`http://localhost:8000/api/departments/city`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {current_time, city, lon, lat} )
    });
    const result = await response.json();

    const departmentsTest = [
        {
            "id": 29000098,
            "shortName": "ДО «Обручевский» Филиала № 7701 Банка ВТБ (ПАО)",
            "address": "г. Москва, Ленинский пр-т, д. 111, корп. 1",
            "city": "Москва",
            "special": {
                "vipZone": 0,
                "vipOffice": 1,
                "ramp": 1,
                "person": 1,
                "juridical": 0,
                "Prime": 0
            },
            "loc": {
                "type": "Point",
                "coordinates": [
                    37.509352,
                    55.661333
                ]
            },
            "scheduleAllWeekFl": {
                "mon": {
                    "start": "09:00",
                    "stop": "20:00"
                },
                "tue": {
                    "start": "09:00",
                    "stop": "20:00"
                },
                "wed": {
                    "start": "09:00",
                    "stop": "20:00"
                },
                "thu": {
                    "start": "09:00",
                    "stop": "20:00"
                },
                "fri": {
                    "start": "09:00",
                    "stop": "20:00"
                },
                "sat": {
                    "start": "10:00",
                    "stop": "17:00"
                },
                "sun": false
            },
            "scheduleAllWeekJurl": {
                "mon": false,
                "tue": false,
                "wed": false,
                "thu": false,
                "fri": false,
                "sat": false,
                "sun": false
            }
        },
        {
            "id": 29000342,
            "shortName": "ДО «Щука» Филиала № 7701 Банка ВТБ (ПАО)",
            "address": "г. Москва, ул. Щукинская, д. 42",
            "city": "Москва",
            "special": {
                "vipZone": 0,
                "vipOffice": 0,
                "ramp": 0,
                "person": 1,
                "juridical": 0,
                "Prime": 0
            },
            "loc": {
                "type": "Point",
                "coordinates": [
                    37.464571,
                    55.809474
                ]
            },
            "scheduleAllWeekFl": {
                "mon": {
                    "start": "10:00",
                    "stop": "21:00"
                },
                "tue": {
                    "start": "10:00",
                    "stop": "21:00"
                },
                "wed": {
                    "start": "10:00",
                    "stop": "21:00"
                },
                "thu": {
                    "start": "10:00",
                    "stop": "21:00"
                },
                "fri": {
                    "start": "10:00",
                    "stop": "21:00"
                },
                "sat": false,
                "sun": false
            },
            "scheduleAllWeekJurl": {
                "mon": false,
                "tue": false,
                "wed": false,
                "thu": false,
                "fri": false,
                "sat": false,
                "sun": false
            }
        },
    ]

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