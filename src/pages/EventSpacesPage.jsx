import SectionHeader from "../components/venue/SectionHeader";
import VenueSpaceCard from "../components/venue/VenueSpaceCard";
import { VENUE_AREAS } from "../config/venueAreas";

export default function EventSpacesPage() {
  return (
    <main className="content-page">
      <SectionHeader eyebrow="Venue spaces" title="Choose the room that fits the celebration">
        <p>Main Dining Room, Banquet Room, and Outdoor Patio can support a wide range of private events and large group gatherings.</p>
      </SectionHeader>
      <div className="space-grid vertical">
        {VENUE_AREAS.map((area) => <VenueSpaceCard key={area.id} area={area} />)}
      </div>
    </main>
  );
}
