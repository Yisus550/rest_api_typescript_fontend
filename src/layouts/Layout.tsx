import { motion } from "motion/react";
import { Outlet } from "react-router-dom";
import { itemVariants } from "../main";

export default function Layout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-slate-800">
        <div className="max-w-6xl py-10 mx-auto">
          <motion.h1 variants={itemVariants} className="text-4xl font-extrabold text-white">
            Administradaor de Productos
          </motion.h1>
        </div>
      </header>
      <main className="max-w-6xl p-10 mx-auto mt-10 bg-white shadow">
        <Outlet />
      </main>
    </motion.div>
  );
}
