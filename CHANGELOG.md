# Changelog

Toate modificările notabile aduse acestui proiect vor fi documentate aici.

Formatul respectă [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
și folosim [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Contribuitori: Cicoare Ana Maria 341C5 și Popa Răzvan Mihai 341C5.

## [Unreleased]

### Added

### Fixed 

### Changed

---

## [1.0.1] - 2025-03-27

### Added
- Început configurare serviciu Kong și configurarea fișierului kong.yml
- Adăugare serviciu Portainer pentru administrarea unui Docker Swarm
- Creare docker swarm folosind **docker swarm init** și **docker stack deploy -c docker-compose.yml ems**
- Integrarea unui utilitar pentru mysql, mai exact phpmyadmin cu docker
- Crearea unui docker-compose.yml pentru baza de date, frontend și backend
- Crearea de fișiere Dockerfile pentru componentele de frontend și backend

### Fixed 
- Actualizarea tipurilor variabilelor din typescript pentru un build corect.

### Changed
- Modificare docker-compose.yml pentru Docker Swarm și publicarea imaginii razvim23/frontend-image pe contul meu de Docker Hub
- Trecerea de la rulare locală manuală la rulare în container Docker
- Actualizat scripturile `package.json` pentru rulare cu `npm start -p 4000` după build

## [1.0.0] - 2025-03-25

### Added
- Inițializarea proiectului.
- Setup Next.js + Node 18.
