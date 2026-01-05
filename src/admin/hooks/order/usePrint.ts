import { useState } from "react";

export function usePrint() {
  const [printing, setPrinting] = useState(false);

  function print(html: string) {
    setPrinting(true);

    const win = window.open(
      "",
      "_blank",
      "width=900,height=800"
    );

    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comanda</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }

            body {
              margin: 0;
              font-family: monospace;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);

    win.document.close();
    win.focus();

    setTimeout(() => {
      win.print();
      win.close();
      setPrinting(false);
    }, 300);
  }

  return { print, printing };
}
