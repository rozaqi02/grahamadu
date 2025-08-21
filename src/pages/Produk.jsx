import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Produk({ theme }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
        transition: "background-color 0.3s ease",
      }
    : {};

  // Data produk (dari PDF)
  const produkList = [
    {
      title: "Madu Propolis",
      image: "/assets/images/madu_propolis.jpg",
      desc: "Kombinasi madu + propolis. Antibiotik alami, meningkatkan daya tahan tubuh & energi.",
    },
    {
      title: "Madu Premium",
      image: "/assets/images/madu_premium.jpg",
      desc: "Madu murni pilihan dengan rasa lebih kental & manis alami. Energi sehat setiap hari.",
    },
    {
      title: "Madu Klanceng",
      image: "/assets/images/madu_klanceng.jpg",
      desc: "Diproduksi lebah klanceng (Trigona). Kaya enzim & antioksidan, baik untuk kesehatan.",
    },
    {
      title: "Royal Jelly",
      image: "/assets/images/royal_jelly.jpg",
      desc: "Susu lebah penuh nutrisi: protein, vitamin, dan asam amino. Bagus untuk vitalitas.",
    },
    {
      title: "Bee Pollen",
      image: "/assets/images/bee_pollen.jpg",
      desc: "Suplemen alami kaya nutrisi. Bantu stamina, metabolisme, dan meningkatkan imun.",
    },
    {
      title: "Madu Bawang Lanang",
      image: "/assets/images/madu_bawang.jpg",
      desc: "Perpaduan madu murni + bawang tunggal. Bagus untuk kesehatan jantung & stamina.",
    },
    {
      title: "Madu Murni",
      image: "/assets/images/madu_murni.jpg",
      desc: "Madu asli dari peternak lokal Riau, Pati, Malang. 100% natural tanpa campuran.",
    },
    {
      title: "Sisir Madu",
      image: "/assets/images/sisir_madu.jpg",
      desc: "Madu mentah dalam sarang lebah. Nikmati sensasi alami madu segar dari sarangnya.",
    },
  ];

  const sectionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
      style={backgroundStyle}
    >
      <motion.section
        className="py-20 px-6 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-[Montserrat] font-bold text-center mb-12 text-yellow-700 dark:text-yellow-300"
          variants={itemVariants}
        >
          Produk Graha Madu
        </motion.h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {produkList.map((produk, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={produk.image}
                alt={produk.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-lg font-bold mb-2 text-yellow-700 dark:text-yellow-300">
                  {produk.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                  {produk.desc}
                </p>
                <button className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-yellow-700 transition-colors">
                  Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Produk;
