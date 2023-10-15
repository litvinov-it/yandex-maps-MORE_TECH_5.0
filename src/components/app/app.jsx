import classes from './app.module.css'
import { useEffect, useState } from 'react';
import { Placemark } from 'react-yandex-maps'
import YandexMap from '../map/map';
import Ballon from '../ballon/ballon';
import Navigation from '../navigation/navigation';
import usePosition from '../../utils/usePosition';
import markerUserSVG from '../../marker_user.svg'
import Header from '../header/header';
import { CreateRouteRequest, GetDepartments, GetDepartmentsFilters } from '../../utils/requests';

function App() {

  const loadDepartments = async () => {
    // const city = await GetCityByPosition({latitude: states.latitude, longitude: states.longitude}).then(data => data)
    const city = 'Новосибирск' //! DEV MODE
    const departments = await GetDepartments(city, states.latitude, states.longitude).then(data => data)
    states.setActualDepartments(departments)
  }
  
  //? Состояния всего приложения
  // const { latitude, longitude, error } = usePosition(); //? Определяет местоположение пользователя

  const latitude = 55.027640197150824 //! DEV MODE
  const longitude = 82.9164817883284 //! DEV MODE
  const [isOpenModal, setIsOpenModal] = useState(true)
  const [whatIsOpen, setWhatIsOpen] = useState('list')
  const [OpenDepartment, setOpenDepartment] = useState(-1)
  const [route, setRoute] = useState([])
  const [time, setTime] = useState('')
  const [snapModal, setSnapModal] = useState(2)
  const [isSnapDepartmentOpen, setIsSnapDepartmentOpen] = useState(false)
  const [zoomMap, setZoomMap] = useState(14)
  const [actualDepartments, setActualDepartments] = useState('')
  const [centerMap, setCenterMap] = useState([latitude, longitude])

  const states = {
    latitude, longitude,
    time, setTime,
    createRoute,
    loadDepartments,
    route, setRoute,
    zoomMap, setZoomMap,
    centerMap, setCenterMap,
    isOpenModal, setIsOpenModal,
    whatIsOpen, setWhatIsOpen,
    OpenDepartment, setOpenDepartment,
    snapModal, setSnapModal,
    isSnapDepartmentOpen, setIsSnapDepartmentOpen,
    actualDepartments, setActualDepartments,
  }
  //?
  
  //? Первичная подгрузка филиалов
  useEffect(() => {
    loadDepartments()
  }, [])
  //?
  

  // Submit form \/
  async function submitFilters(values) {
    const city = 'Новосибирск'
    const latitude = states.latitude
    const longitude = states.longitude
    const openNow = values['openNow']
    const client = values['client']
    const service = values['service']

    const departments = await GetDepartmentsFilters(openNow, client, service, city, latitude, longitude, states)
    states.setActualDepartments(departments)
    states.setWhatIsOpen('list')
  }
  // Submit form /\

  const error = '' //! Dev mode

  // Create route \/
  function createRoute(type, coord) {

    CreateRouteRequest(type, [states.latitude, states.longitude], coord)
    .then(route => states.setRoute(route))

    states.setIsOpenModal(false)
  }
  // Create route /\
  
  const marker =  <Placemark 
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: markerUserSVG,
                      iconImageSize: [80, 80],
                      iconImageOffset: [-38, -38]
                    }} 
                    geometry={[states.latitude, states.longitude]} 
                  />;
  
  return (
    <main className={classes.main}>

      <Header />

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
            return <Ballon department={department} states={states} key={department['id']} currentLoad={department['current_load']} />
          }): ''}
      </YandexMap>
      )}

      <Navigation submitFilters={submitFilters} createRoute={createRoute} states={states} />
      
    </main>
  );
}

export default App;
