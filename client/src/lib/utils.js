import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712a4a57] text-[#ff006e] border-[1px] border-[#ff006ffa]",
  "bg-[#ffd60a2a] text-[#ffd06a] border-[1px] border-[#ffd60abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
]

export const getColor = (color) => {
  if (color < color.length && color >= 0){
    return colors[color]
  }
  return colors[0]
}