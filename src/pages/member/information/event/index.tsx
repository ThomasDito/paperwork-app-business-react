import { useMemo } from "react";
import moment from "moment-timezone";
import { CalendarEvent, momentLocalizer } from "paperwork-ui";
import { useBusinessMemberEventGetQuery } from "@/redux/api/business/member/event-api";

const now = new Date();
const localizer = momentLocalizer(moment);

export interface Event {
  allDay?: boolean;
  id: string | undefined;
  title?: React.ReactNode | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
}

export default function UserEventIndex() {
  // RTK Query
  const { data = [] } = useBusinessMemberEventGetQuery(undefined, {
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

  return (
    <>
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Kalender
        </h3>
      </div>
      <div className="rounded-md shadow-sm">
        <CalendarEvent
          defaultDate={now}
          events={events}
          localizer={localizer}
        />
      </div>
    </>
  );
}
