

export default functionNavMenu1(){

    return (

            <MainNavBar />
            <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Zoeken
                </LocalizedClientLink>
              </div>

              <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
                <div className="relative">
                  <IconCart />
                </div>
                <div className="flex flex-col ml-1">
                  <span className="text-xs font-semibold text-green-900">
                    Winkelwagen
                  </span>
                  <span className="text-xs text-green-default font-bold">
    )
}