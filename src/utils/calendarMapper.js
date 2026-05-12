import { STATUS_COLORS } from "../config/statusColors";
import { getVenueAreaLabel } from "../config/venueAreas";

export function mapAvailabilityToScheduleEvents(items = [], areas = []) {
  return items.map((item) => {
    const publicTitle = item.publicTitle || `${getVenueAreaLabel(item.venueAreaId, areas)} - Reserved`;
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
      VenueAreaId: item.venueAreaId,
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
