import { Accordion } from '@mantine/core';

function MyAccordion({data}) {

    const items = data.map((item) => (
        <Accordion.Item key={item.title} value={item.title}>
          <Accordion.Control>{item.title}</Accordion.Control>
          <Accordion.Panel>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ));
    
      return (
        <Accordion variant="filled">
          {items}
        </Accordion>
      );
}

export default MyAccordion;