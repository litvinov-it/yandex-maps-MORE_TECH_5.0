import classes from './departmentsList.module.css'
// import departments from '../../utils/departments';

import { Input, ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

import SettingsSVG from '../svg/settings'

function DepartmentsList({states}) {

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
                <div className={classes.iconWrapper} onClick={() => states.setWhatIsOpen('filters')}>
                    <SettingsSVG className={classes.icon} />
                </div>

            </div>

            <div className={classes.content}>

                {/* List departments */}
                {states.actualDepartments ?
                    (
                        states.actualDepartments.map(department => {
                            return (
                                <div className={classes.department} key={department.id} data-index={department.id}
                                onClick={(e) => {
                                    states.setWhatIsOpen('department')
                                    states.setOpenDepartment(states.actualDepartments.find(department => department.id == e.target.dataset.index))
                                }}
                                >

                                    <div>
                                        <img className={classes.currentLoad} src={require(`../../markers/current_load_${department['current_load']}.svg`)} />
                                        <div className={classes.radiusDist}>{department['radius_dist'].toFixed(1)} км</div>
                                    </div>
                                    
                                    <div>
                                        <p data-index={department['id']} className={classes.address}>{department["address"]}</p>
                                        <p data-index={department['id']} className={classes.name}>{department["shortName"]}</p>
                                    </div>

                                </div>
                                // <div key={department.id} data-index={department.id} className={classes.item} onClick={(e) => {
                                //     states.setWhatIsOpen('department')
                                //     states.setOpenDepartment(states.actualDepartments.find(department => department.id == e.target.dataset.index))
                                // }}>
                                //     <p data-index={department['id']} className={classes.address}>{department["address"]}</p>
                                //     <p data-index={department['id']} className={classes.name}>{department["shortName"]}</p>
                                // </div>
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