"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, ChevronRight, HelpCircle, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // const navLinks = [
  //   { name: "Home", href: "/" },
  //   { name: "Books", href: "/dashborad/books" },
  //   { name: "Register", href: "/register" },
  //   { name: "Login", href: "/login" },
  // ];

  return (
    <nav className="flex items-center justify-between px-8 py-3.5 bg-white/75 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-30 transition-all duration-200">

      {/* Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 select-none">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border border-gray-150 px-2 py-0.5 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          <span>Panel</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />

        {pathSegments.length === 0 ? (
          <span className="text-sm font-semibold text-gray-800 tracking-tight capitalize">
            Home
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

              return (
                <div key={segment} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="w-3 h-3 text-gray-300" />}
                  {isLast ? (
                    <span className="text-sm font-semibold text-gray-800 tracking-tight capitalize">
                      {segment}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors capitalize"
                    >
                      {segment}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Middle/Right: Navigation Pills & Controls */}
      <div className="flex items-center gap-6">

        {/* Connection Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/60 border border-emerald-100/80 text-emerald-800 text-[11px] font-semibold select-none shadow-sm shadow-emerald-500/5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-tight">API Connected</span>
        </div>

        {/* Navigation Pills */}
        {/* <div className="flex items-center gap-1 bg-gray-100/60 p-1 rounded-xl border border-gray-200/40 relative">
          {navLinks.map((link) => {
            const isLinkActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 z-10 ${isLinkActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                {isLinkActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white shadow-sm border border-gray-150 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div> */}

        {/* Vertical Divider */}
        <div className="h-5 w-[1px] bg-gray-200"></div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Help Button */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications Button */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all relative cursor-pointer group">
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -15, 15, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </motion.div>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile Info Card */}
          <div className="flex items-center gap-2.5 pl-1.5 select-none">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-gray-800 leading-tight">Ankit Gupta</span>
              <span className="text-[10px] text-gray-400 font-medium">Administrator</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-blue-600/10">
              AG
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}