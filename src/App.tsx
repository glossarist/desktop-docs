import React from 'react'
import { Root, Routes } from 'react-static'
import { Router } from '@reach/router'
import { default as GlobalStyle } from './GlobalStyle'
import { Logo } from './components/Logo'

// Any routes that start with 'dynamic' will be treated as non-static routes
//addPrefetchExcludes(['dynamic'])


const App: React.FC<{}> = function () {
  return (
    <Root>

      <GlobalStyle />

      <header>
        <Logo size={42} />
      </header>

      <main>
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            {/* <Dynamic path="dynamic" /> */}
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </main>

    </Root>
  )
}

export default App
