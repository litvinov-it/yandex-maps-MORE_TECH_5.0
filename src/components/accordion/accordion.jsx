import { Accordion } from '@mantine/core';
import classes from './accordion.module.css'

function MyAccordion({data}) {

    const items = data.map((item) => (
        <Accordion.Item key={item.title} value={item.title}>
          <Accordion.Control>{item.title}</Accordion.Control>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ));
    
      return (
        <Accordion classNames={{label: classes.label, root: classes.root, panel: classes.panel, control: classes.control, content: classes.content}} variant="filled">
          {items}
        </Accordion>
      );
}

export default MyAccordion;