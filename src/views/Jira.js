import ServiceDetailTemplate from "../components/sections/ServiceDetailTemplate";
import JiraPageShowcase from "../components/sections/JiraPageShowcase";

export default function Jira() {
  return (
    <ServiceDetailTemplate slug="jira">
      <JiraPageShowcase />
    </ServiceDetailTemplate>
  );
}
