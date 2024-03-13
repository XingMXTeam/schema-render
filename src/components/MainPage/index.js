import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

class Container extends React.Component {
  render() {
    const { layoutStore, elements } = this.props;
    console.log('elements', elements);
    if (!elements || elements.length <= 0) return null;
    return <>{elements.map(layoutStore.renderComponent.bind(layoutStore))}</>;
  }
}

Container.propTypes = {
  layoutStore: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
};

const MainPage = observer(({ layoutStore, schema }) => {
  console.log('schema', schema.modules);
  return (
    <div className="dada-main-page">
      <Container elements={schema.modules || []} layoutStore={layoutStore} />
    </div>
  );
});

MainPage.propTypes = {
  layoutStore: PropTypes.object,
  schema: PropTypes.object,
};

export default MainPage;
