import { CloseButton, VisuallyHidden } from '@mantine/core';
import classes from './sheduleContent.module.css'

function SheduleContent({states}) {
    return (
        <>
            <div className={classes.header}>

                {/* Title */}
                <h2 className={classes.title}>Запись в банкомат</h2>

                {/* to List btn */}
                <CloseButton onClick={() => states.setWhatIsOpen('department')}>
                    <VisuallyHidden>Close modal</VisuallyHidden>
                </CloseButton>

            </div>
        </>
    );
}

export default SheduleContent;