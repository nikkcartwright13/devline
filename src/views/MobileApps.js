import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";
import MobileBuildShowcase from "../components/sections/MobileBuildShowcase";
import MobileAppTypes from "../components/sections/MobileAppTypes";

export default function MobileApps() {
  return (
    <ServiceDetailTemplate slug="mobile">
      <MobileBuildShowcase />
      <MobileAppTypes />
    </ServiceDetailTemplate>
  );
}
