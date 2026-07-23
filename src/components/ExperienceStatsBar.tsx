import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  target: number;
  suffix: string;
}

function CountUp({ target, suffix }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Respect user prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1200; // 1.2s smooth count-up
          const startTime = performance.now();

          const animateCount = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Decelerating easeOutQuad easing
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * target);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={elementRef} className="font-display font-bold">
      {count}
      {suffix}
    </span>
  );
}

export default function ExperienceStatsBar() {
  return (
    <section 
      aria-label="Company Statistics" 
      className="w-full bg-[#0C3855] py-[40px] md:py-[60px] text-white border-b border-white/5"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-y-8 gap-x-4 items-center">
          
          {/* Stat 1 */}
          <div 
            className="flex flex-col items-center text-center space-y-1" 
            aria-label="10 plus Years of Experience"
          >
            <span className="text-[44px] md:text-[54px] leading-none font-display font-bold text-white">
              <CountUp target={10} suffix="+" />
            </span>
            <span className="text-sm md:text-base text-white/85 font-medium tracking-wide">
              Years of Experience
            </span>
          </div>

          {/* Stat 2 with low-opacity vertical divider lines on desktop/tablet */}
          <div 
            className="flex flex-col items-center text-center space-y-1 min-[480px]:border-x min-[480px]:border-white/15 px-4" 
            aria-label="15 plus Total Product Range"
          >
            <span className="text-[44px] md:text-[54px] leading-none font-display font-bold text-white">
              <CountUp target={15} suffix="+" />
            </span>
            <span className="text-sm md:text-base text-white/85 font-medium tracking-wide">
              Total Product Range
            </span>
          </div>

          {/* Stat 3 with full width on small mobile, automatic column slot on tablet/desktop */}
          <div 
            className="flex flex-col items-center text-center space-y-1 col-span-2 min-[480px]:col-span-1 mt-2 min-[480px]:mt-0" 
            aria-label="200 plus Customers Served"
          >
            <span className="text-[44px] md:text-[54px] leading-none font-display font-bold text-white">
              <CountUp target={200} suffix="+" />
            </span>
            <span className="text-sm md:text-base text-white/85 font-medium tracking-wide">
              Customers Served
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
