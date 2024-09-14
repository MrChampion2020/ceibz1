// saves and retrieves registration progress from local storage

export const saveRegistrationProgress = (screenName, data) => {
  try {
    const key = `registration_progress_${screenName}`;
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Progress saved for screen: ${screenName}`);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

export const getRegistrationProgress = (screenName) => {
  try {
    const key = `registration_progress_${screenName}`;
    const data = localStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving progress:", error);
    return null;
  }
};
