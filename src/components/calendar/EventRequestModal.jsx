import { useEffect } from "react";
import { X } from "lucide-react";
import EventRequestForm from "../forms/EventRequestForm";

export default function EventRequestModal({ open, onClose, areas, defaults, onSuccess }) {
  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

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
        <EventRequestForm areas={areas} defaults={defaults} onCancel={onClose} onSuccess={onSuccess} />
      </div>
    </div>
  );
}
