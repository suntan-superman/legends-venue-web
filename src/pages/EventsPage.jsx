import EventTypeCard from "../components/venue/EventTypeCard";
import SectionHeader from "../components/venue/SectionHeader";

const events = [
  ["Weddings", "Flexible room options for receptions, rehearsal dinners, and private celebrations."],
  ["Holiday parties", "Christmas parties, company gatherings, and seasonal celebrations with bar and food options."],
  ["Birthday parties", "Bring together family and friends for milestone birthdays and private party nights."],
  ["Retirement parties", "Comfortable indoor spaces for honoring a career and hosting a relaxed reception."],
  ["Fundraisers", "Room for raffles, auctions, speeches, food service, and social time."],
  ["Corporate events", "A less corporate venue for staff events, client gatherings, and business celebrations."],
  ["Sports watch parties", "Gather fans for big games with drinks, dining, and plenty of energy."],
  ["Karaoke/private entertainment nights", "Plan a night around music, dancing, and entertainment."],
];

export default function EventsPage() {
  return (
    <main className="content-page">
      <SectionHeader eyebrow="Event types" title="Bring the party, meeting, or milestone to Legends">
        <p>Tell us what you are planning, your guest count, and the space you prefer. Legends staff will review availability before confirming.</p>
      </SectionHeader>
      <div className="event-grid">
        {events.map(([title, description]) => <EventTypeCard key={title} title={title} description={description} />)}
      </div>
    </main>
  );
}
