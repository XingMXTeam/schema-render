import React, { useEffect, useState } from 'react';
import { PropTypes } from 'mobx-react';

function Container({ layoutStore, schema, componentsMap }) {
  const [children, setChildren] = useState();

  useEffect(() => {
    const elements = layoutStore.renderComponent(layoutStore, schema, componentsMap);
    setChildren(elements);
  }, []);

  return <>{children}</>;
}

Container.propTypes = {
  layoutStore: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  componentsMap: PropTypes.object.isRequired,
};

export default Container;
