import { siteConfig } from "../config/siteConfig";
import { apiGet, apiPost } from "./apiClient";

function venuePath(suffix) {
  return `/api/public/venues/${encodeURIComponent(siteConfig.tenantSlug)}${suffix}`;
}

export function fetchVenueConfig() {
  return apiGet(venuePath("/config"));
}

export function fetchVenueAvailability({ start, end, venueAreaId } = {}) {
  const params = new URLSearchParams();
  if (start) params.set("start", start);
  if (end) params.set("end", end);
  if (venueAreaId) params.set("venueAreaId", venueAreaId);
  const query = params.toString();
  return apiGet(venuePath(`/availability${query ? `?${query}` : ""}`));
}

export function submitEventRequest(payload) {
  return apiPost(venuePath("/event-requests"), {
    ...payload,
    source: "legends_website",
  });
}
