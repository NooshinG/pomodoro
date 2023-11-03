"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { PomodoroProvider } from "./context/pomo-context";
import Settings from "./components/Settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const showSettingsHandler = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <PomodoroProvider>
          {children}
          {showSettings && <Settings/>}
          <button onClick={showSettingsHandler}>Settings</button>
        </PomodoroProvider>
      </body>
    </html>
  );
}
