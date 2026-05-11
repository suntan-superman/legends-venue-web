import { Link } from "react-router-dom";

export default function VenueSpaceCard({ area }) {
  return (
    <article className="space-card">
      <img src={area.image} alt={area.label} />
      <div>
        <h3>{area.label}</h3>
        <p>{area.description}</p>
        <ul>
          {area.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link to={`/request-event?area=${encodeURIComponent(area.id)}`} className="small-gold-button">
          Request This Space
        </Link>
      </div>
    </article>
  );
}
