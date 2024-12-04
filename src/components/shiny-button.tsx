'use client'

import { cn } from "@/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { AnchorHTMLAttributes, useState, useEffect } from "react"

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }

export default function ShinyButton({
  className,
  children,
  href,
  ...props
}: ShinyButtonProps) {
  const [ripple, setRipple] = useState({ x: 0, y: 0, show: false })

  useEffect(() => {
    if (ripple.show) {
      const timer = setTimeout(() => setRipple({ ...ripple, show: false }), 500)
      return () => clearTimeout(timer)
    }
  }, [ripple])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true
    })
  }

  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-brand-700 px-8 py-3 text-base/7 font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4 shrink-0 text-white transition-all duration-190 ease-in-out group-hover:translate-x-1 group-hover:scale-110" />
      </span>

      <div className="absolute inset-0 overflow-hidden">
        <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-full -translate-x-full top-0 h-full w-[200%] rotate-[35deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-30" />
      </div>

      {ripple.show && (
        <span
          className="absolute z-10 animate-ripple rounded-full bg-white opacity-25"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </Link>
  )
}