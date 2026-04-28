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
    <div className="bg-page-soft min-h-[80vh]">
      <div className="content-container py-10 sm:py-16 max-w-[460px]">
        <div className="mb-5 px-3.5 py-3 text-[12.5px] text-text-base rounded-[10px] bg-jade/10 border border-jade/30" role="alert">
          <span className="font-semibold">Let op!</span> EV Service is overgestapt naar een nieuw platform. U dient een nieuw wachtwoord aan te vragen met uw huidige e-mailadres.{" "}
          <a href="/wachtwoord-vergeten" className="underline font-medium text-jade">
            Nieuw wachtwoord aanvragen
          </a>
        </div>

        <div key={currentView}>
          {currentView === "sign-in" ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
