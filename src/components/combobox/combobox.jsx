import { useState } from 'react';
import classes from './combobox.module.css'
import { InputBase, Combobox, useCombobox } from '@mantine/core';
import { client_data, client_value_icon, client_value_label } from '../../utils/clientData';

function MyCombobox({active, setActive}) {
  const [value, setValue] = useState(active);
  const [label, setLabel] = useState('Физические лица');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    },
  });

  const options = client_data.map((item) => {
    return (
      <Combobox.Option size="lg" className={classes.option} value={item['value']} key={item['value']} active={item === value}>
          {client_value_icon[item['value']](classes.icon)} <span className={classes.optionText}>{item['label']}</span>
      </Combobox.Option>
    )
  });

  return (
    <Combobox
      withinPortal={false}
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setValue(val);
        setLabel(client_value_label[val])
        setActive(val)
        combobox.updateSelectedOptionIndex('active');
        combobox.toggleDropdown()
      }}
    >
      <Combobox.Target size="lg" targetType="div">
        <InputBase
          className={classes.input}
          component="div"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {client_value_icon[value](classes.icon)} {label}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MyCombobox;