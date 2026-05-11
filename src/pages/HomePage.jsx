import { Link } from "react-router-dom";
import { CalendarDays, Martini, MapPin, Music, Phone, Utensils } from "lucide-react";
import GalleryGrid from "../components/venue/GalleryGrid";
import SectionHeader from "../components/venue/SectionHeader";
import VenueSpaceCard from "../components/venue/VenueSpaceCard";
import { siteConfig } from "../config/siteConfig";
import { VENUE_AREAS } from "../config/venueAreas";

const highlights = [
  ["Multiple bars", Martini],
  ["Full kitchen", Utensils],
  ["Karaoke and entertainment", Music],
  ["Space up to 700 guests", CalendarDays],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" />
        <div className="hero-content">
          <p>Private events in Bakersfield</p>
          <h1>Host your next event at Legends Lounge & Events Center.</h1>
          <span>
            A multi-room venue with multiple bars, full kitchen, outdoor patio, dining, cocktails, karaoke, and space for up to 700 guests.
          </span>
          <div className="hero-actions">
            <Link className="gold-button" to="/availability">
              <CalendarDays size={18} />
              Check Event Availability
            </Link>
            <a className="ghost-button" href={siteConfig.phoneHref}>
              <Phone size={18} />
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="highlight-strip">
        {highlights.map(([label, Icon]) => (
          <div key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="page-section">
        <SectionHeader eyebrow="Event-ready venue" title="A real place for real celebrations">
          <p>Weddings, holiday parties, birthdays, retirement parties, fundraisers, corporate events, sports watch parties, banquets, and private celebrations.</p>
        </SectionHeader>
        <div className="space-grid">
          {VENUE_AREAS.map((area) => <VenueSpaceCard key={area.id} area={area} />)}
        </div>
      </section>

      <section className="page-section split-section">
        <div>
          <SectionHeader eyebrow="Look and feel" title="Built for nights people remember" />
          <p className="large-copy">
            Legends brings together cocktails, dining, entertainment, a large outdoor patio, and flexible room layouts so your group does not have to settle for a plain banquet hall.
          </p>
          <Link className="small-gold-button" to="/events">Explore event types</Link>
        </div>
        <GalleryGrid />
      </section>

      <section className="contact-band">
        <MapPin />
        <div>
          <strong>{siteConfig.address}</strong>
          <span>Ready to check a date? Submit a request online or call the venue.</span>
        </div>
        <Link className="gold-button" to="/request-event">Request Event</Link>
      </section>
    </>
  );
}
