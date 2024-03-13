import { action } from 'mobx';
import MapNode from '../../utils/map-node';
// import { v4 } from 'uuid';
import EventsHoc from '../../hooks/events-hoc';
import componentsMap from '../ComponentsMap';
import React from 'react';

class LayoutStore {
  schemaNode;

  constructor() {
    this.schemaNode = new MapNode();
  }

  renderComponent(itemData) {
    const getTargetComponentBySchema = () => {
      const BaseComponent = componentsMap[itemData.uiType].default ?? componentsMap[itemData.uiType];
      return BaseComponent ? EventsHoc(BaseComponent) : null;
    };

    const TargetComponent = getTargetComponentBySchema(componentsMap);
    console.log('itemData', itemData);
    return <TargetComponent itemData={itemData} layoutStore={this} />;
  }

  get schema() {
    return this.schemaNode.root;
  }

  @action setData(schema) {
    this.schemaNode.reset(schema);
  }

  @action changeElementData(newData, itemData) {
    newData.componentKey = itemData.componentKey;
    this.schemaNode.mergeNode(newData, newData.componentKey, false);
  }
}

const layoutStore = new LayoutStore();
export default layoutStore;
