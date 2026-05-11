import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>Legends Lounge & Events Center</h2>
        <p>Private events, banquets, watch parties, karaoke nights, cocktails, dining, and a large outdoor patio in Bakersfield.</p>
      </div>
      <div>
        <h3>Visit</h3>
        <a href={siteConfig.mapHref} target="_blank" rel="noreferrer">
          <MapPin size={16} />
          {siteConfig.address}
        </a>
        <a href={siteConfig.phoneHref}>
          <Phone size={16} />
          {siteConfig.phone}
        </a>
      </div>
      <div>
        <h3>Plan</h3>
        <Link to="/availability">Check Event Availability</Link>
        <Link to="/request-event">Request Private Event</Link>
        <Link to="/event-spaces">View Event Spaces</Link>
      </div>
    </footer>
  );
}
