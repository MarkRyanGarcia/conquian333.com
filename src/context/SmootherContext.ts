import { createContext } from "react";

export const SmootherContext = createContext<{ scrollTo: (id: string) => void }>({
    scrollTo: () => {},
});
