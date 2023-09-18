import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "paperwork-ui";
import config from "@/lib/config";
import moment from "moment";

type Props = {
  session: user_session;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function SessionModalShow({ session, isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Detail Sesi</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-foreground">
          <div className="space-y-2 text-sm">
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Aktivitas Terakhir</div>
              <div className="flex items-center">{moment(session.updated_at).format("DD MMMM YYYY HH:mm")}</div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Alamat IP</div>
              <div>{session.user_session_ip_address ?? "-"}</div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Perantara</div>
              <div>{session.organization ? session.organization.organization_nicename + config.SUBDOMAIN_URL : config.LOGIN_URL}</div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Perangkat</div>
              <div className="first-letter:uppercase">{session.user_session_device ?? "-"}</div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Browser</div>
              <div>
                {session.user_session_browser ?? "-"} {session.user_session_browser_version}
              </div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">OS</div>
              <div>{session.user_session_os ?? "-"}</div>
            </div>
            <div className="pb-3 space-y-2 border-b">
              <div className="font-medium">Platform</div>
              <div>{session.user_session_platform ?? "-"}</div>
            </div>
            <div className="pb-3 space-y-2">
              <div className="font-medium">User Agent</div>
              <div>{session.user_session_source ?? "-"}</div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
