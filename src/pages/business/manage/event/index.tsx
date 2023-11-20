import { useMemo } from "react";
import moment from "moment";
import { Button, CalendarEvent, momentLocalizer, SlotInfo } from "paperwork-ui";
import { LucidePlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBusinessEventGetQuery } from "@/redux/api/business/business/event-api";

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
        start: moment(event.event_start_date).utc(true).toDate(),
        end: moment(event.event_end_date).utc(true).toDate(),
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
      <div className="">
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
