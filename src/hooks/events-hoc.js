import { observer } from 'mobx-react';
import React from 'react';

export default function EventsHoc(props) {
  const { Component, onChange: onCustomChange, layoutStore } = props;

  return observer((props) => {
    const { itemData } = props;
    const { value: oldValue } = itemData;

    const onChange = (newValue) => {
      onCustomChange?.(newValue);
      if (newValue === oldValue) return;
      layoutStore.changeElementData({ value: newValue }, itemData);
    };

    return <Component onChange={onChange} {...props} />;
  });
}
