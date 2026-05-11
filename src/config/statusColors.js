export const STATUS_COLORS = {
  available: "#10B981",
  request_received: "#60A5FA",
  requested: "#60A5FA",
  pending_review: "#F59E0B",
  confirmed: "#10B981",
  deposit_pending: "#8B5CF6",
  deposit_received: "#059669",
  cancelled: "#6B7280",
  rejected: "#EF4444",
  completed: "#14B8A6",
  blocked: "#111827",
  hold: "#F97316",
  private_event: "#10B981",
};

export function formatStatus(status) {
  return String(status || "available")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
