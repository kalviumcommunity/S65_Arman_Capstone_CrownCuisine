import { SectionHeader } from "./section-header";
import { FeatureCard } from "./feature-card";
import { Boxes, UsersRound } from "lucide-react";

export function AdditionalToolsSection() {
  return (
    <>
      <div className="mt-10 pb-4 pt-4">
        <SectionHeader
          title="Additional Tools"
          description="Other operational areas (features coming soon)."
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <FeatureCard
          title="Inventory"
          description="Track stock levels & manage suppliers."
          icon=""
          alertTitle="Feature Under Development"
          alertDescription="Advanced inventory management tools are coming soon. Stay tuned!"
        />
        <FeatureCard
          title="Staff Scheduling"
          description="Plan shifts and manage availability."
          icon=""
          alertTitle="Coming Soon!"
          alertDescription="Tools for scheduling and team communication are under development."
        />
      </div>
    </>
  );
}
