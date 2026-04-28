(function () {
  try {
    var stored = localStorage.getItem("ev-theme")
    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    var theme = stored || (prefersDark ? "dark" : "light")
    var root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    root.setAttribute("data-mode", theme)
  } catch (e) {}
})()
