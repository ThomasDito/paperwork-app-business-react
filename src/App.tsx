import Layout from "@/components/layout";
import LoadingPage from "@/components/loading-page";
import ApplicationIndex from "@/pages/application";
import HistoryIndex from "@/pages/history";
import PageLayout from "@/pages/layout";
import ProfileIndex from "@/pages/profile";
import SecurityIndex from "@/pages/security";
import { useLazyMeQuery } from "@/redux/api/auth-api";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/auth-slice";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OrganizationListIndex from "@/pages/organization/organization-list";
import OrganizationSubmissionIndex from "@/pages/organization/submission";
import DashboardIndex from "@/pages/dashboard";
import OrganizationSubmissionShow from "@/pages/organization/submission/show";
import OrganizationListShow from "@/pages/organization/organization-list/show";
import TransactionInvoiceIndex from "@/pages/transaction/invoice";
import TransactionPaymentIndex from "@/pages/transaction/payment";
import UserIndex from "@/pages/user";
import UserShow from "@/pages/user/show";

export default function App() {
  const dispatch = useAppDispatch();

  const [getMe, { data: me, isSuccess }] = useLazyMeQuery();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (me) dispatch(login(me));
  }, [me]);

  if (isSuccess) {
    return (
      <Layout>
        <Routes>
          <Route element={<PageLayout />}>
            <Route>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<DashboardIndex />} />
              <Route path="profile" element={<ProfileIndex />} />
              <Route path="security" element={<SecurityIndex />} />
              <Route path="application" element={<ApplicationIndex />} />
              <Route path="history" element={<HistoryIndex />} />
            </Route>

            {/* <Route path="users">
              <Route index element={<UserIndex />} />
              <Route path="create" element={<UserCreate />} />
              <Route path=":userId" element={<UserShow />} />
              <Route path=":userId/edit" element={<UserEdit />} />
            </Route> */}

            <Route>
              <Route path="organization">
                <Route path="organization-list">
                  <Route index element={<OrganizationListIndex />} />
                  <Route path=":id" element={<OrganizationListShow />} />
                </Route>
                <Route path="submission">
                  <Route index element={<OrganizationSubmissionIndex />} />
                  <Route path=":id" element={<OrganizationSubmissionShow />} />
                </Route>
              </Route>

              <Route path="user">
                <Route index element={<UserIndex />} />
                <Route path=":id" element={<UserShow />} />
              </Route>

              <Route path="transaction">
                <Route path="invoice">
                  <Route index element={<TransactionInvoiceIndex />} />
                </Route>
                <Route path="payment">
                  <Route index element={<TransactionPaymentIndex />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Layout>
    );
  } else {
    return <LoadingPage />;
  }
}
