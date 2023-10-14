import classes from './app.module.css'
import { useEffect, useState } from 'react';

import { Placemark } from 'react-yandex-maps'
import YandexMap from '../map/map';
import Ballon from '../ballon/ballon';
import Navigation from '../navigation/navigation';
import usePosition from '../../utils/usePosition';
import markerUserSVG from '../../marker_user.svg'
import { CreateRouteRequest, GetDepartments, GetCityByPosition } from '../../utils/requests';

function App() {
  
  //? Состояния всего приложения
  // const { latitude, longitude, error } = usePosition(); //? Определяет местоположение пользователя
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [whatIsOpen, setWhatIsOpen] = useState('list')
  const [OpenDepartment, setOpenDepartment] = useState(-1)
  const [route, setRoute] = useState([])
  const [time, setTime] = useState('')
  const [snapModal, setSnapModal] = useState(2)
  const [isSnapDepartmentOpen, setIsSnapDepartmentOpen] = useState(false)
  const [zoomMap, setZoomMap] = useState(12)
  const [actualDepartments, setActualDepartments] = useState('')

  const states = {
    isOpenModal: isOpenModal,
    setIsOpenModal: setIsOpenModal,

    whatIsOpen: whatIsOpen,
    setWhatIsOpen: setWhatIsOpen,
    
    OpenDepartment: OpenDepartment,
    setOpenDepartment: setOpenDepartment,

    time: time,
    setTime: setTime,

    snapModal: snapModal,
    setSnapModal: setSnapModal,

    isSnapDepartmentOpen: isSnapDepartmentOpen,
    setIsSnapDepartmentOpen: setIsSnapDepartmentOpen,

    latitude: 55.74835087535802,
    longitude: 37.625566772460935,

    createRoute: createRoute,

    zoomMap: zoomMap,
    setZoomMap: setZoomMap,

    actualDepartments: actualDepartments,
    setActualDepartments: setActualDepartments,
  }
  //?

  //? Первичная подгрузка филиалов
  useEffect(() => {
    const loadDepartments = async () => {
      const city = await GetCityByPosition({latitude: states.latitude, longitude: states.longitude}).then(data => data)
      // const city = 'Москва' //! DEV MODE
      const departments = await GetDepartments(city, states.latitude, states.longitude).then(data => data)
      states.setActualDepartments(departments)
    }
    loadDepartments()
  }, [])
  //?
  

  // Submit form \/
  function submitFilters(values) {
    //? Request
    console.log(values)
  }
  // Submit form /\

  
  // const nskApart = [11, 15, 23, 24, 42, 44, 70, 72,  74, 77, 84, 86, 89, 96] //! Dev mode
  const error = '' //! Dev mode

  // Create route \/
  function createRoute(type, coord) {

    CreateRouteRequest(type, [states.latitude, states.longitude], coord)
    .then(route => states.setRoute(route))

    states.setIsOpenModal(false)
  }
  // Create route /\
  
  const marker =  <Placemark  
                    // options={{
                    //   iconLayout: 'islands#dotIcon',
                    // }} 
                    options={{
                      iconLayout: 'default#image',
                      // Своё изображение иконки метки.
                      iconImageHref: markerUserSVG,
                      iconImageSize: [80, 80],
                      iconImageOffset: [-38, -38]
                    }} 
                    geometry={[states.latitude, states.longitude]} 
                  />;
  
  return (
    <main className={classes.main}>
      {error ? error : (
        <YandexMap
        zoom={states.zoomMap}
        route={states.route}
        latitude={states.latitude}
        longitude={states.longitude}
        userPosition={marker}
        >
          {states.actualDepartments ?
            states.actualDepartments.map(department => {
              return <Ballon department={department} states={states} key={department['id']} />
            }): ''}
        </YandexMap>
        )}

        <Navigation submitFilters={submitFilters} createRoute={createRoute} states={states} />
    </main>
  );
}

export default App;
