import classes from './filters.module.css'
import serviceList from '../../utils/serviceList'
import MyCombobox from '../combobox/combobox'

import { CloseButton, VisuallyHidden, Switch, Button, SegmentedControl } from '@mantine/core';
import { useForm } from '@mantine/form';

function Filters({states, submitFilters}) {

    // Инициализация формы и данных
    const form = useForm({
        initialValues: {
            openNow: true,
            client: 'person',
            service: 'A',
        },
    });
    
    // Генерирует имеющиеся услуги
    const serviceContent = () => {
        const activeServiceList = serviceList[form.getInputProps('client').value] // Cписок услуг для активного типа клиента

        if (Object.keys(activeServiceList).length === 0) return // Если список услуг пустой - не выводить услуги

        return (
            // Выводим список услуг
            <SegmentedControl orientation="vertical" size="md"
            // color="blue"
            classNames={{
                label: classes.label,
                root: classes.segmentedControlRoot,
                control: classes.control,
                indicator: classes.indicator
            }}
            {...form.getInputProps('service')}
            data={
                // Возвращаем список услуг в другом формате
                Object.keys(activeServiceList).map(nameService => {
                    return {label: activeServiceList[nameService], value: nameService}
                })
            }
            onChange={(value) => form.setFieldValue('service', value)}
            />
        )
    }

    return (
        <>
            <div className={classes.header}>
                <h2 className={classes.title}>Найти отделения</h2>
                <CloseButton onClick={() => {states.setWhatIsOpen('list'); states.loadDepartments();}}>
                    <VisuallyHidden>Close modal</VisuallyHidden>
                </CloseButton>
            </div>

            <div className={classes.content}>
                <form className={classes.form} onSubmit={form.onSubmit(values => {submitFilters(values) })}>

                    <Switch size="md"
                    defaultChecked
                    onChange={(e) => form.setFieldValue('openNow', e.target.checked)}
                    label="Открыто сейчас"
                    /> 

                    <MyCombobox
                    active={form.getInputProps('client').value} 
                    setActive={(val) => {
                        form.setFieldValue('client', val)
                        form.setFieldValue('service', Object.keys(serviceList[val])[0])
                    }}
                    />

                    {serviceContent()}

                    <Button type="submit" size="md" radius="md">Найти</Button>
                </form>
            </div>
        </>
    );
}

export default Filters;