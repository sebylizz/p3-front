export function isStartDateInFuture(input) {
    const today = new Date();
  
    if (Array.isArray(input)) {
      return input.some((price) => {
        const startDate = new Date(price.startDate);
        return startDate > today;
      });
    }
    const selectedDate = new Date(input);
    return selectedDate > today;
  }
  
  