# Odmandakh OS — Product Requirements Document

| | |
|---|---|
| **Project** | Odmandakh OS — Personal Portfolio Website |
| **Document type** | Product Requirements Document (PRD) |
| **Status** | Draft v1.0 |
| **Last updated** | August 12, 2026 |
| **Owner** | Odmandakh |

---

## 1. Purpose of This Document

This document defines the functional and non-functional requirements for **Odmandakh OS**, a personal portfolio website. It exists to give anyone working on the project — including future contributors, designers, or AI development agents — a single, unambiguous source of truth for what the product is, what it must do, and what it must deliberately avoid becoming.

Where a requirement is ambiguous or undecided, it is flagged explicitly in Section 11 rather than assumed.

---

## 2. Project Overview

### 2.1 Concept

Odmandakh OS is a personal portfolio presented through the metaphor of a simple desktop operating system. The desktop provides navigation and visual identity; it is not a functional OS simulation. All portfolio content — projects, skills, experience, certificates, and contact information — is organized as familiar desktop objects (folders, files, widgets, and apps).

### 2.2 Vision Statement

> **Simple desktop. Interesting content.**

The OS concept exists to make the portfolio memorable and easy to navigate. It must never take priority over the substance of the portfolio: the work, skills, and experience being presented.

### 2.3 Design Philosophy

The product should read as:

- Clean
- Simple
- Modern
- Professional
- Slightly playful
- Easy to understand

A successful implementation leaves a visitor thinking *"this is a really clean portfolio,"* not *"this person built an operating system."*

---

## 3. Goals & Success Criteria

| Goal | Success criteria |
|---|---|
| Present portfolio content clearly | A first-time visitor can locate Projects, Skills, Experience, Certificates, CV, and Contact within seconds, without instructions. |
| Support frequent content updates | Adding one new project per month (the owner's stated cadence) requires minimal, isolated code changes — no restructuring of shared components. |
| Maintain visual and interaction consistency | Every desktop object (folder, file, widget, app) shares a common visual language and interaction pattern. |
| Avoid scope creep into an "OS simulator" | The constraints in Section 9 are respected in every release. |
| Work across devices | The site is fully usable on both desktop and mobile, per Section 8.1. |

---

## 4. Design Direction

### 4.1 Visual Reference

The visual language is inspired by modern **macOS**, specifically:

- Desktop layout and iconography
- Folder/file appearance and behavior
- The Settings → General → About panel
- Desktop widgets (Weather, Calendar)
- Clean spacing and minimal chrome
- Subtle, purposeful animation
- System typography and minimal UI

This is a **reference, not a template**. The product must establish its own original visual identity ("Odmandakh OS") rather than replicate macOS component-for-component.

### 4.2 Design Principles

1. **Clarity over cleverness.** Every interactive element must visually communicate what it is (folder, file, app, widget) before it is clicked.
2. **Restraint.** Add nothing — visual or functional — that isn't in service of presenting the portfolio content.
3. **Consistency.** Shared components (windows, cards, buttons, icons) are reused everywhere rather than redesigned per-section.

---

## 5. Information Architecture

The desktop is the site's home page and primary navigation surface. It must contain exactly the following items, and no additional desktop applications unless explicitly requested by the owner:

| Item | Type | Opens |
|---|---|---|
| Projects | Folder | Grid/list of project folders |
| Certificates | Folder | Grid/list of certificate category folders |
| About | Settings panel | macOS-style "About" panel |
| Skills | App | Skill tree view |
| CV.pdf | File | PDF viewer (view/download/print) |
| Experience | Widget | Career timeline (on click) |
| GitHub | Widget | GitHub contribution summary |
| LeetCode | Widget | Coding statistics summary |
| Contact | Message | Contact form |

The desktop layout itself must remain visually uncluttered at all times.

---

## 6. Functional Requirements

### 6.1 About

**Description:** A profile summary styled after macOS Settings → General → About.

| ID | Requirement |
|---|---|
| FR-1.1 | Display profile photo, name, current position, role, years of experience, and location. |
| FR-1.2 | Provide a GitHub link/button and a LinkedIn link/button. |
| FR-1.3 | Content must remain concise — this is a summary panel, not a biography. |

### 6.2 Projects

**Description:** A folder containing one subfolder per project (professional and personal projects may coexist).

| ID | Requirement |
|---|---|
| FR-2.1 | Projects are represented as folders; opening a project folder reveals its detail view. |
| FR-2.2 | Each project entry may include: overview, problem, solution, technologies used, architecture, screenshots, and key learnings. |
| FR-2.3 | The underlying data structure must allow a new project to be added by creating one new entry, without modifying shared layout code. |
| FR-2.4 | The information architecture must scale comfortably to a growing project list, given the owner's cadence of approximately one new project per month. |

### 6.3 Skills

**Description:** Skills are presented as a connected, explorable skill tree/graph rather than as a flat list or percentage bars.

| ID | Requirement |
|---|---|
| FR-3.1 | Skills are grouped by category (e.g., language, framework, platform) and rendered as a connected graph/tree, not as percentage or star ratings. |
| FR-3.2 | Selecting a skill node reveals related skills and the projects that used it. |
| FR-3.3 | Adding a new skill or category must not require restructuring the existing tree layout. |

### 6.4 Experience

**Description:** A desktop widget, visually inspired by the macOS Weather widget, summarizing career progression at a glance.

| ID | Requirement |
|---|---|
| FR-4.1 | The widget displays a compact summary: total years of experience, current title, and a simple progression indicator (e.g., a timeline from start year to present, developer → senior). |
| FR-4.2 | Clicking the widget opens a detailed career timeline view. |

### 6.5 CV

**Description:** `CV.pdf` appears as a file directly on the desktop.

| ID | Requirement |
|---|---|
| FR-5.1 | The file is visually presented as a PDF document on the desktop. |
| FR-5.2 | Supports in-place viewing, download, and printing. |

### 6.6 Certificates

**Description:** Certificates are organized into category folders, each containing PDF files.

| ID | Requirement |
|---|---|
| FR-6.1 | Top-level folders represent categories (e.g., AWS, Azure, Kubernetes, Others); each contains individual certificate PDF files. |
| FR-6.2 | Certificate content must reflect only certificates the owner has actually completed or explicitly provided — no placeholder or invented certifications. |
| FR-6.3 | The structure must support adding future certificates or categories without redesigning the folder system. |

### 6.7 GitHub

**Description:** A desktop widget, visually inspired by the macOS Calendar widget, centered on the GitHub contribution calendar.

| ID | Requirement |
|---|---|
| FR-7.1 | Primary content is the GitHub contribution calendar/heatmap. |
| FR-7.2 | May additionally show contribution count, repository count, and featured repositories. |
| FR-7.3 | The widget must stay visually simple — no more than the data points above. |

### 6.8 LeetCode

**Description:** A statistics widget summarizing coding practice activity.

| ID | Requirement |
|---|---|
| FR-8.1 | Displays problems solved, broken down by Easy / Medium / Hard, and current streak. |
| FR-8.2 | The widget must not be overloaded with additional statistics beyond those listed. |

### 6.9 Contact

**Description:** A simple contact form, not a conversational agent.

| ID | Requirement |
|---|---|
| FR-9.1 | Form collects name, email, and message. |
| FR-9.2 | Form submits and confirms delivery to the owner. |
| FR-9.3 | Visual presentation is consistent with the rest of the Odmandakh OS interface (e.g., presented as a "Message" app window). |

---

## 7. Theming Requirements

| ID | Requirement |
|---|---|
| TR-1 | No manual light/dark theme toggle is provided. |
| TR-2 | The site follows the visitor's operating system color-scheme preference (`prefers-color-scheme`) where detectable. |
| TR-3 | If system preference cannot be detected, the site defaults to dark mode. |
| TR-4 | Dark mode is the primary design target and must be fully polished; light mode must remain functional and consistent but is secondary. |

---

## 8. Non-Functional Requirements

### 8.1 Responsive Design

| ID | Requirement |
|---|---|
| NFR-1.1 | The primary experience targets desktop screens. |
| NFR-1.2 | The site must remain fully usable on mobile devices. |
| NFR-1.3 | On small screens, the interface adapts rather than forcing a literal desktop metaphor where it would harm usability (e.g., desktop icon grids may reflow into a simpler list/menu). |

### 8.2 Usability

| ID | Requirement |
|---|---|
| NFR-2.1 | A first-time visitor must be able to visually distinguish folders, files, widgets, and apps without instruction. |
| NFR-2.2 | No hidden interactions — every clickable element must present a discoverable affordance. |
| NFR-2.3 | Animation is used only to support usability (e.g., open/close transitions), never as decoration for its own sake. |

### 8.3 Maintainability & Content Scalability

| ID | Requirement |
|---|---|
| NFR-3.1 | Adding a new project, skill, certificate, or experience entry requires editing data only — not shared component code. |
| NFR-3.2 | Content is modeled as static, simple data structures (e.g., structured config/content files) rather than requiring a database. |

### 8.4 Component Architecture

| ID | Requirement |
|---|---|
| NFR-4.1 | Shared, reusable components exist for: desktop items, folders, files, widgets, cards, buttons, and windows/views. |
| NFR-4.2 | All components share consistent spacing, typography, and interaction patterns so the interface reads as one coherent system. |
| NFR-4.3 | The codebase favors readability, type safety, and minimal dependencies over technical novelty. |

---

## 9. Out of Scope / Explicit Constraints

The following must **not** be implemented unless the owner explicitly requests them in a future revision of this document:

| Category | Excluded items |
|---|---|
| Simulated OS features | Fake terminal, taskbar, dock, desktop clock, window resizing, complex window management, multiple OS themes, an OS settings simulator, fake system logs, fake system components |
| Interaction/visual excess | Excessive animation, gamification |
| Backend/data complexity | User accounts, database, CMS, unnecessary backend services, complex AI agents |

The product must not evolve into an operating-system simulator. If a feature is technically interesting but does not serve the presentation of portfolio content, it should not be built.

---

## 10. Content Governance

To keep the portfolio easy to maintain given the owner's stated pace (one personal project per month):

1. New **projects** are added as new entries in the projects data source; no layout or routing code should need to change.
2. New **skills** are added as new nodes/edges in the skill graph data source.
3. New **certificates** are added as new files within the relevant category folder (or a new category folder if needed); certificate content is never fabricated.
4. New **experience** entries are added to the experience timeline data source.

---

## 11. Assumptions & Open Questions

These items are not fully specified in the source requirements and should be confirmed with the owner before major implementation decisions are made:

- **Tech stack**: no frontend framework, hosting platform, or backend (if any, for the contact form) has been specified yet.
- **Contact form delivery**: mechanism for actually sending/receiving submitted messages (e.g., email service, form backend) is undefined.
- **GitHub/LeetCode data**: whether these widgets pull live data via API or are manually updated static snapshots is undefined.
- **Certificates and CV content**: actual certificate files and CV content have not yet been provided; placeholders must not be invented.
- **Project data source format**: exact schema for a "project entry" (fields, screenshots handling, etc.) is not yet defined.

---

## 12. Definition of Done

A feature or release is considered complete when:

1. It satisfies the functional requirements in Section 6 for the relevant desktop item.
2. It respects every constraint in Section 9.
3. It works correctly in both dark mode (primary) and light mode.
4. It is usable on both desktop and mobile per Section 8.1.
5. Adding new content of that type (project, skill, certificate, experience entry) requires only data changes, per Section 10.
6. The implementation reuses existing shared components rather than introducing parallel, one-off UI.
