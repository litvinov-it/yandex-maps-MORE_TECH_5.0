import NaturalPersonSVG from '../components/svg/naturalPerson'
import UridicalPersonSVG from '../components/svg/uridicalPerson'
import ProvelegeSVG from '../components/svg/privilege'
import PrimeSVG from '../components/svg/prime'

const client_data = [
    { label: 'Физические лица', value: 'natural_person' },
    { label: 'Юридические лица', value: 'uridical_person' },
    { label: 'Привилегия', value: 'privilege' },
    { label: 'Прайм', value: 'prime' },
  ]
  
const client_value_label = {
    'natural_person': 'Физические лица',
    'uridical_person': 'Юридические лица',
    'privilege': 'Привилегия',
    'prime': "Прайм"
}

const client_value_icon = {
    'natural_person': className => <NaturalPersonSVG className={className} />,
    'uridical_person': className => <UridicalPersonSVG className={className} />,
    'privilege': className => <ProvelegeSVG className={className} />,
    'prime': className => <PrimeSVG className={className} />,
}

export { client_data, client_value_label, client_value_icon }