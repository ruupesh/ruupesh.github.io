import { useRef } from "react";

/** Content starts visible. ScrollMotion owns the GSAP choreography centrally. */
export default function useScrollReveal() {
  return useRef(null);
}
