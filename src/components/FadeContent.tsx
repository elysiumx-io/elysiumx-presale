import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface FadeContentProps {
  children: ReactNode;
  duration?: number;
  blur?: boolean;
  easing?: string;
  initialOpacity?: number;
  direction?: "left" | "right" | "up" | "down";
  distance?: string;
  className?: string;
}

const FadeContent: FC<FadeContentProps> = ({
  children,
  duration = 500,
  blur = false,
  easing = "ease-in-out",
  initialOpacity = 0,
  direction = "up",
  distance = "20px",
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return `translateX(-${distance})`;
        case "right":
          return `translateX(${distance})`;
        case "down":
          return `translateY(${distance})`;
        case "up":
        default:
          return `translateY(${distance})`;
      }
    }
    return "translate(0)";
  };

  const style = {
    transition: `all ${duration}ms ${easing}`,
    opacity: isVisible ? 1 : initialOpacity,
    filter: isVisible ? "blur(0)" : blur ? "blur(5px)" : "none",
    transform: getTransform(),
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default FadeContent;
