import { Separator } from "paperwork-ui";

export default function HomeIndex() {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Beranda</h2>
        <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
}
