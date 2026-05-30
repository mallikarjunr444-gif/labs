import { ArrowRight } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

export default function DemoOne() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <div
        className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-cover bg-center sm:h-[260px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/30" />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <LiquidButton className="text-white" size="lg">
            <span className="flex items-center gap-2">
              Start With Liquid Glass
              <ArrowRight size={16} />
            </span>
          </LiquidButton>
        </div>
      </div>
    </section>
  )
}
