const { google } = require("googleapis");
const { DateTime } = require("luxon");

const TIMEZONE = process.env.GOOGLE_CALENDAR_TIMEZONE || "Europe/Rome";
const OPEN_HOUR = 8;
const CLOSE_HOUR = 19;
const SLOT_DURATION_MINUTES = 60;

function normalizePrivateKey(rawKey) {
  if (!rawKey) return "";

  let key = String(rawKey).trim();

  // Vercel sometimes stores the value with surrounding quotes.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Convert escaped newlines, then normalize Windows newlines.
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();

  if (!key.includes("BEGIN PRIVATE KEY") || !key.includes("END PRIVATE KEY")) {
    throw new Error("GOOGLE_PRIVATE_KEY must include BEGIN/END PRIVATE KEY lines.");
  }

  return key;
}

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
  const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

  if (!clientEmail || !privateKey || !calendarId) {
    throw new Error("Google Calendar environment variables are not configured.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey
    },
    scopes: ["https://www.googleapis.com/auth/calendar"]
  });

  return google.calendar({ version: "v3", auth });
}

function parseBookableDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) return null;

  const selectedDate = DateTime.fromISO(date, { zone: TIMEZONE }).startOf("day");
  const today = DateTime.now().setZone(TIMEZONE).startOf("day");

  if (
    !selectedDate.isValid ||
    selectedDate < today ||
    selectedDate > today.plus({ days: 60 }) ||
    selectedDate.weekday === 7
  ) {
    return null;
  }

  return selectedDate;
}

async function getAvailableSlots(date) {
  const selectedDate = parseBookableDate(date);
  if (!selectedDate) {
    const error = new Error("The selected date is not available.");
    error.statusCode = 400;
    throw error;
  }

  const calendar = getCalendarClient();
  const dayStart = selectedDate.set({ hour: OPEN_HOUR });
  const dayEnd = selectedDate.set({ hour: CLOSE_HOUR });

  const calendarId = process.env.GOOGLE_CALENDAR_ID.trim();
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toUTC().toISO(),
      timeMax: dayEnd.toUTC().toISO(),
      timeZone: TIMEZONE,
      items: [{ id: calendarId }]
    }
  });

  const calendarStatus = response.data.calendars?.[calendarId];
  if (calendarStatus?.errors?.length) {
    const reason = calendarStatus.errors.map((item) => item.reason).join(", ");
    const error = new Error(`Calendar freebusy failed: ${reason}`);
    error.statusCode = 500;
    throw error;
  }

  const busyPeriods = calendarStatus?.busy || [];
  const minimumNotice = DateTime.now().setZone(TIMEZONE).plus({ minutes: 30 });
  const slots = [];

  for (
    let start = dayStart;
    start.plus({ minutes: SLOT_DURATION_MINUTES }) <= dayEnd;
    start = start.plus({ minutes: SLOT_DURATION_MINUTES })
  ) {
    const end = start.plus({ minutes: SLOT_DURATION_MINUTES });
    const overlaps = busyPeriods.some((busy) => {
      const busyStart = DateTime.fromISO(busy.start);
      const busyEnd = DateTime.fromISO(busy.end);
      return start < busyEnd && end > busyStart;
    });

    if (!overlaps && start >= minimumNotice) {
      slots.push(start.toFormat("HH:mm"));
    }
  }

  return slots;
}

async function createAppointment(data) {
  const availableSlots = await getAvailableSlots(data.date);

  if (!availableSlots.includes(data.time)) {
    const error = new Error("This appointment time is no longer available.");
    error.statusCode = 409;
    throw error;
  }

  const start = DateTime.fromISO(`${data.date}T${data.time}`, { zone: TIMEZONE });
  const end = start.plus({ minutes: SLOT_DURATION_MINUTES });
  const calendar = getCalendarClient();

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID.trim(),
    sendUpdates: "none",
    requestBody: {
      summary: `Badi Garage — ${data.service}`,
      description: [
        `Cliente: ${data.name}`,
        `Telefono: ${data.phone}`,
        `Auto: ${data.car}`,
        `CAP: ${data.postcode}`,
        `Servizio: ${data.service}`,
        `Problema: ${data.problem || "Non specificato"}`,
        "",
        "Prenotazione effettuata dal sito Badi Garage."
      ].join("\n"),
      location: `CAP ${data.postcode}, Milano`,
      start: {
        dateTime: start.toISO(),
        timeZone: TIMEZONE
      },
      end: {
        dateTime: end.toISO(),
        timeZone: TIMEZONE
      },
      reminders: {
        useDefault: true
      },
      extendedProperties: {
        private: {
          source: "badi-garage-website",
          customerPhone: data.phone
        }
      }
    }
  });

  return {
    id: response.data.id,
    start: start.toISO(),
    end: end.toISO()
  };
}

module.exports = {
  TIMEZONE,
  createAppointment,
  getAvailableSlots
};
