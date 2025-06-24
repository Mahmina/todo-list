import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';

export function formatDate(dueDate) {
  let formattedDate = 'No date';
  if (dueDate) {
    try {
      // Parse the date and format it
      const date = dayjs(dueDate);
      if (date.isValid()) {
        formattedDate = date.format('DD MMM YYYY');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      formattedDate = 'Invalid date';
    }
  }
  return formattedDate;
}

