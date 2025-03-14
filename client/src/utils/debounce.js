// Debounce function to limit rapid function calls

export const debounce = (func, delay) => {
    let debounceTimer;
    
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  