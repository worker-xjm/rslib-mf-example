import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// @ts-ignore
import Provider from 'mf_provider'
// @ts-ignore
import MFRsbuild from 'mf_rsbuild_components'
// @ts-ignore
// import MFVite from 'mf_vite_components'
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
      {/* from rslib mf */}
      <Provider />
      {/* from rsbuild mf */}
      <MFRsbuild />
      {/* from vite mf */}
      {/* <MFVite /> */}
    </>
  )
}

export default App
