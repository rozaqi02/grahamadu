import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaSeedling, FaUsers, FaLeaf, FaIndustry } from "react-icons/fa";

function Tentang({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
        transition: "background-color 0.3s ease",
      }
    : {};

  const sectionVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
      style={backgroundStyle}
    >
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500111709600-7761aa8216c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-4xl md:text-6xl font-bold text-yellow-300 z-10"
        >
          Tentang Graha Madu 🍯
        </motion.h1>
      </div>

      {/* Konten */}
      <motion.section
        className="py-20 px-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Sejarah */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-300">
            Sejarah Perusahaan
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <strong>Graha Madu</strong> berdiri dengan tujuan menghadirkan madu
            asli, murni, dan berkualitas tinggi kepada masyarakat Indonesia.
            Dengan pengalaman lebih dari <strong>10 tahun</strong>, kami telah
            menjalin kerja sama dengan peternak lebah dari{" "}
            <strong>Riau, Pati, dan Malang</strong>. Komitmen kami adalah menjaga
            keaslian dan kualitas madu serta memberikan manfaat terbaik bagi
            kesehatan keluarga Indonesia.
          </p>
        </motion.div>

        {/* Visi Misi */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-10 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-yellow-50 dark:bg-[#2a2f3a] rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
              <FaSeedling /> Visi
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Menjadi brand madu terpercaya di Indonesia yang menghadirkan produk
              alami berkualitas dengan menjaga keberlanjutan peternakan lebah.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-yellow-50 dark:bg-[#2a2f3a] rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
              <FaLeaf /> Misi
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Menyediakan produk madu asli, sehat, dan bermanfaat.</li>
              <li>Mendukung peternak lebah lokal melalui kemitraan berkelanjutan.</li>
              <li>Mengedukasi masyarakat tentang manfaat madu dan produk lebah.</li>
              <li>Menjamin kualitas melalui legalitas resmi dan uji laboratorium.</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Legalitas */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-yellow-700 dark:text-yellow-300 text-center">
            Legalitas & Sertifikasi
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              "Sertifikat Merek Dagang",
              "Sertifikat Halal MUI",
              "Izin BPOM MD",
              "Uji Laboratorium (keaslian & kualitas madu)",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-yellow-50 dark:bg-[#2a2f3a] shadow-lg flex flex-col items-center"
              >
                <FaCheckCircle className="text-green-600 text-3xl mb-3" />
                <p className="text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mitra Peternak */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-yellow-700 dark:text-yellow-300 text-center">
            Mitra Peternak
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nama: "Riau", img: "https://source.unsplash.com/400x300/?honey" },
              { nama: "Pati", img: "https://source.unsplash.com/400x300/?bees" },
              { nama: "Malang", img: "https://source.unsplash.com/400x300/?beekeeper" },
            ].map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#2a2f3a]"
              >
                <img src={m.img} alt={m.nama} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg text-yellow-700 dark:text-yellow-300">
                    {m.nama}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Peternak lebah mitra Graha Madu
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tim / Komitmen */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-yellow-700 dark:text-yellow-300">
            Komitmen Kami
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Kami percaya bahwa madu bukan hanya sekadar pemanis alami, tetapi
            juga warisan kesehatan dari alam. Graha Madu berkomitmen untuk terus
            menghadirkan madu berkualitas, mendukung peternak lokal, serta
            memberikan edukasi tentang pentingnya produk alami untuk kehidupan
            yang lebih sehat.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}

export default Tentang;
