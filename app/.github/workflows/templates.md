# 📂 Arborescence recommandée :
# .github/
# ├── workflows/
# │   ├── front.yml        → React + Vite + Vitest
# │   ├── back.yml         → .NET 7/8 Backend (Web API)
# │   ├── build-images.yml  → Build unifié des images (front, back, db, kafka...)
# │   ├── changelog.yml     → Génération du CHANGELOG.md
# │   ├── deploy.yml        → Orchestration globale
# └── git-cliff.toml    → Config du changelog automatique

# =====================================
# .github/workflows/build-images.yml - Build unifié d'images Docker avec tags personnalisés
# =====================================

name: Build All Docker Images

on:
  workflow_dispatch:

permissions:
  contents: read
  packages: write

env:
  VERSION_TAG: v1.4.0
  ENV_TAG: dev

jobs:
  build_images:
    name: Build & Push Docker Images
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (Frontend)
        id: meta_front
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/frontend-app
          tags: |
            type=raw,value=${{ env.VERSION_TAG }}
            type=raw,value=${{ env.ENV_TAG }}
            type=raw,value=latest

      - name: Build & Push Frontend
        uses: docker/build-push-action@v5
        with:
          context: ./frontend
          file: ./frontend/Dockerfile
          push: true
          tags: ${{ steps.meta_front.outputs.tags }}
          labels: ${{ steps.meta_front.outputs.labels }}

      - name: Extract metadata (Backend)
        id: meta_back
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/backend-api
          tags: |
            type=raw,value=${{ env.VERSION_TAG }}
            type=raw,value=${{ env.ENV_TAG }}
            type=raw,value=latest

      - name: Build & Push Backend
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          file: ./backend/Dockerfile
          push: true
          tags: ${{ steps.meta_back.outputs.tags }}
          labels: ${{ steps.meta_back.outputs.labels }}

      - name: Extract metadata (Database)
        id: meta_db
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/db
          tags: |
            type=raw,value=${{ env.VERSION_TAG }}
            type=raw,value=${{ env.ENV_TAG }}
            type=raw,value=latest

      - name: Build & Push Database
        uses: docker/build-push-action@v5
        with:
          context: ./infra
          file: ./infra/Dockerfile.db
          push: true
          tags: ${{ steps.meta_db.outputs.tags }}
          labels: ${{ steps.meta_db.outputs.labels }}

      - name: Extract metadata (Kafka)
        id: meta_kafka
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/kafka
          tags: |
            type=raw,value=${{ env.VERSION_TAG }}
            type=raw,value=${{ env.ENV_TAG }}
            type=raw,value=latest

      - name: Build & Push Kafka
        uses: docker/build-push-action@v5
        with:
          context: ./infra
          file: ./infra/Dockerfile.kafka
          push: true
          tags: ${{ steps.meta_kafka.outputs.tags }}
          labels: ${{ steps.meta_kafka.outputs.labels }}

      - name: Extract metadata (X Service)
        id: meta_x
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/x-service
          tags: |
            type=raw,value=${{ env.VERSION_TAG }}
            type=raw,value=${{ env.ENV_TAG }}
            type=raw,value=latest

      - name: Build & Push X Service
        uses: docker/build-push-action@v5
        with:
          context: ./services/x
          file: ./services/x/Dockerfile
          push: true
          tags: ${{ steps.meta_x.outputs.tags }}
          labels: ${{ steps.meta_x.outputs.labels }}
