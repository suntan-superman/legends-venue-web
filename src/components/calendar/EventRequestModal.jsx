import { X } from "lucide-react";
import EventRequestForm from "../forms/EventRequestForm";

export default function EventRequestModal({ open, onClose, areas, defaults, onSuccess }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Request private event">
      <div className="event-modal">
        <div className="modal-header">
          <div>
            <p>Private Event Request</p>
            <h2>Tell us about your event</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close request form">
            <X />
          </button>
        </div>
        <EventRequestForm areas={areas} defaults={defaults} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
