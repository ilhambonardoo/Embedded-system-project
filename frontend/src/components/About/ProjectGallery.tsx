import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import {
  galleryItems,
  itemVariants,
  containerVariantsGallery,
} from "../../utils/constants";

const ProjectGallery = () => {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);

  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  return (
    <motion.div
      variants={containerVariantsGallery}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="my-12 sm:my-16"
    >
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 uppercase"
        >
          Project <span className="text-gray-500">Gallery</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
        >
          Documentation of the team's journey working on the project
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {[0, 2, 8, 6].map((index) => {
          const item = galleryItems[index];
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (item.type === "pdf") {
                  setSelectedPdf(item.pdf || null);
                } else {
                  setSelectedImage(item);
                }
              }}
              className="overflow-hidden rounded-lg aspect-square cursor-pointer group"
            >
              <div className="w-full h-full bg-linear-to-br from-gray-600 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {item.type === "pdf" ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 group-hover:brightness-110"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 group-hover:brightness-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <p className="text-xs font-semibold text-white line-clamp-1">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="hidden sm:block">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -5 }}
              onClick={() => {
                if (item.type === "pdf") {
                  setSelectedPdf(item.pdf || null);
                } else {
                  setSelectedImage(item);
                }
              }}
              className="overflow-hidden rounded-lg sm:rounded-xl mb-4 sm:mb-6 break-inside-avoid cursor-pointer group"
              style={{
                height:
                  index % 5 === 0
                    ? "280px"
                    : index % 5 === 1
                    ? "320px"
                    : index % 5 === 2
                    ? "240px"
                    : index % 5 === 3
                    ? "300px"
                    : "260px",
              }}
            >
              <div className="w-full h-full bg-linear-to-br from-gray-600 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {item.type === "pdf" ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 group-hover:brightness-110"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-120 transition-transform duration-300 group-hover:brightness-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full h-full"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="sm:hidden absolute top-4 right-0 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-all duration-300 z-10"
              >
                <FiX size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center cursor-pointer justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setSelectedPdf(null)}
                className="sm:hidden absolute top-4 right-4 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-all duration-300 z-10"
              >
                <FiX size={24} />
              </button>
              <iframe
                src={selectedPdf}
                className="w-full h-[90vh]"
                title="PDF Viewer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGallery;
