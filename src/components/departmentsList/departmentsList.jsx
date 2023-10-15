import classes from './departmentsList.module.css'
import { Input } from '@mantine/core';
import SettingsSVG from '../svg/settings'

function DepartmentsList({states}) {
    const sortDepartments = () => {
        if (states.actualDepartments) {
            return states.actualDepartments.sort((dep1, dep2) => dep1['radius_dist'] - dep2['radius_dist'])
        } else {
            return []
        }
    }

    return (
        <>
            <div className={classes.header}>

                {/* Search */}
                <Input radius="md" size='md'
                classNames={{
                    input: classes.input,
                    wrapper: classes.inputWrapper
                }} 
                placeholder="Адрес" 
                />

                {/* Filters btn */}
                <div className={classes.iconWrapper} onClick={() => {states.setWhatIsOpen('filters'); states.setIsSnapDepartmentOpen(true); states.setIsOpenModal(false)}}>
                    <SettingsSVG className={classes.icon} />
                </div>

            </div>

            <div className={classes.content}>

                {/* List departments */}
                {states.actualDepartments ?
                    (
                        sortDepartments().map(department => {
                            let address = department['address'].split(',')
                            address.shift()
                            address = address.join(', ')

                            return (
                                <div className={classes.department} key={department.id} data-index={department.id}
                                onClick={(e) => {
                                    states.setWhatIsOpen('department')
                                    states.setOpenDepartment(states.actualDepartments.find(department => department.id == e.target.dataset.index))
                                }}
                                >

                                    <div data-index={department['id']}>
                                        <img data-index={department['id']} className={classes.currentLoad} src={require(`../../markers/current_load_${department['current_load']}.svg`)} />
                                    </div>
                                    
                                    <div data-index={department['id']}>
                                        <div className={classes.radiusDist}>{department['radius_dist'] > 1 ? `${department['radius_dist'].toFixed(1)} км` : `${department['radius_dist'].toFixed(1) * 1000} м`}</div>
                                        <p data-index={department['id']} className={classes.address}>{address}</p>
                                        <p data-index={department['id']} className={classes.name}>{department["shortName"]}</p>
                                    </div>

                                </div>
                            )
                        }
                    )
                    ) : ''
                }

            </div>
        </>
    );
}

export default DepartmentsList;