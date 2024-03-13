import { observable } from 'mobx';

class MapNode {
  @observable root;
  @observable nodeMap;

  constructor() {
    this.root = {};
    this.nodeMap = new Map([['root', this.root]]);
  }

  /**
   * 重新构建整个Node
   * @param schema
   */
  reset(schema) {
    this.nodeMap.forEach((value, key) => {
      this.nodeMap.delete(key);
    });
    this.nodeMap.set('root', this.root);
    this.merge(schema);
  }

  /**
   * 从某个节点开始合并
   * @param newData
   * @param startComponentKey
   * @param isRecursive
   * @return {*|{}|{componentKey}|null}
   */
  mergeNode(newData, startComponentKey, isRecursive) {
    if (!isRecursive) {
      return this.updateNode(newData, startComponentKey);
    }
    return this.mergeNodeRecursive(newData, startComponentKey);
  }

  mergeNodeRecursive(newData, startComponentKey) {
    let currData = this.nodeMap.get(startComponentKey);
    if (!currData) {
      currData = this.nodeMap.set(newData.componentKey, {}).get(newData.componentKey);
      this.mergeNodeProps(newData, currData);
    }
    return currData;
  }

  mergeNodeProps(newData, currData) {
    Object.entries(newData).forEach((key, value) => {
      currData[key] = value;
    });
    return currData;
  }

  /**
   * 合并单个Node
   * @param newData
   * @param componentKey
   * @return {{}|*|{componentKey}|null}
   */
  updateNode(newData, componentKey) {
    const existedNode = this.nodeMap.get(componentKey);
    return existedNode ? Object.assign(existedNode, { ...newData, componentKey }) : null;
  }

  /**
   * 合并整个Node
   * @param schema
   * @return {{}|*|{componentKey}}
   */
  merge(schema) {
    return this.mergeNode({ ...schema, componentKey: 'root' }, 'root', true);
  }
}

export default MapNode;
