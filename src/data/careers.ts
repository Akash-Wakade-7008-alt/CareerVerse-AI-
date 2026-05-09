import { Career } from "@/types";

export const CAREERS: Career[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    iconId: "product-manager",
    description: "Lead product vision, balance users, design & engineering.",
    salary: "₹15L – ₹50L",
    skills: ["Strategy", "Communication", "Leadership"],
    color: "from-indigo-500 to-violet-500",
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    iconId: "software-engineer",
    description: "Build apps, systems & AI that power the world.",
    salary: "₹12L – ₹60L",
    skills: ["Coding", "Problem Solving", "Logic"],
    color: "from-violet-500 to-cyan-500",
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    iconId: "marketing-manager",
    description: "Craft brand stories that move millions of users.",
    salary: "₹10L – ₹40L",
    skills: ["Storytelling", "Analytics", "Creativity"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    iconId: "ui-ux-designer",
    description: "Design beautiful, human-centered digital experiences.",
    salary: "₹8L – ₹35L",
    skills: ["Design", "Empathy", "Visual Thinking"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "consultant",
    title: "Consultant",
    iconId: "consultant",
    description: "Solve complex business problems for top companies.",
    salary: "₹18L – ₹70L",
    skills: ["Analysis", "Strategy", "Communication"],
    color: "from-indigo-500 to-emerald-500",
  },
];
