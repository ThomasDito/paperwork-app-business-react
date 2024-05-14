import Layout from "@/components/layout";
import LoadingPage from "@/components/loading-page";
import PageLayout from "@/pages/layout";
import { useAppDispatch } from "@/redux/hooks";
import { login, setOrganization, setRoles } from "@/redux/slices/auth-slice";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardIndex from "@/pages/business/dashboard";
import { useMeQuery } from "@/redux/api/paperwork/auth-api";
import SettingIndex from "@/pages/business/organization/setting";
import OrganizationSetting from "@/pages/business/organization/setting/organization";
import { useBusinessOrganizationGetQuery } from "@/redux/api/business/business/organization-api";
import RoleIndex from "@/pages/business/organization/role";
import ApplicationIndex from "@/pages/business/application";
import EventIndex from "@/pages/business/manage/event";
import InformationIndex from "@/pages/business/manage/information";
import LandingPageIndex from "@/pages/business/manage/landing-page";
import UserEventIndex from "@/pages/member/information/event";
import UserInformationIndex from "@/pages/member/information/information";
import UserActivityIndex from "@/pages/member/information/activity";
import UserHelpIndex from "@/pages/member/information/help";
import UserDashboardIndex from "@/pages/member/dashboard";
import RoleForm from "@/pages/business/organization/role/form";
import RoleDelete from "@/pages/business/organization/role/delete";
import InformationForm from "@/pages/business/manage/information/form";
import InformationDelete from "@/pages/business/manage/information/delete";
import { useBusinessMemberAccountModulesQuery } from "@/redux/api/business/member/account-api";
import { CheckRoleOutlet } from "@/components/check-role";
import EventForm from "@/pages/business/manage/event/form";
import ApplicationInstall from "@/pages/business/application/install";
import MemberIndex from "@/pages/business/organization/member";
import MemberInvite from "@/pages/business/organization/member/invite";
import MemberDelete from "@/pages/business/organization/member/delete";
import MemberCreate from "@/pages/business/organization/member/create";
import LanguageSetting from "@/pages/business/organization/setting/language";
import MemberResend from "@/pages/business/organization/member/resend";
import MemberApplicationIndex from "@/pages/member/application";
import moment from "moment-timezone";
import NewFeatureIndex from "@/pages/member/information/new-feature";

export default function App() {
  // Hooks
  const dispatch = useAppDispatch();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  // RTK Query
  const { data: me, isSuccess: meIsSuccess } = useMeQuery();
  const { data: organization, isSuccess: organizationIsSuccess } =
    useBusinessOrganizationGetQuery();
  const { data: roles, isSuccess: rolesIsSuccess } =
    useBusinessMemberAccountModulesQuery();

  // States
  useEffect(() => {
    if (me) {
      dispatch(login(me));
    }
  }, [me]);

  useEffect(() => {
    if (organization) {
      dispatch(setOrganization(organization));
      moment.tz.setDefault(organization.organization_timezone);
    }
  }, [organization]);

  useEffect(() => {
    if (roles) {
      dispatch(setRoles(roles));
    }
  }, [roles]);

  if (meIsSuccess && organizationIsSuccess && rolesIsSuccess) {
    return (
      <Layout>
        <Routes location={previousLocation || location}>
          <Route element={<PageLayout />}>
            <Route
              index
              element={<Navigate to={"/business/organization/member"} />}
            />

            <Route path="business">
              <Route path="dashboard" element={<DashboardIndex />} />
              <Route path="application" element={<ApplicationIndex />} />
              <Route path="organization">
                <Route
                  index
                  element={<Navigate to={"/business/organization/member"} />}
                />

                <Route
                  path="member"
                  element={<CheckRoleOutlet module={"member"} />}
                >
                  <Route index element={<MemberIndex />} />
                </Route>

                <Route
                  path="role"
                  element={<CheckRoleOutlet module={"role"} />}
                >
                  <Route index element={<RoleIndex />} />
                  <Route
                    element={<CheckRoleOutlet module={"role"} action="write" />}
                  >
                    <Route path="form/:id?" element={<RoleForm />} />
                  </Route>
                </Route>

                <Route path="setting" element={<SettingIndex />}>
                  <Route
                    index
                    element={
                      <Navigate
                        to={"/business/organization/setting/organization"}
                      />
                    }
                  />

                  <Route
                    element={
                      <CheckRoleOutlet module={"organization_setting"} />
                    }
                  >
                    <Route
                      path="organization"
                      element={<OrganizationSetting />}
                    />
                    <Route path="language" element={<LanguageSetting />} />
                  </Route>
                </Route>
              </Route>
              <Route path="manage">
                <Route
                  index
                  element={<Navigate to={"/business/manage/event"} />}
                />
                <Route path="event" element={<EventIndex />} />

                <Route path="information">
                  <Route index element={<InformationIndex />} />
                  <Route path="form/:id?" element={<InformationForm />} />
                </Route>

                <Route path="landing-page" element={<LandingPageIndex />} />
              </Route>
            </Route>

            <Route path="member">
              <Route index element={<Navigate to={"/user/dashboard"} />} />
              <Route path="dashboard" element={<UserDashboardIndex />} />
              <Route path="application" element={<MemberApplicationIndex />} />

              <Route path="information">
                <Route path="event" element={<UserEventIndex />} />
                <Route path="information" element={<UserInformationIndex />} />
                <Route path="activity" element={<UserActivityIndex />} />
                <Route path="help" element={<UserHelpIndex />} />
                <Route path="new-feature" element={<NewFeatureIndex />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        {/* Modals */}
        {previousLocation && (
          <Routes>
            <Route path="modal">
              <Route path="member">
                <Route path="invite" element={<MemberInvite />} />
                <Route path="create" element={<MemberCreate />} />
                <Route path="delete/:id" element={<MemberDelete />} />
                <Route path="resend/:id" element={<MemberResend />} />
              </Route>
              <Route path="application">
                <Route path="install/:id" element={<ApplicationInstall />} />
              </Route>
              <Route path="role">
                <Route path="delete/:id" element={<RoleDelete />} />
              </Route>
              <Route path="information">
                <Route path="delete/:id" element={<InformationDelete />} />
              </Route>
              <Route path="event">
                <Route path="form/:id" element={<EventForm />} />
                <Route path="form/:start/:end" element={<EventForm />} />
              </Route>
        
            </Route>
          </Routes>
        )}
      </Layout>
    );
  } else {
    return <LoadingPage />;
  }
}
