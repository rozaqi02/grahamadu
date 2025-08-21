import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

function Beranda({ theme }) {
  const [typingText, setTypingText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const texts = useMemo(() => ["NIKMATI", "PERCAYA"], []);

  // Typing effect
  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        setTypingText(texts[textIndex].slice(0, charIndex + 1));
        charIndex++;
        if (charIndex > texts[textIndex].length) {
          isDeleting = true;
        }
      } else {
        setTypingText(texts[textIndex].slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    }, 200);

    return () => clearInterval(typingInterval);
  }, [texts]);

  // Mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const sectionVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const backgroundStyle = isMounted
    ? {
        backgroundColor: theme === "dark" ? "#1a1f2b" : "white",
        transition: "background-color 0.3s ease",
      }
    : {};

  // Gambar produk unggulan
  const images = [
    "/assets/images/madu_propolis.jpg",
    "/assets/images/madu_premium.jpg",
    "/assets/images/royal_jelly.jpg",
  ];

  return (
    <div
      className={`min-h-screen font-[Poppins] ${
        theme === "dark" ? "text-white" : "text-gray-800"
      } overflow-hidden relative`}
      style={backgroundStyle}
    >
      {/* Animasi lingkaran mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <motion.div
          className="absolute w-96 h-96 bg-yellow-500/20 rounded-full"
          style={{
            top: `${mousePosition.y - 200}px`,
            left: `${mousePosition.x - 200}px`,
            opacity: 0.6,
            filter: "blur(50px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.4, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero */}
      <motion.section
        className="h-screen flex items-center justify-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.div
          className="container mx-auto px-6 text-center"
          style={{ scale, rotate }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className={`text-xl font-semibold uppercase ${
              theme === "dark" ? "text-yellow-300" : "text-yellow-600"
            }`}
            variants={itemVariants}
          >
            {typingText}
          </motion.h2>
          <motion.h1
            className={`text-5xl md:text-7xl font-[Montserrat] font-bold mb-6 ${
              theme === "dark" ? "text-yellow-300" : "text-yellow-700"
            }`}
            variants={itemVariants}
          >
            GRAHA MADU
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Hadir sejak 2010, <strong>Graha Madu</strong> berkomitmen menjaga
            keaslian madu Indonesia. Semua produk telah bersertifikat{" "}
            <strong>BPOM MD, Halal, dan merek dagang resmi</strong>. Dipercaya
            konsumen menengah ke atas karena kualitas selalu terjaga.
          </motion.p>
          <Link
            to="/produk"
            className="inline-flex items-center gap-2 bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-700 transition-all duration-300"
          >
            Lihat Produk <FaArrowRight />
          </Link>
        </motion.div>
      </motion.section>

      {/* Produk Terbaik */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-4xl font-[Montserrat] font-bold text-center mb-12 text-yellow-700 dark:text-yellow-300"
          variants={itemVariants}
        >
          Produk Unggulan
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Madu Propolis", "Madu Premium", "Royal Jelly"].map((title, i) => (
            <Link key={i} to="/produk">
              <motion.div
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={images[i]}
                  alt={title}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">{title}</h4>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Kenapa Pilih Graha Madu */}
      <motion.section
        className="py-16 px-6 max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-yellow-700 dark:text-yellow-300 mb-8"
          variants={itemVariants}
        >
          Kenapa Pilih Graha Madu?
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {[
            "Asli teruji laboratorium Sucofindo",
            "Bersertifikat BPOM MD & Halal",
            "Lebih dari 10 tahun pengalaman",
            "Produk berkualitas untuk segmen menengah ke atas",
          ].map((point, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-start gap-3"
            >
              <span className="w-3 h-3 bg-yellow-500 rounded-full mt-2" />
              <p className="text-gray-700 dark:text-gray-300">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default Beranda;
