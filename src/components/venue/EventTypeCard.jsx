import { Link } from "react-router-dom";

export default function EventTypeCard({ title, description }) {
  return (
    <article className="event-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/request-event?eventType=${encodeURIComponent(title)}`}>Request details</Link>
    </article>
  );
}
