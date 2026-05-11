export const VENUE_AREAS = [
  {
    id: "main_dining_room",
    label: "Main Dining Room",
    shortLabel: "Dining Room",
    image: "/images/gallery/events-center.jpg",
    description: "Large indoor space for dining events, watch parties, fundraisers, and celebrations.",
    useCases: ["Large gatherings", "Dining events", "Watch parties", "Fundraisers"],
  },
  {
    id: "banquet_room",
    label: "Banquet Room",
    shortLabel: "Banquet",
    image: "/images/gallery/kentucky-derby-watch.jpg",
    description: "Private indoor room ideal for weddings, birthdays, retirement parties, and corporate events.",
    useCases: ["Weddings", "Birthdays", "Business events", "Private receptions"],
  },
  {
    id: "outdoor_patio",
    label: "Outdoor Patio",
    shortLabel: "Patio",
    image: "/images/gallery/line-dancing.jpg",
    description: "Large outdoor patio for relaxed celebrations, social events, sports watch parties, and evening gatherings.",
    useCases: ["Social events", "Sports nights", "Outdoor parties", "Evening gatherings"],
  },
];

export function getVenueAreaLabel(areaId, areas = VENUE_AREAS) {
  return areas.find((area) => area.id === areaId || area.areaId === areaId)?.label || areaId;
}
