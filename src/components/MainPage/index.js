import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

// const Container = observer(({ layoutStore, elements, componentsMap }) => {
//   const [children, setChildren] = useState();
//
//   useEffect(() => {
//     setChildren());
//   }, []);
//
//   if (!children) return null;
//   return <>{children}</>;
// });
//

@observer
class Container extends React.Component {
  constructor(props) {
    super(props);
    const { layoutStore, elements } = props;
    this.children = elements.map((module) => layoutStore.renderComponent(layoutStore, module));
  }

  render() {
    return <>{this.children}</>;
  }
}

Container.propTypes = {
  layoutStore: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  componentsMap: PropTypes.object.isRequired,
};

const MainPage = observer(({ layoutStore, schema }) => {
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
