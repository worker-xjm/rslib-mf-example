
import './App.css'
// @ts-ignore
import Provider from 'rslib_remoteEntry'
// @ts-ignore
import MFRsLibManifestRsbuild from 'rslib_mf_manifest'
// @ts-ignore
import MFRsbuildManifestRsbuild from 'rsbuild_mf_manifest'
// @ts-ignore
import RemoteRsbuildProvider from 'mf_rsbuild_remoteEntry'
// @ts-ignore
import MFVite from 'vite_mf_manifest'
// @ts-ignore
import MFWebpack from 'webpack_remoteEntry'
// @ts-ignore
// import MFWebpack from 'mf_webpack_components/DymicPublicComponent'
import Welcome from './welcom'

function App() {

  return (
    <>
      <Welcome />
      <div>from rslib mf</div>
      <Provider />
      <div>from rslib Manifest mf</div>
      <MFRsLibManifestRsbuild />
      <div>from rsbuild remote entry mf</div>
      <RemoteRsbuildProvider />
      <div>from rsbuild manifest mf</div>
      <MFRsbuildManifestRsbuild />
      <div>from vite mf ( can't be work) </div>
      <MFVite />
      <hr />
      <div>from webpack mf</div>
      <MFWebpack componentName="KYEmpty" />
    </>
  )
}

export default App
