import { FC } from 'react';
import './App.css';
import RSLibProvider from 'rslib_provider';
import RSLibManifestProvider from 'rslib_manifest_provider';
import RSBuildProvider from 'rsbuild_provider';
import RSBuildManifestProvider from 'rsbuild_manifest';
// @ts-ignore
// import ViteRemoteEntry from 'vite_mf_remoteEntry';
// @ts-ignore
import ViteMFManifest from 'vite_mf_manifest';



// @ts-ignore
import Provider from 'webpack_mf_remoteEntry';
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
      <div>from rsbuild_manifest mf manifest </div>
      <RSBuildManifestProvider />
      <div>from vite_mf_manifest mf manifest</div>
      <ViteMFManifest />
      <div>from vite_mf_remoteEntry mf manifest (cant't work)</div>
      {/* <ViteRemoteEntry /> */}
      <div>from webpack mf</div>
      <Provider />
      <div>from original webpack mf (can't work)</div>
      {/* <MFWebpack componentName="KYEmpty" /> */}
    </div>
  );
};

export default App;
