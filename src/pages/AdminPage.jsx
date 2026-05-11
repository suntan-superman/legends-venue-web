import SectionHeader from "../components/venue/SectionHeader";

export default function AdminPage() {
  return (
    <main className="content-page narrow">
      <SectionHeader eyebrow="Staff access" title="Admin booking review lives in Merxus AI">
        <p>
          Public visitors never see private customer details. Legends staff should review, confirm, reject, and update event requests from the Merxus AI restaurant bookings workspace.
        </p>
      </SectionHeader>
      <div className="notice">
        This separate public website submits requests into the shared Merxus AI booking collection. Protected admin workflows should continue to use the authenticated Merxus portal.
      </div>
    </main>
  );
}
