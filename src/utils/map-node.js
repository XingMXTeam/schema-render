import { observable } from 'mobx';

class MapNode {
  @observable root;
  @observable nodeMap;

  constructor() {
    // 默认节点
    this.root = observable({
      success: true,
      status: 200,
      modules: [],
    });
    this.nodeMap = observable.map([['root', this.root]]); //hash+树
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
    console.log('this.root1', this.root);
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
      const temp = this.updateNode(newData, startComponentKey);
      console.log('this.root22', this.root);
      return temp;
    }
    const res = this.mergeNodeRecursive(newData, startComponentKey);
    return res;
  }

  mergeNodeRecursive(newData, startComponentKey, depth = 0) {
    let currData = this.nodeMap.get(newData.componentKey);
    const isComponentUpdate =
      newData.componentKey === startComponentKey || (currData && currData.componentKey === newData.componentKey);
    // 节点不存在，创建节点
    if (!currData) {
      currData = this.nodeMap.set(newData.componentKey, {}).get(newData.componentKey);
      this.mergeNodeProps(newData, currData, startComponentKey, depth);
    }
    // 更新节点
    else if (isComponentUpdate) {
      currData = this.mergeNodeProps(newData, currData, startComponentKey, depth);
    }
    return currData;
  }

  mergeNodeProps(newData, currData, startComponentKey, depth) {
    Object.entries(newData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // modules情况
        currData[key] =
          key == 'modules'
            ? value.map((itemData) => this.mergeNodeRecursive(itemData, startComponentKey, depth + 1))
            : value;
      } else {
        currData[key] = value;
      }
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
    const res = existedNode ? Object.assign(existedNode, { ...newData, componentKey }) : null;
    return res;
  }

  /**
   * 树结构的入口
   * @param schema
   * @return {{}|*|{componentKey}}
   */
  merge(schema) {
    return this.mergeNode({ ...schema, componentKey: 'root' }, 'root', true);
  }
}

export default MapNode;
