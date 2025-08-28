import { FC, memo } from "react";
import { motion, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  variant?: Variants;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
}

const BlurText: FC<BlurTextProps> = memo(
  ({
    text,
    className,
    variant,
    delay = 0,
    animateBy = "words",
    direction = "top",
    onAnimationComplete,
  }) => {
    const defaultVariants: Variants = {
      hidden: {
        opacity: 0,
        filter: "blur(8px)",
        y: direction === "top" ? -20 : direction === "bottom" ? 20 : 0,
        x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        x: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      },
    };

    const combinedVariants = variant || defaultVariants;
    const textElements =
      animateBy === "words" ? text.split(" ") : text.split("");

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: delay / 100,
              delayChildren: delay / 100,
            },
          },
        }}
        onAnimationComplete={onAnimationComplete}
        className={className}
      >
        {textElements.map((element, index) => (
          <motion.span
            key={index}
            variants={combinedVariants}
            style={{ display: "inline-block" }}
          >
            {element}
            {animateBy === "words" && "\u00A0"}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);

export default BlurText;
