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
    const detail = String(error.message || "");
    let message = status === 500
      ? "Appointment availability is temporarily unavailable."
      : error.message;

    // Safe, specific hints for the most common setup failures (no secrets).
    if (/environment variables are not configured/i.test(detail)) {
      message = "Google Calendar environment variables are missing on Vercel.";
    } else if (/BEGIN\/END PRIVATE KEY|DECODER|PEM|private key|invalid_grant|invalid_client/i.test(detail)) {
      message = "GOOGLE_PRIVATE_KEY is invalid. Paste the full key without extra quotes, keep \\n, then redeploy.";
    } else if (/notFound|404|Calendar not found|freebusy failed: notFound/i.test(detail)) {
      message = "Calendar not found. Check GOOGLE_CALENDAR_ID and share the calendar with the service account.";
    } else if (/insufficient|403|forbidden|accessNotConfigured|has not been used/i.test(detail)) {
      message = "Calendar access denied. Enable Calendar API and share the calendar with Make changes to events.";
    }

    return response.status(status).json({
      error: message,
      // Temporary debug hint for setup (no secrets). Remove after booking works.
      debug: detail.slice(0, 180)
    });
  }
};
