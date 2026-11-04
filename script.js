const modal = document.querySelector("#booking-modal");
const bookingForm = document.querySelector("#booking-form");
const successPanel = document.querySelector(".form-success");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".desktop-nav");
const languageSelect = document.querySelector("#language-select");
const dateField = bookingForm.querySelector('[name="date"]');
const timeField = bookingForm.querySelector('[name="time"]');
const formError = bookingForm.querySelector(".form-error");
const submitButton = bookingForm.querySelector(".form-submit");
const availabilityCard = document.querySelector(".availability-card");
const DEMO_FORCE_AVAILABLE = true;

const english = {
  "Badi Garage, torna alla home": "Badi Garage, back to home",
  "Navigazione principale": "Main navigation",
  "Seleziona lingua": "Select language",
  "Apri menu": "Open menu",
  "5 stelle su 5": "5 out of 5 stars",
  "I nostri vantaggi": "Our benefits",
  "Contattaci su WhatsApp": "Contact us on WhatsApp",
  "Chiudi": "Close",
  "CAP": "Postcode",
  "Meccanico professionista al lavoro su un'auto": "Professional mechanic working on a car",
  "Controllo professionale del motore di un'auto": "Professional car engine inspection",
  "Foto segnaposto di Philip": "Placeholder photo of Philip",
  "Foto del meccanico": "Mechanic photo",
  "Servizi": "Services",
  "Come funziona": "How it works",
  "Prezzi": "Pricing",
  "Chi sono": "About me",
  "Prenota ora": "Book now",
  "Meccanico mobile · Milano e provincia": "Mobile mechanic · Milan and province",
  "La tua auto si ferma.": "Your car stops.",
  "Tu no.": "You don't.",
  "Vengo io da te, oppure ritiro l’auto e te la riconsegno riparata. Preventivo chiaro, aggiornamenti in tempo reale, zero sorprese.": "I come to you, or collect your car and return it repaired. Clear quotes, real-time updates, no surprises.",
  "Auto, moto, furgoni e camion: vengo io da te oppure ritiro il veicolo. Meccanica e climatizzazione con preventivi chiari e zero sorprese.": "Cars, motorcycles, vans, and trucks: I come to you or collect the vehicle. Mechanical and air-conditioning service with clear quotes and no surprises.",
  "Prenota un intervento": "Book a service",
  "Scelto da oltre 480 automobilisti": "Trusted by over 480 drivers",
  "Disponibile oggi": "Available today",
  "Primo slot alle 14:30": "First slot at 2:30 PM",
  "Area di servizio": "Service area",
  "Di cosa hai bisogno?": "What do you need?",
  "Seleziona il tipo di intervento": "Select a service",
  "Servizio": "Service",
  "Diagnosi e riparazione": "Diagnostics and repair",
  "Tagliando completo": "Full service",
  "Batteria e avviamento": "Battery and starting",
  "Freni e sospensioni": "Brakes and suspension",
  "Ritiro e riconsegna": "Pickup and return",
  "Moto e scooter": "Motorcycles and scooters",
  "Camion e veicoli commerciali": "Trucks and commercial vehicles",
  "Climatizzazione auto e camion": "Car and truck air conditioning",
  "La tua zona": "Your area",
  "Verifica disponibilità": "Check availability",
  "Preventivo prima di iniziare": "Quote before we start",
  "12 mesi di garanzia": "12-month warranty",
  "Ricambi certificati": "Certified parts",
  "Pagamento sicuro": "Secure payment",
  "Esperienza multimarca": "Multi-brand experience",
  "Marche che assistiamo": "Brands we service",
  "Manutenzione, diagnosi e riparazioni sui marchi più diffusi a Milano.": "Maintenance, diagnostics, and repairs for Milan’s most popular car brands.",
  "Marche automobilistiche assistite": "Car brands serviced",
  "I marchi appartengono ai rispettivi proprietari. Badi Garage è un servizio indipendente.": "All trademarks belong to their respective owners. Badi Garage is an independent service.",
  "Servizi senza stress": "Stress-free service",
  "Un’officina, ovunque": "A workshop, wherever",
  "ti trovi.": "you are.",
  "Dalla manutenzione ordinaria alle riparazioni più complesse. A casa tua, in ufficio o con ritiro e riconsegna.": "From routine maintenance to complex repairs. At home, at work, or with pickup and return.",
  "Dalla manutenzione ordinaria alla climatizzazione. Assistenza per auto, moto, furgoni e camion.": "From routine maintenance to air conditioning. Service for cars, motorcycles, vans, and trucks.",
  "Meccanico a domicilio": "Mobile mechanic",
  "Interventi direttamente dove si trova la tua auto. Niente attese, niente carro attrezzi.": "Repairs wherever your car is. No waiting and no tow truck.",
  "Diagnosi elettronica": "Electronic diagnostics",
  "Tagliando e manutenzione": "Servicing and maintenance",
  "Prenota a domicilio": "Book a home visit",
  "Ritiro & riconsegna": "Pickup & return",
  "Ritiro l’auto, la riparo presso la mia officina e te la riporto. Tu continua la tua giornata.": "I collect your car, repair it at my workshop, and bring it back. You carry on with your day.",
  "Ritiro con verbale digitale": "Digital pickup report",
  "Aggiornamenti fotografici": "Photo updates",
  "Riconsegna concordata": "Scheduled return",
  "Richiedi il ritiro": "Request pickup",
  "Urgenza su strada": "Roadside emergency",
  "Problemi improvvisi? Chiamami e troviamo subito la soluzione più rapida.": "Unexpected problem? Call me and we'll find the fastest solution.",
  "tempo medio d’arrivo": "average arrival time",
  "Chiama adesso": "Call now",
  "Moto & scooter": "Motorcycles & scooters",
  "Manutenzione e riparazioni per moto e scooter, dalla diagnosi al controllo completo.": "Motorcycle and scooter maintenance and repairs, from diagnostics to complete inspections.",
  "Tagliando e controllo livelli": "Servicing and fluid checks",
  "Freni, batteria e avviamento": "Brakes, battery, and starting",
  "Diagnosi guasti": "Fault diagnostics",
  "Prenota per la moto": "Book motorcycle service",
  "Camion & veicoli commerciali": "Trucks & commercial vehicles",
  "Assistenza per furgoni e camion, pensata per ridurre i tempi di fermo del veicolo.": "Service for vans and trucks designed to reduce vehicle downtime.",
  "Diagnosi meccanica": "Mechanical diagnostics",
  "Manutenzione programmata": "Scheduled maintenance",
  "Interventi su strada": "Roadside service",
  "Richiedi assistenza": "Request service",
  "Climatizzazione": "Air conditioning",
  "Diagnosi e riparazione dell’aria condizionata per auto, furgoni e camion.": "Air-conditioning diagnostics and repair for cars, vans, and trucks.",
  "Ricerca perdite": "Leak detection",
  "Ricarica climatizzatore": "Air-conditioning recharge",
  "Compressore e componenti": "Compressor and components",
  "Controlla il climatizzatore": "Check the air conditioning",
  "anni di": "years of",
  "esperienza": "experience",
  "Semplice dall’inizio alla fine": "Simple from start to finish",
  "Raccontami il problema": "Tell me the problem",
  "Inserisci i dati dell’auto, descrivi il guasto e allega una foto se vuoi.": "Enter your car details, describe the problem, and add a photo if you like.",
  "Scegli dove e quando": "Choose where and when",
  "A domicilio oppure con ritiro. Seleziona l’orario più comodo per te.": "At your location or with pickup. Choose the time that suits you.",
  "Approva il preventivo": "Approve the quote",
  "Ricevi un prezzo chiaro prima del lavoro. Procedo solo dopo il tuo ok.": "Get a clear price before work begins. I proceed only with your approval.",
  "Torna in strada": "Get back on the road",
  "Segui gli aggiornamenti e paga comodamente a lavoro completato.": "Follow the updates and pay conveniently when the work is complete.",
  "Inizia adesso": "Get started",
  "Prezzi trasparenti": "Transparent pricing",
  "Sai sempre quanto spendi.": "You always know the cost.",
  "Nessun costo nascosto. Confermi ogni intervento prima che inizi.": "No hidden costs. You approve every job before it starts.",
  "Da": "From",
  "+ eventuali ricambi": "+ any required parts",
  "Diagnosi a domicilio": "On-site diagnostics",
  "Controllo completo e identificazione del problema.": "Complete inspection and problem identification.",
  "Più richiesto": "Most popular",
  "Tagliando essenziale": "Essential service",
  "Olio, filtro e controllo dei principali livelli.": "Oil, filter, and main fluid checks.",
  "+ costo intervento": "+ service cost",
  "Presa in carico sicura in tutta Milano.": "Secure pickup throughout Milan.",
  "Il prezzo finale dipende dal modello dell’auto e dai ricambi necessari.": "The final price depends on the car model and required parts.",
  "Il tuo meccanico di fiducia": "Your trusted mechanic",
  "“Tratto ogni auto come se fosse la mia, e ogni cliente come un vicino di casa.”": "“I treat every car as if it were my own, and every customer like a neighbour.”",
  "Sono Philip, meccanico certificato con oltre 15 anni di esperienza. Ho creato Badi Garage per rendere la manutenzione dell’auto più semplice, onesta e umana.": "I'm Philip, a certified mechanic with over 15 years of experience. I created Badi Garage to make car maintenance simpler, more honest, and more personal.",
  "— Meccanico & fondatore": "— Mechanic & founder",
  "“Servizio impeccabile. Philip è arrivato puntuale, mi ha spiegato tutto e ha risolto il problema senza che dovessi perdere una giornata.”": "“Excellent service. Philip arrived on time, explained everything, and fixed the problem without me losing a whole day.”",
  "Cliente verificata · Milano": "Verified customer · Milan",
  "La tua auto merita attenzione": "Your car deserves attention",
  "Pronto a ripartire?": "Ready to get moving?",
  "Raccontaci di cosa hai bisogno. Ti rispondiamo entro 15 minuti durante l’orario di servizio.": "Tell us what you need. We reply within 15 minutes during business hours.",
  "Servizio mobile a Milano e provincia · Lun–Sab, 08:00–19:00": "Mobile service in Milan and province · Mon–Sat, 8:00 AM–7:00 PM",
  "Prenota in 2 minuti": "Book in 2 minutes",
  "Come possiamo aiutarti?": "How can we help?",
  "Lascia i tuoi dati. Ti contatteremo per confermare disponibilità e preventivo.": "Leave your details. We'll contact you to confirm availability and provide a quote.",
  "Nome e cognome": "Full name",
  "Telefono": "Phone",
  "Marca e modello": "Make and model",
  "Tipo di servizio": "Service type",
  "Non sono sicuro": "I'm not sure",
  "Data appuntamento": "Appointment date",
  "Orario disponibile": "Available time",
  "Seleziona prima una data": "Select a date first",
  "Azienda": "Company",
  "Descrivi brevemente il problema": "Briefly describe the problem",
  "Accetto l’informativa privacy e di essere ricontattato.": "I accept the privacy policy and agree to be contacted.",
  "Invia la richiesta": "Send request",
  "Richiesta ricevuta!": "Request received!",
  "Grazie. Ti ricontatteremo al più presto per confermare l’appuntamento.": "Thank you. We'll contact you shortly to confirm the appointment.",
  "Perfetto": "Done",
  "CAP, es. 20121": "Postcode, e.g. 20121",
  "Spia accesa, rumore, auto che non parte...": "Warning light, noise, car won't start..."
};

const originalText = new WeakMap();
const translatedAttributes = ["placeholder", "aria-label", "alt"];

function translatePage(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("script, style")) continue;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const value = source.trim();
    const translated = language === "en" ? english[value] : null;
    node.nodeValue = translated
      ? source.replace(value, translated)
      : source;
  }

  document.querySelectorAll("*").forEach((element) => {
    translatedAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const storageKey = `original${attribute.replace("-", "")}`;
      if (!element.dataset[storageKey]) element.dataset[storageKey] = element.getAttribute(attribute);
      const source = element.dataset[storageKey];
      element.setAttribute(attribute, language === "en" && english[source] ? english[source] : source);
    });
  });

  document.documentElement.lang = language;
  document.title = language === "en"
    ? "Badi Garage — The mechanic comes to you"
    : "Badi Garage — Il meccanico viene da te";
  localStorage.setItem("badi-language", language);
}

function updateMechanicStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    weekday: "short",
    hour: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const isAvailable = DEMO_FORCE_AVAILABLE || (weekday !== "Sun" && hour >= 8 && hour < 19);
  const isEnglish = languageSelect.value === "en";

  availabilityCard.classList.toggle("is-available", isAvailable);
  availabilityCard.classList.toggle("is-unavailable", !isAvailable);
  availabilityCard.querySelector(".availability-label").textContent = isAvailable
    ? (isEnglish ? "Available now" : "Disponibile ora")
    : (isEnglish ? "Currently unavailable" : "Al momento non disponibile");
  availabilityCard.querySelector(".availability-detail").textContent = isAvailable
    ? (isEnglish ? "Certified mechanic · 15+ years" : "Meccanico certificato · 15+ anni")
    : (isEnglish ? "Mon–Sat · 8:00 AM–7:00 PM" : "Lun–Sab · 08:00–19:00");
  availabilityCard.setAttribute("aria-label", availabilityCard.querySelector(".availability-label").textContent);
}

languageSelect.value = localStorage.getItem("badi-language") || "it";
translatePage(languageSelect.value);
updateMechanicStatus();
languageSelect.addEventListener("change", () => {
  translatePage(languageSelect.value);
  updateMechanicStatus();
  if (!dateField.value) resetTimeField();
});
setInterval(updateMechanicStatus, 60000);

function localDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resetTimeField(message) {
  timeField.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = message || (languageSelect.value === "en"
    ? "Select a date first"
    : "Seleziona prima una data");
  timeField.append(option);
  timeField.disabled = true;
}

function showFormError(message) {
  formError.textContent = message;
  formError.hidden = false;
}

async function loadAvailableTimes() {
  formError.hidden = true;
  resetTimeField(languageSelect.value === "en" ? "Loading times..." : "Caricamento orari...");

  if (!dateField.value) {
    resetTimeField();
    return;
  }

  try {
    const response = await fetch(`/api/availability?date=${encodeURIComponent(dateField.value)}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || result.debug || "Availability request failed");

    timeField.innerHTML = "";
    if (!result.slots.length) {
      resetTimeField(languageSelect.value === "en"
        ? "No times available"
        : "Nessun orario disponibile");
      return;
    }

    const prompt = document.createElement("option");
    prompt.value = "";
    prompt.textContent = languageSelect.value === "en"
      ? "Choose a time"
      : "Scegli un orario";
    timeField.append(prompt);

    result.slots.forEach((slot) => {
      const option = document.createElement("option");
      option.value = slot;
      option.textContent = slot;
      timeField.append(option);
    });
    timeField.disabled = false;
  } catch (error) {
    resetTimeField(languageSelect.value === "en"
      ? "Times unavailable"
      : "Orari non disponibili");
    showFormError(error.message || (languageSelect.value === "en"
      ? "We couldn't load the calendar. Please try again shortly."
      : "Impossibile caricare il calendario. Riprova tra poco."));
  }
}

const today = new Date();
const lastBookableDay = new Date();
lastBookableDay.setDate(lastBookableDay.getDate() + 60);
dateField.min = localDateValue(today);
dateField.max = localDateValue(lastBookableDay);
dateField.addEventListener("change", loadAvailableTimes);

document.querySelectorAll(".open-booking").forEach((button) => {
  button.addEventListener("click", () => {
    bookingForm.hidden = false;
    successPanel.hidden = true;
    formError.hidden = true;
    modal.showModal();
  });
});

document.querySelector(".modal-close").addEventListener("click", () => modal.close());
document.querySelector(".success-close").addEventListener("click", () => modal.close());

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.hidden = true;
  submitButton.disabled = true;

  try {
    const payload = Object.fromEntries(new FormData(bookingForm).entries());
    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 409) await loadAvailableTimes();
      throw new Error(result.error);
    }

    bookingForm.hidden = true;
    successPanel.hidden = false;
    bookingForm.reset();
    resetTimeField();
  } catch {
    showFormError(languageSelect.value === "en"
      ? "The appointment was not created. The time may have been taken—please choose another or try again."
      : "L’appuntamento non è stato creato. L’orario potrebbe essere stato occupato: scegline un altro o riprova.");
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector(".quick-submit").addEventListener("click", () => {
  const postcode = document.querySelector("#quick-postcode");
  const selectedService = document.querySelector("#quick-service").value;

  if (!/^\d{5}$/.test(postcode.value.trim())) {
    postcode.focus();
    postcode.setCustomValidity(languageSelect.value === "en"
      ? "Enter a valid 5-digit Italian postcode."
      : "Inserisci un CAP italiano di 5 cifre.");
    postcode.reportValidity();
    return;
  }

  postcode.setCustomValidity("");
  modal.querySelector('[name="postcode"]').value = postcode.value.trim();
  const serviceField = modal.querySelector('[name="service"]');
  const normalizedService = selectedService.toLowerCase();
  let serviceIndex = 0;
  if (normalizedService.includes("ritiro") || normalizedService.includes("pickup")) serviceIndex = 1;
  if (normalizedService.includes("moto")) serviceIndex = 3;
  if (normalizedService.includes("camion") || normalizedService.includes("truck")) serviceIndex = 4;
  if (normalizedService.includes("climat") || normalizedService.includes("air conditioning")) serviceIndex = 5;
  serviceField.selectedIndex = serviceIndex;
  bookingForm.hidden = false;
  successPanel.hidden = true;
  formError.hidden = true;
  modal.showModal();
});

document.querySelector("#quick-postcode").addEventListener("input", (event) => {
  event.target.setCustomValidity("");
  event.target.value = event.target.value.replace(/\D/g, "");
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});
