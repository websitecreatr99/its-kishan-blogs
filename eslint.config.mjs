import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [
            { char: "'", alternatives: ["&apos;"] },
            { char: '"', alternatives: ["&quot;"] },
            // Add more entities as needed
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", ".contentlayer/**", "out/**", "build/**", "public/**", "next-env.d.ts"]),
]);
