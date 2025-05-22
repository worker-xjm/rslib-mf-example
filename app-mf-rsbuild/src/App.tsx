import { FC } from 'react';
import './App.css';
import RSLibProvider from 'rslib_provider';
import RSLibManifestProvider from 'rslib_manifest_provider';
import RSBuildProvider from 'rsbuild_provider';
import RSBuildManifestProvider from 'rsbuild_manifest_provider';


// @ts-ignore
// import ViteMF from 'vite_mf_components';
// @ts-ignore
// import ViteMFManifest from 'vite_mf_manifest_provider';



// @ts-ignore
import Provider from 'mf_wp';
// @ts-ignore
// import MFWebpack from 'mf_wp_origin/DymicPublicComponent';

const App: FC = () => {
  return (
    <div className="content">
      host
      <div>from rslib_provider mf</div>
      <RSLibProvider />
      <div>from rslib_provider mf manifest </div>
      <RSLibManifestProvider />
      <div>from rsbuild_provider mf</div>
      <RSBuildProvider />
      <div>from rsbuild_manifest_provider mf manifest </div>
      <RSBuildManifestProvider />
      <div>from vite_mf_components mf (cant't work)</div>
      {/* <ViteMF /> */}
      <div>from vite_mf_manifest_provider mf manifest (cant't work)</div>
      {/* <ViteMFManifest /> */}
      <div>from webpack mf</div>
      <Provider />
      <div>from original webpack mf (can't work)</div>
      {/* <MFWebpack componentName="KYEmpty" /> */}
    </div>
  );
};

export default App;
