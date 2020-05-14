import queryString from "query-string";
import { formatISO9075 } from "date-fns";

export const DATA_SHARE_URL =
    "https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing";
const DATA_UPLOAD_URL =
    "https://script.google.com/macros/s/AKfycbw_4jsHZE4PkIePUPbzPAlzzcXEeWibBltRUzeLu0zpztsVAEg/exec";

function flattenResidentList(residents) {
    return residents ? residents.map(r => r.name).join(",") : "";
}

export function shareSighting({
    id,
    villager,
    timestamp,
    location,
    currentResidents,
    pastResidents,
}) {
    return new Promise((resolve, reject) => {
        const qs = queryString.stringify({
            timestamp: encodeURIComponent(formatISO9075(timestamp)),
            villager: encodeURIComponent(villager),
            session_id: encodeURIComponent(id),
            spawn_type: encodeURIComponent(location || "mystery-island"),
            current_residents: encodeURIComponent(flattenResidentList(currentResidents)),
            past_residents: encodeURIComponent(flattenResidentList(pastResidents)),
        });
        var request = new XMLHttpRequest();
        request.open("GET", `${DATA_UPLOAD_URL}?${qs}`, true);
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        request.onload = function () {
            if (this.status < 200 || this.status > 400) {
                return reject(`Error ${this.status}: unable to send to spreadsheet`);
            }
            resolve();
        };
        request.onerror = function () {
            reject('Unable to send to spreadsheet. Please check your connection and try again.');
        };
        request.send();
    });
}

export default {
    DATA_SHARE_URL,
    shareSighting,
};
