#!/bin/bash

echo "=========================================="
echo " Initialisation Frontend (Setup Only) "
echo "=========================================="

# Installation des deps de base
read -p "→ Exécuter 'make setup' maintenant ? [Y/n]: " yn
[[ "$yn" =~ ^[Yy]$ || -z "$yn" ]] && make setup

# Installation Playwright
read -p "→ Installer Playwright ? [Y/n]: " pw
if [[ "$pw" =~ ^[Yy]$ || -z "$pw" ]]; then
  make e2e

  # ▶️ Déplacement automatique des fichiers générés par Playwright
  if [ -d "tests-examples" ]; then
    echo "→ Déplacement des fichiers Playwright vers src/e2e/"
    mv tests-examples/* src/e2e/
    rm -r tests-examples
    echo "✔ Fichiers déplacés avec succès"
  else
    echo "ℹ️ Aucun dossier 'tests-examples' trouvé – déplacement ignoré"
  fi
fi

# Fichiers .env
read -p "→ Créer fichiers .env.[mode] ? [Y/n]: " env
[[ "$env" =~ ^[Yy]$ || -z "$env" ]] && make init-env

# Scripts package.json
read -p "→ Ajouter scripts package.json ? [Y/n]: " scripts
[[ "$scripts" =~ ^[Yy]$ || -z "$scripts" ]] && node scripts/add-scripts.cjs

echo "✅Setup terminé pour ClientApp"