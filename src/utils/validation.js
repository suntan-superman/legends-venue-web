export function validateEventRequestForm(values) {
  const errors = {};
  const required = [
    ["customerName", "Name is required."],
    ["customerPhone", "Phone is required."],
    ["eventType", "Event type is required."],
    ["requestedDate", "Requested date is required."],
    ["startTime", "Start time is required."],
    ["endTime", "End time is required."],
    ["venueAreaId", "Venue area is required."],
    ["estimatedGuestCount", "Guest count is required."],
  ];

  required.forEach(([field, message]) => {
    if (!String(values[field] || "").trim()) errors[field] = message;
  });

  const guestCount = Number(values.estimatedGuestCount || 0);
  if (values.estimatedGuestCount && (!Number.isInteger(guestCount) || guestCount <= 0)) {
    errors.estimatedGuestCount = "Guest count must be greater than zero.";
  }
  if (guestCount > 700) {
    errors.estimatedGuestCount = "Legends has a total capacity of approximately 700 guests. Please call for special arrangements.";
  }
  if (values.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.customerEmail)) {
    errors.customerEmail = "Enter a valid email address.";
  }
  if (values.requestedDate && values.startTime && values.endTime) {
    const start = new Date(`${values.requestedDate}T${values.startTime}:00`);
    const end = new Date(`${values.requestedDate}T${values.endTime}:00`);
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end <= start) {
      errors.endTime = "End time must be after start time.";
    }
  }
  return errors;
}

export function formatPhoneInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
