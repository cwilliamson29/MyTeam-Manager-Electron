import {Employee} from "../interfaces/employeeInterface";
import {civiTimes, militaryTimes} from "./appSettings.tsx";

export const colorOfDay = (time: string) => {
    // Determining time of day for CSS coloring
    const morning = ["06", "07", "08", "09", "10"];
    const midDay = ["11", "12", "13"];
    const evening = ["14", "15", "16", "17", "18"];

    // time comes over as "12:30" and must compare the first 2 numbers only
    let t = time[0] + time[1];

    // Determines CSS return statement
    if (morning.includes(t)) {
        return "morning";
    } else if (midDay.includes(t)) {
        return "midDay";
    } else if (evening.includes(t)) {
        return "evening";
    } else {
        return "bg-black text-white"
    }
};
// titleCase function returns the string in "This Format"
export const titleCase = (str: string): string => str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(' ');

// css helper function goes to EmployeeListTitle and easily allows switching between to strings without error
export const css = (args: string) => {
    if (args === ' title-buttons-clicked ') {
        return ''
    } else {
        return ' title-buttons-clicked '
    }

}

// Convert to 24 hour times
export const timeConvertT024 = (val: string) => {
    let checkAM = val.toLowerCase().includes('am')

    if (val === "12:00 PM" || val === "12:30 PM") {
        return val.slice(0, 5)
    } else if (val === "12:00 AM" || val === "12:30 AM") {
        return "00:" + val.slice(3, 5)
    } else if (checkAM) {
        return val.slice(0, 5)
    } else {
        for (let i = 0; i < civiTimes.length; i++) {
            if (val === civiTimes[i]) {
                return militaryTimes[i]
            }
        }
    }
}
// Convert to 24 hour times
export const timeConvertT012 = (val: string) => {
    if (val === "12:00" || val === "12:30") {
        return val + " PM"
    } else if (val === "00:00" || val === "00:30") {
        return "12:" + val.slice(3, 5) + " AM"
    } else {
        for (let i = 0; i < militaryTimes.length; i++) {
            if (val === militaryTimes[i]) {
                return civiTimes[i]
            }
        }
    }
}

// Sort by time and firstname
export const sortByTimeAndName = (array: Employee[]) => {
    console.log(array)
    array.sort((a, b) => {
        if (a.shiftStart > b.shiftStart) return 1;
        if (a.shiftStart < b.shiftStart) return -1;
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
    });
    console.log(array)
}
// Sort by time and firstname
export const sortByTimeAndLastName = (array: Employee[]) => {
    array.sort((a, b) => {
        if (a.shiftStart > b.shiftStart) return 1;
        if (a.shiftStart < b.shiftStart) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.lastName < b.lastName) return -1;
        return 0;
    });
}
// Sort by first name only
export const sortByFirstName = (array: Employee[]) => {
    array.sort((a, b) => {
        if (a.firstName > b.firstName) return 1;
        if (a.firstName < b.firstName) return -1;
        return 0;
    });
    //return array;
}

//Sort by last name only
export const sortByLastName = (array: Employee[]) => {
    array.sort((a, b) => {
        if (a.lastName > b.lastName) return 1;
        if (a.lastName < b.lastName) return -1;
        return 0;
    });
}