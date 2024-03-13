import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';

@observer
class EventsHoc extends React.Component {
  render() {
    const { BaseComponent, itemData, onChange: onCustomChange, layoutStore } = this.props;
    const { value: oldValue } = itemData;
    console.log('layoutStore', layoutStore);
    return (
      <BaseComponent
        onChange={(newValue) => {
          onCustomChange?.(newValue);
          if (newValue === oldValue) return;
          layoutStore.changeElementData({ value: newValue }, itemData);
        }}
        {...itemData}
      />
    );
  }
}

EventsHoc.propTypes = {
  BaseComponent: PropTypes.func.isRequired,
  layoutStore: PropTypes.object.isRequired,
  itemData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isOpt,
};

const wrapEvent = (BaseComponent) => {
  function InnerComponent(props) {
    return <EventsHoc {...props} BaseComponent={BaseComponent} />;
  }

  return InnerComponent;
};

export default wrapEvent;
