import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: {
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "cena3d",
                test: /node_modules[\\/](three|@react-three|three-stdlib)/,
                maxSize: 350_000,
              },
            ],
          },
        },
      },
    },
  },
});
