const { getAvailableSlots, TIMEZONE } = require("../lib/calendar");

module.exports = async function availabilityHandler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const slots = await getAvailableSlots(request.query.date);
    return response.status(200).json({ slots, timezone: TIMEZONE });
  } catch (error) {
    console.error("Calendar availability error:", error.message);
    const status = error.statusCode || 500;
    const message = status === 500
      ? "Appointment availability is temporarily unavailable."
      : error.message;
    return response.status(status).json({ error: message });
  }
};
