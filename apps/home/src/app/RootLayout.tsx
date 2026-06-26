import { ThemeProvider, justkitsDefault } from "@justkits/ui";
import "@justkits/ui/styles.css";
import clsx from "clsx";

import { fontVariables } from "./ui/fonts";
import { Header } from "./ui/Header";
import { styles } from "./styles.css";

type Props = {
  children: React.ReactNode;
};

export function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: justkitsDefault }} />
      </head>
      <body className={clsx(fontVariables, styles.body)}>
        <ThemeProvider withSystem defaultMode="system">
          <Header />
          <main className={styles.main} role="main">
            {children}
          </main>
          <footer role="contentinfo">Footer</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
