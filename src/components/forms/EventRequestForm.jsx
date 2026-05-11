import { useMemo, useState } from "react";
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

export default function EventRequestForm({ areas = VENUE_AREAS, defaults = {}, onSuccess }) {
  const [values, setValues] = useState({ ...initialValues, ...defaults });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const mergedAreas = useMemo(() => (areas?.length ? areas : VENUE_AREAS), [areas]);
  const canSubmit = Object.keys(validateEventRequestForm(values)).length === 0;

  function patch(field, value) {
    const nextValue = field === "customerPhone" ? formatPhoneInput(value) : value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateEventRequestForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      setSubmitting(true);
      const result = await submitEventRequest(values);
      onSuccess?.(result);
    } catch (error) {
      setSubmitError(error.data?.message || error.data?.error || error.message || "Unable to submit the request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <Field label="Full name" error={errors.customerName} required>
          <input value={values.customerName} onChange={(event) => patch("customerName", event.target.value)} autoComplete="name" />
        </Field>
        <Field label="Phone" error={errors.customerPhone} required>
          <input value={values.customerPhone} onChange={(event) => patch("customerPhone", event.target.value)} inputMode="tel" autoComplete="tel" />
        </Field>
        <Field label="Email" error={errors.customerEmail}>
          <input value={values.customerEmail} onChange={(event) => patch("customerEmail", event.target.value)} type="email" autoComplete="email" />
        </Field>
        <Field label="Event type" error={errors.eventType} required>
          <select value={values.eventType} onChange={(event) => patch("eventType", event.target.value)}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </Field>
        <Field label="Requested date" error={errors.requestedDate} required>
          <input value={values.requestedDate} onChange={(event) => patch("requestedDate", event.target.value)} type="date" />
        </Field>
        <Field label="Start time" error={errors.startTime} required>
          <input value={values.startTime} onChange={(event) => patch("startTime", event.target.value)} type="time" />
        </Field>
        <Field label="End time" error={errors.endTime} required>
          <input value={values.endTime} onChange={(event) => patch("endTime", event.target.value)} type="time" />
        </Field>
        <Field label="Venue area" error={errors.venueAreaId} required>
          <select value={values.venueAreaId} onChange={(event) => patch("venueAreaId", event.target.value)}>
            <option value="">Select venue area</option>
            {mergedAreas.map((area) => (
              <option key={area.id || area.areaId} value={area.id || area.areaId}>
                {area.label || area.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estimated guest count" error={errors.estimatedGuestCount} required>
          <input value={values.estimatedGuestCount} onChange={(event) => patch("estimatedGuestCount", event.target.value)} type="number" min="1" max="700" />
        </Field>
        <Field label="Budget range">
          <select value={values.budgetRange} onChange={(event) => patch("budgetRange", event.target.value)}>
            <option value="">Optional</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </Field>
        <Field label="Alternate date">
          <input value={values.alternateDate} onChange={(event) => patch("alternateDate", event.target.value)} type="date" />
        </Field>
        <Field label="Indoor/outdoor preference">
          <select value={values.indoorOutdoorPreference} onChange={(event) => patch("indoorOutdoorPreference", event.target.value)}>
            <option value="">No preference</option>
            <option>Indoor</option>
            <option>Outdoor patio</option>
            <option>Indoor and outdoor</option>
          </select>
        </Field>
      </div>
      <div className="checkbox-row">
        <label><input type="checkbox" checked={values.foodServiceNeeded} onChange={(event) => patch("foodServiceNeeded", event.target.checked)} /> Food service needed</label>
        <label><input type="checkbox" checked={values.barServiceNeeded} onChange={(event) => patch("barServiceNeeded", event.target.checked)} /> Bar service needed</label>
        <label><input type="checkbox" checked={values.callbackRequested} onChange={(event) => patch("callbackRequested", event.target.checked)} /> Please call me back</label>
      </div>
      <Field label="Setup or entertainment needs">
        <textarea value={values.setupNeeds} onChange={(event) => patch("setupNeeds", event.target.value)} placeholder="Tables, staging, karaoke, AV, decor, seating, or other setup needs." />
      </Field>
      <Field label="Notes / special requests">
        <textarea value={values.notes} onChange={(event) => patch("notes", event.target.value)} placeholder="Tell us what you are planning." />
      </Field>
      <p className="fine-print">
        Submitting a request does not guarantee availability. A Legends staff member will confirm your reservation.
      </p>
      {submitError ? <div className="form-error">{submitError}</div> : null}
      <button className="gold-button submit-button" type="submit" disabled={!canSubmit || submitting}>
        {submitting ? "Submitting..." : "Submit Event Request"}
      </button>
    </form>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className="form-field">
      <span>{label}{required ? " *" : ""}</span>
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
