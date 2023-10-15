import NaturalPersonSVG from '../components/svg/naturalPerson'
import UridicalPersonSVG from '../components/svg/uridicalPerson'
import ProvelegeSVG from '../components/svg/privilege'
import PrimeSVG from '../components/svg/prime'

const client_data = [
    { label: 'Физические лица', value: 'person' },
    { label: 'Юридические лица', value: 'juridical' },
    { label: 'Привилегия', value: 'vipOffice' },
    { label: 'Прайм', value: 'Prime' },
  ]
  
const client_value_label = {
    'person': 'Физические лица',
    'juridical': 'Юридические лица',
    'vipOffice': 'Привилегия',
    'Prime': "Прайм"
}

const client_value_icon = {
    'person': className => <NaturalPersonSVG className={className} />,
    'juridical': className => <UridicalPersonSVG className={className} />,
    'vipOffice': className => <ProvelegeSVG className={className} />,
    'Prime': className => <PrimeSVG className={className} />,
}

export { client_data, client_value_label, client_value_icon }