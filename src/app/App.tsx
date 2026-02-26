import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView, animate, AnimatePresence } from "motion/react";
import imgWorker from "figma:asset/8530be59f36fe0a4006e2083bba2627e08f92ed5.png";
import imgRajesh from "figma:asset/9549fd5f187f521deb59bed58236188244e7e37e.png";
import imgPriya from "figma:asset/e6300e7f49a1799b3dbc5056412aadcf88a4d696.png";
import imgSuresh from "figma:asset/9fb0ec14349ee8ac9d0addb5f6c4a1c8a39c3ecf.png";
import imgSuraj from "figma:asset/085acad74f4a195381a74bd2c62f6301c3af0868.png";
import imgVivek from "figma:asset/eb0350d4feea4161a271d1eb1071722ad4950768.png";
import imgVivekKumar from "figma:asset/66ef12a0f10611801b53273f95ccfbabcbe52eec.png";
import svgPaths from "../imports/svg-14kgwtq3ns";

// ---- Animation Variants ----
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ---- FadeUp Wrapper ----
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// ---- Count Up ----
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = (end % 1 !== 0 ? v.toFixed(1) : Math.round(v).toLocaleString()) + suffix;
      },
    });
    return controls.stop;
  }, [inView, end, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

// ---- Animated Progress Bar ----
function AnimatedBar({ percent, colorClass }: { percent: string; colorClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full bg-gray-100 rounded-full h-1.5 mb-5 overflow-hidden">
      <motion.div
        className={`h-1.5 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={inView ? { width: percent } : { width: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}

// ---- Scroll Progress Bar ----
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#f59e0b] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// ---- Icons ----
function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <path d={svgPaths.p358a3100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 16 16">
      <path d={svgPaths.p39be50} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 18 18">
      <path d={svgPaths.p2f71ed80} stroke="#F59E0B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function LinkIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 20 20">
      <path d={svgPaths.p2db27e00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ---- Navbar ----
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "For Workers", href: "#for-workers" },
    { label: "For Employers", href: "#for-employers" },
    { label: "About", href: "#about" },
  ];

  return (
    <motion.nav
      className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="bg-[#1a3c6e] rounded-md flex items-center justify-center w-8 h-8">
              <LinkIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#0f172a] font-extrabold text-xl tracking-tight">BlueLink</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-[#475569] hover:text-[#1a3c6e] transition-colors text-sm font-medium relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1a3c6e] group-hover:w-full transition-all duration-300 rounded-full" />
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a href="#" className="text-sm font-medium text-[#475569] hover:text-[#1a3c6e] transition-colors px-1">
              IN | BH
            </a>
            <motion.a
              href="#"
              className="bg-[#1a3c6e] hover:bg-[#15305a] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
              whileHover={{ scale: 1.04, boxShadow: "0 4px 20px rgba(26,60,110,0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.a>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-[#475569] hover:text-[#1a3c6e] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-[#475569] hover:text-[#1a3c6e] hover:bg-blue-50 rounded-md text-sm font-medium transition-colors"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <a
                  href="#"
                  className="block w-full bg-[#1a3c6e] hover:bg-[#15305a] text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ---- Hero ----
function Hero() {
  return (
    <section className="bg-gradient-to-b from-[rgba(26,60,110,0.04)] to-[#f8fafc] pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* Text */}
          <div className="flex-1 max-w-xl w-full">
            <motion.div
              className="inline-flex items-center gap-1.5 bg-[rgba(26,60,110,0.1)] px-3 py-1.5 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg className="w-3.5 h-3.5 text-[#1a3c6e]" fill="none" viewBox="0 0 13 13">
                <path d={svgPaths.p11301100} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17" />
              </svg>
              <span className="text-[#1a3c6e] text-xs font-semibold uppercase tracking-widest">The Future of Work</span>
            </motion.div>

            <div className="mb-5 overflow-hidden">
              {["India's Workforce,", "Digitally", "Empowered"].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={`block font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl ${i > 0 ? "text-[#1a3c6e]" : "text-[#0f172a]"}`}>
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-[#64748b] text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              Connect with verified jobs and skilled talent instantly. Built for the core of India—fast, fair, and reliable.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.5 }}
            >
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 bg-[#1a3c6e] text-white font-semibold px-7 py-3.5 rounded-md"
                whileHover={{ scale: 1.04, backgroundColor: "#15305a", boxShadow: "0 8px 25px rgba(26,60,110,0.4)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Find Work
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.span>
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-[rgba(0,0,0,0.12)] text-[#0f172a] font-semibold px-7 py-3.5 rounded-md"
                whileHover={{ borderColor: "#1a3c6e", color: "#1a3c6e", y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Hire Workers
              </motion.a>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="flex-1 w-full max-w-sm lg:max-w-md relative"
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img src={imgWorker} alt="Skilled worker" className="w-full h-full object-cover" />
              {/* Shimmer overlay on load */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ delay: 0.8, duration: 0.9, ease: "easeInOut" }}
              />
            </div>

            {/* Job match card — floating */}
            <motion.div
              className="absolute top-8 -left-4 lg:-left-10 bg-white rounded-xl shadow-xl px-4 py-3.5 flex items-center gap-3 max-w-[220px]"
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="flex items-center gap-3"
              >
                <div className="bg-[rgba(26,60,110,0.12)] rounded-md p-2.5 shrink-0">
                  <svg className="w-5 h-5 text-[#1a3c6e]" fill="none" viewBox="0 0 20 18">
                    <path d={svgPaths.p17909700} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                    <path d={svgPaths.p6a2b00} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] text-sm">New Job Match</p>
                  <p className="text-[#64748b] text-xs">Electrician • ₹900/day</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Verified card — floating offset */}
            <motion.div
              className="absolute bottom-10 -right-4 lg:-right-8 bg-white rounded-xl shadow-xl px-4 py-3.5 flex items-center gap-3 max-w-[210px]"
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="bg-[rgba(26,60,110,0.15)] rounded-md p-2.5 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 15 19">
                    <path d={svgPaths.p23b4ae44} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                    <path d={svgPaths.p50f7f00} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] text-sm">Verified Profile</p>
                  <p className="text-[#64748b] text-xs">Aadhaar Authenticated</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---- Stats Bar ----
function StatsBar() {
  const stats = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#1a3c6e]" fill="none" viewBox="0 0 22 20">
          <path d={svgPaths.pef0db38} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p39f7e600} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
      value: "200M+",
      label: "Addressable Workforce",
      tag: "Target Reach",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#1a3c6e]" fill="none" viewBox="0 0 18 22">
          <path d={svgPaths.p2c09b400} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3725e000} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
      value: "90+ Cities",
      label: "Planned Coverage",
      tag: "Year 1 Goal",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#1a3c6e]" fill="none" viewBox="0 0 22 22">
          <path d={svgPaths.pcc0c780} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p17af0980} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
      value: "100%",
      label: "Aadhaar Verification",
      tag: "Platform Standard",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#1a3c6e]" fill="none" viewBox="0 0 22 22">
          <path d={svgPaths.p390edb70} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
      value: "AI Powered",
      label: "Skill-Based Matching",
      tag: "Core Feature",
    },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3 group"
              variants={staggerItem}
            >
              <motion.div
                className="bg-[rgba(26,60,110,0.08)] rounded-xl p-2.5 shrink-0"
                whileHover={{ scale: 1.12, backgroundColor: "rgba(26,60,110,0.15)" }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {stat.icon}
              </motion.div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-bold text-[#0f172a] text-base">{stat.value}</p>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">{stat.tag}</span>
                </div>
                <p className="text-[#64748b] text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- How it Works ----
function HowItWorks() {
  const steps = [
    {
      num: "1",
      icon: (
        <svg className="w-10 h-10 text-[#1a3c6e]" fill="none" viewBox="0 0 40 40">
          <path d={svgPaths.p311a7f00} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
          <path d={svgPaths.p25da9b80} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
          <path d="M30 10V20M35 15H25" stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
        </svg>
      ),
      title: "Create Your Profile",
      desc: "Sign up in minutes using just your phone number. Add your skills, experience, and location.",
    },
    {
      num: "2",
      icon: (
        <svg className="w-10 h-10 text-[#1a3c6e]" fill="none" viewBox="0 0 40 40">
          <path d={svgPaths.p29db7df0} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
          <path d={svgPaths.p13248f00} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
          <path d={svgPaths.p324b1cf0} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
        </svg>
      ),
      title: "Get Matched",
      desc: "Our smart system instantly matches your profile with verified employers looking for your exact skills.",
    },
    {
      num: "3",
      icon: (
        <svg className="w-10 h-10 text-[#1a3c6e]" fill="none" viewBox="0 0 40 36">
          <path d={svgPaths.p53ac080} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
          <path d={svgPaths.p1e22a700} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33" />
        </svg>
      ),
      title: "Start Working",
      desc: "Connect directly, agree on terms, and start working. Earn ratings to unlock better opportunities.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <h2 className="font-extrabold text-[#0f172a] tracking-tight mb-4 text-3xl sm:text-4xl">How it Works</h2>
          <p className="text-[#64748b] text-lg max-w-lg mx-auto">
            Three simple steps to connect talent with opportunity. Built for simplicity and speed.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center group cursor-default"
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(26,60,110,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative inline-flex mb-6">
                <motion.div
                  className="bg-[rgba(26,60,110,0.08)] rounded-xl p-5"
                  whileHover={{ backgroundColor: "rgba(26,60,110,0.14)", rotate: [0, -4, 4, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {step.icon}
                </motion.div>
                <motion.span
                  className="absolute -top-2 -right-2 bg-[#0f172a] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                  whileHover={{ scale: 1.2, backgroundColor: "#1a3c6e" }}
                >
                  {step.num}
                </motion.span>
              </div>
              <h3 className="font-bold text-[#0f172a] text-xl mb-3">{step.title}</h3>
              <p className="text-[#64748b] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Value Props ----
function ValueProps() {
  const workers = [
    { title: "Direct Connections", desc: "No middlemen taking a cut. Talk directly to the employers and negotiate your own fair rates." },
    { title: "Verified Safety", desc: "Every employer is verified to ensure you work in safe, reliable, and professional environments." },
    { title: "Build Your Reputation", desc: "Earn ratings and reviews for your hard work, helping you secure more jobs at better pay over time." },
  ];

  const employers = [
    { title: "Instant Hiring", desc: "Post a job and start getting calls from available, nearby workers within minutes, not days.", iconColor: "bg-[#f59e0b]" },
    { title: "Verified Identities", desc: "Hire with confidence. All workers on BlueLink are Aadhaar-verified for complete peace of mind.", iconColor: "bg-[#f59e0b]" },
    { title: "Skill-Based Matching", desc: "Our algorithm ensures you only see candidates who actually match the trade and experience you need.", iconColor: "bg-[#f59e0b]" },
  ];

  const listItem = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="for-workers" className="py-20 bg-[rgba(243,246,249,0.5)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* For Workers */}
          <motion.div
            id="for-workers-panel"
            className="bg-[rgba(26,60,110,0.04)] border border-[rgba(26,60,110,0.1)] rounded-2xl p-8 lg:p-12"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-[#1a3c6e] text-sm font-bold uppercase tracking-widest mb-4">For Workers</p>
            <h2 className="font-extrabold text-[#0f172a] mb-8 leading-tight text-3xl">
              Dignity, Freedom &<br />Better Pay
            </h2>
            <motion.div
              className="space-y-6"
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {workers.map((item) => (
                <motion.div key={item.title} className="flex gap-4 items-start" variants={listItem}>
                  <motion.div
                    className="bg-[#1a3c6e] rounded-md p-1.5 shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckIcon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">{item.title}</h4>
                    <p className="text-[#64748b] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            id="for-employers"
            className="bg-[rgba(255,251,235,0.5)] border border-[rgba(245,158,11,0.2)] rounded-2xl p-8 lg:p-12"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-[#d97706] text-sm font-bold uppercase tracking-widest mb-4">For Employers</p>
            <h2 className="font-extrabold text-[#0f172a] mb-8 leading-tight text-3xl">
              Speed, Trust &<br />Quality Talent
            </h2>
            <motion.div
              className="space-y-6"
              variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {employers.map((item) => (
                <motion.div key={item.title} className="flex gap-4 items-start" variants={listItem}>
                  <motion.div
                    className={`${item.iconColor} rounded-md p-1.5 shrink-0 mt-0.5`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckIcon className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">{item.title}</h4>
                    <p className="text-[#64748b] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---- Impact Numbers ----
function ImpactNumbers() {
  const stats = [
    { raw: 1000000, display: "M+", prefix: "1", label: "Jobs to be Posted", sub: "Year 1 target", countEnd: 1, countSuffix: "M+" },
    { raw: 750000, display: "K", prefix: "750", label: "Workers to be Placed", sub: "Year 1 target", countEnd: 750, countSuffix: "K" },
    { raw: 50, display: "+", prefix: "50", label: "Cities at Launch", sub: "Phase 1 rollout", countEnd: 50, countSuffix: "+" },
    { raw: 4.5, display: "+", prefix: "4.5", label: "Target Avg. Rating", sub: "Platform benchmark", countEnd: 4.5, countSuffix: "+" },
  ];

  return (
    <section className="bg-[#1a3c6e] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f59e0b] opacity-[0.06] rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-10">
          <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            🎯 Our Launch Targets
          </span>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            We haven't launched yet — but here's what we're building toward. These are the milestones we're targeting in our first phase.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              variants={staggerItem}
            >
              <motion.p
                className="text-[#f59e0b] font-extrabold text-4xl sm:text-5xl mb-1"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <CountUp end={stat.countEnd} suffix={stat.countSuffix} duration={2} />
              </motion.p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-white/50 text-xs uppercase tracking-wide">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-white/30 text-xs mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          * All figures are projected targets. Actual results will be published post-launch.
        </motion.p>
      </div>
    </section>
  );
}

// ---- Survey Insights ----
function SurveyInsights() {
  const insights = [
    {
      percent: "74%",
      accentBg: "bg-[rgba(26,60,110,0.08)]",
      accentText: "text-[#1a3c6e]",
      accentBadge: "bg-[rgba(26,60,110,0.1)] text-[#1a3c6e]",
      barColor: "bg-[#1a3c6e]",
      tag: "Worker Survey · Field Research",
      problem: "Daily wage workers have no reliable way to find consistent work",
      detail: "In surveys across labour chowks in Mumbai, Delhi & Bengaluru, 74% of blue-collar workers said they had gone without work for 3+ days in a month simply because they had no way to reach employers digitally.",
      quote: "I wake up at 5 AM and go stand at the crossing hoping someone will hire me. Most days I go home empty-handed.",
      persona: { name: "Rajesh Kumar", role: "Electrician · Mumbai", img: imgRajesh },
      stat2: { value: "84%", label: "said they'd use an app in their language to find daily work" },
    },
    {
      percent: "71%",
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
      accentBadge: "bg-amber-100 text-amber-700",
      barColor: "bg-amber-500",
      tag: "Employer Survey · SME Research",
      problem: "Small businesses struggle to find verified workers fast enough",
      detail: "71% of small-to-mid-sized contractors and facility managers in Tier-1 cities reported that finding a reliable, verified worker takes more than 2 days on average — causing project delays and revenue loss.",
      quote: "I once waited 4 days to find a plumber for an urgent repair job. The client was furious. There's no system.",
      persona: { name: "Priya Sharma", role: "Facility Manager · Delhi", img: imgPriya },
      stat2: { value: "3+ days", label: "average time lost per hiring cycle for SMEs" },
    },
    {
      percent: "62%",
      accentBg: "bg-slate-100",
      accentText: "text-slate-700",
      accentBadge: "bg-slate-200 text-slate-700",
      barColor: "bg-slate-700",
      tag: "Safety Survey · Gig Workers",
      problem: "Unverified job listings expose workers to scams & unsafe conditions",
      detail: "62% of informal-sector workers surveyed reported encountering at least one fake or misleading job offer in the past year. Without verification, workers take on personal risk every time they respond to an unknown employer.",
      quote: "Someone promised ₹1,200/day but paid ₹400 and disappeared. I had no way to verify if they were real.",
      persona: { name: "Suresh Patil", role: "Delivery Agent · Pune", img: imgSuresh },
      stat2: { value: "1 in 3", label: "workers have faced wage theft or unsafe working conditions" },
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <span className="inline-block bg-[rgba(26,60,110,0.1)] text-[#1a3c6e] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            📊 Survey & Field Research
          </span>
          <h2 className="font-extrabold text-[#0f172a] tracking-tight mb-4 text-3xl sm:text-4xl">
            The Problem We're Solving
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            Before building BlueLink, we went to the ground. We surveyed workers, contractors, and small businesses across 5 Indian cities to understand the real pain points.
          </p>
          <p className="text-[#94a3b8] text-sm mt-3">
            Survey conducted across Mumbai, Delhi, Bengaluru, Pune & Hyderabad · 1,200+ respondents · 2024
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {insights.map((item) => (
            <motion.div
              key={item.persona.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden group cursor-default"
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.10)" }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Top accent bar with slide animation */}
              <motion.div
                className={`h-1 ${item.barColor}`}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />

              <div className="p-7 flex flex-col flex-1">
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${item.accentBadge}`}>
                  {item.tag}
                </span>

                {/* Big stat */}
                <div className="flex items-end gap-3 mb-4">
                  <motion.span
                    className={`font-extrabold text-6xl leading-none ${item.accentText}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  >
                    {item.percent}
                  </motion.span>
                  <p className="text-[#0f172a] font-bold text-base leading-snug mb-1 max-w-[160px]">{item.problem}</p>
                </div>

                {/* Animated progress bar */}
                <AnimatedBar percent={item.percent} colorClass={item.barColor} />

                <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1">{item.detail}</p>

                <div className={`${item.accentBg} rounded-xl px-4 py-3 mb-5`}>
                  <p className={`font-extrabold text-xl ${item.accentText}`}>{item.stat2.value}</p>
                  <p className="text-[#64748b] text-xs mt-0.5">{item.stat2.label}</p>
                </div>

                <blockquote className="border-l-2 border-gray-200 pl-4 mb-5">
                  <p className="text-[#475569] text-sm italic leading-relaxed">"{item.quote}"</p>
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <motion.img
                    src={item.persona.img}
                    alt={item.persona.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                    whileHover={{ scale: 1.1, borderRadius: "50%" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <div>
                    <p className="font-bold text-[#0f172a] text-sm">{item.persona.name}</p>
                    <p className="text-[#94a3b8] text-xs">{item.persona.role} · Survey Respondent</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center bg-[#1a3c6e] rounded-2xl px-8 py-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#1a3c6e] via-[#2a5298] to-[#1a3c6e] opacity-60"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          />
          <div className="relative">
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-2">The Opportunity</p>
            <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-3">
              India has <span className="text-[#f59e0b]">450M+ blue-collar workers.</span><br className="hidden sm:block" /> Less than 5% are digitally connected.
            </h3>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-6">
              BlueLink is built to close that gap — with a platform that's fast, simple, and designed for India's ground-level reality.
            </p>
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 bg-[#f59e0b] text-[#0f172a] font-bold px-8 py-3.5 rounded-md"
              whileHover={{ scale: 1.05, backgroundColor: "#d97706", boxShadow: "0 8px 30px rgba(245,158,11,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Join the Waitlist
              <ArrowRightIcon className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Meet the Builders ----
function MeetTheBuilder() {
  const builders = [
    {
      img: imgSuraj,
      name: "Suraj Kumar Singh",
      role: "Founder & Creator",
      roleColor: "text-[#f59e0b]",
      badgeBg: "bg-[#f59e0b]",
      badgeText: "text-[#0f172a]",
      quote: "You got one life — live it to its fullest. Do whatever you want to do, guys.",
      tags: ["Full-Stack Dev", "AI Enthusiast", "Social Impact", "India-First"],
      accent: "from-[#0f172a] to-[#1a3c6e]",
      glowColor: "bg-[#f59e0b]",
      dividerColor: "bg-[#f59e0b]",
      label: "India AI Summit '26",
    },
    {
      img: imgVivek,
      name: "Vivek Gautam",
      role: "Co-Builder",
      roleColor: "text-[#60a5fa]",
      badgeBg: "bg-[#60a5fa]",
      badgeText: "text-[#0f172a]",
      quote: "Today I will do what others won't, so tomorrow I will do what others can't.",
      tags: ["Problem Solver", "Product Thinker", "Tech Builder", "Driven"],
      accent: "from-[#0f172a] to-[#1e3a5f]",
      glowColor: "bg-[#60a5fa]",
      dividerColor: "bg-[#60a5fa]",
      label: "TIA · Co-Creator",
    },
    {
      img: imgVivekKumar,
      name: "Vivek Kumar",
      role: "Co-Builder",
      roleColor: "text-[#34d399]",
      badgeBg: "bg-[#34d399]",
      badgeText: "text-[#0f172a]",
      quote: "I love bismillah biryani 😄",
      tags: ["Creative Mind", "Team Player", "Builder", "Food Lover 🍛"],
      accent: "from-[#0f172a] to-[#064e3b]",
      glowColor: "bg-[#34d399]",
      dividerColor: "bg-[#34d399]",
      label: "BlueLink Crew",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <span className="inline-block bg-[rgba(26,60,110,0.1)] text-[#1a3c6e] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            👥 The Team
          </span>
          <h2 className="font-extrabold text-[#0f172a] tracking-tight text-3xl sm:text-4xl mb-3">
            Meet the Builders
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Three people. One mission. Building a platform that puts India's 450 million blue-collar workers on the digital map.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {builders.map((builder) => (
            <motion.div
              key={builder.name}
              className={`relative bg-gradient-to-br ${builder.accent} rounded-3xl overflow-hidden shadow-2xl`}
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: "0 32px 64px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
            >
              {/* Decorative blobs */}
              <div className={`absolute top-0 right-0 w-64 h-64 ${builder.glowColor} opacity-10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none`} />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-white opacity-5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)" }}
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-end gap-5 px-8 pt-8 pb-0">
                  <div className="relative shrink-0">
                    <div className={`absolute inset-0 ${builder.glowColor} opacity-30 rounded-2xl blur-xl scale-110 pointer-events-none`} />
                    <motion.img
                      src={builder.img}
                      alt={builder.name}
                      className="relative w-24 h-28 object-cover object-top rounded-2xl border-4 border-white/10 shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <motion.div
                      className={`absolute -top-2 -right-2 ${builder.badgeBg} ${builder.badgeText} text-[9px] font-extrabold uppercase tracking-wide px-2 py-1 rounded-lg shadow-lg leading-tight text-center whitespace-nowrap rotate-2`}
                      animate={{ rotate: [2, -2, 2] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      {builder.label}
                    </motion.div>
                  </div>

                  <div className="pb-1">
                    <span className="bg-white/10 text-white/70 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      {builder.role}
                    </span>
                    <h3 className="text-white font-extrabold text-xl tracking-tight mt-2 leading-tight">
                      {builder.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`h-0.5 w-8 ${builder.dividerColor} rounded-full`} />
                      <p className={`${builder.roleColor} text-xs font-medium`}>BlueLink Co-Creator</p>
                    </div>
                  </div>
                </div>

                <div className="mx-8 mt-6 border-t border-white/10" />

                <div className="px-8 pt-5 pb-4 flex-1">
                  <div className={`${builder.roleColor} text-4xl font-serif leading-none opacity-50 mb-1`}>"</div>
                  <p className="text-white/90 text-sm font-medium leading-relaxed -mt-2">{builder.quote}</p>
                </div>

                <div className="px-8 pb-5 flex flex-wrap gap-2">
                  {builder.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full cursor-default"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.95)" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="mx-8 mb-8 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <motion.a href="#" className="text-white p-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} aria-label="LinkedIn" whileHover={{ backgroundColor: "rgba(255,255,255,0.25)", scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 20 18">
                        <path d={svgPaths.p21986800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                        <path d={svgPaths.p6ab2500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                      </svg>
                    </motion.a>
                    <motion.a href="#" className="text-white p-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} aria-label="Twitter" whileHover={{ backgroundColor: "rgba(255,255,255,0.25)", scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p327a8900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                      </svg>
                    </motion.a>
                  </div>
                  <motion.a
                    href="#"
                    className={`${builder.badgeBg} ${builder.badgeText} font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5`}
                    whileHover={{ scale: 1.06, opacity: 0.9 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Connect
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeUp delay={0.2} className="mt-10 text-center">
          <p className="text-[#94a3b8] text-sm">
            Building in public · India AI Impact Summit 2026 ·{" "}
            <motion.span
              className="text-[#1a3c6e] font-medium cursor-pointer"
              whileHover={{ textDecoration: "underline" }}
            >
              Interested in joining the team?
            </motion.span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer
      className="pt-14 pb-8 text-[#94a3b8] overflow-hidden"
      style={{ background: "linear-gradient(90deg, rgb(15,23,42) 0%, rgb(15,23,42) 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-1" variants={staggerItem}>
            <motion.div
              className="flex items-center gap-2.5 mb-4"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="bg-[#1a3c6e] rounded-md flex items-center justify-center w-9 h-9">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#f8fafc] font-extrabold text-xl tracking-tight">BlueLink</span>
            </motion.div>
            <p className="text-sm leading-relaxed mb-4">
              Empowering the Core of the Nation. Connecting skilled workers with trusted employers across India — fast, fair, and reliable.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <motion.a href="#" className="bg-[#1e293b] border border-[#334155] text-white p-2 rounded-lg" aria-label="Twitter" whileHover={{ scale: 1.12, backgroundColor: "#334155" }} whileTap={{ scale: 0.9 }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                  <path d={svgPaths.p327a8900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                </svg>
              </motion.a>
              <motion.a href="#" className="bg-[#1e293b] border border-[#334155] text-white p-2 rounded-lg" aria-label="LinkedIn" whileHover={{ scale: 1.12, backgroundColor: "#334155" }} whileTap={{ scale: 0.9 }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 20 18">
                  <path d={svgPaths.p21986800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                  <path d={svgPaths.p6ab2500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* College & Academic Details */}
          <motion.div className="lg:col-span-1" variants={staggerItem}>
            <div className="flex items-center gap-2 mb-5">
              <motion.div className="h-0.5 w-5 bg-[#f59e0b] rounded-full" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
              <h4 className="text-[#f8fafc] font-bold text-sm uppercase tracking-widest">Academic Details</h4>
            </div>
            <div className="space-y-3.5">
              {[
                { label: "College", value: "Army Institute of Technology" },
                { label: "Department", value: "Mechanical Engineering" },
                { label: "Branch", value: "Automation & Robotics Engineering" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#64748b] text-[11px] uppercase tracking-widest font-semibold mb-0.5">{item.label}</p>
                  <p className="text-[#f8fafc] text-sm font-semibold">{item.value}</p>
                </div>
              ))}
              <div>
                <p className="text-[#64748b] text-[11px] uppercase tracking-widest font-semibold mb-1">Address</p>
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  Dighi Hills, Alandi Road,<br />
                  Pune – 411 015,<br />
                  Maharashtra, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div className="lg:col-span-1" variants={staggerItem}>
            <div className="flex items-center gap-2 mb-5">
              <motion.div className="h-0.5 w-5 bg-[#60a5fa] rounded-full" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} />
              <h4 className="text-[#f8fafc] font-bold text-sm uppercase tracking-widest">Built By</h4>
            </div>
            <div className="space-y-4">
              {[
                { name: "Suraj Kumar Singh", role: "Founder & Creator" },
                { name: "Vivek Gautam", role: "Co-Builder" },
                { name: "Vivek Kumar", role: "Co-Builder" },
              ].map((member) => (
                <motion.div
                  key={member.name}
                  className="flex items-center gap-3 group cursor-default"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0"
                    whileHover={{ scale: 1.8 }}
                  />
                  <div>
                    <p className="text-[#f8fafc] text-sm font-semibold group-hover:text-[#f59e0b] transition-colors">
                      {member.name}
                    </p>
                    <p className="text-[#64748b] text-xs">{member.role} · AIT Pune</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 bg-[#1e293b] border border-[#334155] rounded-xl px-4 py-3.5 flex items-start gap-3"
              whileHover={{ borderColor: "#475569" }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xl mt-0.5">🎓</span>
              <div>
                <p className="text-[#f8fafc] text-xs font-bold">Student Project · 2025–26</p>
                <p className="text-[#64748b] text-xs leading-relaxed mt-0.5">
                  Developed as part of the curriculum at Army Institute of Technology, Pune.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-[#334155] pt-7 flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs text-[#475569]">
            © 2025–26 BlueLink · Army Institute of Technology, Pune
          </p>
          <p className="text-xs text-[#334155]">
            Dept. of Mechanical Engineering · Automation & Robotics Engineering
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// ---- App ----
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <HowItWorks />
        <ValueProps />
        <ImpactNumbers />
        <SurveyInsights />
        <MeetTheBuilder />
      </main>
      <Footer />
    </div>
  );
}
