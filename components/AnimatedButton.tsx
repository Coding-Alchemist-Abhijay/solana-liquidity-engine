"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  className,
  type,
  onClick,
  disabled = false,
  loading = false,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        size={size}
        type={type}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
          "border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          )}
          {children}
        </span>
      </Button>
    </motion.div>
  );
}
