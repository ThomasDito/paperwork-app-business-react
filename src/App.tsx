import Layout from "@/components/layout";
import LoadingPage from "@/components/loading-page";
import PageLayout from "@/pages/layout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  login,
  selectRoles,
  setEmployee,
  setOrganization,
  setRoles,
} from "@/redux/slices/auth-slice";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardIndex from "@/pages/business/dashboard";
import { useMeQuery } from "@/redux/api/paperwork/auth-api";
import SettingIndex from "@/pages/business/organization/setting";
import BranchIndex from "@/pages/business/organization/setting/branch";
import OrganizationIndex from "@/pages/business/organization/setting/organization";
import DivisionIndex from "@/pages/business/organization/setting/division";
import PositionIndex from "@/pages/business/organization/setting/position";
import LevelIndex from "@/pages/business/organization/setting/level";
import EmployeeStatusIndex from "@/pages/business/organization/setting/employee-status";
import { useBusinessOrganizationGetQuery } from "@/redux/api/business/organization-api";
import BranchForm from "@/pages/business/organization/setting/branch/form";
import BranchDelete from "@/pages/business/organization/setting/branch/delete";
import DivisionForm from "@/pages/business/organization/setting/division/form";
import DivisionDelete from "@/pages/business/organization/setting/division/delete";
import PositionForm from "@/pages/business/organization/setting/position/form";
import PositionDelete from "@/pages/business/organization/setting/position/delete";
import LevelForm from "@/pages/business/organization/setting/level/form";
import LevelDelete from "@/pages/business/organization/setting/level/delete";
import EmployeeStatusForm from "@/pages/business/organization/setting/employee-status/form";
import EmployeeStatusDelete from "@/pages/business/organization/setting/employee-status/delete";
import RoleIndex from "@/pages/business/organization/role";
import EmployeeIndex from "@/pages/business/organization/employee";
import EmployeeForm from "@/pages/business/organization/employee/form";
import EmployeeDelete from "@/pages/business/organization/employee/delete";
import ApplicationIndex from "@/pages/business/application";
import EventIndex from "@/pages/business/manage/event";
import InformationIndex from "@/pages/business/manage/information";
import InventoryIndex from "@/pages/business/manage/inventory";
import LandingPageIndex from "@/pages/business/manage/landing-page";
import UserEventIndex from "@/pages/employee/information/event";
import UserInformationIndex from "@/pages/employee/information/information";
import UserActivityIndex from "@/pages/employee/information/activity";
import UserHelpIndex from "@/pages/employee/information/help";
import UserDashboardIndex from "@/pages/employee/dashboard";
import RoleForm from "@/pages/business/organization/role/form";
import RoleDelete from "@/pages/business/organization/role/delete";
import InformationForm from "@/pages/business/manage/information/form";
import InformationDelete from "@/pages/business/manage/information/delete";
import InventoryDelete from "@/pages/business/manage/inventory/delete";
import InventoryForm from "@/pages/business/manage/inventory/form";
import {
  useBusinessEmployeeAccountEmployeeQuery,
  useBusinessEmployeeAccountModulesQuery,
} from "@/redux/api/business/employee/account-api";
import { CheckRoleOutlet } from "@/components/check-role";
import EventForm from "@/pages/business/manage/event/form";

export default function App() {
  // Hooks
  const dispatch = useAppDispatch();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;

  // RTK Query
  const { data: me, isSuccess: meIsSuccess } = useMeQuery();
  const { data: organization, isSuccess: organizationIsSuccess } =
    useBusinessOrganizationGetQuery();
  const { data: employee, isSuccess: employeeIsSuccess } =
    useBusinessEmployeeAccountEmployeeQuery();
  const { data: roles, isSuccess: rolesIsSuccess } =
    useBusinessEmployeeAccountModulesQuery();

  // States
  useEffect(() => {
    if (me) {
      dispatch(login(me));
    }
  }, [me]);

  useEffect(() => {
    if (organization) {
      dispatch(setOrganization(organization));
    }
  }, [organization]);

  useEffect(() => {
    if (employee) {
      dispatch(setEmployee(employee));
    }
  }, [employee]);

  useEffect(() => {
    if (roles) {
      dispatch(setRoles(roles));
    }
  }, [roles]);

  if (
    meIsSuccess &&
    organizationIsSuccess &&
    rolesIsSuccess &&
    employeeIsSuccess
  ) {
    return (
      <Layout>
        <Routes location={previousLocation || location}>
          <Route element={<PageLayout />}>
            <Route index element={<Navigate to={"/business/dashboard"} />} />

            <Route path="business">
              <Route path="dashboard" element={<DashboardIndex />} />
              <Route path="application" element={<ApplicationIndex />} />
              <Route path="organization">
                <Route
                  index
                  element={<Navigate to={"/business/organization/employee"} />}
                />

                <Route
                  path="employee"
                  element={<CheckRoleOutlet module={"employee"} />}
                >
                  <Route index element={<EmployeeIndex />} />
                  <Route path="form/:id?" element={<EmployeeForm />} />
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
                      element={<OrganizationIndex />}
                    />
                  </Route>

                  <Route element={<CheckRoleOutlet module={"branch"} />}>
                    <Route path="branch" element={<BranchIndex />} />
                  </Route>
                  <Route element={<CheckRoleOutlet module={"division"} />}>
                    <Route path="division" element={<DivisionIndex />} />
                  </Route>
                  <Route element={<CheckRoleOutlet module={"position"} />}>
                    <Route path="position" element={<PositionIndex />} />
                  </Route>
                  <Route element={<CheckRoleOutlet module={"level"} />}>
                    <Route path="level" element={<LevelIndex />} />
                  </Route>
                  <Route
                    element={<CheckRoleOutlet module={"employee_status"} />}
                  >
                    <Route
                      path="employee-status"
                      element={<EmployeeStatusIndex />}
                    />
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

                <Route path="inventory">
                  <Route index element={<InventoryIndex />} />
                  <Route path="form/:id?" element={<InventoryForm />} />
                </Route>

                <Route path="landing-page" element={<LandingPageIndex />} />
              </Route>
            </Route>

            <Route path="employee">
              <Route index element={<Navigate to={"/user/dashboard"} />} />
              <Route path="dashboard" element={<UserDashboardIndex />} />

              <Route path="information">
                <Route path="event" element={<UserEventIndex />} />
                <Route path="information" element={<UserInformationIndex />} />
                <Route path="activity" element={<UserActivityIndex />} />
                <Route path="help" element={<UserHelpIndex />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        {/* Modals */}
        {previousLocation && (
          <Routes>
            <Route path="modal">
              <Route path="branch">
                <Route path="form/:id?" element={<BranchForm />} />
                <Route path="delete/:id" element={<BranchDelete />} />
              </Route>
              <Route path="division">
                <Route path="form/:id?" element={<DivisionForm />} />
                <Route path="delete/:id" element={<DivisionDelete />} />
              </Route>
              <Route path="position">
                <Route path="form/:id?" element={<PositionForm />} />
                <Route path="delete/:id" element={<PositionDelete />} />
              </Route>
              <Route path="level">
                <Route path="form/:id?" element={<LevelForm />} />
                <Route path="delete/:id" element={<LevelDelete />} />
              </Route>
              <Route path="employee-status">
                <Route path="form/:id?" element={<EmployeeStatusForm />} />
                <Route path="delete/:id" element={<EmployeeStatusDelete />} />
              </Route>
              <Route path="employee">
                <Route path="delete/:id" element={<EmployeeDelete />} />
              </Route>
              <Route path="role">
                <Route path="delete/:id" element={<RoleDelete />} />
              </Route>
              <Route path="information">
                <Route path="delete/:id" element={<InformationDelete />} />
              </Route>
              <Route path="inventory">
                <Route path="delete/:id" element={<InventoryDelete />} />
              </Route>
              <Route path="event">
                <Route path="form/:id" element={<EventForm />} />
                <Route path="form/:start/:end" element={<EventForm />} />
                <Route path="delete/:id" element={<LevelDelete />} />
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
