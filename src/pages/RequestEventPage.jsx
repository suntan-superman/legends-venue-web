import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EventRequestForm from "../components/forms/EventRequestForm";
import SectionHeader from "../components/venue/SectionHeader";
import { siteConfig } from "../config/siteConfig";
import { fetchVenueConfig } from "../services/publicVenueApi";

export default function RequestEventPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [venueConfig, setVenueConfig] = useState(null);
  const defaults = useMemo(() => ({
    venueAreaId: params.get("area") || "",
    eventType: params.get("eventType") || "",
    requestedDate: params.get("date") || "",
  }), [params]);

  useEffect(() => {
    let isMounted = true;
    fetchVenueConfig()
      .then((config) => {
        if (isMounted) setVenueConfig(config);
      })
      .catch(() => {
        if (isMounted) setVenueConfig(null);
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
    <main className="content-page wide request-event-page">
      <section className="request-intro">
        <SectionHeader eyebrow="Private event request" title="Tell Legends about your event">
          <p>Use this form for venue rentals, banquets, watch parties, fundraisers, and large gatherings. A staff member will review availability before anything is confirmed.</p>
        </SectionHeader>
      </section>
      <section className="event-form-panel">
        <EventRequestForm
          defaults={defaults}
          areas={venueConfig?.venueAreas}
          operatingHours={venueConfig?.operatingHours}
          onCancel={() => navigate("/availability")}
          onSuccess={setSuccess}
        />
      </section>
    </main>
  );
}
