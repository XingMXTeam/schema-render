// import { observer } from 'mobx-react';
import React from 'react';

export default function EventsHoc(props) {
  const { Component, onChange: onCustomChange, layoutStore } = props;

  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react/prop-types
    const { itemData = {} } = props;
    // eslint-disable-next-line react/prop-types
    const { value: oldValue } = itemData;

    const onChange = (newValue) => {
      onCustomChange?.(newValue);
      if (newValue === oldValue) return;
      layoutStore.changeElementData({ value: newValue }, itemData);
    };

    return <Component onChange={onChange} {...itemData} />;
  };
}
