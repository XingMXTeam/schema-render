import { observable } from 'mobx';

class MapNode {
  @observable root;
  @observable nodeMap;

  constructor() {
    // 默认节点
    this.root = {
      success: true,
      status: 200,
      modules: [],
    };
    this.nodeMap = new Map([['root', this.root]]); //hash+树
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
    return existedNode ? Object.assign(existedNode, { ...newData, componentKey }) : null;
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
