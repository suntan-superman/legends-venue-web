import { STATUS_COLORS } from "../config/statusColors";
import { getVenueAreaLabel } from "../config/venueAreas";

export function mapAvailabilityToScheduleEvents(items = [], areas = []) {
  return items.map((item) => ({
    Id: item.id,
    Subject: item.publicTitle || `${getVenueAreaLabel(item.venueAreaId, areas)} - Reserved`,
    StartTime: new Date(item.startTime),
    EndTime: new Date(item.endTime),
    VenueAreaId: item.venueAreaId,
    Status: item.status,
    CategoryColor: STATUS_COLORS[item.status] || STATUS_COLORS.private_event,
    IsReadonly: true,
  }));
}

export function mapAreasToResources(areas = []) {
  return areas.map((area) => ({
    Id: area.id || area.areaId,
    Text: area.label || area.name,
    Color: (area.id || area.areaId) === "banquet_room" ? "#D4A017" : (area.id || area.areaId) === "outdoor_patio" ? "#10B981" : "#60A5FA",
  }));
}
