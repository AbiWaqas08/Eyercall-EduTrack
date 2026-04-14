import { useNavigate } from "react-router-dom";
import {
  AcademicCapIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Student Management",
      desc: "Easily manage students, batches, and course enrollments.",
      icon: UserGroupIcon,
    },
    {
      title: "Fee Tracking",
      desc: "Track payments, pending fees, and deadlines efficiently.",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Assignments",
      desc: "Assign tasks, track submissions, and evaluate performance.",
      icon: ClipboardDocumentListIcon,
    },
    {
      title: "Smart Learning",
      desc: "A modern LMS system designed for real institutes.",
      icon: AcademicCapIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">

      {/* 🔝 NAVBAR */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-[var(--color-border)] shadow-sm">
        <h1 className="text-xl font-bold text-[var(--color-primary)]">
          Eyercall EduTrack
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg text-white transition"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Login
        </button>
      </header>

      {/* 🎯 HERO SECTION */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Eyercall EduTrack
        </h2>

        <p className="max-w-xl mx-auto text-[var(--color-text-secondary)] mb-6">
          A complete Learning Management System designed to manage students,
          track fees, and streamline assignments efficiently.
        </p>

        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Accounts are created by admin. Contact your institute for login credentials.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-lg text-white transition"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Access Dashboard
        </button>
      </section>

      {/* ⭐ FEATURES */}
      <section className="px-8 py-16 bg-white">
        <h3 className="text-2xl font-bold text-center mb-10">
          Key Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition"
            >
              <f.icon className="w-10 h-10 mb-4 text-[var(--color-primary)]" />

              <h4 className="font-semibold text-lg mb-2">
                {f.title}
              </h4>

              <p className="text-sm text-[var(--color-text-secondary)]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="text-center py-16 px-6">
        <h3 className="text-2xl font-bold mb-4">
          Start Managing Your Academy Today
        </h3>

        <p className="text-[var(--color-text-secondary)] mb-6">
          Simplify operations with Eyercall EduTrack.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 rounded-lg text-white transition"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          Get Started
        </button>
      </section>

      {/* 🔻 FOOTER */}
      <footer className="text-center py-4 border-t border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] bg-white">
        © 2026 Eyercall EduTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;