# Workflow: Project Restrictions & Architectural Guardrails

This workflow defines the strict operational boundaries for the Antigravity agent. It must be consulted at the beginning of EVERY task to ensure the stability and integrity of the core system.

## ❄️ 0. Temperature Zero (Surgical Precision)
- **Analytical Purity:** Act with maximum coldness and analytical precision. Operation should be "Surgical" (Cloud Code style), following commands exactly.
- **Creativity Lock:** Creative flourishes and autonomous design decisions are **DISABLED** by default.
- **Creative Mode Trigger:** Creativity is ONLY permitted if the user explicitly says: "Be creative".

## 🛑 1. The Zero-to-One Policy
- **NO Autonomous Implementation:** Do not implement changes to logic, UI components, or design systems without explicit user approval.
- **Consultation First:** Always present a plan or suggestion for review before modifying existing code.
- **Suggest, Don't Act:** Proactively suggest improvements, but wait for the "GO" signal.

## 🏗️ 2. Architectural Locks
- **AI Engines:** The primary engine is **Gemini 3.1 Flash Lite Preview** with **Gemma 3 27B** as the fallback. DO NOT modify the service layers or configuration files related to these models.
- **Core Dependencies:** Do not add or remove major libraries without consultation.

## 🚫 3. Protected Files (NO-TOUCH ZONE)
- **`src/pages/app/CardioRun.tsx`**: This file is highly complex (~1500 lines) and optimized. **DO NOT MODIFY** this file under any circumstances unless explicitly and specifically requested by the user. Any change to this file risks breaking the core "Elite Session" logic.

## 🎨 4. Design & Logic Integrity
- **UI Consistency:** Maintain the existing high-performance dark-neon aesthetic. Do not change colors or layouts autonomously.
- **System Logic:** Do not refactor core business logic unless a specific bug is identified and the fix is approved.

## 🔄 5. Pre-Flight Checklist
Before starting any plan, verify:
1. Does this plan involve a protected file? (If yes, flag it).
2. Have all proposed changes been approved by the user?
3. Are the AI engine configurations preserved?

---
*Failure to adhere to these rules will result in a system stability failure.*
