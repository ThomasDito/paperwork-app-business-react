import { useMemo } from "react";
import moment from "moment-timezone";
import { Button, CalendarEvent, momentLocalizer, SlotInfo } from "paperwork-ui";
import { LucidePlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBusinessEventGetQuery } from "@/redux/api/business/business/event-api";
import { Link } from "react-router-dom"; // import untuk Link

const now = new Date();
const localizer = momentLocalizer(moment);

export interface Event {
  allDay?: boolean;
  id: string | undefined;
  title?: React.ReactNode | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
}

export default function EventIndex() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // RTK Query
  const { data = [] } = useBusinessEventGetQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const events: Event[] = useMemo(() => {
    return data.map((event) => {
      return {
        allDay: true,
        id: event.id,
        title: event.event_name,
        start: moment(event.event_start_date).toDate(),
        end: moment(event.event_end_date).toDate(),
      } as Event;
    });
  }, [data]);

  const onSelectSlot = ({ start, end }: SlotInfo) => {
    const startDate = moment(start).format("YYYY-MM-DD");
    const endDate = moment(end).subtract(1, "day").format("YYYY-MM-DD");

    navigate(`/modal/event/form/${startDate}/${endDate}`, {
      state: { previousLocation: location },
    });
  };

  const onSelectEvent = (e: object) => {
    const event = e as Event;
    navigate(`/modal/event/form/${event.id}`, {
      state: { previousLocation: location },
    });
  };

  return (
    <>
    {/* Breadcrumb */}
    <nav className="text-sm font-medium mb-4" aria-label="Breadcrumb">
        <ol className="flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              Home
            </Link>
            <svg
              className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/business/manage/event" className="text-gray-400 hover:text-gray-500">
              Pengelolaan
            </Link>
            <svg
              className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">Kalender</span>
          </li>
        </ol>
      </nav>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Kalender
        </h3>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => {
                const startDate = moment().format("YYYY-MM-DD");
                const endDate = moment().format("YYYY-MM-DD");

                navigate(`/modal/event/form/${startDate}/${endDate}`, {
                  state: { previousLocation: location },
                });
              }}
            >
              <LucidePlus className="w-5 h-5 mr-2" /> Tambah Acara
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md shadow-sm">
        <CalendarEvent
          defaultDate={now}
          events={events}
          localizer={localizer}
          onSelectSlot={onSelectSlot}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </>
  );
}
