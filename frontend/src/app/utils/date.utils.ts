export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(dateString);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}
