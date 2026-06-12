# core_w

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-swh7kymr)
# ⚔️ COREWAR EXPLORER

## 📖 Présentation

**Corewar Explorer** est un site web interactif conçu pour présenter le projet **Corewar** réalisé dans le cadre de la formation Epitech.

Contrairement à une présentation classique, ce site a été pensé pour être compris par un public non technique : parents, proches, visiteurs ou jurys n'ayant aucune connaissance en informatique.

L'objectif est de faire découvrir de manière visuelle, ludique et intuitive le fonctionnement de Corewar à travers des animations, des simulations et de nombreux éléments interactifs.

---

# 🎯 Objectifs du site

Le site permet de comprendre :

* Ce qu'est Corewar
* Comment fonctionne une bataille entre robots
* Le rôle de l'Assembler
* Le rôle de la Machine Virtuelle
* Le fonctionnement de la mémoire
* Le rôle du processeur (CPU)
* Les différentes instructions utilisées par les champions
* Les défis techniques rencontrés pendant le développement

Le tout sans nécessiter de connaissances en programmation.

---

# 🤖 Qu'est-ce que Corewar ?

Corewar est une simulation de combat entre plusieurs programmes appelés **Champions**.

Chaque champion est un petit robot virtuel possédant sa propre stratégie.

Ces robots sont chargés dans une mémoire partagée et tentent de survivre le plus longtemps possible.

Le dernier robot capable d'annoncer qu'il est toujours vivant remporte la partie.

---

# 🏟️ Une analogie simple

Imaginez :

* Une arène de combat
* Plusieurs combattants
* Un arbitre
* Des règles précises

Dans Corewar :

| Monde réel  | Corewar                 |
| ----------- | ----------------------- |
| Arène       | Mémoire                 |
| Combattants | Champions               |
| Actions     | Instructions            |
| Arbitre     | Machine Virtuelle       |
| Gagnant     | Dernier champion vivant |

---

# ⚙️ Les deux programmes que nous avons développés

## 1. L'Assembler

L'Assembler est la "fabrique à robots".

Les champions sont écrits dans un langage compréhensible par les développeurs.

Exemple :

```assembly
live %1
fork %42
add r1 r2 r3
```

L'Assembler transforme ces instructions en langage machine afin qu'elles puissent être exécutées.

Il agit comme un traducteur entre le langage humain et le langage de l'ordinateur.

---

## 2. La Machine Virtuelle

La Machine Virtuelle est l'arbitre du tournoi.

Elle :

* charge les champions
* crée l'arène
* gère la mémoire
* exécute les instructions
* contrôle les règles
* élimine les champions inactifs
* déclare le vainqueur

Sans elle, aucun combat ne pourrait avoir lieu.

---

# 🧠 Comment fonctionne un ordinateur dans Corewar ?

Le site propose une vue interactive d'un ordinateur simplifié.

## CPU

Le CPU est le cerveau de l'ordinateur.

Il lit les instructions des champions et décide quelles actions doivent être exécutées.

---

## Mémoire

La mémoire est l'arène.

Tous les champions partagent le même espace mémoire.

Ils s'y déplacent, écrivent des données et tentent d'y survivre.

---

## Registres

Les registres sont de petites zones de stockage très rapides.

Ils permettent aux champions de conserver temporairement des informations.

---

## Program Counter

Le Program Counter indique où se trouve actuellement le champion dans la mémoire.

Il permet de savoir quelle sera sa prochaine action.

---

# 🏆 Déroulement d'une partie

Une partie de Corewar suit plusieurs étapes.

### Étape 1

Création du champion.

### Étape 2

Compilation via l'Assembler.

### Étape 3

Chargement dans la mémoire.

### Étape 4

Début du combat.

### Étape 5

Exécution des instructions.

### Étape 6

Les champions annoncent régulièrement qu'ils sont encore vivants.

### Étape 7

Les champions inactifs sont éliminés.

### Étape 8

Le dernier survivant gagne.

---

# 📜 Les instructions

Les champions peuvent exécuter 16 instructions différentes.

Par exemple :

## LIVE

Le champion annonce :

> "Je suis toujours vivant."

---

## FORK

Le champion crée une copie de lui-même.

---

## ADD

Le champion effectue une addition.

---

## SUB

Le champion effectue une soustraction.

---

## LD

Le champion charge une donnée.

---

## ST

Le champion stocke une donnée.

---

## ZJMP

Le champion se déplace dans la mémoire.

---

## AND / OR / XOR

Le champion effectue des opérations logiques.

---

# 🧩 Les défis techniques du projet

Le développement de Corewar nous a confrontés à de nombreux défis.

## Gestion de mémoire

Manipulation d'une mémoire partagée entre plusieurs processus.

---

## Lecture de fichiers binaires

Chargement des champions compilés.

---

## Exécution d'instructions

Décodage et exécution précise des opérations.

---

## Gestion du temps

Respect des cycles d'exécution imposés par le sujet.

---

## Multiprocessus

Création et gestion de plusieurs processus simultanés.

---

## Architecture informatique

Compréhension du fonctionnement interne d'un ordinateur.

---

# 📚 Ce que nous avons appris

Grâce à Corewar, nous avons développé des compétences dans :

* Le langage C
* La gestion mémoire
* La lecture de fichiers binaires
* L'architecture des ordinateurs
* Les algorithmes
* Le débogage
* L'optimisation
* Le travail d'équipe
* La conception logicielle

---

# 🎮 Fonctionnalités du site

Le site inclut :

* Une carte interactive de l'ordinateur
* Une mémoire animée
* Un robot démontable
* Une visualisation des champions
* Une simulation de combat
* Une explication des 16 instructions
* Des animations pédagogiques
* Des infobulles interactives
* Des easter eggs cachés
* Un mode exploration libre

---

# 📊 Chiffres clés

* 2 programmes développés
* 16 instructions à gérer
* Des milliers de cycles simulés
* Plusieurs processus simultanés
* Une mémoire partagée
* Des centaines d'heures de développement

---

# 🚀 Conclusion

Corewar est l'un des projets emblématiques d'Epitech.

Il reproduit de nombreux mécanismes fondamentaux utilisés dans les ordinateurs modernes :

* exécution de programmes
* gestion de mémoire
* architecture processeur
* multitâche
* compilation

À travers ce projet, nous avons construit un véritable environnement capable de faire s'affronter des programmes autonomes dans une arène virtuelle.

Le site **Corewar Explorer** a pour objectif de rendre ce projet accessible à tous grâce à une expérience interactive, visuelle et pédagogique.

---

# 👨‍💻 Projet réalisé dans le cadre de la formation Epitech

**COREWAR**
*Elementary Programming in C*

Epitech – Année 1