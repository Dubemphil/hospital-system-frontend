// Centralized API Configuration
// In production with Cloud CDN & Load Balancer, API_BASE_URL defaults to "" (same-origin /api calls)
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
