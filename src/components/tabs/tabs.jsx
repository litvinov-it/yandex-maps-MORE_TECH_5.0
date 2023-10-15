import { Tabs } from '@mantine/core';
import classes from './tabs.module.css'
import SheduleSVG from '../svg/shedule';

function MyTabs({person, juridical, IsPerson, IsJuridical}) {
    return (
      <Tabs color="teal" defaultValue="first"
        classNames={{
            tabLabel: classes.tabLabel,
            tab: classes.tab,
            list: classes.list,
        }}>
        <Tabs.List  grow justify="center"
        
        >
          {/* <p className={classes.subtitle}><SheduleSVG className={classes.shedule}/> Расписание: </p> */}
          <Tabs.Tab value="first" disabled={!IsPerson}>Физ.лица</Tabs.Tab>
          <Tabs.Tab value="second" color="blue" disabled={!IsJuridical}>Юр.лица</Tabs.Tab>
        </Tabs.List>
  
        <Tabs.Panel value="first" pt="xs">
          {person}
        </Tabs.Panel>
  
        <Tabs.Panel value="second" pt="xs">
          {juridical}
        </Tabs.Panel>
      </Tabs>
    );
  }

export default MyTabs;