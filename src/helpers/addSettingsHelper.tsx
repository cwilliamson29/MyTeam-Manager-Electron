import { db } from "./db.ts";
import { Settings } from "../interfaces/employeeInterface.tsx";

export const addSettingsHelper = (settings: Settings) => {
  const sortByTime = settings.sortByTime;
  const sortByFirstName = settings.sortByFirstName;
  const colorMode = settings.colorMode;
  const hours = settings.hours;

  async function addSettings() {
    try {
      // Add the new friend!
      await db.settings.add({
        sortByTime,
        sortByFirstName,
        colorMode,
        hours,
      });
    } catch (error) {
      if (error) throw error;
    }
  }

  return addSettings();
};
