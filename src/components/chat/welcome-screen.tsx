"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, Users, GraduationCap } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";

interface WelcomeScreenProps {
  onQuerySelect: (query: string) => void;
}

const quickStartCards = [
  {
    title: "Panduan TA",
    desc: "Syarat, prosedur, dan jadwal Tugas Akhir",
    icon: BookOpen,
    query: "Apa saja syarat pendaftaran TA dan prosedurnya?",
  },
  {
    title: "Kerja Praktek",
    desc: "Panduan magang dan KP semester genap",
    icon: Briefcase,
    query: "Bagaimana panduan magang dan Kerja Praktek?",
  },
  {
    title: "KKN",
    desc: "Jadwal, lokasi, dan syarat KKN",
    icon: Users,
    query: "Kapan jadwal KKN 2026 dan apa syaratnya?",
  },
  {
    title: "Kurikulum",
    desc: "Struktur mata kuliah dan SKS",
    icon: GraduationCap,
    query: "Berapa SKS yang harus diambil dan struktur kurikulumnya?",
  },
];

const suggestedQueries = [
  "Apa syarat pendaftaran TA?",
  "Berapa IPK minimal untuk KP?",
  "Kapan jadwal KKN 2026?",
  "Struktur kurikulum semester 5?",
];

export function WelcomeScreen({ onQuerySelect }: WelcomeScreenProps) {
  const { prefersReducedMotion } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 h-full max-w-xl mx-auto space-y-8">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-1">
          🎓 RAG Academic AI
        </h1>
        <p className="text-muted-foreground text-sm">
          Asisten Akademik Cerdas — Panduan TA, KP, KKN, Kurikulum
        </p>
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3 w-full"
      >
        {quickStartCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div key={idx} variants={prefersReducedMotion ? undefined : itemVariants}>
              <Card
                className="p-3 cursor-pointer border hover:border-primary/50 transition-colors h-full"
                onClick={() => onQuerySelect(card.query)}
              >
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.02 }} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">{card.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="w-full space-y-3 text-center">
        <p className="text-xs text-muted-foreground font-medium">Suggested Questions</p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedQueries.map((query, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 font-normal py-1"
              onClick={() => onQuerySelect(query)}
            >
              {query}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-[10px] text-muted-foreground pt-4">
        Ctrl+K Command Palette · Ctrl+B Toggle Sidebar · Ctrl+Enter Send
      </div>
    </div>
  );
}
