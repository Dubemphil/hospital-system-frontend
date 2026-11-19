// Centralized API Configuration
// Production Custom Domain: https://devopsstandard.name.ng (Frontend) & https://api.devopsstandard.name.ng (Backend)
// With CloudFront Single-Origin routing, API_BASE_URL defaults to "" (same-origin /api path).
// Can also be pointed directly to https://api.devopsstandard.name.ng via environment variables.
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
