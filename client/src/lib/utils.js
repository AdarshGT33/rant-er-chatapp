import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from "../assets/lottie-json"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#44CA85] text-[#000000] border-[1px] border-[#000000fa]",
  "bg-[#6d8a96] text-[#000000] border-[1px] border-[#000000bb]",
  "bg-[#ea9ab2] text-[#000000] border-[1px] border-[#000000bb]",
  "bg-[#f7fe72] text-[#112A46] border-[1px] border-[#112A46bb]",
]

export const getColor = (color) => {
  if (color >= 0 && color < colors.length){
    return colors[color]
  }
  return colors[0]
}

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
}