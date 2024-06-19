import { MDXProvider } from "@mdx-js/react";
import { H1, H2, Code } from "./Headers";
import TextIcon from "./TextIcon";
import InfoButton from "./InfoButton";

import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children, ...props }: LayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <MDXProvider
        components={{ h1: H1, h2: H2, code: Code, TextIcon, InfoButton }}
      >
        {children}
      </MDXProvider>
    )
  );
}
