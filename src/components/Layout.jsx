import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  // This component serves as the main layout for the entire application.
  // It includes the Header component at the top and uses the Outlet component from react-router-dom
  // to render the content of the current route within the main layout.

  return (
    <>
      {/* The main layout */}
      <main>
        {/* Include the Header component */}
        <Header />

        {/* The Outlet component renders the content of the current route */}
        <Outlet />
      </main>
    </>
  )
}

export default Layout
