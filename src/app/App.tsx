import { useState, useEffect } from "react";
import imgWorker from "figma:asset/6087fee78766f721bbe83ad3064ed583f9ede296.png";
import imgRajesh from "figma:asset/9549fd5f187f521deb59bed58236188244e7e37e.png";
import imgPriya from "figma:asset/e6300e7f49a1799b3dbc5056412aadcf88a4d696.png";
import imgSuresh from "figma:asset/9fb0ec14349ee8ac9d0addb5f6c4a1c8a39c3ecf.png";
import svgPaths from "../imports/svg-14kgwtq3ns";

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="bg-[#1a3c6e] rounded-md flex items-center justify-center w-8 h-8">
              <LinkIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#0f172a] font-extrabold text-xl tracking-tight">BlueLink</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#475569] hover:text-[#1a3c6e] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-[#475569] hover:text-[#1a3c6e] transition-colors px-1">
              IN | BH
            </a>
            <a
              href="#"
              className="bg-[#1a3c6e] hover:bg-[#15305a] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#475569] hover:text-[#1a3c6e] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-[#475569] hover:text-[#1a3c6e] hover:bg-blue-50 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
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
        </div>
      )}
    </nav>
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
            <div className="inline-flex items-center gap-1.5 bg-[rgba(26,60,110,0.1)] px-3 py-1.5 rounded-full mb-6">
              <svg className="w-3.5 h-3.5 text-[#1a3c6e]" fill="none" viewBox="0 0 13 13">
                <path d={svgPaths.p11301100} stroke="#1a3c6e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17" />
              </svg>
              <span className="text-[#1a3c6e] text-xs font-semibold uppercase tracking-widest">The Future of Work</span>
            </div>
            <h1 className="text-[#0f172a] font-extrabold leading-tight mb-5 text-4xl sm:text-5xl lg:text-6xl">
              <span className="block">India's Workforce,</span>
              <span className="block text-[#1a3c6e]">Digitally</span>
              <span className="block text-[#1a3c6e]">Empowered</span>
            </h1>
            <p className="text-[#64748b] text-lg leading-relaxed mb-8">
              Connect with verified jobs and skilled talent instantly. Built for the core of India—fast, fair, and reliable.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#1a3c6e] hover:bg-[#15305a] text-white font-semibold px-7 py-3.5 rounded-md transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Find Work
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-[rgba(0,0,0,0.12)] hover:border-[#1a3c6e] text-[#0f172a] hover:text-[#1a3c6e] font-semibold px-7 py-3.5 rounded-md transition-all hover:-translate-y-0.5"
              >
                Hire Workers
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img src={imgWorker} alt="Skilled worker" className="w-full h-full object-cover" />
            </div>
            {/* Job match card */}
            <div className="absolute top-8 -left-4 lg:-left-10 bg-white rounded-xl shadow-xl px-4 py-3.5 flex items-center gap-3 max-w-[220px]">
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
            </div>
            {/* Verified card */}
            <div className="absolute bottom-10 -right-4 lg:-right-8 bg-white rounded-xl shadow-xl px-4 py-3.5 flex items-center gap-3 max-w-[210px]">
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
            </div>
          </div>
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
    <section className="bg-white border-y border-gray-100 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 group">
              <div className="bg-[rgba(26,60,110,0.08)] group-hover:bg-[rgba(26,60,110,0.13)] transition-colors rounded-xl p-2.5 shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-bold text-[#0f172a] text-base">{stat.value}</p>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none">{stat.tag}</span>
                </div>
                <p className="text-[#64748b] text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-extrabold text-[#0f172a] tracking-tight mb-4 text-3xl sm:text-4xl">How it Works</h2>
          <p className="text-[#64748b] text-lg max-w-lg mx-auto">
            Three simple steps to connect talent with opportunity. Built for simplicity and speed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-md transition-shadow group"
            >
              <div className="relative inline-flex mb-6">
                <div className="bg-[rgba(26,60,110,0.08)] group-hover:bg-[rgba(26,60,110,0.12)] transition-colors rounded-xl p-5">
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 bg-[#0f172a] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {step.num}
                </span>
              </div>
              <h3 className="font-bold text-[#0f172a] text-xl mb-3">{step.title}</h3>
              <p className="text-[#64748b] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Value Props (For Workers & For Employers) ----
function ValueProps() {
  const workers = [
    {
      title: "Direct Connections",
      desc: "No middlemen taking a cut. Talk directly to the employers and negotiate your own fair rates.",
    },
    {
      title: "Verified Safety",
      desc: "Every employer is verified to ensure you work in safe, reliable, and professional environments.",
    },
    {
      title: "Build Your Reputation",
      desc: "Earn ratings and reviews for your hard work, helping you secure more jobs at better pay over time.",
    },
  ];

  const employers = [
    {
      title: "Instant Hiring",
      desc: "Post a job and start getting calls from available, nearby workers within minutes, not days.",
      iconColor: "bg-[#f59e0b]",
    },
    {
      title: "Verified Identities",
      desc: "Hire with confidence. All workers on BlueLink are Aadhaar-verified for complete peace of mind.",
      iconColor: "bg-[#f59e0b]",
    },
    {
      title: "Skill-Based Matching",
      desc: "Our algorithm ensures you only see candidates who actually match the trade and experience you need.",
      iconColor: "bg-[#f59e0b]",
    },
  ];

  return (
    <section id="for-workers" className="py-20 bg-[rgba(243,246,249,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* For Workers */}
          <div id="for-workers-panel" className="bg-[rgba(26,60,110,0.04)] border border-[rgba(26,60,110,0.1)] rounded-2xl p-8 lg:p-12">
            <p className="text-[#1a3c6e] text-sm font-bold uppercase tracking-widest mb-4">For Workers</p>
            <h2 className="font-extrabold text-[#0f172a] mb-8 leading-tight text-3xl">
              Dignity, Freedom &<br />Better Pay
            </h2>
            <div className="space-y-6">
              {workers.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="bg-[#1a3c6e] rounded-md p-1.5 shrink-0 mt-0.5">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">{item.title}</h4>
                    <p className="text-[#64748b] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Employers */}
          <div id="for-employers" className="bg-[rgba(255,251,235,0.5)] border border-[rgba(245,158,11,0.2)] rounded-2xl p-8 lg:p-12">
            <p className="text-[#d97706] text-sm font-bold uppercase tracking-widest mb-4">For Employers</p>
            <h2 className="font-extrabold text-[#0f172a] mb-8 leading-tight text-3xl">
              Speed, Trust &<br />Quality Talent
            </h2>
            <div className="space-y-6">
              {employers.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className={`${item.iconColor} rounded-md p-1.5 shrink-0 mt-0.5`}>
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f172a] text-lg mb-1">{item.title}</h4>
                    <p className="text-[#64748b] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Impact Numbers ----
function ImpactNumbers() {
  const stats = [
    { value: "1M+", label: "Jobs to be Posted", sub: "Year 1 target" },
    { value: "750K", label: "Workers to be Placed", sub: "Year 1 target" },
    { value: "50+", label: "Cities at Launch", sub: "Phase 1 rollout" },
    { value: "4.5+", label: "Target Avg. Rating", sub: "Platform benchmark" },
  ];

  return (
    <section className="bg-[#1a3c6e] py-16 relative overflow-hidden">
      {/* subtle background texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            🎯 Our Launch Targets
          </span>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            We haven't launched yet — but here's what we're building toward. These are the milestones we're targeting in our first phase.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[#f59e0b] font-extrabold text-4xl sm:text-5xl mb-1">{stat.value}</p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-white/50 text-xs uppercase tracking-wide">{stat.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/30 text-xs mt-10">
          * All figures are projected targets. Actual results will be published post-launch.
        </p>
      </div>
    </section>
  );
}

// ---- Survey Insights ----
function SurveyInsights() {
  const insights = [
    {
      percent: "74%",
      accent: "#1a3c6e",
      accentBg: "bg-[rgba(26,60,110,0.08)]",
      accentText: "text-[#1a3c6e]",
      accentBadge: "bg-[rgba(26,60,110,0.1)] text-[#1a3c6e]",
      barColor: "bg-[#1a3c6e]",
      tag: "Worker Survey · Field Research",
      problem: "Daily wage workers have no reliable way to find consistent work",
      detail:
        "In surveys across labour chowks in Mumbai, Delhi & Bengaluru, 74% of blue-collar workers said they had gone without work for 3+ days in a month simply because they had no way to reach employers digitally.",
      quote: "I wake up at 5 AM and go stand at the crossing hoping someone will hire me. Most days I go home empty-handed.",
      persona: { name: "Rajesh Kumar", role: "Electrician · Mumbai", img: imgRajesh },
      stat2: { value: "84%", label: "said they'd use an app in their language to find daily work" },
    },
    {
      percent: "71%",
      accent: "#d97706",
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
      accentBadge: "bg-amber-100 text-amber-700",
      barColor: "bg-amber-500",
      tag: "Employer Survey · SME Research",
      problem: "Small businesses struggle to find verified workers fast enough",
      detail:
        "71% of small-to-mid-sized contractors and facility managers in Tier-1 cities reported that finding a reliable, verified worker takes more than 2 days on average — causing project delays and revenue loss.",
      quote: "I once waited 4 days to find a plumber for an urgent repair job. The client was furious. There's no system.",
      persona: { name: "Priya Sharma", role: "Facility Manager · Delhi", img: imgPriya },
      stat2: { value: "3+ days", label: "average time lost per hiring cycle for SMEs" },
    },
    {
      percent: "62%",
      accent: "#0f172a",
      accentBg: "bg-slate-100",
      accentText: "text-slate-700",
      accentBadge: "bg-slate-200 text-slate-700",
      barColor: "bg-slate-700",
      tag: "Safety Survey · Gig Workers",
      problem: "Unverified job listings expose workers to scams & unsafe conditions",
      detail:
        "62% of informal-sector workers surveyed reported encountering at least one fake or misleading job offer in the past year. Without verification, workers take on personal risk every time they respond to an unknown employer.",
      quote: "Someone promised ₹1,200/day but paid ₹400 and disappeared. I had no way to verify if they were real.",
      persona: { name: "Suresh Patil", role: "Delivery Agent · Pune", img: imgSuresh },
      stat2: { value: "1 in 3", label: "workers have faced wage theft or unsafe working conditions" },
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insights.map((item) => (
            <div
              key={item.persona.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full ${item.barColor}`} />

              <div className="p-7 flex flex-col flex-1">
                {/* Tag */}
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${item.accentBadge}`}>
                  {item.tag}
                </span>

                {/* Big stat */}
                <div className="flex items-end gap-3 mb-4">
                  <span className={`font-extrabold text-6xl leading-none ${item.accentText}`}>{item.percent}</span>
                  <p className="text-[#0f172a] font-bold text-base leading-snug mb-1 max-w-[160px]">{item.problem}</p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${item.barColor}`}
                    style={{ width: item.percent }}
                  />
                </div>

                {/* Detail */}
                <p className="text-[#64748b] text-sm leading-relaxed mb-5 flex-1">{item.detail}</p>

                {/* Secondary stat */}
                <div className={`${item.accentBg} rounded-xl px-4 py-3 mb-5`}>
                  <p className={`font-extrabold text-xl ${item.accentText}`}>{item.stat2.value}</p>
                  <p className="text-[#64748b] text-xs mt-0.5">{item.stat2.label}</p>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-gray-200 pl-4 mb-5">
                  <p className="text-[#475569] text-sm italic leading-relaxed">"{item.quote}"</p>
                </blockquote>

                {/* Persona */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={item.persona.img}
                    alt={item.persona.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <p className="font-bold text-[#0f172a] text-sm">{item.persona.name}</p>
                    <p className="text-[#94a3b8] text-xs">{item.persona.role} · Survey Respondent</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-[#1a3c6e] rounded-2xl px-8 py-10">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-2">The Opportunity</p>
          <h3 className="text-white font-extrabold text-2xl sm:text-3xl mb-3">
            India has <span className="text-[#f59e0b]">450M+ blue-collar workers.</span><br className="hidden sm:block" /> Less than 5% are digitally connected.
          </h3>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-6">
            BlueLink is built to close that gap — with a platform that's fast, simple, and designed for India's ground-level reality.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-8 py-3.5 rounded-md transition-all hover:shadow-lg"
          >
            Join the Waitlist
            <ArrowRightIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  const workerLinks = ["Create Profile", "Browse Jobs", "Skill Assessments", "Safety Guidelines"];
  const employerLinks = ["Post a Job", "Search Workers", "Pricing Plans", "Enterprise Solutions"];
  const companyLinks = ["About Us", "Careers", "Press & Media", "Contact Support"];

  return (
    <footer
      className="pt-16 pb-10 text-[#94a3b8]"
      style={{
        background: "linear-gradient(90deg, rgb(15,23,42) 0%, rgb(15,23,42) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-[#1a3c6e] rounded-md flex items-center justify-center w-9 h-9">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#f8fafc] font-extrabold text-xl tracking-tight">BlueLink</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering the Core of the Nation. Connecting skilled workers with trusted employers across India seamlessly.
            </p>
            {/* Google Play badge */}
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-[#1e293b] border border-[#334155] hover:border-[#475569] rounded-md px-4 py-2.5 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p2c872cd8} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-[#94a3b8] text-[10px] leading-tight">GET IT ON</p>
                <p className="text-[#f8fafc] font-semibold text-sm">Google Play</p>
              </div>
            </a>
          </div>

          {/* For Workers */}
          <div>
            <h4 className="text-[#f8fafc] font-bold text-base mb-5">For Workers</h4>
            <ul className="space-y-3">
              {workerLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#f8fafc] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-[#f8fafc] font-bold text-base mb-5">For Employers</h4>
            <ul className="space-y-3">
              {employerLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#f8fafc] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#f8fafc] font-bold text-base mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-[#f8fafc] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#334155] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2025 BlueLink Technologies. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {/* Twitter */}
            <a href="#" className="hover:text-[#f8fafc] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d={svgPaths.p327a8900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="hover:text-[#f8fafc] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 18">
                <path d={svgPaths.p21986800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
                <path d={svgPaths.p6ab2500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-[#f8fafc] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 16 20">
                <path d={svgPaths.p26ef1d00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---- App ----
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <HowItWorks />
        <ValueProps />
        <ImpactNumbers />
        <SurveyInsights />
      </main>
      <Footer />
    </div>
  );
}