import { Tabs } from "@/pages/onboarding";
import { Button } from "paperwork-ui";

type Props = {
  setTabs: (tab: Tabs) => void;
};

export default function OnboardingWelcomeIndex({ setTabs }: Props) {
  return (
    <div className="border rounded-md shadow-sm bg-card p-10">
      <h1 className="text-3xl font-bold">Selamat Datang</h1>
      <div className="py-10 space-y-5">
        <h1 className="text-xl font-medium">Deskripsi dan Iklan</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          mollitia quisquam, autem delectus, voluptatem rerum labore libero, quo
          quibusdam eum aspernatur atque ullam odit. Architecto commodi
          voluptates asperiores laborum debitis.
        </p>
      </div>
      <div className="pb-10 pt-0 space-y-5">
        <h1 className="text-xl font-medium">
          Perbandingan Gratis dan Berbayar
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
          mollitia quisquam, autem delectus, voluptatem rerum labore libero, quo
          quibusdam eum aspernatur atque ullam odit. Architecto commodi
          voluptates asperiores laborum debitis.
        </p>
      </div>
      <div className="pt-10 flex justify-center">
        <Button onClick={() => setTabs("division")}>Mulai</Button>
      </div>
    </div>
  );
}
