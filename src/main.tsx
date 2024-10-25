import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { RouterProvider } from 'react-router-dom'
import MainRoute from './routes/MainRoute.tsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className='min-h-screen bg-gray-100 max-w-[1920px] mx-auto pb8 relative '>
          <RouterProvider router={MainRoute} />
          <Toaster richColors position="top-center" />
        </div>
      </PersistGate>
    </Provider>
  </StrictMode>,
)