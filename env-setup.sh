#!/usr/bin/env bash
set -euo pipefail

# Clone or update mattpocock/skills
SKILLS_DIR="/home/antigravity/.agents/skills"
TMP_REPO="/tmp/mattpocock-skills"

mkdir -p "$SKILLS_DIR"

if [ ! -d "$TMP_REPO" ]; then
  git clone --depth 1 https://github.com/mattpocock/skills.git "$TMP_REPO" 2>/dev/null || true
fi

if [ -d "$TMP_REPO/skills" ]; then
  # Copy skills into .agents/skills
  find "$TMP_REPO/skills" -name "SKILL.md" | while read -r skill_file; do
    skill_dir="$(dirname "$skill_file")"
    skill_name="$(basename "$skill_dir")"
    mkdir -p "$SKILLS_DIR/$skill_name"
    cp -r "$skill_dir/"* "$SKILLS_DIR/$skill_name/" 2>/dev/null || true
  done
fi

echo "Matt Pocock skills initialized successfully in $SKILLS_DIR."
