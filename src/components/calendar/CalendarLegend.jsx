import { STATUS_COLORS, formatStatus } from "../../config/statusColors";

const statuses = ["request_received", "pending_review", "confirmed", "deposit_pending", "blocked"];

export default function CalendarLegend() {
  return (
    <div className="calendar-legend">
      {statuses.map((status) => (
        <span key={status}>
          <i style={{ background: STATUS_COLORS[status] }} />
          {formatStatus(status)}
        </span>
      ))}
    </div>
  );
}
