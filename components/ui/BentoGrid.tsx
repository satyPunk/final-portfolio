import { IoCopyOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

// Remove dynamic import for Lottie and handle it only in useEffect
// This avoids TypeScript errors with the dynamic import

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

interface BentoGridItemProps {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}

export const BentoGrid = ({
  className,
  children,
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-rows-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: BentoGridItemProps) => {
  const leftLists = ["ReactJS", "Express", "Typescript"] as const;
  const rightLists = ["VueJS", "NuxtJS", "GraphQL"] as const;
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const EMAIL = "satyamhere8@gmail.com";

  useEffect(() => {
    let animation: any;

    const loadAnimation = async () => {
      if (typeof window === "undefined" || !containerRef.current || !copied) return;

      try {
        const lottie = (await import('lottie-web')).default;
        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
        });
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };

    loadAnimation();

    return () => {
      if (animation) {
        animation.destroy();
      }
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const backgroundStyle = {
    background: "rgb(4,7,29)",
    backgroundImage: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col",
        className
      )}
      style={backgroundStyle}
    >
      <div className={cn("h-full", id === 6 && "flex justify-center")}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={title?.toString() || 'Grid item image'}
              fill
              className={cn("object-cover object-center", imgClassName)}
            />
          )}
        </div>
        <div className={cn("absolute right-0 -bottom-5", id === 5 && "w-full opacity-80")}>
          {spareImg && (
            <Image
              src={spareImg}
              alt="Additional illustration"
              fill
              className="object-cover object-center"
            />
          )}
        </div>
        
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl" />
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10",
            titleClassName
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item) => (
                  <span
                    key={item}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]" />
                {rightLists.map((item) => (
                  <span
                    key={item}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className="absolute -bottom-5 right-0">
                <div ref={containerRef} style={{ height: "200px", width: "400px" }} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};