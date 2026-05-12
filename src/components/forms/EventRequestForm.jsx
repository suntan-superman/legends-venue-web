import { useMemo, useState } from "react";
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { EVENT_TYPES } from "../../config/eventTypes";
import { VENUE_AREAS } from "../../config/venueAreas";
import { submitEventRequest } from "../../services/publicVenueApi";
import { formatPhoneInput, validateEventRequestForm } from "../../utils/validation";

const initialValues = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  eventType: "",
  requestedDate: "",
  startTime: "",
  endTime: "",
  venueAreaId: "",
  estimatedGuestCount: "",
  foodServiceNeeded: false,
  barServiceNeeded: false,
  notes: "",
  budgetRange: "",
  setupNeeds: "",
  entertainmentNeeds: "",
  indoorOutdoorPreference: "",
  alternateDate: "",
  callbackRequested: true,
};

const DEFAULT_OPERATING_WINDOW = {
  open: "09:00",
  close: "23:00",
};

const DAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function parseDateValue(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDateValue(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseTimeValue(value, baseDate = new Date()) {
  if (!value) return null;
  const [hours, minutes] = String(value).split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  const date = baseDate instanceof Date && !Number.isNaN(baseDate.getTime())
    ? new Date(baseDate)
    : new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatTimeValue(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return "";
  return `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
}

function formatReadableTime(value) {
  const date = parseTimeValue(value);
  if (!date) return value;
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function addMinutesToTime(time, minutesToAdd) {
  const date = parseTimeValue(time);
  if (!date) return "";
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return formatTimeValue(date);
}

function normalizeHoursEntry(entry) {
  if (Array.isArray(entry)) {
    return normalizeHoursEntry(entry[0]);
  }
  if (!entry || typeof entry !== "object") return null;
  if (entry.closed || entry.isClosed) return { closed: true };
  if (Array.isArray(entry.periods) && entry.periods.length) {
    return normalizeHoursEntry(entry.periods[0]);
  }
  if (Array.isArray(entry.slots) && entry.slots.length) {
    return normalizeHoursEntry(entry.slots[0]);
  }
  const open = entry.open || entry.openTime || entry.start || entry.startTime || entry.from || entry.opensAt;
  const close = entry.close || entry.closeTime || entry.end || entry.endTime || entry.to || entry.closesAt;
  if (!open || !close) return null;
  return { open, close, closed: false };
}

function resolveOperatingWindow(requestedDate, operatingHours) {
  const selectedDate = parseDateValue(requestedDate) || new Date();
  const dayKey = DAY_KEYS[selectedDate.getDay()];
  const candidate = operatingHours?.[dayKey] || operatingHours?.[dayKey.slice(0, 3)] || operatingHours?.default;
  const normalized = normalizeHoursEntry(candidate);
  if (!normalized || normalized.closed) return DEFAULT_OPERATING_WINDOW;
  return {
    open: normalized.open || DEFAULT_OPERATING_WINDOW.open,
    close: normalized.close || DEFAULT_OPERATING_WINDOW.close,
  };
}

function getTimeBounds(requestedDate, operatingWindow, kind, startTime = "") {
  const baseDate = parseDateValue(requestedDate) || new Date();
  const open = parseTimeValue(operatingWindow.open, baseDate);
  const close = parseTimeValue(operatingWindow.close, baseDate);
  if (!open || !close) return {};

  if (kind === "end") {
    const minimumEnd = startTime ? parseTimeValue(addMinutesToTime(startTime, 15), baseDate) : open;
    return {
      min: minimumEnd && minimumEnd > open ? minimumEnd : open,
      max: close,
    };
  }

  const latestStart = new Date(close);
  latestStart.setMinutes(latestStart.getMinutes() - 15);
  return {
    min: open,
    max: latestStart > open ? latestStart : close,
  };
}

function validateEventRequestValues(values, operatingWindow) {
  const errors = validateEventRequestForm(values);
  if (values.requestedDate && values.startTime) {
    const start = parseTimeValue(values.startTime, parseDateValue(values.requestedDate));
    const bounds = getTimeBounds(values.requestedDate, operatingWindow, "start");
    if (start && bounds.min && bounds.max && (start < bounds.min || start > bounds.max)) {
      errors.startTime = `Start time must be during venue hours (${operatingWindow.open} - ${operatingWindow.close}).`;
    }
  }
  if (values.requestedDate && values.endTime) {
    const end = parseTimeValue(values.endTime, parseDateValue(values.requestedDate));
    const bounds = getTimeBounds(values.requestedDate, operatingWindow, "end", values.startTime);
    if (end && bounds.min && bounds.max && (end < bounds.min || end > bounds.max)) {
      errors.endTime = `End time must be after start time and before ${operatingWindow.close}.`;
    }
  }
  return errors;
}

function DateControl({ value, onChange, placeholder = "Select date", required = false }) {
  return (
    <DatePickerComponent
      cssClass="legends-date-time-control"
      value={parseDateValue(value)}
      change={(args) => onChange(formatDateValue(args.value))}
      format="MM/dd/yyyy"
      placeholder={placeholder}
      min={new Date()}
      showClearButton={!required}
      openOnFocus
    />
  );
}

function TimeControl({ value, onChange, placeholder = "Select time", requestedDate, operatingWindow, kind = "start", startTime = "" }) {
  const baseDate = parseDateValue(requestedDate) || new Date();
  const bounds = getTimeBounds(requestedDate, operatingWindow, kind, startTime);
  return (
    <TimePickerComponent
      cssClass="legends-date-time-control"
      value={parseTimeValue(value, baseDate)}
      change={(args) => onChange(formatTimeValue(args.value))}
      format="h:mm a"
      placeholder={placeholder}
      min={bounds.min}
      max={bounds.max}
      step={15}
      showClearButton={false}
      openOnFocus
    />
  );
}

export default function EventRequestForm({ areas = VENUE_AREAS, defaults = {}, operatingHours = null, onCancel, onSuccess }) {
  const [values, setValues] = useState({ ...initialValues, ...defaults });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const mergedAreas = useMemo(() => (areas?.length ? areas : VENUE_AREAS), [areas]);
  const operatingWindow = useMemo(
    () => resolveOperatingWindow(values.requestedDate, operatingHours),
    [values.requestedDate, operatingHours],
  );
  const canSubmit = Object.keys(validateEventRequestValues(values, operatingWindow)).length === 0;

  function patch(field, value) {
    const nextValue = field === "customerPhone" ? formatPhoneInput(value) : value;
    setValues((current) => {
      const nextValues = { ...current, [field]: nextValue };
      if (field === "startTime" && nextValues.endTime && nextValues.endTime <= nextValue) {
        nextValues.endTime = "";
      }
      const nextOperatingWindow = resolveOperatingWindow(nextValues.requestedDate, operatingHours);
      const nextErrors = validateEventRequestValues(nextValues, nextOperatingWindow);
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
        endTime: nextErrors.endTime,
        startTime: nextErrors.startTime,
        requestedDate: nextErrors.requestedDate,
      }));
      return nextValues;
    });
    setSubmitError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateEventRequestValues(values, operatingWindow);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      setSubmitting(true);
      const result = await submitEventRequest(values);
      console.info("[LegendsEventRequest] submitted", {
        requestId: result?.requestId,
        status: result?.status,
        notifications: result?.notifications || null,
        warning: result?.warning || null,
      });
      onSuccess?.(result);
    } catch (error) {
      setSubmitError(error.data?.message || error.data?.error || error.message || "Unable to submit the request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section-header">
          <h3>Contact</h3>
        </div>
        <div className="form-grid">
        <Field label="Full name" helper="Primary contact for the event." error={errors.customerName} required>
          <input value={values.customerName} onChange={(event) => patch("customerName", event.target.value)} autoComplete="name" />
        </Field>
        <Field label="Phone" helper="Best number for confirmation or follow-up." error={errors.customerPhone} required>
          <input value={values.customerPhone} onChange={(event) => patch("customerPhone", event.target.value)} inputMode="tel" autoComplete="tel" />
        </Field>
        <Field label="Email" helper="Optional, but useful for written details." error={errors.customerEmail}>
          <input value={values.customerEmail} onChange={(event) => patch("customerEmail", event.target.value)} type="email" autoComplete="email" />
        </Field>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h3>Event Basics</h3>
        </div>
        <div className="form-grid">
        <Field label="Event type" helper="What kind of event are you planning?" error={errors.eventType} required>
          <select value={values.eventType} onChange={(event) => patch("eventType", event.target.value)}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Venue area" helper="Your preferred space at Legends." error={errors.venueAreaId} required>
          <select value={values.venueAreaId} onChange={(event) => patch("venueAreaId", event.target.value)}>
            <option value="">Select venue area</option>
            {mergedAreas.map((area) => (
              <option key={area.id || area.areaId} value={area.id || area.areaId}>
                {area.label || area.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated guest count" helper="Approximate number of people attending." error={errors.estimatedGuestCount} required>
          <input value={values.estimatedGuestCount} onChange={(event) => patch("estimatedGuestCount", event.target.value)} type="number" min="1" max="700" />
        </Field>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h3>Date, Time, and Preferences</h3>
        </div>
        <div className="form-grid">
        <Field label="Requested date" helper="First-choice event date." error={errors.requestedDate} required>
          <DateControl value={values.requestedDate} onChange={(value) => patch("requestedDate", value)} placeholder="Choose event date" required />
        </Field>
        <Field label="Start time" helper={`Available ${formatReadableTime(operatingWindow.open)} - ${formatReadableTime(operatingWindow.close)}.`} error={errors.startTime} required>
          <TimeControl value={values.startTime} onChange={(value) => patch("startTime", value)} placeholder="Choose start time" requestedDate={values.requestedDate} operatingWindow={operatingWindow} kind="start" />
        </Field>
        <Field label="End time" helper="Expected event end time." error={errors.endTime} required>
          <TimeControl value={values.endTime} onChange={(value) => patch("endTime", value)} placeholder="Choose end time" requestedDate={values.requestedDate} operatingWindow={operatingWindow} kind="end" startTime={values.startTime} />
        </Field>
        <Field label="Alternate date" helper="Optional backup date if your first choice is unavailable.">
          <DateControl value={values.alternateDate} onChange={(value) => patch("alternateDate", value)} placeholder="Choose backup date" />
        </Field>
        <Field label="Budget range" helper="Optional planning range for food, room, and services.">
          <select value={values.budgetRange} onChange={(event) => patch("budgetRange", event.target.value)}>
            <option value="">Optional</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </Field>
        <Field label="Indoor/outdoor preference" helper="Let staff know your space preference.">
          <select value={values.indoorOutdoorPreference} onChange={(event) => patch("indoorOutdoorPreference", event.target.value)}>
            <option value="">No preference</option>
            <option>Indoor</option>
            <option>Outdoor patio</option>
            <option>Indoor and outdoor</option>
          </select>
        </Field>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <h3>Services and Notes</h3>
        </div>
        <div className="checkbox-row">
          <label><input type="checkbox" checked={values.foodServiceNeeded} onChange={(event) => patch("foodServiceNeeded", event.target.checked)} /> Food service needed</label>
          <label><input type="checkbox" checked={values.barServiceNeeded} onChange={(event) => patch("barServiceNeeded", event.target.checked)} /> Bar service needed</label>
          <label><input type="checkbox" checked={values.callbackRequested} onChange={(event) => patch("callbackRequested", event.target.checked)} /> Please call me back</label>
        </div>
        <div className="form-grid two-column">
          <Field label="Setup or entertainment needs" helper="Examples: tables, staging, karaoke, AV, decor, seating plan, security, or music.">
            <textarea value={values.setupNeeds} onChange={(event) => patch("setupNeeds", event.target.value)} placeholder="Describe setup, equipment, entertainment, or room layout needs." />
          </Field>
          <Field label="Notes / special requests" helper="Anything else the Legends team should know before contacting you.">
            <textarea value={values.notes} onChange={(event) => patch("notes", event.target.value)} placeholder="Tell us what you are planning." />
          </Field>
        </div>
      </div>
      <p className="fine-print">
        Submitting a request does not guarantee availability. A Legends staff member will confirm your reservation.
      </p>
      {submitError ? <div className="form-error">{submitError}</div> : null}
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button className="gold-button submit-button" type="submit" disabled={!canSubmit || submitting}>
          {submitting ? "Submitting..." : "Submit Event Request"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, helper, error, required, children }) {
  return (
    <label className="form-field">
      <span>{label}{required ? " *" : ""}</span>
      {helper ? <em>{helper}</em> : null}
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
