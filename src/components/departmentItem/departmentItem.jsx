import CarSVG from '../svg/car';
import WalkSVG from '../svg/walk';
import classes from './departmentItem.module.css'
import { CloseButton, VisuallyHidden } from '@mantine/core';
import WeekShedule from '../weekShedule/weekShedule';
import MyTabs from '../tabs/tabs';
import CalendarSVG from '../svg/calendar';
import { useState } from 'react';

function DepartmentItem({states, createRoute}) {
    const department = states.OpenDepartment
    const [lockBtn, setLockBtn] = useState('')

    return (
        <>
            <div className={classes.header}>

                {/* Department name */}
                <h2 className={classes.title}>{department.shortName}</h2>

                {/* to List btn */}
                <CloseButton onClick={() => states.setWhatIsOpen('list')}>
                    <VisuallyHidden>Close modal</VisuallyHidden>
                </CloseButton>

            </div>

            <div className={classes.content}>

                {/* Address */}
                <p className={classes.address}>{department.address}</p>

                {/* Btns */}
                <div className={classes.btns}>

                    {/* Walk */}
                    <div className={`${classes.btn} ${lockBtn === 'walk' ? classes.btnBlock : ''}`} onClick={() => {
                        if (lockBtn == 'walk') {
                            return ''
                        } else {
                            states.setZoomMap(16)
                            setLockBtn('walk')
                            createRoute('walking', [department['loc']['coordinates'][1], department['loc']['coordinates'][0]], [states.latitude, states.longitude])
                        }
                    }}>
                        <WalkSVG className={`${classes.icon} ${lockBtn === 'walk' ? classes.contentBlock : ''}`} />
                        <div className={`${classes.iconDescWrapper} ${lockBtn === 'walk' ? classes.contentBlock : ''}`}>
                            <p className={classes.iconDesc}>Пеший</p>
                            <p className={classes.iconDesc}>маршрут</p>
                        </div>
                    </div>

                    {/* Car */}
                    <div className={classes.btnWrapper}>
                        <div className={`${classes.btn} ${lockBtn === 'driving' ? classes.btnBlock : ''}`} onClick={() => {
                            if (lockBtn == 'driving') {
                                return ''
                            } else {
                                setLockBtn('driving')
                                states.setZoomMap(16)
                                createRoute('driving', [department['loc']['coordinates'][1], department['loc']['coordinates'][0]], [states.latitude, states.longitude])
                            }
                        }}>
                            <CarSVG className={`${classes.icon} ${lockBtn === 'driving' ? classes.contentBlock : ''}`} />
                            <div className={`${classes.iconDescWrapper} ${lockBtn === 'driving' ? classes.contentBlock : ''}`}>
                                <p className={`${classes.iconDesc} ${classes.carDesc}`}>Автомобильный</p>
                                <p className={classes.iconDesc}>маршрут</p>
                            </div>
                        </div>
                    </div>

                </div>

                <p onClick={() => states.setWhatIsOpen('shedule')} className={classes.sheduleAc}><CalendarSVG className={classes.calendar}/> Записаться в банкомат</p>
                
                
                <MyTabs 
                person={
                    (
                        <div className={classes.item}>
                            { department['special']['person'] 
                                ? <WeekShedule department={department} clientType={'natural_person'} />
                                : <p className={classes.item_title}>Физические лица не обслуживает</p>
                            }
                        </div>
                    )
                }
                IsPerson={department['special']['person']}
                juridical={
                    (
                        <div className={classes.item}>
                            { department['special']['juridical'] 
                                ? <WeekShedule department={department} clientType={'uridical_person'} />
                                : <p className={classes.item_title}>Юридические лица не обслуживает</p>
                            }
                        </div>
                    )
                }
                IsJuridical={department['special']['person']}
                />
            </div>
        </>
    );
}

export default DepartmentItem;