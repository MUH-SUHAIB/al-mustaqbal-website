const dubaiTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Regular clinic hours: Saturday–Thursday, 08:00–14:00 Dubai time. */
export function isClinicOpen(date: Date = new Date()): boolean {
  const parts = dubaiTime.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const minutes = hour * 60 + minute;

  return weekday !== "Fri" && minutes >= 8 * 60 && minutes < 14 * 60;
}
