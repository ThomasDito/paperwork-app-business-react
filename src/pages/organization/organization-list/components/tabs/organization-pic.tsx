import { cn } from "paperwork-ui";
import { LucideUserSquare2 } from "lucide-react";
import { Input, Label } from "paperwork-ui";

export default function OrganizationPicTab({ organization }: { organization: showOrganizationResult }) {
  return (
    <div className="py-2">
      <div className="rounded-md shadow bg-card">
        <div className="flex items-center justify-between p-5 py-5 border-b">
          <div className="flex items-center font-semibold">
            <LucideUserSquare2 className="w-4 h-4 mr-2" /> Data Penanggung Jawab
          </div>
        </div>
        <div className="p-5">
          <div className="my-2 space-y-7">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="space-y-7">
                <div className="space-y-2">
                  <Label className="flex">Nama Penanggung Jawab</Label>
                  <Input readOnly value={organization.organization_pic.organization_pic_name} />
                </div>

                <div className="space-y-2">
                  <Label className="flex">Nomor Telepon</Label>
                  <Input readOnly value={organization.organization_pic.organization_pic_phone} />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label className="flex">KTP Penanggung Jawab</Label>
                <div className={cn("w-full py-10 border rounded-lg flex flex-col justify-center items-center flex-1 h-full shadow-sm")}>
                  <img className="max-w-full max-h-52" src={organization.organization_pic.organization_pic_ktp} alt="KTP" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
