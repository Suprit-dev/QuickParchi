import React, { useState, useEffect, useRef } from "react";
import {
  Activity, MapPin, Search, Star, Clock, Users, Building2, Stethoscope,
  Calendar, ChevronRight, ChevronDown, Menu, X, Bell, QrCode, Download,
  CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Phone, Mail, Send,
  Zap, ShieldCheck, TrendingUp, Sparkles, LayoutDashboard, LogOut,
  Filter, Quote, PlayCircle, BadgeCheck, Smartphone, MapPinned, User, Lock,
} from "lucide-react";

const BLUE = "#0B5ED7";
const TEAL = "#3AAFA9";

const styleSheet = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto+Mono:wght@500;600&display=swap');
* { font-family: 'Poppins', sans-serif; }
.mono-num { font-family: 'Roboto Mono', monospace; font-variant-numeric: tabular-nums; }
@keyframes floaty { 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(-14px);} }
@keyframes floaty2 { 0%,100%{ transform: translateY(0px) rotate(0deg);} 50%{ transform: translateY(-10px) rotate(4deg);} }
@keyframes pulseRing { 0%{ box-shadow: 0 0 0 0 rgba(11,94,215,0.35);} 100%{ box-shadow: 0 0 0 18px rgba(11,94,215,0);} }
@keyframes fadeUp { from{ opacity:0; transform: translateY(24px);} to{ opacity:1; transform: translateY(0);} }
@keyframes shimmer { 0%{ background-position: -400px 0;} 100%{ background-position: 400px 0;} }
.fade-up { animation: fadeUp 0.7s ease both; }
.float-a { animation: floaty 5s ease-in-out infinite; }
.float-b { animation: floaty2 6s ease-in-out infinite; }
.pulse-ring { animation: pulseRing 1.8s ease-out infinite; }
.glass { background: rgba(255,255,255,0.65); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
.scrollbar-none::-webkit-scrollbar{ display:none; }
input, select, textarea { outline: none; }
`;

const DEPARTMENTS = ["General Medicine", "Cardiology", "Orthopedics", "Pediatrics", "Dermatology", "ENT", "Gynecology", "Neurology"];

const HOSPITALS = [
  { id: 1, name: "Sanjeevani Government Hospital", type: "Government", city: "Patna", rating: 4.3, wait: 22, depts: ["General Medicine", "Orthopedics", "Pediatrics"], color: TEAL },
  { id: 2, name: "Apex Multispeciality Hospital", type: "Private", city: "Patna", rating: 4.7, wait: 12, depts: ["Cardiology", "Neurology", "Dermatology"], color: BLUE },
  { id: 3, name: "Community Health Centre", type: "Government", city: "Varanasi", rating: 4.0, wait: 30, depts: ["General Medicine", "Gynecology", "ENT"], color: TEAL },
  { id: 4, name: "Lifeline Care Hospital", type: "Private", city: "Kanpur", rating: 4.6, wait: 15, depts: ["Cardiology", "Orthopedics", "ENT"], color: BLUE },
  { id: 5, name: "Nirmal Nursing Home", type: "Private", city: "Lucknow", rating: 4.2, wait: 18, depts: ["Pediatrics", "Gynecology", "General Medicine"], color: BLUE },
  { id: 6, name: "District Government Hospital", type: "Government", city: "Delhi", rating: 3.9, wait: 35, depts: ["General Medicine", "Orthopedics", "Neurology"], color: TEAL },
];

const DOCTORS = [
  { id: 1, name: "Dr. Ananya Sharma", spec: "Cardiologist", exp: 12, hospital: "Apex Multispeciality Hospital", rating: 4.8, next: "Today, 4:30 PM" },
  { id: 2, name: "Dr. Rohit Verma", spec: "Orthopedic Surgeon", exp: 9, hospital: "Lifeline Care Hospital", rating: 4.6, next: "Today, 5:00 PM" },
  { id: 3, name: "Dr. Meena Kumari", spec: "Pediatrician", exp: 15, hospital: "Sanjeevani Government Hospital", rating: 4.7, next: "Tomorrow, 10:00 AM" },
  { id: 4, name: "Dr. Farhan Ali", spec: "Dermatologist", exp: 7, hospital: "Apex Multispeciality Hospital", rating: 4.4, next: "Today, 6:15 PM" },
  { id: 5, name: "Dr. Sunita Devi", spec: "Gynecologist", exp: 18, hospital: "Nirmal Nursing Home", rating: 4.9, next: "Tomorrow, 9:30 AM" },
  { id: 6, name: "Dr. Vikas Ranjan", spec: "General Physician", exp: 6, hospital: "pCommunity Health Centre", rating: 4.1, next: "Today, 3:45 PM" },
];

function Counter({ to, suffix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setSeen(true);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [seen, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Logo({ light }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
        <Zap size={18} color="#fff" strokeWidth={2.5} />
      </div>
      <span className={`text-lg font-semibold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>Quick Parchi</span>
    </div>
  );
}

function Badge({ children, color = BLUE, bg }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ color, background: bg || `${color}14` }}>
      {children}
    </span>
  );
}

function NavBar({ page, go, setCtx }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const onClick = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const links = [
    ["home", "Home"], ["doctors", "Find Doctors"], ["hospitals", "Hospitals"],
    ["howItWorks", "How It Works"], ["about", "About"], ["contact", "Contact"],
  ];
  const profileMenu = [
    [Stethoscope, "Current Prescription", "Current Prescription"],
    [Clock, "Previous Record", "Previous Record"],
    [Activity, "All Lab Report", "All Lab Report"],
    [User, "Your Data", "Your Data"],
  ];
  const openProfileTab = (tab) => {
    setCtx((c) => ({ ...c, profileTab: tab }));
    go("profile");
    setProfileOpen(false);
    setOpen(false);
  };
  const handleNav = (id) => {
    if (id === "howItWorks") {
      if (page !== "home") go("home");
      setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, page !== "home" ? 120 : 0);
      return;
    }
    go(id);
  };
  return (
    <div className={`sticky top-0 z-50 transition-all ${scrolled ? "glass shadow-sm" : "bg-white/0"}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go("home")}><Logo /></button>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => handleNav(id)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${page === id ? "text-white" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
              style={page === id ? { background: BLUE } : {}}>
              {label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => go("login")} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200">Login</button>
          <button onClick={() => go("booking")} className="px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-1.5"
            style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}><QrCode size={15} />Book Token</button>
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen((v) => !v)} aria-label="Your profile"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
              <User size={18} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-2 fade-up">
                {profileMenu.map(([Icon, label, tab]) => (
                  <button key={label} onClick={() => openProfileTab(tab)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
                    <Icon size={16} color={BLUE} /> {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button className="lg:hidden text-slate-700" onClick={() => setOpen(!open)}>{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {open && (
        <div className="lg:hidden glass px-5 pb-4 flex flex-col gap-1 border-t border-slate-200">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { handleNav(id); setOpen(false); }} className="text-left py-2.5 text-sm font-medium text-slate-700">{label}</button>
          ))}
          <button onClick={() => { go("login"); setOpen(false); }} className="text-left py-2.5 text-sm font-medium text-slate-700">Login</button>
          <button onClick={() => { go("booking"); setOpen(false); }} className="mt-2 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-1.5" style={{ background: BLUE }}><QrCode size={15} />Book Token</button>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-400 px-1 mb-1.5">YOUR PROFILE</p>
            {profileMenu.map(([Icon, label, tab]) => (
              <button key={label} onClick={() => openProfileTab(tab)}
                className="w-full flex items-center gap-3 py-2 text-sm text-slate-700 text-left">
                <Icon size={16} color={BLUE} /> {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Footer({ go }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">Skip the queue. Book your OPD token in seconds and track it live, from anywhere.</p>
          <a href="mailto:support@quickparchi.in" className="flex items-center gap-2 mt-4 text-sm text-slate-400 hover:text-white transition-colors"><Mail size={14} /> support@quickparchi.in</a>
          <div className="flex gap-3 mt-5">
            {[["LinkedIn", "in"], ["Instagram", "ig"]].map(([s]) => (
              <span key={s} className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs hover:bg-slate-700 cursor-pointer transition-colors">{s[0]}</span>
            ))}
          </div>
        </div>
        {[
          ["Product", [["home","Home"],["hospitals","Hospitals"],["doctors","Find Doctors"],["queue","Live Queue"]]],
          ["Company", [["about","About"],["contact","Contact"],["login","Careers"]]],
          ["Legal", [["contact","Privacy Policy"],["contact","Terms & Conditions"],["contact","Help Center"]]],
        ].map(([title, items]) => (
          <div key={title}>
            <h4 className="text-white font-semibold mb-4 text-sm">{title}</h4>
            <ul className="space-y-2.5 text-sm">
              {items.map(([id, label], i) => (
                <li key={i}><button onClick={() => go(id)} className="hover:text-white transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between gap-3 text-xs text-slate-500">
        <span>© 2026 Quick Parchi Technologies Pvt. Ltd. All rights reserved.</span>
        <span>Made for patients across Bihar, India — expanding nationwide.</span>
      </div>
    </footer>
  );
}

function HospitalCard({ h, go, setCtx }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-32 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${h.color}22, ${h.color}55)` }}>
        <Building2 size={40} color={h.color} strokeWidth={1.5} />
        <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90" style={{ color: h.color }}>{h.type}</span>
        <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-amber-600"><Star size={12} fill="currentColor" />{h.rating}</span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-900 leading-snug">{h.name}</h3>
        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} />{h.city}, Bihar</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {h.depts.map((d) => <span key={d} className="text-[11px] px-2 py-1 rounded-md bg-slate-100 text-slate-600">{d}</span>)}
        </div>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500"><Clock size={13} /> Avg wait ~{h.wait} min</div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => { setCtx((c) => ({ ...c, hospital: h })); go("booking"); }}
            className="flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: BLUE }}>Book Token</button>
          <button onClick={() => { setCtx((c) => ({ ...c, hospital: h })); go("queue"); }}
            className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50">Details</button>
        </div>
      </div>
    </div>
  );
}

function DoctorCard({ d, go, setCtx }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg shrink-0" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
          {d.name.split(" ")[1]?.[0] || "D"}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm truncate">{d.name}</h3>
          <p className="text-xs" style={{ color: TEAL }}>{d.spec}</p>
          <p className="text-[11px] text-slate-500">{d.exp} yrs experience</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1"><Building2 size={12} />{d.hospital}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="flex items-center gap-1 text-xs text-amber-600 font-medium"><Star size={12} fill="currentColor" />{d.rating}</span>
        <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">Next: {d.next}</span>
      </div>
      <button onClick={() => { setCtx((c) => ({ ...c, doctor: d })); go("booking"); }}
        className="w-full mt-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: BLUE }}>Book Appointment</button>
    </div>
  );
}

function Home({ go, setCtx }) {
  const [q, setQ] = useState("");
  const feats = [
    [Calendar, "Online Token Booking", "Reserve your OPD slot in under a minute, no calls, no counters."],
    [Activity, "Live Queue Tracking", "Watch your position update in real time from wherever you are."],
    [Stethoscope, "Doctor Availability", "See who's in today, their specialty, and their next open slot."],
    [Search, "Hospital Search", "Filter government and private hospitals by city and department."],
    [QrCode, "Digital Token", "A scannable token card replaces the paper parchi entirely."],
    [Bell, "Smart Notifications", "Get nudged when your turn is close, so you never miss it."],
  ];
  const steps = [
    [Search, "Search Hospital", "Find by city, type or department near you."],
    [Stethoscope, "Choose Doctor", "Compare specialists and their availability."],
    [Clock, "Select Time Slot", "Pick a convenient slot that fits your day."],
    [QrCode, "Book Digital Token", "Get a QR token instantly — no printing needed."],
    [Building2, "Visit Hospital", "Arrive when your position is close. Skip the bench."],
  ];
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-24 px-5 md:px-8" style={{ background: `linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 70%)` }}>
        <div className="absolute -top-10 -right-24 w-96 h-96 rounded-full opacity-20 float-a" style={{ background: BLUE, filter: "blur(60px)" }} />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full opacity-20 float-b" style={{ background: TEAL, filter: "blur(60px)" }} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative">
          <div className="fade-up">
            <Badge color={TEAL} bg="#EAFAF8"><ShieldCheck size={13} /> Trusted Digital Healthcare Platform</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] mt-5 tracking-tight">
              Skip the queue.<br /><span style={{ color: BLUE }}>Book your token</span> instantly.
            </h1>
            <p className="text-slate-600 mt-6 text-lg leading-relaxed max-w-lg">
              Quick Parchi turns hours of hospital waiting into a two-minute booking. Choose your doctor, pick a slot, and track your place in line — live.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <button onClick={() => go("booking")} className="px-6 py-3.5 rounded-xl text-white font-semibold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-transform" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
                Book Token <ArrowRight size={18} />
              </button>
              <button onClick={() => go("hospitals")} className="px-6 py-3.5 rounded-xl font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                Explore Hospitals <Building2 size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-8 max-w-md bg-white rounded-xl border border-slate-200 shadow-sm p-1.5">
              <Search size={18} className="text-slate-400 ml-2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hospital, doctor or city..."
                className="flex-1 text-sm py-2 bg-transparent text-slate-700" />
              <button onClick={() => go("hospitals")} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: BLUE }}>Search</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 max-w-lg">
              {[
                [Building2, "Government Hospitals"],
                [Building2, "Private Hospitals"],
                [BadgeCheck, "Ayushman Bharat"],
                [MapPinned, "Nearby Hospitals"],
              ].map(([Icon, label], i) => (
                <button key={label} onClick={() => go("hospitals")}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-transparent hover:text-white transition-colors"
                  style={{ "--hoverbg": i % 2 ? TEAL : BLUE }}
                  onMouseEnter={(e) => e.currentTarget.style.background = i % 2 ? TEAL : BLUE}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative fade-up hidden lg:block" style={{ animationDelay: "0.15s" }}>
            <div className="relative mx-auto w-full max-w-sm rounded-3xl p-6 shadow-2xl float-a" style={{ background: `linear-gradient(160deg, ${BLUE}, ${TEAL})` }}>
              <div className="flex items-center justify-between text-white/90 text-xs font-medium"><span>Quick Parchi</span><QrCode size={16} /></div>
              <div className="mt-6 text-white">
                <p className="text-xs text-white/70">Your token</p>
                <p className="mono-num text-5xl font-semibold mt-1">A-042</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white/15 rounded-xl p-3"><p className="text-[11px] text-white/70">Position</p><p className="text-xl font-semibold text-white mono-num">7</p></div>
                <div className="bg-white/15 rounded-xl p-3"><p className="text-[11px] text-white/70">Wait</p><p className="text-xl font-semibold text-white mono-num">18 min</p></div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-white/85 text-xs"><CheckCircle2 size={14} /> Confirmed for Apex Multispeciality</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 float-b flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${TEAL}22` }}><Stethoscope size={18} color={TEAL} /></div>
              <div><p className="text-xs text-slate-500">Doctor online</p><p className="text-sm font-semibold text-slate-800">Dr. Ananya Sharma</p></div>
            </div>

            <div className="mt-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-5 fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}><User size={19} /></div>
                <div><p className="text-sm font-semibold text-slate-800">Your Profile</p><p className="text-xs text-slate-500">Quick access to your records</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                {[
                  [Stethoscope, "Current Prescription"],
                  [Clock, "Previous Record"],
                  [Activity, "All Lab Report"],
                  [User, "Your Data"],
                ].map(([Icon, label], i) => (
                  <button key={label} onClick={() => { setCtx((c) => ({ ...c, profileTab: label })); go("profile"); }}
                    className="flex flex-col items-start gap-2 rounded-xl border border-slate-200 p-3 text-left hover:border-transparent hover:shadow-md transition-all"
                    onMouseEnter={(e) => e.currentTarget.style.background = i % 2 ? `${TEAL}0D` : `${BLUE}0D`}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}>
                    <Icon size={16} color={i % 2 ? TEAL : BLUE} />
                    <span className="text-xs font-medium text-slate-700 leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            [ShieldCheck, "Secure Data"],
            [BadgeCheck, "Verified Hospitals"],
            [QrCode, "Digital Token"],
            [Zap, "Fast Booking"],
            [Lock, "Privacy Protected"],
          ].map(([Icon, label], i) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 rounded-2xl border border-slate-200 bg-white py-5 px-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${i % 2 ? TEAL : BLUE}15` }}>
                <Icon size={18} color={i % 2 ? TEAL : BLUE} />
              </div>
              <p className="text-xs font-medium text-slate-700 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            [Building2, 120, "+", "Hospitals Connected"],
            [Stethoscope, 340, "+", "Doctors Onboard"],
            [Users, 48000, "+", "Patients Served"],
            [MapPin, 4, "", "Cities Covered"],
          ].map(([Icon, n, s, l], i) => (
            <div key={l} className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${i % 2 ? TEAL : BLUE}15` }}>
                <Icon size={20} color={i % 2 ? TEAL : BLUE} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900"><Counter to={n} suffix={s} /></p>
                <p className="text-xs text-slate-500 mt-0.5">{l}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="text-center max-w-xl mx-auto">
          <Badge color={TEAL}>Features</Badge>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">Everything you need, nothing you don't</h2>
          <p className="text-slate-500 mt-3">Built for patients who just want to see a doctor without losing their morning.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {feats.map(([Icon, title, desc], i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300 bg-white group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${i % 2 ? TEAL : BLUE}15` }}>
                <Icon size={20} color={i % 2 ? TEAL : BLUE} />
              </div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Badge color={BLUE}>Why Quick Parchi</Badge>
          <h2 className="text-3xl font-bold text-slate-900 mt-4 leading-tight">A better way to see a doctor</h2>
          <p className="text-slate-500 mt-3 leading-relaxed max-w-md">Built around the patient, not the counter. Every design choice removes a reason to wait.</p>
        </div>
        <div className="space-y-4">
          {[
            ["Save Time", "Book in under two minutes instead of standing in line for hours."],
            ["No Waiting Line", "Your token holds your place — there's no physical queue to stand in."],
            ["Easy Booking", "A simple three-tap flow gets you a confirmed slot."],
            ["Live Queue Updates", "Know exactly when to leave home with real-time position tracking."],
            ["Better Patient Experience", "Less stress, less standing, more time for what matters."],
          ].map(([t, d], i) => (
            <div key={t} className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${i % 2 ? TEAL : BLUE}15` }}>
                <CheckCircle2 size={16} color={i % 2 ? TEAL : BLUE} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">{t}</h3>
                <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="py-24 scroll-mt-16" style={{ background: "#F5F7FA" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-xl mx-auto">
            <Badge color={BLUE}>How it works</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mt-4">Five steps between you and your doctor</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-5 mt-12">
            {steps.map(([Icon, t, d], i) => (
              <div key={t} className="relative bg-white rounded-2xl p-5 border border-slate-200 text-center">
                <div className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${i % 2 ? TEAL : BLUE}15` }}>
                  <Icon size={19} color={i % 2 ? TEAL : BLUE} />
                </div>
                <span className="mono-num text-xs font-semibold block mt-3" style={{ color: BLUE }}>STEP 0{i + 1}</span>
                <h3 className="font-semibold text-slate-900 mt-1 text-sm">{t}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{d}</p>
                {i < 4 && <ChevronRight size={16} className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24">
        <div className="text-center max-w-xl mx-auto">
          <Badge color={TEAL}>Testimonials</Badge>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">Patients spend less time waiting</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {[
            ["Ravi Kumar", "Patna", "I booked a cardiology token from my phone and walked in right on time. No more standing in line since 6 AM."],
            ["Sneha Singh", "Kochas", "The live queue tracker meant I could finish my errands and reach the hospital exactly when my turn came."],
            ["Manoj Prasad", "Gaya", "Booking for my parents used to be stressful. Now I do it in two minutes from home."],
          ].map(([n, c, t], i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Quote size={22} color={`${BLUE}55`} />
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">{t}</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: BLUE }}>{n[0]}</div>
                <div><p className="text-sm font-semibold text-slate-800">{n}</p><p className="text-xs text-slate-500">{c}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FAQ />

      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
        <div className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
          <h2 className="text-3xl font-bold text-white">Ready to skip your next queue?</h2>
          <p className="text-white/80 mt-3 max-w-md mx-auto">Join thousands of patients across Bihar booking their OPD tokens in seconds.</p>
          <button onClick={() => go("booking")} className="mt-7 px-7 py-3.5 rounded-xl bg-white font-semibold hover:-translate-y-0.5 transition-transform" style={{ color: BLUE }}>
            Book Your Token Now
          </button>
        </div>
      </section>
    </>
  );
}

function FAQ() {
  const [openI, setOpenI] = useState(0);
  const items = [
    ["How do I book a token?", "Search for a hospital or doctor, pick an available time slot, and confirm — you'll get a digital token instantly."],
    ["Is it free?", "Yes, booking a token and tracking your queue position is completely free for patients."],
    ["Can I cancel my booking?", "Yes, you can cancel or reschedule your token anytime before your slot from your dashboard."],
    ["Which hospitals are available?", "Quick Parchi is live in select government and private hospitals across four districts, with more being added."],
    ["Is Ayushman Card supported?", "Yes, Ayushman Bharat empanelled hospitals are marked on search so you can book with your card."],
  ];
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 pb-24">
      <div className="text-center mb-10">
        <Badge color={BLUE}>FAQ</Badge>
        <h2 className="text-3xl font-bold text-slate-900 mt-4">Questions, answered</h2>
      </div>
      <div className="space-y-3">
        {items.map(([q, a], i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <button onClick={() => setOpenI(openI === i ? -1 : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-medium text-slate-800 text-sm">{q}</span>
              <ChevronDown size={18} className={`text-slate-400 transition-transform ${openI === i ? "rotate-180" : ""}`} />
            </button>
            {openI === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Hospitals({ go, setCtx }) {
  const [type, setType] = useState("All");
  const [city, setCity] = useState("All");
  const [dept, setDept] = useState("All");
  const [q, setQ] = useState("");
  const cities = ["All", ...new Set(HOSPITALS.map((h) => h.city))];
  const filtered = HOSPITALS.filter((h) =>
    (type === "All" || h.type === type) &&
    (city === "All" || h.city === city) &&
    (dept === "All" || h.depts.includes(dept)) &&
    h.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <div className="text-center max-w-xl mx-auto mb-10">
        <Badge color={BLUE}><Building2 size={13} /> Hospitals</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">Find a hospital near you</h1>
        <p className="text-slate-500 mt-2">{filtered.length} hospitals match your filters</p>
      </div>
      <div className="flex flex-wrap gap-3 items-center bg-white border border-slate-200 rounded-2xl p-3 mb-8 sticky top-16 z-30 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[180px] px-3">
          <Search size={16} className="text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hospitals..." className="flex-1 text-sm py-2 bg-transparent" />
        </div>
        {[[type, setType, ["All", "Government", "Private"]], [city, setCity, cities], [dept, setDept, ["All", ...DEPARTMENTS]]].map(([val, setter, opts], i) => (
          <select key={i} value={val} onChange={(e) => setter(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600">
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((h) => <HospitalCard key={h.id} h={h} go={go} setCtx={setCtx} />)}
      </div>
      {filtered.length === 0 && <p className="text-center text-slate-400 py-16">No hospitals match those filters yet.</p>}
    </section>
  );
}

function Doctors({ go, setCtx }) {
  const [q, setQ] = useState("");
  const filtered = DOCTORS.filter((d) => (d.name + d.spec).toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-14">
      <div className="text-center max-w-xl mx-auto mb-10">
        <Badge color={TEAL}><Stethoscope size={13} /> Doctors</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">Meet our doctors</h1>
      </div>
      <div className="flex items-center gap-2 max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-1.5 mb-10">
        <Search size={16} className="text-slate-400 ml-2" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or specialization..." className="flex-1 text-sm py-2 bg-transparent" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => <DoctorCard key={d.id} d={d} go={go} setCtx={setCtx} />)}
      </div>
    </section>
  );
}

function Stepper({ step, labels }) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-10">
      {labels.map((l, i) => (
        <React.Fragment key={l}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${i <= step ? "text-white" : "bg-slate-100 text-slate-400"}`} style={i <= step ? { background: BLUE } : {}}>
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </div>
            <span className={`text-[11px] hidden sm:block ${i <= step ? "text-slate-700 font-medium" : "text-slate-400"}`}>{l}</span>
          </div>
          {i < labels.length - 1 && <div className="flex-1 h-0.5 mx-1" style={{ background: i < step ? BLUE : "#E2E8F0" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function Booking({ ctx, setCtx }) {
  const [step, setStep] = useState(ctx.hospital ? 1 : 0);
  const [hospital, setHospital] = useState(ctx.hospital || null);
  const [dept, setDept] = useState("");
  const [doctor, setDoctor] = useState(ctx.doctor || null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [token] = useState(() => `A-${String(Math.floor(Math.random() * 60) + 10)}`);
  const dates = ["Today, 27 Jul", "Tomorrow, 28 Jul", "29 Jul", "30 Jul"];
  const times = ["9:00 AM", "10:30 AM", "12:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];
  const labels = ["Hospital", "Department", "Doctor", "Date", "Time", "Token"];
  const availableDoctors = DOCTORS.filter((d) => !hospital || d.hospital === hospital.name);

  if (done) {
    const position = Math.floor(Math.random() * 10) + 3;
    return (
      <section className="max-w-lg mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center pulse-ring" style={{ background: `${TEAL}20` }}>
          <CheckCircle2 size={30} color={TEAL} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-6">Token booked successfully</h1>
        <p className="text-slate-500 mt-1 text-sm">Your digital parchi is ready. Show the QR code at the reception.</p>

        <div className="mt-8 rounded-3xl p-7 relative text-white shadow-2xl fade-up" style={{ background: `linear-gradient(160deg, ${BLUE}, ${TEAL})` }}>
          <div className="absolute left-0 right-0 top-[128px] flex justify-between px-[-8px]">
            <div className="w-5 h-5 rounded-full bg-slate-50 -ml-2.5" />
            <div className="w-5 h-5 rounded-full bg-slate-50 -mr-2.5" />
          </div>
          <div className="flex justify-between items-start">
            <div className="text-left"><p className="text-xs text-white/70">Quick Parchi Token</p><p className="text-sm font-semibold mt-0.5">{hospital?.name || "Apex Multispeciality Hospital"}</p></div>
            <Zap size={20} />
          </div>
          <p className="mono-num text-6xl font-bold mt-6 text-left">{token}</p>
          <div className="border-t border-dashed border-white/30 my-6" />
          <div className="grid grid-cols-3 gap-3 text-left">
            <div><p className="text-[10px] text-white/60">Position</p><p className="font-semibold mono-num">{position}</p></div>
            <div><p className="text-[10px] text-white/60">Est. wait</p><p className="font-semibold mono-num">{position * 6} min</p></div>
            <div><p className="text-[10px] text-white/60">Slot</p><p className="font-semibold">{time || "2:30 PM"}</p></div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div><p className="text-xs text-white/70">{doctor?.name || "Dr. Ananya Sharma"}</p><p className="text-[11px] text-white/50">{date || "Today, 27 Jul"}</p></div>
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center"><QrCode size={34} color={BLUE} /></div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 rounded-xl border border-slate-200 font-medium text-slate-700 flex items-center justify-center gap-2"><Download size={16} /> Download</button>
          <button onClick={() => setCtx((c) => ({ ...c, page: "queue" }))} className="flex-1 py-3 rounded-xl text-white font-semibold" style={{ background: BLUE }}>Track Live Queue</button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-5 py-14">
      <div className="text-center mb-10">
        <Badge color={BLUE}><Calendar size={13} /> Book a token</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">Reserve your OPD slot</h1>
      </div>
      <Stepper step={step} labels={labels} />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 min-h-[280px]">
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {HOSPITALS.map((h) => (
              <button key={h.id} onClick={() => { setHospital(h); setStep(1); }}
                className={`text-left p-4 rounded-xl border transition-all ${hospital?.id === h.id ? "shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                style={hospital?.id === h.id ? { borderColor: BLUE, background: `${BLUE}08` } : {}}>
                <p className="font-medium text-sm text-slate-800">{h.name}</p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={11} />{h.city} · {h.type}</p>
              </button>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="grid sm:grid-cols-3 gap-3">
            {(hospital ? hospital.depts.concat(DEPARTMENTS.filter((d) => !hospital.depts.includes(d)).slice(0, 3)) : DEPARTMENTS).map((d) => (
              <button key={d} onClick={() => { setDept(d); setStep(2); }}
                className={`p-4 rounded-xl border text-sm font-medium transition-all ${dept === d ? "shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                style={dept === d ? { borderColor: TEAL, background: `${TEAL}0C`, color: TEAL } : { color: "#334155" }}>{d}</button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {(availableDoctors.length ? availableDoctors : DOCTORS).map((d) => (
              <button key={d.id} onClick={() => { setDoctor(d); setStep(3); }}
                className={`text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${doctor?.id === d.id ? "shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                style={doctor?.id === d.id ? { borderColor: BLUE, background: `${BLUE}08` } : {}}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0" style={{ background: TEAL }}>{d.name.split(" ")[1]?.[0]}</div>
                <div><p className="text-sm font-medium text-slate-800">{d.name}</p><p className="text-xs text-slate-500">{d.spec}</p></div>
              </button>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="grid sm:grid-cols-4 gap-3">
            {dates.map((d) => (
              <button key={d} onClick={() => { setDate(d); setStep(4); }}
                className={`p-4 rounded-xl border text-sm font-medium transition-all ${date === d ? "shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                style={date === d ? { borderColor: BLUE, background: `${BLUE}08`, color: BLUE } : { color: "#334155" }}>{d}</button>
            ))}
          </div>
        )}
        {step === 4 && (
          <div className="grid sm:grid-cols-3 gap-3">
            {times.map((t) => (
              <button key={t} onClick={() => { setTime(t); setStep(5); }}
                className={`p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2 ${time === t ? "shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                style={time === t ? { borderColor: TEAL, background: `${TEAL}0C`, color: TEAL } : { color: "#334155" }}><Clock size={13} />{t}</button>
            ))}
          </div>
        )}
        {step === 5 && (
          <div className="text-center py-4">
            <p className="text-sm text-slate-500 mb-1">Review your booking</p>
            <div className="text-left max-w-sm mx-auto bg-slate-50 rounded-xl p-5 space-y-2.5 mt-4">
              {[["Hospital", hospital?.name || "—"], ["Department", dept || "—"], ["Doctor", doctor?.name || "—"], ["Date", date || "—"], ["Time", time || "—"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm"><span className="text-slate-500">{k}</span><span className="font-medium text-slate-800">{v}</span></div>
              ))}
            </div>
            <button onClick={() => setDone(true)} className="mt-6 px-8 py-3 rounded-xl text-white font-semibold shadow-lg" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
              Generate Digital Token
            </button>
          </div>
        )}
      </div>

      {step > 0 && step < 6 && (
        <button onClick={() => setStep(step - 1)} className="mt-5 text-sm text-slate-500 flex items-center gap-1.5 hover:text-slate-700"><ArrowLeft size={14} /> Back</button>
      )}
    </section>
  );
}

function LiveQueue({ ctx }) {
  const [current, setCurrent] = useState(31);
  const [ticking, setTicking] = useState(true);
  const yourToken = 42;
  useEffect(() => {
    if (!ticking) return;
    const t = setInterval(() => setCurrent((c) => (c < yourToken - 1 ? c + 1 : c)), 3500);
    return () => clearInterval(t);
  }, [ticking]);
  const position = Math.max(yourToken - current, 0);
  return (
    <section className="max-w-3xl mx-auto px-5 py-14">
      <div className="text-center mb-10">
        <Badge color={TEAL}><Activity size={13} /> Live queue</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">{ctx.hospital?.name || "Apex Multispeciality Hospital"}</h1>
        <p className="text-slate-500 mt-1 text-sm">Cardiology · OPD Counter 3</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-xs text-slate-500">Now serving</p>
          <p className="mono-num text-4xl font-bold mt-2" style={{ color: BLUE }}>A-{String(current).padStart(2, "0")}</p>
        </div>
        <div className="rounded-2xl p-6 text-center text-white pulse-ring" style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}>
          <p className="text-xs text-white/70">Your token</p>
          <p className="mono-num text-4xl font-bold mt-2">A-{yourToken}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-xs text-slate-500">Est. waiting time</p>
          <p className="mono-num text-4xl font-bold mt-2 text-slate-800">{position * 6} min</p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500">Your position in line</span>
          <span className="font-semibold text-slate-800 mono-num">{position} people ahead</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min((current / yourToken) * 100, 100)}%`, background: `linear-gradient(90deg, ${BLUE}, ${TEAL})` }} />
        </div>
        <button onClick={() => setCurrent((c) => Math.min(c + 1, yourToken - 1))} className="mt-6 w-full py-3 rounded-xl border border-slate-200 font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50">
          <RefreshCw size={16} /> Refresh queue
        </button>
      </div>
    </section>
  );
}

function About({ go }) {
  const timeline = [["2024", "Idea born after a founder's father waited 4 hours for a 5-minute checkup."], ["2025", "Piloted with 3 government hospitals in Bihar."], ["2026", "Live across 120+ hospitals and 4 districts, expanding statewide."]];
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <Badge color={BLUE}>About Quick Parchi</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Built to give patients their mornings back</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-14">
        <div className="rounded-2xl border border-slate-200 p-7 bg-white">
          <ShieldCheck size={24} color={BLUE} />
          <h3 className="font-semibold text-slate-900 mt-4">Our mission</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">Make every hospital visit start with certainty, not a queue — so patients spend their time healing, not waiting.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-7 bg-white">
          <TrendingUp size={24} color={TEAL} />
          <h3 className="font-semibold text-slate-900 mt-4">Our vision</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">A hospital network where every OPD token, doctor, and queue is visible and bookable from a single phone.</p>
        </div>
      </div>
      <div className="mt-14 rounded-2xl bg-slate-50 border border-slate-200 p-8">
        <h3 className="font-semibold text-slate-900 mb-3">The problem we saw</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Millions of patients across India lose entire mornings standing in OPD queues, with no visibility into doctor availability, current wait, or department load — while hospitals struggle to manage the crowd that results. Quick Parchi replaces that uncertainty with a live, bookable digital token.</p>
      </div>
      <div className="mt-14">
        <h3 className="font-semibold text-slate-900 mb-6 text-center">Our journey</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {timeline.map(([y, t], i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <p className="mono-num text-2xl font-bold" style={{ color: BLUE }}>{y}</p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 text-center">
        <h3 className="font-semibold text-slate-900 mb-3">What's next</h3>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">AI-based wait time prediction, statewide expansion beyond Bihar, and direct integration with hospital management systems.</p>
        <button onClick={() => go("contact")} className="mt-6 px-6 py-3 rounded-xl text-white font-semibold" style={{ background: BLUE }}>Partner with us</button>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <Badge color={TEAL}>Contact</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">We'd love to hear from you</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 h-56 flex items-center justify-center bg-slate-100 relative">
            <MapPinned size={30} className="text-slate-400" />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(11,94,215,0.08), transparent 60%), radial-gradient(circle at 70% 70%, rgba(58,175,169,0.08), transparent 60%)" }} />
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <p className="flex items-center gap-3 text-slate-600"><Mail size={16} color={BLUE} /> quickparchi@gmail.com</p>
            <p className="flex items-center gap-3 text-slate-600"><Phone size={16} color={BLUE} /> +91 87899938635</p>
            <p className="flex items-center gap-3 text-slate-600"><MapPin size={16} color={BLUE} /> Upcoming</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <CheckCircle2 size={32} color={TEAL} />
              <p className="font-semibold text-slate-800 mt-3">Message sent</p>
              <p className="text-sm text-slate-500 mt-1">Our team will reach out within one business day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input required placeholder="Your name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50" />
              <input required type="email" placeholder="Email address" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50" />
              <textarea required placeholder="How can we help?" rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50 resize-none" />
              <button className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2" style={{ background: BLUE }}>Send message <Send size={15} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Help({ go }) {
  const topics = [
    ["How do I book a token?", "Go to Book Token, pick your hospital, department, doctor, date and time, then generate your digital token."],
    ["I didn't receive my OTP", "Wait 30 seconds and tap Resend on the login screen. Check that your number is entered correctly."],
    ["Where do I find my lab or pharmacy reports?", "Sign in and open your profile — reports live under Medical Pharma Report and Lab Report."],
    ["My queue position isn't updating", "Tap Refresh queue on the Live Queue page, or check your connection."],
    ["How do I reach a real person?", "Use the contact form or call us — details are on the Contact Us page."],
  ];
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <Badge color={BLUE}><ShieldCheck size={13} /> Any Help</Badge>
        <h1 className="text-3xl font-bold text-slate-900 mt-4">How can we help you today?</h1>
        <p className="text-slate-500 mt-2 text-sm">Browse common questions or reach out directly.</p>
      </div>
      <div className="space-y-3">
        {topics.map(([q, a], i) => (
          <div key={i} className="border border-slate-200 rounded-xl p-5 bg-white">
            <p className="font-medium text-slate-800 text-sm">{q}</p>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button onClick={() => go("contact")} className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: BLUE }}>Contact support</button>
      </div>
    </section>
  );
}

function Profile({ go, ctx = {} }) {
  const [tab, setTab] = useState(ctx.profileTab || "Current Prescription");
  useEffect(() => { if (ctx.profileTab) setTab(ctx.profileTab); }, [ctx.profileTab]);
  const tabs = ["Current Prescription", "Previous Record", "All Lab Report", "Your Data"];
  const prescriptions = [
    { name: "Paracetamol 650mg", date: "18 Jul 2026", hospital: "Apex Multispeciality Hospital", doctor: "Dr. Ananya Sharma" },
    { name: "Amoxicillin 500mg", date: "02 Jul 2026", hospital: "Lifeline Care Hospital", doctor: "Dr. Rohit Verma" },
  ];
  const previousRecords = [
    { id: "A-11", h: "Sanjeevani Government Hospital", d: "Dr. Vikas Ranjan", when: "12 Jul 2026" },
    { id: "A-27", h: "Lifeline Care Hospital", d: "Dr. Rohit Verma", when: "02 Jul 2026" },
  ];
  const labReports = [
    { name: "Complete Blood Count", date: "20 Jul 2026", status: "Normal" },
    { name: "Lipid Profile", date: "05 Jul 2026", status: "Review needed" },
  ];
  return (
    <section className="max-w-3xl mx-auto px-5 md:px-8 py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: BLUE }}><User size={20} /></div>
        <div><p className="font-semibold text-slate-800">Priya Kumari</p><p className="text-xs text-slate-500">+91 98765 43210</p></div>
        <button onClick={() => go("home")} className="ml-auto text-sm text-slate-500 flex items-center gap-1.5 hover:text-slate-700"><LogOut size={15} /> Log out</button>
      </div>
      <div className="flex bg-slate-100 rounded-xl p-1 mb-8 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}>{t}</button>
        ))}
      </div>

      {tab === "Current Prescription" && (
        <div className="space-y-4">
          <div className="rounded-3xl p-7 text-white shadow-xl" style={{ background: `linear-gradient(160deg, ${BLUE}, ${TEAL})` }}>
            <div className="flex justify-between items-start">
              <div><p className="text-xs text-white/70">Quick Parchi Token</p><p className="text-sm font-semibold mt-0.5">Apex Multispeciality Hospital</p></div>
              <Zap size={20} />
            </div>
            <p className="mono-num text-6xl font-bold mt-6">A-42</p>
            <div className="border-t border-dashed border-white/30 my-6" />
            <div className="grid grid-cols-3 gap-3">
              <div><p className="text-[10px] text-white/60">Position</p><p className="font-semibold mono-num">7</p></div>
              <div><p className="text-[10px] text-white/60">Est. wait</p><p className="font-semibold mono-num">18 min</p></div>
              <div><p className="text-[10px] text-white/60">Slot</p><p className="font-semibold">4:30 PM</p></div>
            </div>
            <button onClick={() => go("queue")} className="mt-6 w-full py-2.5 rounded-xl bg-white/15 text-sm font-semibold hover:bg-white/25 transition-colors">Track live queue</button>
          </div>
          <h3 className="font-semibold text-slate-800 text-sm pt-2">Prescribed medicines</h3>
          {prescriptions.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div><p className="text-sm font-medium text-slate-800">{r.name}</p><p className="text-xs text-slate-500">{r.doctor} · {r.hospital} · {r.date}</p></div>
              <button className="text-xs font-medium text-slate-500 flex items-center gap-1 border border-slate-200 rounded-lg px-3 py-1.5"><Download size={12} /> Download</button>
            </div>
          ))}
        </div>
      )}

      {tab === "Previous Record" && (
        <div className="space-y-3">
          {previousRecords.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="mono-num text-sm font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500">{a.id}</span>
                <div><p className="text-sm font-medium text-slate-800">{a.d}</p><p className="text-xs text-slate-500">{a.h}</p></div>
              </div>
              <div className="text-right"><p className="text-xs text-slate-500">{a.when}</p><button className="text-xs font-medium mt-1 text-slate-400 flex items-center gap-1 ml-auto"><Download size={11} /> Receipt</button></div>
            </div>
          ))}
        </div>
      )}

      {tab === "All Lab Report" && (
        <div className="space-y-3">
          {labReports.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div><p className="text-sm font-medium text-slate-800">{r.name}</p><p className="text-xs text-slate-500">{r.date}</p></div>
              <div className="flex items-center gap-3">
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${r.status === "Normal" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{r.status}</span>
                <button className="text-xs font-medium text-slate-500 flex items-center gap-1 border border-slate-200 rounded-lg px-3 py-1.5"><Download size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Your Data" && (
        <div className="space-y-3">
          {[
            ["Full name", "Suraj Kumar"],
            ["Mobile number", "+91 8789938635"],
            ["Email", "Suraj.kumar@example.com"],
            ["Date of birth", "07 Oct 2004"],
            ["Blood group", "B+"],
            ["Home city", "Patna, Bihar"],
          ].map(([label, val]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">{label}</span>
              <span className="text-sm font-medium text-slate-800">{val}</span>
            </div>
          ))}
          <button className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50">Edit your data</button>
        </div>
      )}
    </section>
  );
}

function Login({ go }) {
  const [role, setRole] = useState("Patient");
  const [otpStage, setOtpStage] = useState(false);
  const [phone, setPhone] = useState("");
  return (
    <section className="max-w-md mx-auto px-5 py-20">
      <div className="text-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold text-slate-900 mt-6">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-1">Log in to manage your tokens</p>
      </div>
      <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
        {["Patient", "Hospital", "Admin"].map((r) => (
          <button key={r} onClick={() => { setRole(r); setOtpStage(false); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${role === r ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}>{r}</button>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        {!otpStage ? (
          <>
            <label className="text-xs font-medium text-slate-500">Mobile number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full mt-1.5 border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-slate-50" />
            <button onClick={() => setOtpStage(true)} className="w-full mt-4 py-3 rounded-lg text-white font-semibold" style={{ background: BLUE }}>Send OTP</button>
            <div className="flex items-center gap-3 my-5"><div className="h-px bg-slate-200 flex-1" /><span className="text-xs text-slate-400">or</span><div className="h-px bg-slate-200 flex-1" /></div>
            <button className="w-full py-3 rounded-lg border border-slate-200 font-medium text-slate-700 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500" /> Continue with Google
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-slate-600">Enter the 4-digit OTP sent to <span className="font-medium text-slate-800">{phone || "+91 98765 43210"}</span></p>
            <div className="flex gap-3 mt-4 justify-center">
              {[0, 1, 2, 3].map((i) => <input key={i} maxLength={1} className="w-12 h-12 text-center text-lg font-semibold border border-slate-200 rounded-lg bg-slate-50" />)}
            </div>
            <button onClick={() => go(role === "Patient" ? "profile" : "home")} className="w-full mt-6 py-3 rounded-lg text-white font-semibold" style={{ background: BLUE }}>Verify & Continue</button>
            <p className="text-center text-xs text-slate-400 mt-3">Didn't get a code? <span className="font-medium" style={{ color: BLUE }}>Resend</span></p>
          </>
        )}
      </div>
    </section>
  );
}

function Dashboard({ go }) {
  const upcoming = [{ id: "A-42", h: "Apex Multispeciality Hospital", d: "Dr. Ananya Sharma", when: "Today, 4:30 PM" }];
  const past = [
    { id: "A-11", h: "Sanjeevani Government Hospital", d: "Dr. Vikas Ranjan", when: "12 Jul 2026" },
    { id: "A-27", h: "Lifeline Care Hospital", d: "Dr. Rohit Verma", when: "02 Jul 2026" },
  ];
  return (
    <section className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: BLUE }}><User size={20} /></div>
          <div><p className="font-semibold text-slate-800">Priya Kumari</p><p className="text-xs text-slate-500">Patient dashboard</p></div>
        </div>
        <button onClick={() => go("home")} className="text-sm text-slate-500 flex items-center gap-1.5 hover:text-slate-700"><LogOut size={15} /> Log out</button>
      </div>
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {[[LayoutDashboard, upcoming.length, "Upcoming"], [CheckCircle2, past.length, "Completed"], [Bell, 2, "Notifications"]].map(([Icon, n, l], i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${i === 1 ? TEAL : BLUE}15` }}><Icon size={18} color={i === 1 ? TEAL : BLUE} /></div>
            <div><p className="text-xl font-bold text-slate-800 mono-num">{n}</p><p className="text-xs text-slate-500">{l}</p></div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-slate-800 mb-3">Upcoming appointments</h3>
      <div className="space-y-3 mb-10">
        {upcoming.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="mono-num text-sm font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: BLUE }}>{a.id}</span>
              <div><p className="text-sm font-medium text-slate-800">{a.d}</p><p className="text-xs text-slate-500">{a.h}</p></div>
            </div>
            <div className="text-right"><p className="text-xs text-slate-500">{a.when}</p><button onClick={() => go("queue")} className="text-xs font-semibold mt-1" style={{ color: TEAL }}>Track live →</button></div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-slate-800 mb-3">Appointment history</h3>
      <div className="space-y-3">
        {past.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-3">
              <span className="mono-num text-sm font-bold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500">{a.id}</span>
              <div><p className="text-sm font-medium text-slate-800">{a.d}</p><p className="text-xs text-slate-500">{a.h}</p></div>
            </div>
            <div className="text-right"><p className="text-xs text-slate-500">{a.when}</p><button className="text-xs font-medium mt-1 text-slate-400 flex items-center gap-1 ml-auto"><Download size={11} /> Receipt</button></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function QuickParchiApp() {
  const [page, setPage] = useState("home");
  const [ctx, setCtx] = useState({});

  const go = (p) => {
    if (ctx.page && p === undefined) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (ctx.page) { setPage(ctx.page); setCtx((c) => ({ ...c, page: undefined })); window.scrollTo({ top: 0 }); }
  }, [ctx.page]);

  const pages = {
    home: <Home go={go} setCtx={setCtx} />,
    hospitals: <Hospitals go={go} setCtx={setCtx} />,
    doctors: <Doctors go={go} setCtx={setCtx} />,
    booking: <Booking ctx={ctx} setCtx={setCtx} />,
    queue: <LiveQueue ctx={ctx} />,
    about: <About go={go} />,
    contact: <Contact />,
    login: <Login go={go} />,
    dashboard: <Dashboard go={go} />,
    help: <Help go={go} />,
    profile: <Profile go={go} ctx={ctx} />,
  };

  return (
    <div className="min-h-screen bg-white text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{styleSheet}</style>
      <NavBar page={page} go={go} setCtx={setCtx} />
      {pages[page]}
      <Footer go={go} />
    </div>
  );
}
