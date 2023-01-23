import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { App } from 'app/App'
import { store } from 'app/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)
