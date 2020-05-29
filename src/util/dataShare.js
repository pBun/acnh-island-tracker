import queryString from "query-string";
import { formatISO, formatISO9075 } from "date-fns";

export const DATA_SHARE_URL =
    "https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing";
const DATA_UPLOAD_URL =
    "https://script.google.com/macros/s/AKfycbw_4jsHZE4PkIePUPbzPAlzzcXEeWibBltRUzeLu0zpztsVAEg/exec";

function flattenResidentList(residents) {
    return residents ? residents.map(r => r.villager.id).join(",") : "";
}

export function shareSighting({
    sessionId,
    sighting,
    currentResidents,
    pastResidents,
    deletion,
}) {
    return new Promise((resolve, reject) => {
        const qs = queryString.stringify({
            timestamp: encodeURIComponent(formatISO9075(sighting.timestamp)),
            villager: encodeURIComponent(sighting.villager.name),
            villager_id: encodeURIComponent(sighting.villager.id),
            session_id: encodeURIComponent(sessionId),
            spawn_type: encodeURIComponent(sighting.type),
            current_residents: encodeURIComponent(flattenResidentList(currentResidents)),
            past_residents: encodeURIComponent(flattenResidentList(pastResidents)),
            timestamp_utc: encodeURIComponent(formatISO(sighting.timestamp)),
            marked_for_deletion: deletion ? encodeURIComponent(true) : '',
            count_value: deletion ? encodeURIComponent(-1) : encodeURIComponent(1),
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

export function getSightings() {
    return new Promise((resolve, reject) => {
        const getURL = 'https://spreadsheets.google.com/feeds/list/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/od6/public/values?alt=json';
        var request = new XMLHttpRequest();
        request.open("GET", getURL, true);
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        request.onload = function () {
            if (this.status < 200 || this.status > 400) {
                return reject(`Error ${this.status}: unable to get spreadsheet`);
            }
            const data = JSON.parse(this.response);
            resolve(data);
        };
        request.onerror = function () {
            reject('Unable to get spreadsheet. Please check your connection and try again.');
        };
        request.send();
    });
}

export default {
    DATA_SHARE_URL,
    shareSighting,
    getSightings,
};
