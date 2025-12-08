import {
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";

export const teamMembers = [
  {
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/Teams/tim1.jpeg",
  },
  {
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/Teams/tim2.jpeg",
  },
  {
    name: " Embedded System Team",
    role: "F1",
    description:
      "Dedicated team mengembangkan platform monitoring real-time berkinerja tinggi dengan teknologi terkini.",
    url: "/Teams/tim3.jpeg",
  },
];

export const galleryItems = [
  {
    id: 1,
    title: "Brainstorming Session",
    image: "/gallery/1.jpg",
  },
  {
    id: 2,
    title: "Hardware Assembly",
    image: "/gallery/2.jpg",
  },
  {
    id: 3,
    title: "Testing & Debugging",
    image: "/gallery/3.jpg",
  },
  {
    id: 4,
    title: "Team Collaboration",
    image: "/gallery/4.jpg",
  },
  {
    id: 5,
    title: "Dashboard Development",
    image: "/gallery/5.jpg",
  },
  {
    id: 6,
    title: "Final Presentation",
    image: "/gallery/6.jpg",
  },
  {
    id: 7,
    title: "Final Presentation",
    image: "/gallery/7.jpg",
  },
  {
    id: 8,
    title: "Final Presentation",
    image: "/gallery/8.jpg",
  },
  {
    id: 9,
    title: "Final Presentation",
    image: "/gallery/9.jpg",
  },
  {
    id: 10,
    title: "Final Presentation",
    image: "/gallery/10.jpg",
  },
  {
    id: 11,
    title: "Final Presentation",
    image: "/gallery/11.jpg",
  },
  {
    id: 12,
    title: "Final Presentation",
    image: "/gallery/12.jpg",
  },
];

export const features = [
  {
    icon: <IoSpeedometerOutline className="text-white text-2xl" />,
    title: "Real-time Monitoring",
    desc: "Low latency sensor monitoring...",
  },
  {
    icon: <IoShieldCheckmarkOutline className="text-white text-2xl" />,
    title: "The system is good and ready to use",
    desc: "Strong and durable",
  },
  {
    icon: <IoRocketOutline className="text-white text-2xl" />,
    title: "Modern Feature",
    desc: "Has advanced IoT and Web-based feature",
  },
];

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const containerVariantsGallery = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
