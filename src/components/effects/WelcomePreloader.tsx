import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Preloader: React.FC = () => {
  const titleRef = useRef(null);
  const devRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const line5Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.to(titleRef.current, {
      duration: 2,
      text: "Welcome to Hacknet Portal",
      delay: 0.3,
    })
      .to(devRef.current, {
        duration: 1.5,
        text: "Developer: UjjwalS aka DecryptX",
        delay: 0.4,
      })
      .to(line1Ref.current, {
        duration: 1.2,
        text: ">> Initializing secure shell...",
        delay: 0.3,
      })
      .to(line2Ref.current, {
        duration: 1.2,
        text: ">> Injecting packet sniffers...",
        delay: 0.2,
      })
      .to(line3Ref.current, {
        duration: 1.2,
        text: ">> Spawning darknet protocols...",
        delay: 0.2,
      })
      .to(line4Ref.current, {
        duration: 1.2,
        text: ">> Loading darknet modules...",
        delay: 0.2,
      })
      .to(line5Ref.current, {
        duration: 1.2,
        text: ">> Access Granted...Welcome to the Darknet",
        delay: 0.3,
      });
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-matrix-green font-mono flex items-center justify-center px-4">
      <div className="text-left">
        <div
          className="text-3xl md:text-4xl font-bold mb-6 terminal-glow"
          style={{ fontFamily: "orbitron, monospace" }}
          ref={titleRef}
        ></div>

        <div
          className="text-base md:text-lg mb-4 terminal-glow"
          ref={devRef}
        ></div>

        <div
          className="text-sm md:text-base terminal-glow mb-1"
          ref={line1Ref}
        ></div>
        <div
          className="text-sm md:text-base terminal-glow mb-1"
          ref={line2Ref}
        ></div>
        <div
          className="text-sm md:text-base terminal-glow mb-1"
          ref={line3Ref}
        ></div>
        <div
          className="text-sm md:text-base terminal-glow mb-1"
          ref={line4Ref}
        ></div>
        <div
          className="text-sm md:text-base terminal-glow mt-2"
          ref={line5Ref}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;
