import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { BrowzerRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowzerRouter>
      <App />
    </BrowzerRouter>
  </StrictMode>,
)
