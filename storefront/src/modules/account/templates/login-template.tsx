"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <>
      {/* Platform Migration Notice - Original colors, smaller padding, full width, centered text */}
      <div className="w-full mb-4">
        <div
          className="p-3 text-sm text-center text-fg-green-800 rounded-base bg-green-400"
          role="alert"
        >
          <span className="font-medium">Let op!</span> EV Service is overgestapt naar een nieuw platform. U dient een nieuw wachtwoord aan te vragen met uw huidige emailadres.
          {" "}
          <a href="/wachtwoord-vergeten" className="underline font-medium">Nieuw wachtwoord aanvragen</a>
        </div>
      </div>

      <div className="w-full flex justify-start px-8 py-2">
        <div key={currentView} className="w-full max-w-md mx-auto">
          {currentView === "sign-in" ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </>
  )
}

export default LoginTemplate
