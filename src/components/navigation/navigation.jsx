import Sheet from 'react-modal-sheet';
import Filters from '../filters/filters';
import classes from './navigation.module.css'
import DepartmentsList from '../departmentsList/departmentsList';
import DepartmentItem from '../departmentItem/departmentItem';
import SheduleContent from '../sheduleContent/sheduleContent';

function Navigation({states, createRoute, submitFilters}) {
    const content = () => {
      if (states.whatIsOpen === 'filters') {
        return <Filters submitFilters={submitFilters} states={states} />
      } 
      if (states.whatIsOpen === 'list') {
        return <DepartmentsList states={states} />
      }
      if (states.whatIsOpen === 'department') {
        return <DepartmentItem createRoute={createRoute} states={states} />
      }
      if (states.whatIsOpen === 'shedule') {
        return <SheduleContent states={states} />
      }
      return 'states.WhatIsOpen имеет некорректное значение ' + states.whatIsOpen
     }

     function closeModal() {
      // console.log(states.isSnapDepartmentOpen)
        if (states.isSnapDepartmentOpen) {
          states.setSnapModal(0)
        } else {
          states.setSnapModal(2)
        }
        states.setIsOpenModal(true)
        states.setIsSnapDepartmentOpen(false)
     }

    return (
        <Sheet isOpen={states.isOpenModal} onClose={() => states.setIsOpenModal(false)}
        snapPoints={[600, 400, 130, 0]}
        initialSnap={states.snapModal}
        onSnap={snapIndex => snapIndex === 3 ? closeModal() : 0}
        >
          <Sheet.Container>
            <Sheet.Header>
              <div className={classes.header}>
                <div className={classes.line}></div>
              </div>
            </Sheet.Header>
            <Sheet.Content>
              {content()}
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
    );
}

export default Navigation;