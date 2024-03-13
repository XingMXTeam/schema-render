import './App.css';
import Container from './components/Container';
import ComponentsMap from './components/ComponentsMap';
import layoutStore from './components/LayoutStore';
import React, { useEffect } from 'react';

const schema = {
  uiType: 'Input',
  value: '111',
};

function App() {
  useEffect(() => {
    layoutStore.setData(schema);
  }, [layoutStore]);
  return (
    <div className="App">
      <Container layoutStore={layoutStore} schema={schema} componentsMap={ComponentsMap} />
    </div>
  );
}

export default App;
