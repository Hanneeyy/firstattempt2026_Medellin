# Medellin

## Framework
Meteor JS

## Module
Donation Module — AdDU Nation Alumni Hub (Web)

---

## About the Project
A fully realized desktop web application for the **Ateneo de Davao University Alumni Hub**, featuring a Donation Module that allows alumni to browse campaigns, donate to student projects, pledge recurring contributions, and view their impact. The app also includes an Admin/Staff Portal for reviewing and approving campaigns.

---

## AI Tools Used
- **Gemini Pro** (Google)

---

## Prompt

> *The following prompt was used with Gemini Pro along with an attached PDF of the mobile app design from Activity #10:*

**First & Main Prompt:**
> "Hello! Transform the provided mobile PDF design (DONATION.pdf) into a fully  desktop website design.
>
> Requirements:
> 1. Replicate all screens, features, and functions found in the PDF. Ensure that nothing is omitted from the original design. Adapt mobile interactions into desktop-friendly layouts and behaviors.
> 2. Create a modern, professional, and high-end look. The website should feel like it was made by a prestigious academic institution. Maintain a clean, organized, and polished layout.
> 4. Incorporate Filipino inspired design elements, such as traditional patterns or motifs. Ensure cultural elements are tasteful, minimal, and integrated elegantly into the UI (not overwhelming).
> 5. Improve usability where needed to better suit desktop experiences. Ensure responsiveness.
> 6. Therefore, I want a complete desktop website design system (all pages/screens included). Consistent styling across all components."

> **File Attachment Used:** [DONATION.pdf](screenshots&pdf/DONATION.pdf)
---

## Installation

Follow these steps exactly to run this project on a brand new Windows PC.

### Step 1 — Install Node.js

1. Open your browser and go to: **https://nodejs.org**
2. Click the **"LTS"** version button (recommended for most users) to download the installer.
3. Open the downloaded `.msi` file and run the installer.
4. Click **Next** through all the steps and keep all default settings selected.
5. When the installation is complete, click **Finish**.
6. Verify Node.js was installed correctly:
   - Press `Windows Key + R`, type `cmd`, and press Enter to open Command Prompt.
   - Type the following and press Enter:
     ```
     node -v
     ```
   - You should see a version number like `v20.x.x`. If you do, Node.js is installed.
   - Also type:
     ```
     npm -v
     ```
   - You should see another version number. This confirms npm is also ready.

---

### Step 2 — Install Git

1. Go to: **https://git-scm.com/download/win**
2. Download the installer and run it.
3. Click **Next** through all steps, keeping all default settings.
4. Click **Finish** when done.
5. Verify Git is installed:
   - Open Command Prompt and type:
     ```
     git --version
     ```
   - You should see something like `git version 2.x.x`.

---

### Step 3 — Clone the Repository

1. Open Command Prompt.
2. Navigate to the folder where you want to save the project. For example, to save it on your Desktop:
   ```
   cd Desktop
   ```
3. Clone the repository by typing:
   ```
   git clone https://github.com/YOUR_GITHUB_USERNAME/firstattempt2026_medellin.git
   ```
   *(Replace the URL with your actual repository URL)*
4. Enter the project folder:
   ```
   cd firstattempt2026_medellin
   ```

---

### Step 4 — Run the Project

1. Inside the project folder, open Command Prompt and type:
   ```
   npm start
   ```
2. Wait for the app to finish loading. You will see a message that it is running.
3. Open your browser (Google Chrome or Microsoft Edge recommended) and go to:
   ```
   localhost:3000
   ```
4. The application will load in your browser.

---

## Screenshots

**Screenshot 1 — Login Page**
![Login Page](screenshots&pdf/01_login.png)

**Screenshot 2 — Academic Passport**
![Passport](screenshots&pdf/02_academic_passport.png)

**Screenshot 3 — Discover & Create Fundraisers)**
![Discover](screenshots&pdf/03_discover.png)

**Screenshot 4 — Pledge & Automate**
![Pledge](screenshots&pdf/04_automate.png)

**Screenshot 5 — Student Project Donation**
![Student Project](screenshots&pdf/05_sdonation.png)

**Screenshot 6 — Transaction History**
![Transaction](screenshots&pdf/06_history.png)

**Screenshot 7 — Emergency Donation**
![Donation](screenshots&pdf/07_emerg.png)

**Screenshot 8 — Admin Portal — Queue**
![Admin Queue](screenshots&pdf/08_queue.png)
![Admin Queue 1](screenshots&pdf/09_queue2.png)

**Screenshot 9 — Review for Verification**
![Verification](screenshots&pdf/010_verification.png)

**Screenshot 10 — Donation Insights**
![Donation Insights](screenshots&pdf/11_insight.png)

**Screenshot 11 — Alumni Coordinator Profile**
![Coordinator Profile](screenshots&pdf/12_coords.png)

---
 
<a name="activity-15"></a>
## Activity 15 — PWA Conversion (AI-Assisted Coding Part 2)
 
**Branch:** `feature/pwa-ready`
 
---
 
### AI Tools Used
- **ChatGPT** — used for conceptual understanding before implementation
- **Claude** — used for step-by-step implementation and guidance
---
 
### The Prompts
 
For this activity, I decided to use two AI tools with two different purposes — one to help me understand, and one to guide me through the actual implementation.
 
---
 
**Prompt 1 — ChatGPT (Conceptual Understanding)**
 
> "This is the task our professor wants us to accomplish. But, I am not knowledgeable on how to execute this. I want you to explain to me the process and explain each concept (manifest.json, service worker, caching strategies, and etc.)
> Can you guide me through the process step-by-step and explain the main concepts in a simple way?
> Please include:
> * What a Service Worker is and how to register it
> * Basic caching strategies and how they enable offline functionality
> * How to make the app installable and handle app icons
> * Why do we need these certain files (manifest.json, service worker, etc.)"
 
> **Also attached:** The full activity instructions provided by the professor.
 
---
 
**Prompt 2 — Claude (Master Prompt / Implementation)**
 
> "I need help completing this project by following the given instructions. Please guide me through the entire process step-by-step.
> I've included the three files from my previous activity (Activity 14 -- main.html, main.css, main.jsx) so you can use them as a reference for my current setup.
> Ask me questions if you need more details about my project so you can guide me more accurately and so that I could implement what is necessary properly.
> I'd also appreciate brief explanations of what we're doing in each step so I can understand the process."
 
> **Also attached:** `main.html`, `main.css`, `main.jsx` from Activity 14 and the full activity instructions provided by the professor.
 
---
 
## AI Hallucinations & Manual Fixes
 
| # | Issue | What AI Got Wrong | Manual Fix Applied |
|---|-------|-------------------|--------------------|
| 1 | SW file location | AI suggested putting `sw.js` inside `/client` | Moved to `/public` — Meteor only serves static files from there |
| 2 | `cp` command | AI used Linux `cp` command for copying icons | Replaced with Windows `copy` command |
| 3 | Icon folder path | AI suggested using `screenshots&pdf` folder directly as icon source | Created a clean `/public/icons` folder to avoid `&` character URL issues |
| 4 | Framework assumption | AI initially assumed `.jsx` meant React components | File is vanilla JavaScript — no React imports or JSX syntax present |
| 5 | `/public` folder missing | AI assumed `/public` already existed in the project | Had to manually create the folder first before adding any files |
| 6 | SW catch block | AI's catch block returned `undefined` instead of a valid Response | Added `return new Response('Offline', { status: 503 })` as fallback |
 
---
 
## New Files Added
```
/public
  manifest.json
  sw.js
  /icons
    icon-192x192.png
    icon-512x512.png
```
 
## Modified Files
```
/client
  main.html  ← added manifest link and PWA meta tags
  main.jsx   ← added service worker registration at bottom
```
 
---
 
*Ateneo de Davao University · AdDU Nation Alumni Hub · 2026*
 
