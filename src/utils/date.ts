export const CAREER_START_DATE = '2019-01-01';

// Full months worked between the start date and today
export function getMonthsOfExperience(startDate: string = CAREER_START_DATE, asOf: Date = new Date()): number {
  const start = new Date(startDate);
  let months = (asOf.getFullYear() - start.getFullYear()) * 12 + (asOf.getMonth() - start.getMonth());
  if (asOf.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

// Years of experience to one decimal, rounded down so it never overstates, e.g. "7.8"
export function getYearsOfExperience(startDate: string = CAREER_START_DATE, asOf: Date = new Date()): string {
  const years = Math.floor((getMonthsOfExperience(startDate, asOf) / 12) * 10) / 10;
  return years.toFixed(1);
}
