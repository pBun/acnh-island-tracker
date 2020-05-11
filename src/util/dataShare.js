import queryString from "query-string";
import { format } from "date-fns";

export const DATA_SHARE_URL =
    "https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing";
const DATA_UPLOAD_URL =
    "https://script.google.com/macros/s/AKfycbw_4jsHZE4PkIePUPbzPAlzzcXEeWibBltRUzeLu0zpztsVAEg/exec";

export function shareSighting({ id, villager, timestamp }) {
    return new Promise((resolve, reject) => {
        const qs = queryString.stringify({
            timestamp: encodeURIComponent(
                format(timestamp, "MM/dd/yyyy hh:mm:ss")
            ),
            villager: encodeURIComponent(villager),
            session_id: encodeURIComponent(id),
            spawn_type: encodeURIComponent('mystery-island'),
        });
        var request = new XMLHttpRequest();
        request.open("GET", `${DATA_UPLOAD_URL}?${qs}`, true);
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
        );
        request.onload = function () {
            if (this.status < 200 || this.status > 400) {
                return reject();
            }
            resolve();
        };
        request.onerror = function () {
            reject();
        };
        request.send();
    });
}

export default {
    DATA_SHARE_URL,
    shareSighting,
};