import MyAccordion from "../accordion/accordion";
import classes from './weekShedule.module.css'
import dayWeek from "../../utils/dayWeek";
import getDayOfWeek from '../../utils/getDayOfWeek'
import { useState } from "react";

function WeekShedule({department, clientType}) {

    let type, title, typeName;

    if (clientType == 'natural_person') {
        type = 'scheduleAllWeekFl'
        typeName = 'Для физических лиц'
    } else if (clientType == 'uridical_person') {
        type = 'scheduleAllWeekJurl'
        typeName = 'Для юридических лиц'
    } else {
        return (`clientType is not defined  ${clientType}`)
    }

    const day = getDayOfWeek()

    if (department[type][day]) {
        title = `Сегодня с ${department[type][day]['start']} до ${department[type][day]['stop']}`
    } else {
        title = 'Сегодня закрыто'
    }

    const content =  <div className={classes.weekList}>
                        {
                            Object.keys(department[type]).map(key => {
                                if (department[type][key]) {
                                    return (
                                        <div key={key} className={`${classes.weekDay} ${day == key ? classes.active : ''}`}>
                                            <span>{dayWeek[key]}</span> <span>{department[type][key]['start']}-{department[type][key]['stop']}</span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={key} className={classes.weekDay}>
                                            <span>{dayWeek[key]}</span> <span>Закрыто</span>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>

    return (
        <>
            <MyAccordion 
            data={[{
                title: title,
                content: content,
            }]} 
            />
        </>
    );
}

export default WeekShedule;