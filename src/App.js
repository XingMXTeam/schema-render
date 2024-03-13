import './App.css';
import MainPage from './components/MainPage';
import ComponentsMap from './components/ComponentsMap';
import layoutStore from './components/LayoutStore';
import React from 'react';

const schema = {
  modules: [
    {
      uiType: 'Input',
      value: '111',
      componentKey: 'uniqueId',
    },
  ],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    layoutStore.setData(schema);
  }

  render() {
    return (
      <div className="App">
        <MainPage layoutStore={layoutStore} schema={layoutStore.schema} componentsMap={ComponentsMap} />
      </div>
    );
  }
}

export default App;
