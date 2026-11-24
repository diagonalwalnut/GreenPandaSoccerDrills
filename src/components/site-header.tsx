"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Program" },
  { href: "/drills", label: "Drill Library" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--pitch)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Panda Soccer Labs home"
        >
          <Image
            src="/panda-soccer-labs-logo.jpg"
            alt=""
            width={40}
            height={40}
            className="size-9 rounded-full object-cover ring-1 ring-white/20 transition-transform group-hover:scale-[1.03] sm:size-10"
            priority
          />
          <span className="flex items-baseline gap-2">
            <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-white">
              Panda
            </span>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-[color:var(--chalk)]/70 sm:inline">
              Soccer Labs
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
