import { FC } from 'react';
import './App.css';
// import Provider from 'provider';
import Provider2 from 'provider2';

const App: FC = () => {
  return (
    <div className="content">
      host
      {/* <Provider /> */}
      <Provider2 />
    </div>
  );
};

export default App;
