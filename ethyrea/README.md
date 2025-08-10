# Ethyrea Worldbuilding

This directory contains the structured worldbuilding system for Ethyrea.
Each subdirectory holds lore, data, and assets for various aspects of the world.

## categories.json

`categories.json` provides a single source of truth for the available content. It maps each category to an array of JSON files that store the category's data. Example structure:

```json
{
  "characters": ["mainProtagonists.json", "antagonists/kryss.json"],
  "worldbuilding": ["geography/mountains.json"],
  "magic": ["leyLines.json"],
  "artifacts": ["artifacts.json"]
}
```

All file paths are relative to this `ethyrea` directory. Front-end scripts use this mapping to load and search category data dynamically.
