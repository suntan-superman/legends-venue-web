export default function VenueAreaFilter({ areas, value, onChange }) {
  return (
    <label className="area-filter">
      <span>Venue space</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All spaces</option>
        {areas.map((area) => (
          <option key={area.id || area.areaId} value={area.id || area.areaId}>
            {area.label || area.name}
          </option>
        ))}
      </select>
    </label>
  );
}
