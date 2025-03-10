import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import "bootstrap/dist/css/bootstrap.css"
import './css/App.css'
import './css/employeeList.css'
import './css/settingsBar.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})
