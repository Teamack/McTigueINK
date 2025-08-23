# World Expansion Toolkit

## Asset Naming

All new assets must follow the naming convention `[WORLD]_[TIER]_[ASSETTYPE]_[SHORTNAME]_v#`.

- **WORLD**: top-level world identifier.
- **TIER**: numeric tier or depth level.
- **ASSETTYPE**: category such as LORE, MAP, or NPC.
- **SHORTNAME**: concise identifier for the asset.
- **v#**: version number starting at 1.

Example: `ETHYREA_01_LORE_DRAGON_v1`

## Registering Asset IDs

1. Construct the asset ID using the naming scheme above.
2. Search the repository to ensure the ID is unique.
3. Add the ID and a brief description to `canon/CHANGELOG.md`.
4. Commit the new asset and changelog entry.
