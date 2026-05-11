import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EventRequestForm from "../components/forms/EventRequestForm";
import SectionHeader from "../components/venue/SectionHeader";
import { siteConfig } from "../config/siteConfig";

export default function RequestEventPage() {
  const [params] = useSearchParams();
  const [success, setSuccess] = useState(null);
  const defaults = useMemo(() => ({
    venueAreaId: params.get("area") || "",
    eventType: params.get("eventType") || "",
    requestedDate: params.get("date") || "",
  }), [params]);

  if (success) {
    return (
      <main className="content-page narrow">
        <div className="success-card">
          <p>Request received</p>
          <h1>Your event request has been received.</h1>
          <span>A Legends team member will review the request and contact you to confirm availability. Your reservation is not confirmed yet.</span>
          <div className="hero-actions">
            <a className="gold-button" href={siteConfig.phoneHref}>Need help now? Call {siteConfig.phone}</a>
            <Link className="ghost-button" to="/availability">Back to availability</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="content-page narrow">
      <SectionHeader eyebrow="Private event request" title="Tell Legends about your event">
        <p>Use this form for private event venue rentals, banquets, watch parties, fundraisers, and large gatherings. Dinner reservations are not confirmed from this form.</p>
      </SectionHeader>
      <EventRequestForm defaults={defaults} onSuccess={setSuccess} />
    </main>
  );
}
