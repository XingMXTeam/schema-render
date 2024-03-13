import EventsHoc from '../../hooks/events-hoc';
import generateComponentKey from '../../utils/generate-component-key';
import React from 'react';

const getComponentBySchema = (layoutStore, schema, componentsMap) => {
  const Component = componentsMap[schema.uiType].default ?? componentsMap[schema.uiType];
  if (Component) {
    return EventsHoc({ Component, layoutStore });
  }
  return null;
};

const RenderCore = (layoutStore, schema, componentsMap) => {
  schema = generateComponentKey(schema);
  const Component = getComponentBySchema(layoutStore, schema, componentsMap);
  return <Component itemData={schema}></Component>;
};

export default RenderCore;
