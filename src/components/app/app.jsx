import classes from './app.module.css'
import { useEffect, useState } from 'react';
import { Placemark } from 'react-yandex-maps'
import YandexMap from '../map/map';
import Ballon from '../ballon/ballon';
import Navigation from '../navigation/navigation';
import markerUserSVG from '../../marker_user.svg'
import Header from '../header/header';
import { CreateRouteRequest, GetDepartments } from '../../utils/requests';

import Sheet from 'react-modal-sheet';

function App() {
  
  //? Состояния всего приложения
  const latitude = 55.02807161634693
  const longitude = 82.91578441397978
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
  const [lockBtn, setLockBtn] = useState('')

  const states = {
    lockBtn, setLockBtn,
    latitude, longitude,
    time, setTime,
    createRoute,
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
    states.setActualDepartments( GetDepartments() )
  }, [])
  //?

  // Create route \/
  function createRoute(type, department) {
    states.setRoute( CreateRouteRequest(type, department) )
    states.setIsOpenModal(false)
  }
  // Create route /\
  
  // User marker
  const marker =  <Placemark 
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: markerUserSVG,
                      iconImageSize: [80, 80],
                      iconImageOffset: [-38, -38]
                    }} 
                    geometry={[states.latitude, states.longitude]} 
                  />;

                  function closeModal() {
                    if (states.isSnapDepartmentOpen) {
                      states.setSnapModal(0)
                    } else {
                      states.setSnapModal(2)
                    }
                    states.setIsOpenModal(true)
                    states.setIsSnapDepartmentOpen(false)
                 }
  
  return (
    <>

      <div className={classes.pc_Not} onClick={(e) => console.log(e.target.style.display = 'none')}>
        <div>
          <div className={classes.flex}>
            <div>Извините, но этот проек был реализован только под мобильное разрешение.</div>
            <div>Советую смотреть его в DevTools под "IPhoneSE".</div>
          </div>
          <div className={classes.mini}>Чтобы убрать это оповещение нажмите куда угодно</div>
        </div>
      </div>
    
      <main className={classes.main}>

        <Header />

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

        <Navigation createRoute={createRoute} states={states} />
      </main>

    </>
  );
}

export default App;
