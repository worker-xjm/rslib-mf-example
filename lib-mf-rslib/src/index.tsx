import React from 'react';
import './index.css';
import KYEmpty from 'lib-ui';
const Provider: React.FC = () => {
  return (
    <div className="container">
      <div className="icon-container">
        <img
          src="https://module-federation.io/svg.svg"
          alt="logo"
          className="logo-image"
        />
      </div>
      <h1 className="title">Hello Module Federation 2.0</h1>
      <KYEmpty />
    </div>
  );
};

export default Provider;
