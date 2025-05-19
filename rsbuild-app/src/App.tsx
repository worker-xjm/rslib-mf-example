import './App.css';
import Provider from 'rslib-mf-components';
/* import { lazy, Suspense } from 'react';

const DefaultComponent = lazy(() => {
  return import('rslib-mf-components')
}) */
const App = () => {
  return (
    <div className="content">
      <Provider />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <DefaultComponent />
      </Suspense> */}
    </div>

  );
};

export default App;
