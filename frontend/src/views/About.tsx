import { motion } from "framer-motion";
import { containerVariants } from "../utils/constants";
import HeaderAbout from "../components/About/HeaderAbout";
import CardFeature from "../components/About/CardFeature";
import ProjectGallery from "../components/About/ProjectGallery";
import Teams from "../components/About/Teams";
import ProductCard from "../components/About/ProductCard";

export default function About() {
  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12 font-sans pb-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <HeaderAbout />
        <CardFeature />
        <Teams />
      </motion.div>
      <ProductCard />
      <ProjectGallery />
    </div>
  );
}
