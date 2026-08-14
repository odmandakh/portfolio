export const CAREER_START_DATE = '2019-01-01';

export function getYearsOfExperience(startDate: string = CAREER_START_DATE, asOf: Date = new Date()): number {
  const start = new Date(startDate);
  let years = asOf.getFullYear() - start.getFullYear();

  const hasHadAnniversaryThisYear =
    asOf.getMonth() > start.getMonth() ||
    (asOf.getMonth() === start.getMonth() && asOf.getDate() >= start.getDate());

  if (!hasHadAnniversaryThisYear) years -= 1;

  return years;
}
