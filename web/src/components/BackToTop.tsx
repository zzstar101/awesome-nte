import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import type { Lang } from "@/data/catalog";
import { COPY } from "@/i18n/copy";
import { GhostCatIcon } from "./NteGraphics";

export function BackToTop({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const t = COPY[lang];

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title={t.backToTop}
      aria-label={t.backToTop}
      className="nte-btn nte-modal-pop group fixed right-5 bottom-5 z-30 flex cursor-pointer items-center gap-1.5 rounded-2xl border-2 border-[#171824] bg-[#FFD92E] px-3 py-2 text-[#171824] shadow-[4px_4px_0_0_#171824] hover:bg-[#17E2CE]"
    >
      <GhostCatIcon className="h-5 w-5 transition-transform duration-200 group-hover:-rotate-12" bodyFill="#171824" />
      <ArrowUp className="h-4 w-4 stroke-[2.75] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
