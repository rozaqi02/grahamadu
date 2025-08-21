import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

function FAQ({ theme }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState([]);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleTitle = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "Apa itu Graha Madu?",
      answer:
        "Graha Madu adalah brand dari CV Hexa Anugerah Bersinar yang menyediakan madu murni, premium, klanceng, royal jelly, propolis, dan madu bawang lanang dengan legalitas resmi Halal & BPOM.",
    },
    {
      question: "Apakah produk Graha Madu halal?",
      answer:
        "Ya, semua produk Graha Madu telah bersertifikat Halal dan memiliki izin BPOM MD, sehingga aman dikonsumsi.",
    },
    {
      question: "Bagaimana cara membedakan madu asli dengan yang palsu?",
      answer:
        "Madu asli Graha Madu terjamin keaslian dan kualitasnya. Kami hanya mengambil bahan baku dari peternak terpercaya di Riau, Pati, Pasuruan, dan Malang.",
    },
    {
      question: "Apakah bisa pesan online?",
      answer:
        "Ya, saat ini produk Graha Madu sudah mulai dipasarkan secara online. Anda bisa pesan melalui WhatsApp atau marketplace.",
    },
    {
      question: "Bagaimana untuk pembelian grosir?",
      answer:
        "Untuk pemesanan jumlah besar (grosir), silakan hubungi kami via WhatsApp untuk mendapatkan harga dan informasi khusus.",
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className={`min-h-screen font-poppins ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } relative pt-20`}
      style={{
        backgroundColor: theme === "dark" ? "#1a1f2b" : "#f9fafb",
      }}
    >
      {/* Glow mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 bg-yellow-500/20 rounded-full"
          style={{
            top: `${mousePosition.y - 150}px`,
            left: `${mousePosition.x - 150}px`,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.15, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.section
        className="py-20 px-6 max-w-4xl mx-auto relative z-10"
        style={{ scale }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariant}
      >
        <motion.h2
          className={`text-4xl md:text-5xl font-playfair font-bold text-center mb-14 ${
            theme === "dark" ? "text-yellow-300" : "text-yellow-700"
          }`}
          style={{ y: yTitle, scale: scaleTitle }}
        >
          FAQ
        </motion.h2>

        <motion.div className="space-y-5" variants={containerVariant}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex.includes(index);
            return (
              <motion.div
                key={index}
                layout
                variants={itemVariant}
                className={`rounded-lg border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white border-yellow-600 shadow-lg"
                    : "bg-white dark:bg-[#2f3647] border-gray-200 dark:border-gray-600 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleIndex(index)}
              >
                <div className="p-5 flex justify-between items-center">
                  <h3
                    className={`flex items-center gap-2 text-base font-semibold ${
                      isActive
                        ? "text-white"
                        : theme === "dark"
                        ? "text-yellow-300"
                        : "text-yellow-700"
                    }`}
                  >
                    <FaQuestionCircle />
                    {faq.question}
                  </h3>
                  <motion.span
                    initial={false}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold select-none"
                  >
                    {isActive ? "−" : "+"}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-5 pb-5"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>
    </div>
  );
}

export default FAQ;
