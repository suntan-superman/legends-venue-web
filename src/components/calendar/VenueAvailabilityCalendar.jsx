import { useEffect, useMemo, useRef, useState } from "react";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { fetchVenueAvailability, fetchVenueConfig } from "../../services/publicVenueApi";
import { mapAreasToResources, mapAvailabilityToScheduleEvents } from "../../utils/calendarMapper";
import { getVisibleRange, toDateInputValue } from "../../utils/dateTime";
import { VENUE_AREAS } from "../../config/venueAreas";
import CalendarLegend from "./CalendarLegend";
import EventRequestModal from "./EventRequestModal";
import VenueAreaFilter from "./VenueAreaFilter";

function getAreaId(area) {
  return area?.id || area?.areaId || "";
}

function getAvailabilityErrorMessage(error) {
  if (error?.status === 404) {
    return "Availability is not connected yet. Deploy the Merxus AI backend with the public venue routes and set LEGENDS_TENANT_ID for the Legends tenant.";
  }
  if (String(error?.message || "").includes("Failed to fetch") || String(error?.message || "").includes("ERR_CONNECTION_REFUSED")) {
    return "Availability is not connected yet. Deploy the Merxus AI backend with the public venue routes, allow this website origin in CORS, and set LEGENDS_TENANT_ID for the Legends tenant.";
  }
  return error?.message || "Unable to load availability.";
}

const CALENDAR_STORAGE_KEYS = {
  view: "legendsAvailabilityCalendar.view",
  selectedDate: "legendsAvailabilityCalendar.selectedDate",
  venueAreaId: "legendsAvailabilityCalendar.venueAreaId",
};

const CALENDAR_VIEWS = new Set(["Day", "Week", "Month", "Agenda"]);

function readStoredValue(key, fallback = "") {
  try {
    return window.localStorage?.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    if (value === undefined || value === null || value === "") {
      window.localStorage?.removeItem(key);
    } else {
      window.localStorage?.setItem(key, String(value));
    }
  } catch (_) {}
}

function readStoredDate(key, fallback = new Date()) {
  const stored = readStoredValue(key, "");
  const parsed = stored ? new Date(stored) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : fallback;
}

export default function VenueAvailabilityCalendar() {
  const scheduleRef = useRef(null);
  const [config, setConfig] = useState(null);
  const [items, setItems] = useState([]);
  const [areaFilter, setAreaFilter] = useState(() => readStoredValue(CALENDAR_STORAGE_KEYS.venueAreaId, ""));
  const [calendarView, setCalendarView] = useState(() => {
    const stored = readStoredValue(CALENDAR_STORAGE_KEYS.view, "");
    return CALENDAR_VIEWS.has(stored) ? stored : "";
  });
  const [calendarDate, setCalendarDate] = useState(() => readStoredDate(CALENDAR_STORAGE_KEYS.selectedDate, new Date()));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [requestDefaults, setRequestDefaults] = useState({});
  const [success, setSuccess] = useState(null);
  const isMobile = useMemo(() => window.matchMedia?.("(max-width: 720px)")?.matches, []);
  const activeView = calendarView || (isMobile ? "Agenda" : "Month");

  const areas = config?.venueAreas?.length ? config.venueAreas : VENUE_AREAS;
  const visibleAreas = useMemo(
    () => areaFilter ? areas.filter((area) => getAreaId(area) === areaFilter) : areas,
    [areaFilter, areas],
  );
  const visibleItems = useMemo(
    () => areaFilter ? items.filter((item) => item.venueAreaId === areaFilter) : items,
    [areaFilter, items],
  );
  const resources = useMemo(() => mapAreasToResources(visibleAreas), [visibleAreas]);
  const events = useMemo(() => mapAvailabilityToScheduleEvents(visibleItems, areas), [visibleItems, areas]);
  const schedulerKey = useMemo(
    () => `${areaFilter || "all"}-${resources.map((resource) => resource.Id).join("|")}`,
    [areaFilter, resources],
  );

  async function load() {
    try {
      setLoading(true);
      setError("");
      const venueConfig = await fetchVenueConfig();
      setConfig(venueConfig);
      const range = getVisibleRange(calendarDate, 120);
      const availability = await fetchVenueAvailability({
        ...range,
        venueAreaId: areaFilter,
      });
      setItems(availability.items || []);
    } catch (loadError) {
      setError(getAvailabilityErrorMessage(loadError));
      setConfig((current) => current || {
        venueAreas: VENUE_AREAS,
        publicCalendarVisibility: "status_only",
      });
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaFilter, calendarDate]);

  useEffect(() => {
    if (!areaFilter || !areas.length) return;
    const areaExists = areas.some((area) => getAreaId(area) === areaFilter);
    if (!areaExists) {
      setAreaFilter("");
      writeStoredValue(CALENDAR_STORAGE_KEYS.venueAreaId, "");
    }
  }, [areaFilter, areas]);

  function handleAreaFilterChange(nextAreaId) {
    setAreaFilter(nextAreaId);
    writeStoredValue(CALENDAR_STORAGE_KEYS.venueAreaId, nextAreaId);
  }

  function handleScheduleActionComplete(args) {
    const schedule = scheduleRef.current;
    const nextView = args?.currentView || schedule?.currentView;
    if (CALENDAR_VIEWS.has(nextView)) {
      setCalendarView(nextView);
      writeStoredValue(CALENDAR_STORAGE_KEYS.view, nextView);
    }

    const nextDate = schedule?.selectedDate || args?.selectedDate || args?.currentDate || null;
    if (nextDate instanceof Date && !Number.isNaN(nextDate.getTime())) {
      setCalendarDate(nextDate);
      writeStoredValue(CALENDAR_STORAGE_KEYS.selectedDate, nextDate.toISOString());
    }
  }

  function openRequest(defaults = {}) {
    setSuccess(null);
    setRequestDefaults(defaults);
    setModalOpen(true);
  }

  function handleCellClick(args) {
    const selectedDate = args?.startTime || new Date();
    openRequest({
      requestedDate: toDateInputValue(selectedDate),
      venueAreaId: areaFilter,
    });
  }

  function handleEventRendered(args) {
    const color = args.data?.CategoryColor;
    if (color) {
      args.element.style.backgroundColor = color;
      args.element.style.borderColor = color;
    }
  }

  function handleSuccess(result) {
    setModalOpen(false);
    setSuccess(result);
    if (result?.booking) {
      setItems((current) => {
        const next = current.filter((item) => item.id !== result.booking.id);
        return [...next, result.booking];
      });
    }
    load();
  }

  return (
    <section className="calendar-shell">
      <div className="calendar-toolbar">
        <div>
          <p>Private Event Calendar</p>
          <h2>Check space availability</h2>
        </div>
        <VenueAreaFilter areas={areas} value={areaFilter} onChange={handleAreaFilterChange} />
      </div>
      <div className="notice">
        Private event requests are reviewed by Legends staff. Your reservation is not confirmed until you receive confirmation.
      </div>
      <CalendarLegend />
      {success ? (
        <div className="success-panel">
          <strong>Your event request has been received.</strong>
          <span>A Legends team member will review the request and contact you to confirm availability.</span>
        </div>
      ) : null}
      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-panel">Loading availability...</div> : null}
      <ScheduleComponent
        ref={scheduleRef}
        key={schedulerKey}
        height={isMobile ? "620px" : "720px"}
        selectedDate={calendarDate}
        currentView={activeView}
        readonly
        group={{ resources: ["VenueAreas"] }}
        eventSettings={{
          dataSource: events,
          fields: {
            id: "Id",
            subject: { name: "Subject" },
            startTime: { name: "StartTime" },
            endTime: { name: "EndTime" },
          },
        }}
        cellClick={handleCellClick}
        eventRendered={handleEventRendered}
        actionComplete={handleScheduleActionComplete}
        popupOpen={(args) => {
          if (args.type === "Editor") args.cancel = true;
        }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="VenueAreaId"
            title="Venue Area"
            name="VenueAreas"
            dataSource={resources}
            textField="Text"
            idField="Id"
            colorField="Color"
          />
        </ResourcesDirective>
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
      <div className="calendar-cta">
        <button className="gold-button" onClick={() => openRequest({ venueAreaId: areaFilter })}>
          Request Private Event
        </button>
      </div>
      <EventRequestModal
        open={modalOpen}
        areas={areas}
        defaults={requestDefaults}
        operatingHours={config?.operatingHours}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </section>
  );
}
