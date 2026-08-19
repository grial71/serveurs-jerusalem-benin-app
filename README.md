# LSJ Bénin — Refonte Vite

Cette version remplace le faux contenu `TERRA·07 / Valbrune` par le vrai projet **LSJ Bénin — Les Serveurs de Jérusalem**.

## Important avant de remplacer ton projet

1. Fais une copie de sauvegarde de ton dossier actuel.
2. Garde les dossiers existants `images/` et `audio/` à la racine.
3. Décompresse ce ZIP dans le dossier `serveurs-jerusalem-benin-app`.
4. Accepte le remplacement des fichiers de code (`index.html`, `package.json`, `vite.config.js`, `src/...`).
5. **Ne supprime pas** les dossiers `images/` et `audio/`.

Le fichier `vite.config.js` copie automatiquement `images/` et `audio/` vers `public/` au démarrage et à la construction.

## Pour tester dans VS Code

Dans le terminal :

```powershell
npm install
npm run dev
```

Puis ouvre l'adresse indiquée par Vite, généralement :

`http://localhost:5173/serveurs-jerusalem-benin-app/`

## Pour vérifier le build

```powershell
npm run build
npm run preview
```

## GitHub

Ne pousse rien avant d'avoir vérifié visuellement le site.

Une fois validé :

```powershell
git status
git add .
git commit -m "Refonte moderne LSJ Bénin avec Vite et React"
git push origin main
```

## Contenu conservé / réintégré

- LSJ Bénin / Les Serveurs de Jérusalem
- Jude Gbetoho, responsable
- Michel Quinones, conseiller bénévole
- Interview YouTube : `IoQ5yxhjBN4`
- Volailles, lapins, escargots, manioc, gari
- Aquaponie / pisciculture comme projet futur
- Jeunesse / transmission / économie circulaire
- Les Saveurs de Nad
- WhatsApp et email LSJ
- Photos existantes du dossier `images`
- Musique existante du dossier `audio`

## À ajouter ensuite

La vidéo générale de présentation du Bénin pourra être ajoutée dans une nouvelle section dès que son lien YouTube sera fourni.
