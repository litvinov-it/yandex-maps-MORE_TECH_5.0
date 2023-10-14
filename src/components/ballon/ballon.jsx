import { Placemark } from "react-yandex-maps";
import marker_min_SVG from '../../marker_min.svg'
import marker_middle_SVG from '../../marker_middle.svg'
import marker_max_SVG from '../../marker_max.svg'

function Ballon({states, department}) {
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
        // properties={{ iconCaption: name }}
        options={{
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: marker_min_SVG,
            iconImageSize: [30, 30],
            iconImageOffset: [-16,-16]
          }} 
        />
    );
}

export default Ballon;