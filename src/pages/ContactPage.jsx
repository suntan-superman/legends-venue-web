import { CalendarDays, ExternalLink, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/venue/SectionHeader";
import { siteConfig } from "../config/siteConfig";

export default function ContactPage() {
  return (
    <main className="content-page">
      <SectionHeader eyebrow="Contact" title="Talk with Legends about your next event">
        <p>Submit a request online or call the venue for current event availability.</p>
      </SectionHeader>
      <div className="contact-grid">
        <article>
          <MapPin />
          <h3>Location</h3>
          <p>{siteConfig.address}</p>
          <a href={siteConfig.mapHref} target="_blank" rel="noreferrer">Open map <ExternalLink size={14} /></a>
        </article>
        <article>
          <Phone />
          <h3>Phone</h3>
          <p>{siteConfig.phone}</p>
          <a href={siteConfig.phoneHref}>Call venue</a>
        </article>
        <article>
          <CalendarDays />
          <h3>Private events</h3>
          <p>Requests are reviewed by staff before confirmation.</p>
          <Link to="/request-event">Request event</Link>
        </article>
      </div>
    </main>
  );
}
