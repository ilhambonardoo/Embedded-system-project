import { motion } from "framer-motion";
import type { SensorData } from "../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import { formatTime, formatDate } from "../utils/DateFormatter";

interface SensorTableProps {
  history: SensorData[];
  onClear: () => void;
}

export default function SensorTable({ history, onClear }: SensorTableProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("LAPORAN DATA SENSOR", 14, 15);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Dicetak pada: ${new Date().toLocaleString("id-ID")}`, 14, 22);

    const tableColumn = ["Waktu", "Tanggal", "Berat (KG)", "PWM (%)", "RPM"];
    const tableRows = history.map((row) => [
      formatTime(row.timestamp),
      formatDate(row.timestamp),
      row.berat?.toFixed(2) || "0.00",
      row.pwm || "0",
      row.rpm || "0",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 9,
        textColor: [50, 50, 50],
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "left" },
        2: { halign: "right", fontStyle: "bold" },
        3: { halign: "right" },
        4: { halign: "right" },
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save(`Laporan_Sensor_${new Date().getTime()}.pdf`);
  };

  const handleClearClick = () => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus SEMUA riwayat data?")
    ) {
      onClear();
    }
  };

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-[500px]"
      >
        <div className="p-4 md:p-6 border-b border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white z-10">
          <div className="flex flex-row justify-between w-full md:w-auto md:flex-col items-center md:items-start">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-400"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                  DATABASE
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-neutral-800 tracking-tight">
                Riwayat Data
              </h3>
            </div>

            <div className="text-[10px] md:text-xs font-mono text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full border border-neutral-100 md:mt-2 md:self-start">
              Total: {history.length}
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleClearClick}
              disabled={history.length === 0}
              className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 text-xs font-bold rounded-full hover:bg-red-100 hover:text-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              <FiTrash2 className="text-lg" />
              CLEAR
            </button>

            <button
              onClick={handleExportPDF}
              disabled={history.length === 0}
              className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition-all disabled:bg-neutral-200 disabled:cursor-not-allowed group shadow-sm hover:shadow-md cursor-pointer"
            >
              <FiDownload className="text-lg group-hover:translate-y-0.5 transition-transform duration-300" />
              PDF
            </button>
          </div>
        </div>

        <div className="overflow-y-auto overflow-x-auto flex-1 custom-scrollbar p-0">
          <table className="w-full text-left border-collapse min-w-[500px] md:min-w-full">
            <thead className="bg-neutral-50 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4 md:py-4 md:px-6 text-[10px] font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-100">
                  Waktu
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 text-[10px] font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-100 text-right">
                  Berat <span className="hidden sm:inline">(KG)</span>
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 text-[10px] font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-100 text-right">
                  PWM
                </th>
                <th className="py-3 px-4 md:py-4 md:px-6 text-[10px] font-bold tracking-widest text-neutral-500 uppercase border-b border-neutral-100 text-right">
                  RPM
                </th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(history) || history.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-neutral-400 text-sm"
                  >
                    Tidak ada data yang tersedia
                  </td>
                </tr>
              ) : (
                history.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                    className="group border-b border-neutral-50 hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm text-neutral-600 font-medium whitespace-nowrap">
                      {formatTime(row.timestamp)}
                      <span className="block text-[9px] md:text-[10px] text-neutral-400 font-normal">
                        {new Date(row.timestamp || "").toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-mono text-black font-bold text-right group-hover:text-neutral-800">
                      {row.berat?.toFixed(2) || "0.00"}
                    </td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-mono text-black font-bold text-right group-hover:text-neutral-800">
                      {row.pwm || 0}
                    </td>
                    <td className="py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-mono text-black font-bold text-right group-hover:text-neutral-800">
                      {row.rpm || 0}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
