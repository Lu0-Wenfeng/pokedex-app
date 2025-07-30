export const ROUTES = {
  HOME: "/",
  DETAILS: "/details",
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = typeof ROUTES[RouteKeys];
