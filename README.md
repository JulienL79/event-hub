# Event Hub

## 1. Conventions de commits

Nous utilisons le standard **Conventional Commits** pour écrire les messages de commit :

```<type>(<optional scope>): <description>```


Types de commits recommandés

| Type | Quand l’utiliser |
| :--- | :--- |
| **feat** | Nouvelle fonctionnalité |
| **fix** | Correction de bug |
| **docs** | Documentation |
| **style** | Formatage ou style, sans changement fonctionnel |
| **refactor** | Refactorisation du code, sans bug ni nouvelle feature |
| **perf** | Amélioration des performances |
| **test** | Ajout ou modification de tests |

---

## 2. Mise en place des hooks Git

Ce projet utilise :

* **Husky** : pour déclencher des hooks Git automatiquement
* **lint-staged** : pour formater/linter les fichiers staged avant commit
* **commitlint** : pour vérifier que les messages de commit respectent le format Conventional Commits

### Étapes pour l’utilisateur

**Cloner le projet :**

```bash
git clone [https://github.com/TON_UTILISATEUR/eventhub.git](https://github.com/TON_UTILISATEUR/eventhub.git)
cd eventhub
```

**Installer les dépendances :**

```bash
npm install
```

**Initialiser les hooks Husky :**

```bash
npm run prepare
```

Après ça, tous les commits seront automatiquement formatés et vérifiés.

## 3. Exemple de commit

```bash
git add .
git commit -m "feat(auth): add login feature"
git push origin dev
```

Le code est formaté via lint-staged

Le message de commit est validé via commitlint

## 4. Workflow Git (Branches)

Nous utilisons un workflow simple basé sur Git avec deux branches principales protégées :

| Branche | Rôle | Statut de protection |
| :--- | :--- | :--- |
| **main** | **Production** (Contient le code prêt à être déployé ou déjà en production). | Protégée. |
| **dev** | **Intégration** (Contient les dernières fonctionnalités stables, base de travail). | Protégée. |

### Schéma et règles de développement

Toutes les nouvelles fonctionnalités, corrections de bugs ou travaux se font sur une **branche éphémère** créée à partir de `dev`.

**Règles de nommage :** `<type>/<description-courte>` (ex: `feat/add-api-endpoint` ou `fix/login-bug`).

Une Pull Request (PR) vers `dev` est requise pour toute intégration.

```text
main (prod)
  ^
  | Merge via PR (après validation sur dev)
  |
dev (integration)
  ^  ^  ^
  |  |  |
  |  |  Branch éphémère (feat/...)
  |  Branch éphémère (fix/...)
  Branch éphémère (refactor/...)