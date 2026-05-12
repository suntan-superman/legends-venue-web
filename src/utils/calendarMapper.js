import { STATUS_COLORS } from "../config/statusColors";
import { getVenueAreaLabel } from "../config/venueAreas";

function normalizeAreaKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function areaKeys(area = {}) {
  return [
    area.id,
    area.areaId,
    area.value,
    area.name,
    area.label,
    area.shortLabel,
    area.type,
  ].map(normalizeAreaKey).filter(Boolean);
}

function resolvePublicAreaId(item = {}, areas = []) {
  const itemKeys = [
    item.venueAreaId,
    item.venueAreaLabel,
    item.assignedAreaId,
    item.assignedAreaName,
    item.requestedAreaId,
    item.requestedAreaName,
  ].map(normalizeAreaKey).filter(Boolean);

  const area = areas.find((candidate) => {
    const keys = new Set(areaKeys(candidate));
    return itemKeys.some((key) => keys.has(key));
  });

  return area?.id || area?.areaId || item.venueAreaId || "";
}

export function mapAvailabilityToScheduleEvents(items = [], areas = []) {
  return items.map((item) => {
    const venueAreaId = resolvePublicAreaId(item, areas);
    const publicTitle = item.publicTitle || `${getVenueAreaLabel(venueAreaId, areas)} - Reserved`;
    const guestText = item.partySize ? `${item.partySize} guests` : "";
    const contactText = [item.contactName, item.contactPhone].filter(Boolean).join(" | ");
    const description = [
      item.eventType,
      guestText,
      contactText,
      item.venueAreaLabel,
    ].filter(Boolean).join(" | ");

    return {
      Id: item.id,
      Subject: guestText ? `${publicTitle} (${guestText})` : publicTitle,
      StartTime: new Date(item.startTime),
      EndTime: new Date(item.endTime),
      VenueAreaId: venueAreaId,
      Status: item.status,
      Description: description,
      CategoryColor: STATUS_COLORS[item.status] || STATUS_COLORS.private_event,
      IsReadonly: true,
    };
  });
}

export function mapAreasToResources(areas = []) {
  return areas.map((area) => ({
    Id: area.id || area.areaId,
    Text: area.label || area.name,
    Color: (area.id || area.areaId) === "banquet_room" ? "#D4A017" : (area.id || area.areaId) === "outdoor_patio" ? "#10B981" : "#60A5FA",
  }));
}
