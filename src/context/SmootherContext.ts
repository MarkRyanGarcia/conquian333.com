import { createContext } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export const SmootherContext = createContext<{ smoother: ScrollSmoother | null }>({ smoother: null });
