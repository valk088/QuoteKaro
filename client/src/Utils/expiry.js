export const isPlanExpired = (planExpiresAt) => {
  return new Date(planExpiresAt) < new Date();
};