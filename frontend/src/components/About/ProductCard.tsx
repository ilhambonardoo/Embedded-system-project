import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Stage,
  Html,
  useProgress,
} from "@react-three/drei";
import type { ModelProps, SceneViewerProps } from "../../types";
import { motion } from "framer-motion";

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/20">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const SceneViewer = ({ path, enableZoom }: SceneViewerProps) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 95 }}
      style={{
        background:
          "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)",
      }}
    >
      <Suspense fallback={<Loader />}>
        <Stage environment="city" intensity={0.8}>
          <Model path={path} />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate={true} enableZoom={enableZoom} makeDefault />
    </Canvas>
  );
};

export default function ProductCard() {
  const modelPath = "/3D/third3D.glb";
  return (
    <div className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-3 uppercase">
            Industrial <span className="text-gray-500">Engine</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            3D Model Visualization - Interactive Industrial Equipment
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="
            group relative bg-linear-to-br from-white to-gray-100 rounded-3xl
            hover:shadow-2xl hover:shadow-gray-400/50
            transition-all duration-300 border border-gray-300 cursor-pointer
            overflow-hidden h-96 md:h-[700px]
            flex flex-col
          "
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

          <div
            className="flex-1 w-full overflow-hidden relative"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <SceneViewer path={modelPath} enableZoom={true} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Preload
useGLTF.preload("/3D/third3D.glb");
