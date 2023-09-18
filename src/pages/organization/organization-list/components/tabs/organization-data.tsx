import { ORGANIZATION_TYPE_LABEL } from "@/consts/global";
import config from "@/lib/config";
import { LucideFile, LucideImage } from "lucide-react";
import { Input, Label, cn } from "paperwork-ui";

export default function OrganizationDataTab({ organization }: { organization: showOrganizationResult }) {
  return (
    <div className="py-2">
      <div className="rounded-md shadow bg-card">
        <div className="flex items-center justify-between p-5 py-5 border-b">
          <div className="flex items-center font-semibold">
            <LucideFile className="w-4 h-4 mr-2" /> Data Organisasi
          </div>
        </div>
        <div className="p-5">
          <div className="my-2 space-y-7">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="space-y-7">
                <div className="space-y-2">
                  <Label className="flex">Tipe Organisasi</Label>
                  <Input readOnly value={ORGANIZATION_TYPE_LABEL[organization.organization_type]} />
                </div>

                <div className="space-y-2">
                  <Label className="flex">Nama Organisasi</Label>
                  <Input readOnly value={organization.organization_name} />
                </div>

                <div className="space-y-2">
                  <Label className="flex">Organisasi ID</Label>
                  <div className="flex items-center space-x-3">
                    <Input className="" readOnly value={organization.organization_nicename} />
                    <div className="text-sm text-muted-foreground">{config.SUBDOMAIN_URL}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex">Pendiri</Label>
                  <Input readOnly value={organization.user.user_fullname} />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label className="flex">Logo Organisasi</Label>
                <div className={cn("w-full py-10 border rounded-lg flex flex-col justify-center items-center flex-1 h-full shadow-sm")}>
                  {organization.organization_logo ? (
                    <img className="max-w-full max-h-52" src={organization.organization_logo} alt="Logo" />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                      <LucideImage className="w-16 h-16 text-slate-400" />
                      <div className="text-sm font-medium text-slate-400">Belum Ada Logo</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex">Alamat 1</Label>
              <Input readOnly value={organization.organization_address_1} />
            </div>

            <div className="space-y-2">
              <Label className="flex">Alamat 2</Label>
              <Input readOnly value={organization.organization_address_2 ?? "-"} />
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="flex">Provinsi</Label>
                <Input readOnly value={organization.province.region_name} />
              </div>
              <div className="space-y-2">
                <Label className="flex">Kabupaten/Kota</Label>
                <Input readOnly value={organization.city.region_name} />
              </div>
              <div className="space-y-2">
                <Label className="flex">Kode Pos</Label>
                <Input readOnly value={organization.organization_postal_code} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
