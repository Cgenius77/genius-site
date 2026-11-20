# Genius Agency

Site vitrine en français pour Genius Agency. Le catalogue présente quatre pôles et 30 services. Les demandes sont préparées côté navigateur et l’utilisateur confirme leur envoi dans WhatsApp ; aucun serveur de formulaire n’est nécessaire.

## Lancement local

Utilisez Node.js 22 LTS et npm.

```sh
npm install
npm run dev
```

Ouvrez l’adresse affichée par Vite. Pour générer le site statique, exécutez `npm run build`. Prévisualisez `dist/` avec `npm run preview` ou hébergez ce dossier sur un hébergement statique.

## Arborescence

```text
Genius/
├── tailwind.config.js
├── src/
│   ├── components/
│   │   ├── ui.tsx
│   │   ├── layout.tsx
│   │   └── content.tsx
│   ├── data/services.ts
│   ├── main.tsx
│   └── styles.css
├── public/README.md
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tsconfig.json
├── .gitignore
└── README.md
```

## Avant mise en ligne

- Déposez les logos officiels aux emplacements `public/logo.png` et `public/logo-dark.png`. Le monogramme est provisoire.
- Remplacez les chiffres de démonstration et les cartes d’avis dans `src/components/content.tsx` par du contenu vérifié, ou retirez ces sections.
- Renseignez les URL des profils sociaux dans `src/components/layout.tsx`. Sans URL, les icônes restent non interactives.
- Vérifiez sur téléphone l’ouverture de WhatsApp avec les deux numéros, un lien de service et le formulaire. Testez le menu, les ancres, le clavier et l’option de réduction des animations à 360, 768, 1280 et 1920 px.
- Confirmez les conditions applicables aux services de paiement avant leur publication. Ajoutez les balises `og:url` et `og:image` une fois le domaine et le visuel de partage disponibles.
