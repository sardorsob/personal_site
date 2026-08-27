# Graph Report - personal_site  (2026-08-26)

## Corpus Check
- 21 files · ~310,061 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 97 nodes · 100 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ff13130a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- dependencies
- package.json
- development
- Project Architecture: Personal Portfolio (React)
- Projects.jsx
- vercel.json
- 2. Component & Data Flow Map
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `Project Architecture: Personal Portfolio (React)` - 11 edges
2. `2. Component & Data Flow Map` - 10 edges
3. `scripts` - 5 edges
4. `production` - 4 edges
5. `development` - 4 edges
6. `repository` - 3 edges
7. `browserslist` - 3 edges
8. `Experience()` - 3 edges
9. `ProjectCard()` - 3 edges
10. `bugs` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.21
Nodes (7): App(), Awards(), Contact(), Hero(), Navigation(), PaperView(), root

### Community 1 - "dependencies"
Cohesion: 0.13
Nodes (15): d3, framer-motion, dependencies, d3, framer-motion, react, react-dom, react-refresh (+7 more)

### Community 2 - "package.json"
Cohesion: 0.12
Nodes (16): author, bugs, url, description, keywords, license, name, repository (+8 more)

### Community 3 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 4 - "Project Architecture: Personal Portfolio (React)"
Cohesion: 0.18
Nodes (10): 0. Overview, 1. File Structure (UID: FS-ROOT), 3. Data & Asset Flow, 4. Theming & State, 5. CSS & Styling, 6. Build & Deployment, 7. Unique ID (UID) Rule, 8. Extending the Architecture (+2 more)

### Community 5 - "Projects.jsx"
Cohesion: 0.31
Nodes (4): Experience(), ProjectCard(), filterCategories, Projects()

### Community 10 - "2. Component & Data Flow Map"
Cohesion: 0.18
Nodes (11): 2.1. App Entry (UID: APP-ENTRY), 2.2. App Component (UID: APP-MAIN), 2.3. Navigation (UID: NAV), 2.4. Hero Section (UID: HERO), 2.5. Experience Section (UID: EXP), 2.6.1. ProjectCard (UID: PROJCARD), 2.6. Projects Section (UID: PROJ), 2.7. Certificates/Awards Section (UID: AWARDS) (+3 more)

## Knowledge Gaps
- **48 isolated node(s):** `name`, `version`, `start`, `build`, `test` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `browserslist` connect `development` to `package.json`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `Project Architecture: Personal Portfolio (React)` connect `Project Architecture: Personal Portfolio (React)` to `2. Component & Data Flow Map`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **What connects `name`, `version`, `start` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._