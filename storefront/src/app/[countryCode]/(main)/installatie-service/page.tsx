"use client"
import Script from "next/script"

export default function EVServicePage() {
  return (
    <main className="flex flex-col items-center">
      {/* === Hero Section === */}
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1581090464472-1e7b3f9c7f7d"
          alt="EV laadpaal"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-6">
          <p className="text-sm text-gray-200 mb-2">
            Home / Installatie Service
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Laadoplossingen voor Bedrijven en VvE’s
          </h1>
          <p className="text-lg mb-4">
            Load balancing & Smart Charging voor uw laadinfrastructuur.
          </p>
          <p className="mb-6">Heb je vragen? Neem contact op.</p>
          <a href="/offerte-aanvragen">
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium">
              Direct Contact Opnemen
            </button>
          </a>
        </div>
      </section>

      {/* === Onze Services === */}
      <section className="max-w-6xl w-full px-6 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Onze Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Advies",
              desc: "Laat ons je begeleiden bij het opzetten van uw laadinfrastructuur en ontdek hoe u Smart Charging optimaal benut.",
              icon: "💡",
            },
            {
              title: "Installatie",
              desc: "Vertrouw op onze expertise bij de installatie van uw laadstations. Wij werken samen met gecertificeerde installateurs.",
              icon: "🔧",
            },
            {
              title: "Support & Beheer",
              desc: "Kies voor gemoedsrust met onze supportdienst. Wij monitoren, onderhouden en ondersteunen op afstand.",
              icon: "🛠️",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md bg-white transition"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium">
            Direct Contact Opnemen
          </button>
        </div>
      </section>

      {/* === Waarom kiezen voor EV Service === */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8">
            Waarom kiezen voor EV Service?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-5">
              {[
                { title: "Alle kennis op één plek" },
                { title: "Eén vast aanspreekpunt" },
                { title: "Onafhankelijk" },
                { title: "Gecertificeerde installateurs" },
                { title: "De beste after-sales service" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600 text-sm">
                      
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <img
              src="https://images.unsplash.com/photo-1603791452906-c06d02d8c2b6"
              alt="EV installatie"
              className="rounded-xl shadow-md object-cover h-80 w-full"
            />
          </div>
        </div>
      </section>

      {/* === Over Ons === */}
      <section className="max-w-6xl w-full px-6 py-16">
        <h2 className="text-2xl font-semibold mb-4">
          Laadpaal Installatie: Uw Partner in Smart Charging
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bent u een zakelijke klant die één of meerdere laadpalen wil plaatsen
          bij uw bedrijf of een VvE die laadpunten wil implementeren? Wij
          begeleiden u van advies tot oplevering.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Onze EV Service Backoffice helpt u bij het beheer en onderhoud van uw
          laadinfrastructuur. Wij zorgen ervoor dat alles soepel verloopt.
        </p>
      </section>

      {/* === FAQ === */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-4">
            {[
              "Zijn er subsidies of financiële regelingen beschikbaar?",
              "Komen jullie langs op de situatie te meten?",
              "Helpen jullie met een laadplan voor mijn bedrijf?",
              "Wat is jullie werkgebied?",
            ].map((q, idx) => (
              <details
                key={idx}
                className="border rounded-lg bg-white p-4 cursor-pointer group"
              >
                <summary className="font-medium group-open:text-green-600">
                  {q}
                </summary>
                <p className="text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </details>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <a href="/offerte-aanvragen">
            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-medium">
              Direct Contact Opnemen
            </button>
          </a>
          </div>
        </div>
      </section>
    </main>
  )
}

// export default function InstallatieService() {
//   return (
//     <>
//       <div className="content-container prose">
//         <h1>Onze Services</h1>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/calculator.svg" />
//         <h2>Advies</h2>
//         <p>
//           Laat ons u begeleiden bij het opzetten van uw (zakelijke)
//           laadinfrastructuur en ontdek hoe u middels{" "}
//           <strong>Smart Charging</strong> optimaal gebruik kunt maken van uw
//           stroomaansluiting.
//         </p>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/headphones.svg" />
//         <h2>Installatie</h2>
//         <p>
//           Vertrouw op onze expertise bij de installatie van uw
//           laadinfrastructuur. We werken samen met een select aantal vaste
//           installatiepartners voor een naadloze en betrouwbare service.
//         </p>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/tools_cross.svg" />
//         <h2>Support &amp; Beheer</h2>
//         <p>
//           Kies voor gemoedsrust met onze Support &amp; Beheer service. Onze
//           eigen backoffice monitort proactief uw laadinfrastructuur. Bij EV
//           Service heeft u altijd één betrouwbaar aanspreekpunt voor onderhoud en
//           beheer.
//         </p>
//         <p>
//           <a
//             target="_blank"
//             rel="noopener noreferrer nofollow"
//             href="https://www.evservice.eu/offerte-aanvragen"
//           >
//             {" "}
//             Direct Contact Opnemen
//           </a>
//         </p>
//         <h1>Waarom kiezen voor EV Service?</h1>
//         <ul>
//           <li>
//             <p></p>
//           </li>
//         </ul>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/24-hours.svg" />
//         <h5>Alle kennis op één plek</h5>
//         <p>
//           Met diepgaande technische kennis biedt EV Service oplossingen; Ook
//           voor complexe configuraties en elektrotechnische installaties.
//         </p>
//         <ul>
//           <li>
//             <p></p>
//           </li>
//         </ul>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/calender.svg" />
//         <h5>Eén vast aanspreekpunt</h5>
//         <p>
//           Jouw toegewijde contactpersoon staat altijd klaar voor persoonlijke
//           ondersteuning via telefoon of app bij vragen of problemen.
//         </p>
//         <ul>
//           <li>
//             <p></p>
//           </li>
//         </ul>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/dollar-symbol.svg" />
//         <h5>Onafhankelijk</h5>
//         <p>
//           Als onafhankelijke partner kiezen we de beste oplossing, los van
//           merkvoorkeur, om te voldoen aan jouw specifieke behoeften.
//         </p>
//         <ul>
//           <li>
//             <p></p>
//           </li>
//         </ul>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/machanic.svg" />
//         <h5>Gecertificeerde installateurs</h5>
//         <p>
//           Onze installatiepartners zijn gecertificeerd en hebben de expertise om
//           de hoogste kwaliteitsnormen te waarborgen bij installaties.
//         </p>
//         <ul>
//           <li>
//             <p></p>
//           </li>
//         </ul>
//         <img src="https://www.evservice.eu/Themes/Traction/Content/img/quote_page/tools.svg" />
//         <h5>De beste after sales service</h5>
//         <p>
//           EV Service staat bekend om haar uitstekende after-sales service,
//           waardoor je kunt rekenen op blijvende ondersteuning.
//         </p>
//         <h1>Laadpaal Installatie: Uw Partner in Smart Charging</h1>
//         <p>
//           Bent u een zakelijke klant die één of meerdere laadpalen wil plaatsen
//           bij uw bedrijf of een VVE die laadpunten wil installeren in een
//           centrale parkeergarage? Onze Smart Charging Consultants staan voor u
//           klaar!
//         </p>
//         <h2>Over Ons</h2>
//         <p>
//           Bij ons vindt u alle kennis op één plek, inclusief Dynamic Load
//           Management en Smart Charging. Of u nu één laadpunt wilt implementeren
//           of een volledig laadplein bij uw bedrijfspand of VVE, wij hebben de
//           expertise om u te voorzien van advies en doeltreffende oplossingen.
//           Wij begeleiden u vanaf het ontwerp tot de oplevering van uw laadpunt
//           of laadplein. Ook na oplevering staan we voor u klaar voor beheer en
//           onderhoud.
//         </p>
//         <h2>Meerdere merken laadpalen op één locatie: Dat kan!</h2>
//         <p>
//           Als u uw bestaande laadplein wilt uitbreiden, bieden wij
//           gespecialiseerde smart charging-modules om optimaal gebruik te maken
//           van uw eigen energiebronnen en actieve load balancing toe te passen om
//           overbelasting van uw hoofdzekeringen te voorkomen. Dit stelt u in
//           staat om laadpunten van verschillende merken met elkaar te verbinden
//           en efficiënt gebruik te maken van uw stroom.
//         </p>
//         <h2>EV Service Backoffice: Vereenvoudig Uw Laadinfrastructuur</h2>
//         <p>
//           Onze EV Service Backoffice is een krachtig hulpmiddel dat speciaal is
//           ontwikkeld om het beheer en de financiële processen met betrekking tot
//           laadpalen voor elektrische voertuigen te vereenvoudigen. Dit maakt
//           openbaar laden mogelijk zonder dat u hier omkijken naar heeft. U heeft
//           toegang tot ons portaal om uw eigen laadsessies te bekijken.
//         </p>
//         <p>
//           Daarnaast stelt het ons in staat om uw laadinfrastructuur op afstand
//           te monitoren en beheren. Hierdoor kunnen we in veel gevallen eventuele
//           problemen op afstand oplossen.
//         </p>
//         <h2>Persoonlijke after sales</h2>
//         <p>
//           Ook na de ingebruikname van uw laadstation zijn wij er om al uw vragen
//           te beantwoorden, ongeacht wanneer ze zich voordoen. Of het nu gaat om
//           het gebruik van uw laadstation, storingen, of uitbreidingen, wij staan
//           voor u klaar.
//         </p>
//         <h1>Veelgestelde Vragen</h1>
//         <ul>
//           <li>
//             <p>
//               Zijn er subsidies of financiële stimuleringsregelingen beschikbaar
//               voor de installatie van laadinfrastructuur?
//             </p>
//             <p>
//               Zeker! Bedrijven kunnen profiteren van belastingvoordelen zoals de
//               KIA (Kleinschaligheidsinvesteringsaftrek) en MIA
//               (Milieu-investeringsaftrek). Sinds 2024 zijn er ook
//               subsidiemogelijkheden beschikbaar voor VVE's om de kosten voor de
//               aanleg van laadinfrastructuur te verlagen.
//             </p>
//           </li>
//           <li>
//             <p>Komen jullie langs om de situatie op te nemen?</p>
//             <p>
//               Ja, we komen altijd langs om de situatie ter plaatse te
//               beoordelen. Een fysieke inspectie is essentieel om een nauwkeurig
//               advies te geven en de meest geschikte laadoplossing voor uw
//               specifieke situatie te kunnen aanbieden. Onze experts zorgen
//               ervoor dat de installatie voldoet aan uw behoeften en de beste
//               locatie wordt bepaald voor de laadpalen. Dit stelt ons in staat om
//               een optimale laadinfrastructuur te realiseren die aan al uw wensen
//               voldoet.
//             </p>
//           </li>
//           <li>
//             <p>
//               Kan EV Service helpen met het opstellen van een laadbeleid voor
//               mijn bedrijf of VVE?
//             </p>
//             <p>
//               Ja, we kunnen helpen bij het opstellen van een laadbeleid dat
//               voldoet aan uw bedrijfs- of VVE-behoeften, inclusief
//               kostenverdeling en gebruik.
//             </p>
//           </li>
//           <li>
//             <p>Wat is jullie werkgebied?</p>
//             <p>
//               Ons werkgebied omvat voornamelijk de Randstad, waaronder steden
//               als Amsterdam, Almere, Amersfoort, Utrecht en Rotterdam. Hier
//               hebben we een sterke aanwezigheid en voeren we regelmatig
//               installaties uit. Echter, voor interessante projecten schuiven we
//               soms onze grenzen op en werken we ook buiten de Randstad. We
//               streven ernaar om onze expertise en diensten beschikbaar te maken
//               waar dat nodig is, zodat we aan de vraag van onze klanten kunnen
//               voldoen.
//             </p>
//           </li>
//         </ul>
//       </div>
//       <div className="flex flex-row max-w-7xl mx-auto">
//         <iframe
//           style={{ border: "none", width: "100%", height: "800px" }}
//           id="my-form-9dbnns"
//           src="https://form.evservice.eu/forms/ev-service-offerte-3pstb8"
//         ></iframe>
//         <Script
//           src="https://form.evservice.eu/widgets/iframe.min.js"
//           strategy="afterInteractive"
//           onLoad={() => {
//             if (typeof window !== "undefined" && window.initEmbed) {
//               window.initEmbed("my-form-9dbnns")
//             }
//           }}
//         />
//       </div>
//     </>
//   )
// }
