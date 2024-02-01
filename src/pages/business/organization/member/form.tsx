import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessMemberStoreMutation,
  useLazyBusinessMemberCheckByEmailQuery,
} from "@/redux/api/business/business/member-api";
import { user } from "@/types/schema";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucidePlus, LucideSearch } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "paperwork-ui";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  user_email: z
    .string()
    .trim()
    .email("Email tidak valid")
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter"),
  user_fullname: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .optional(),
});

export type MemberFormSchema = z.infer<typeof formSchema>;

export default function MemberForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query

  const [checkByEmail, { isFetching: checkByEmailIsFetching }] =
    useLazyBusinessMemberCheckByEmailQuery();

  const [storeMember, { isLoading: storeIsLoading }] =
    useBusinessMemberStoreMutation();

  const isLoading = checkByEmailIsFetching || storeIsLoading;

  // States
  const [initialValues] = useState<MemberFormSchema>({
    user_email: "",
  });

  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const onSubmit = async (values: MemberFormSchema) => {
    await storeMember(values)
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Anggota berhasil ditambahkan");
        closeModal();
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message ||
            "Terjadi kesalahan ketika menambahkan anggota"
        );
      });
  };

  const doCheckByEmail = async (email: string) => {
    setSelectedUser(null);
    await checkByEmail(email)
      .unwrap()
      .then((response) => {
        setSelectedUser(response);
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
      });
  };

  const closeModal = () => navigate(location.state.previousLocation);

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formik) => {
        return (
          <Form>
            <Dialog open={true} onOpenChange={() => closeModal()}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{id ? "Ubah" : "Tambah"} Anggota</DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Alamat Email"
                      name="user_email"
                      id="user_email"
                      placeholder="Alamat Email"
                      type="email"
                      onChange={(e) => {
                        formik.setFieldValue("user_email", e.target.value);
                        setSelectedUser(null);
                      }}
                      rightComponent={
                        <Button
                          disabled={!!formik.errors.user_email || isLoading}
                          onClick={() => {
                            if (!formik.errors.user_email) {
                              doCheckByEmail(formik.values.user_email);
                            }
                          }}
                        >
                          {isLoading ? (
                            <LucideLoader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <LucideSearch className="w-5 h-5" />
                          )}
                        </Button>
                      }
                    />
                  </div>

                  {selectedUser && (
                    <div className="border p-5 shadow-sm rounded-md !mt-5">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={selectedUser.user_avatar || ""}
                            alt={selectedUser.user_fullname}
                          />
                          <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                            {selectedUser.user_fullname.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col flex-1 space-y-1">
                          {selectedUser.user_fullname}
                          <div className="text-sm text-muted-foreground">
                            {selectedUser.user_email}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogHeader>
                <DialogFooter className="pt-8">
                  <Button
                    className="w-full mt-2 mr-1 bg-card sm:mt-0"
                    type="button"
                    variant={"outline"}
                    onClick={() => closeModal()}
                  >
                    Batal
                  </Button>
                  <Button
                    size={"default"}
                    type="submit"
                    className="w-full"
                    disabled={
                      !selectedUser ||
                      isLoading ||
                      !(formik.dirty && formik.isValid)
                    }
                    onClick={() => formik.submitForm()}
                  >
                    {isLoading && !checkByEmailIsFetching ? (
                      <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <div className="flex items-center">
                        <LucidePlus className="w-5 h-5 mr-2" />
                        Tambahkan
                      </div>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
