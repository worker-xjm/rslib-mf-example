import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import Provider from 'mf_provider_remoteEntry'
// @ts-ignore
import MFRsLibManifestRsbuild from 'rslib_remote_mf_manifest'
// @ts-ignore
import MFRsbuildManifestRsbuild from 'rsbuild_manifest_lib'
// @ts-ignore
import RemoteRsbuildProvider from 'mf_rsbuild_remoteEntry'
// @ts-ignore
// import MFVite from 'mf_vite_components'
// @ts-ignore
import MFWebpack from 'mf_webpack_components'
// @ts-ignore
// import MFWebpack from 'mf_webpack_components/DymicPublicComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test H MR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>from rslib mf</div>
      <Provider />
      <div>from rslib Manifest mf</div>
      <MFRsLibManifestRsbuild />
      <div>from rsbuild remote entry mf</div>
      <RemoteRsbuildProvider />
      <div>from rsbuild manifest mf</div>
      <MFRsbuildManifestRsbuild />
      <div>from vite mf ( can't be work) </div>
      {/* <MFVite /> */}
      <hr />
      <div>from webpack mf</div>
      <MFWebpack componentName="KYEmpty" />
    </>
  )
}

export default App
