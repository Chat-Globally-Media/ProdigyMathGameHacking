// @ts-nocheck
// Patched Hacks


// BEGIN IMPORTS
import { Swal, Toast, NumberInput, Input, Confirm } from "../utils/swal";
import { Hack, category, Toggler } from "../index"; // Import the Cheat GUI bases.
import { _, getItem, VERY_LARGE_NUMBER, prodigy, game, saveCharacter} from "../utils/util"; // Import Prodigy typings and VERY_LARGE_NUMBER
import { Item } from "../../../typings/item"; // Import Prodigy Item typings
import { TODO } from "../../../typings/util"; // Import Prodigy Util typings
// END IMPORTS


// BEGIN PATCHED HACKS



// Begin Arena Point Increaser
let interval: unknown | null = null;

new Hack(category.patched, "Arena Point Increaser [Patched]").setClick(async () => {


	if (interval) {
		return Swal.fire(
			"Already Enabled",
			"Arena Point Increaser is already enabled.",
			"error"
	)};


	if (!(await Confirm.fire("This hack is patched.", "Running it will probably do nothing.")).value) {
       console.log("Cancelled");
        return;
    }



	interval = setInterval(async () => {
		const data = await (
			await fetch(
				`https://api.prodigygame.com/leaderboard-api/season/${prodigy.pvpNetworkHandler.seasonID}/user/${_.player.userID}/pvp?userID=${_.player.userID}`,
				{
					headers: {
						authorization: `Bearer ${prodigy.network.jwtAuthProvider.getToken()}`,
						"content-type":
							"application/x-www-form-urlencoded; charset=UTF-8",
					},
					body: `seasonID=${prodigy.pvpNetworkHandler.seasonID}&action=win`,
					method: "POST",
					mode: "cors",
				}
			)
		).text();
		if (data !== "") {
			const jsoned: {
				points: number;
				weeklyPoints: number;
				modifiedDate: string;
				seasonID: number;
				numMatches: number;
			} = JSON.parse(data);
			console.log(`[API] ${jsoned.points} Points (+100)`);
		} else console.log(`[API] Failed to add points.`);
	}, 60500);
	await Swal.fire("Enabled", "Arena Point Increaser has been enabled.", "success");
});
// End Arena Point Increaser


// Begin Disable Timeout Dialog
new Hack(category.misc, "Disable Timeout Dialog").setClick(async () => {
    if (!(await Confirm.fire("This hack is patched.", "Running it will probably do nothing.")).value) {
        console.log("Cancelled");
        return;
    }
	prodigy.debugMisc.disableTimeoutDialogue();
});
// End Disable Timeout Dialog



// END PATCHED HACKS