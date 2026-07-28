import design1 from "../assets/desing/optimized/design1.jpg";
import design2 from "../assets/desing/optimized/design2.jpg";
import design3 from "../assets/desing/optimized/design3.jpg";
import design4 from "../assets/desing/optimized/design4.jpg";
import design5 from "../assets/desing/optimized/design5.jpg";
import design6 from "../assets/desing/optimized/design6.jpg";
import design7 from "../assets/desing/optimized/design7.jpg";
import design8 from "../assets/desing/optimized/design8.jpg";
import design9 from "../assets/desing/optimized/design9.jpg";
import web1 from "../assets/webapp/optimized/web1.jpg";
import web2 from "../assets/webapp/optimized/web2.jpg";
import web3 from "../assets/webapp/optimized/web3.jpg";

export const PROJECT_CATEGORIES = [
  { key: "web", icon: "Globe" },
  { key: "mobile", icon: "Smartphone" },
  { key: "design", icon: "Palette" },
  { key: "marketing", icon: "Megaphone" },
];

// Maps a project's slug (from the projects.items translations) to its real
// portfolio image, when one exists. Projects without an entry here fall back
// to ProjectCard's plain text layout.
export const PROJECT_IMAGES = {
  "web-project-1": web1,
  "web-project-2": web2,
  "web-project-3": web3,
  "marketing-project-3": web2,
  "marketing-project-4": web1,
  "design-project-1": design1,
  "design-project-2": design2,
  "design-project-3": design3,
  "design-project-4": design4,
  "design-project-5": design5,
  "design-project-6": design6,
  "design-project-7": design7,
  "design-project-8": design8,
  "design-project-9": design9,
};
