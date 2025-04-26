# Changelog

Toate modificările notabile aduse acestui proiect vor fi documentate aici.

Formatul respectă [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
și folosim [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Contribuitori: Cicoare Ana Maria 341C5 și Popa Răzvan Mihai 341C5.

## [Unreleased]

### Added
- Integrarea unui utilitar pentru mysql, mai exact phpmyadmin cu docker
- Crearea unui docker-compose.yml pentru baza de date, frontend și backend
- Crearea de fișiere Dockerfile pentru componentele de frontend și backend
- Funcționalitate de build automat cu Docker.
- Configurare Dockerfile cu două etape (build și run).
- Setup pentru Docker Desktop.

### Changed
- Actualizarea tipurilor variabilelor din typescript pentru un build corect.
- Trecerea de la rulare locală manuală la rulare în container Docker.
- Actualizat scripturile `package.json` pentru rulare cu `npm start` după build.

---

## [1.0.0] - 2025-03-25

### Added
- Inițializarea proiectului.
- Setup Next.js + Node 18.
