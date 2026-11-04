const { createAppointment } = require("../lib/calendar");

const MAX_LENGTHS = {
  name: 100,
  phone: 40,
  car: 100,
  postcode: 5,
  service: 100,
  problem: 1000
};

function cleanText(value, maxLength) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function validateRequest(body = {}) {
  const data = {
    name: cleanText(body.name, MAX_LENGTHS.name),
    phone: cleanText(body.phone, MAX_LENGTHS.phone),
    car: cleanText(body.car, MAX_LENGTHS.car),
    postcode: cleanText(body.postcode, MAX_LENGTHS.postcode),
    service: cleanText(body.service, MAX_LENGTHS.service),
    problem: cleanText(body.problem, MAX_LENGTHS.problem),
    date: cleanText(body.date, 10),
    time: cleanText(body.time, 5)
  };

  if (
    !data.name ||
    !data.phone ||
    !data.car ||
    !data.service ||
    !/^\d{5}$/.test(data.postcode) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !/^\d{2}:\d{2}$/.test(data.time)
  ) {
    return null;
  }

  return data;
}

module.exports = async function bookingHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (request.body?.company) {
    return response.status(200).json({ success: true });
  }

  const data = validateRequest(request.body);
  if (!data) {
    return response.status(400).json({ error: "Please check the appointment details." });
  }

  try {
    const appointment = await createAppointment(data);
    return response.status(201).json({ success: true, appointment });
  } catch (error) {
    console.error("Calendar booking error:", error.message);
    const status = error.statusCode || 500;
    const message = status === 500
      ? "The appointment could not be created. Please try again."
      : error.message;
    return response.status(status).json({ error: message });
  }
};
