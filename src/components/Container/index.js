import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Container({ layoutStore, schema, componentsMap }) {
  const [children, setChildren] = useState();

  useEffect(() => {
    const elements = layoutStore.renderComponent(layoutStore, schema, componentsMap);
    setChildren(elements);
  }, []);

  if (!children) return null;
  console.log('children', children);
  return <>{children}</>;
}

Container.propTypes = {
  layoutStore: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  componentsMap: PropTypes.object.isRequired,
};

export default Container;
