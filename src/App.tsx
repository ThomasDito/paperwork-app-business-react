import Layout from "@/components/layout";
import LoadingPage from "@/components/loading-page";
import ApplicationIndex from "@/pages/application";
import HistoryIndex from "@/pages/history";
import PageLayout from "@/pages/layout";
import ProfileIndex from "@/pages/profile";
import SecurityIndex from "@/pages/security";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/auth-slice";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import OrganizationListIndex from "@/pages/organization/organization-list";
import OrganizationSubmissionIndex from "@/pages/organization/submission";
import DashboardIndex from "@/pages/dashboard";
import OrganizationSubmissionShow from "@/pages/organization/submission/show";
import OrganizationListShow from "@/pages/organization/organization-list/show";
import TransactionInvoiceIndex from "@/pages/transaction/invoice";
import TransactionPaymentIndex from "@/pages/transaction/payment";
import UserIndex from "@/pages/user";
import UserShow from "@/pages/user/show";
import OnboardingIndex from "@/pages/onboarding";
import OnboardingWelcomeIndex from "@/pages/onboarding/welcome";
import { useLazyMeQuery } from "@/redux/api/paperwork/auth-api";
import { setOrganization } from "@/redux/slices/organization-slice";
import SettingIndex from "@/pages/setting";
import BranchIndex from "@/pages/setting/branch";
import OrganizationIndex from "@/pages/setting/organization";
import DivisionIndex from "@/pages/setting/division";
import PositionIndex from "@/pages/setting/position";
import LevelIndex from "@/pages/setting/level";
import EmployeeStatusIndex from "@/pages/setting/employee-status";
import { useLazyBusinessOrganizationGetQuery } from "@/redux/api/business/organization-api";
import BranchForm from "@/pages/setting/branch/form";
import BranchDelete from "@/pages/setting/branch/delete";

export default function App() {
  // hooks
  const dispatch = useAppDispatch();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  const [getMe, { data: me, isSuccess: getMeIsSuccess }] = useLazyMeQuery();
  const [
    getOrganization,
    { data: organization, isSuccess: getOrganizationIsSuccess },
  ] = useLazyBusinessOrganizationGetQuery();

  useEffect(() => {
    getMe();
    getOrganization();
  }, []);

  useEffect(() => {
    if (me) dispatch(login(me));
  }, [me]);

  useEffect(() => {
    if (organization) dispatch(setOrganization(organization));
  }, [organization]);

  // return <OnboardingIndex />;

  if (getMeIsSuccess || getOrganizationIsSuccess) {
    return (
      <Layout>
        <Routes location={previousLocation || location}>
          <Route element={<PageLayout />}>
            <Route path="setting" element={<SettingIndex />}>
              <Route
                index
                element={<Navigate to={"/setting/organization"} />}
              />
              <Route path="organization" element={<OrganizationIndex />} />
              <Route path="branch" element={<BranchIndex />} />
              <Route path="division" element={<DivisionIndex />} />
              <Route path="position" element={<PositionIndex />} />
              <Route path="level" element={<LevelIndex />} />
              <Route path="employee-status" element={<EmployeeStatusIndex />} />
            </Route>

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

        {/* Modals */}
        {previousLocation && (
          <Routes>
            <Route path="setting">
              <Route path="branch/form/:id?" element={<BranchForm />} />
              <Route path="branch/delete/:id" element={<BranchDelete />} />
            </Route>
          </Routes>
        )}
      </Layout>
    );
  } else {
    return <LoadingPage />;
  }
}
