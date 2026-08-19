import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

function copyFolderIfPresent(name) {
  return {
    name: `lsj-copy-${name}`,
    buildStart() {
      const from = path.resolve(process.cwd(), name);
      const to = path.resolve(process.cwd(), "public", name);
      if (fs.existsSync(from)) {
        fs.mkdirSync(to, { recursive: true });
        fs.cpSync(from, to, { recursive: true, force: true });
        console.log(`[LSJ] ${name}/ copié automatiquement vers public/${name}/`);
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), copyFolderIfPresent("images"), copyFolderIfPresent("audio")],
  // Le serveur local reste disponible à la racine, tandis que le build conserve
  // le sous-chemin nécessaire au déploiement GitHub Pages du dépôt.
  base: command === "serve" ? "/" : "/serveurs-jerusalem-benin-app/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));
