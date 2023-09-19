import { NavbarOnboarding } from "@/components/partials/navbar/oboarding";
import OnboardingStepper from "@/pages/onboarding/components/stepper";
import OnboardingDivisionIndex from "@/pages/onboarding/division";
import OnboardingEmployeeIndex from "@/pages/onboarding/employee";
import OnboardingLevelIndex from "@/pages/onboarding/level";
import OnboardingPositionIndex from "@/pages/onboarding/position";
import OnboardingWelcomeIndex from "@/pages/onboarding/welcome";
import { cn } from "paperwork-ui";
import { useState } from "react";

export type Tabs = "welcome" | "division" | "position" | "level" | "employee";

export default function OnboardingIndex() {
  // States
  const [tabs, setTabs] = useState<Tabs>("welcome");

  return (
    <div className="flex flex-row flex-1 min-h-screen">
      <main className={cn("flex-1 max-w-6xl mx-auto")}>
        <section
          className={cn(
            "container flex-1 w-full py-5 pb-24 space-y-14 mx-auto"
          )}
        >
          <NavbarOnboarding />

          <div className="mb-5">
            <OnboardingStepper tabs={tabs} />
          </div>

          {tabs === "welcome" && <OnboardingWelcomeIndex setTabs={setTabs} />}
          {tabs === "division" && <OnboardingDivisionIndex setTabs={setTabs} />}
          {tabs === "position" && <OnboardingPositionIndex setTabs={setTabs} />}
          {tabs === "level" && <OnboardingLevelIndex setTabs={setTabs} />}
          {tabs === "employee" && <OnboardingEmployeeIndex setTabs={setTabs} />}
        </section>
      </main>
    </div>
  );
}
