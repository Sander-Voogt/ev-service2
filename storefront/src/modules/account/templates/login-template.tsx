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
      <div
        className="p-4 mb-4 text-sm text-fg-green-800 rounded-base bg-green-400"
        role="alert"
      >
        <span className="font-medium">Let op!</span> EV Service is overgestapt naar een nieuw platform. U dient een nieuw wachtwoord aan te vragen met uw
        huidige emailadres.
        <br/>
        <a href="/wachtwoord-vergeten" className="border-1 border-black">Nieuw wachtwoord aanvragen</a>
      </div>

      <div className="w-full flex justify-start px-8 py-8">
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </>
  )
}

export default LoginTemplate
