function formatTime(time24) {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 => 12
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export default formatTime;

