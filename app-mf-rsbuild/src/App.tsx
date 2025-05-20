import { FC } from 'react';
import './App.css';
import Provider from 'provider';

const App: FC = () => {
  return (
    <div className="content">
      <Provider />
    </div>
  );
};

export default App;
