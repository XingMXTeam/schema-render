import RenderCore from '../RenderCore';
import { action } from 'mobx';
import MapNode from '../../utils/map-node';

class LayoutStore {
  schemaNode;

  constructor() {
    this.renderComponent = RenderCore;
    this.schemaNode = new MapNode();
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
