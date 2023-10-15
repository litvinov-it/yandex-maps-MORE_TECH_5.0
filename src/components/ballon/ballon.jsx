import { Placemark } from "react-yandex-maps";

function Ballon({states, department, currentLoad}) {
    const clickBallon = () => {
        states.setWhatIsOpen('department')
        states.setOpenDepartment(department)
        states.setIsSnapDepartmentOpen(true)  
        states.setIsOpenModal(false)
    }

    return (
        <Placemark 
        onClick={clickBallon} 
        geometry={[department.loc.coordinates[1], department.loc.coordinates[0]]} 
        options={{
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: require(`../../markers/current_load_${currentLoad}.svg`),
            iconImageSize: [30, 30],
            iconImageOffset: [-16,-16]
          }} 
        />
    );
}

export default Ballon;