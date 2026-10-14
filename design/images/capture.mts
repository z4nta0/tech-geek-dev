


// #region Imports

import { chromium      } from '@playwright/test'; // What: Chromium. Why: Each live site is opened in a real browser to photograph it. How: This launches Playwright's Chromium.
import { fileURLToPath } from 'node:url';         // What: File URL To Path. Why: Every path is resolved from this script's own location. How: This turns a file URL into a path.
import { mkdirSync     } from 'node:fs';          // What: Make Directory Sync. Why: The originals folder may not exist yet on a fresh checkout. How: This creates it.

// #endregion Imports



/**
 * capture.mts = Screenshot Capturer
 *
 * @summary
 * Takes a fresh screenshot of every project's live site for the project
 * cards. Each site opens at a 1,440 by 810 window, the cards' 16:9 shape, with
 * reduced motion so no entrance is caught partway, and is photographed once
 * its fonts and network have settled. The screenshots land in originals/,
 * which git ignores, under the names render.mts reads, so npm run
 * screenshots runs this and then render.mts, which scales and encodes them
 * into src/assets/images. Run it whenever a project's live site changes.
 *
 * Sections:
 *  - Constants
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

type SitRecTyp = { disStr? : string, namStr : string, urlStr : string }; // What: Site Record Type. Why: Every capture needs the same two facts, and a site that greets a first visit with a dialog needs a third. How: This names the project's file name, its live address, and any button to dismiss first.

// #region SIT_REC_ARR

/**
 * SIT_REC_ARR = Site Record Array
 *
 * @summary
 * Every project the cards show, matching src/ui/projects.ts. Every row
 * shares the SitRecTyp shape, so its fields carry no comments of their own:
 * - `disStr` (String, optional): Dismiss String, the name of a button the
 *   site's first visit shows over its content, clicked before the capture:
 *   Ease My Life's welcome dialog, dismissed with I’ll explore myself.
 * - `namStr` (String): Name String, the project's file name, saved as
 *   originals/<name>-website.png, the original render.mts reads.
 * - `urlStr` (String): URL String, the project's live site.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const SIT_REC_ARR : SitRecTyp[] = [ // What: Site Record Array. Why: The script photographs every project from one list. How: Each row names one project and its live site.


	{ namStr : 'ease-my-life',     urlStr : 'https://easemylife.app/',            disStr : 'I’ll explore myself' }, // What: Ease My Life Site Row. Why: Ease My Life's card shows its app. How: This captures easemylife.app after dismissing its welcome dialog.
	{ namStr : 'hair-designs',     urlStr : 'https://hairdesigns.hair/'                                          }, // What: Hair Designs Site Row. Why: Hair Designs' card shows its site. How: This captures hairdesigns.hair.
	{ namStr : 'reese-roofing',    urlStr : 'https://reese-roofing.netlify.app/'                                 }, // What: Reese Roofing Site Row. Why: Reese Roofing's card shows its mockup. How: This captures its Netlify address.
	{ namStr : 'seal-and-shield',  urlStr : 'https://sealandshieldroof.com/'                                     }, // What: Seal And Shield Site Row. Why: Seal and Shield's card shows its site. How: This captures sealandshieldroof.com.
	{ namStr : 'tech-geek',        urlStr : 'https://techgeek.support/'                                          }, // What: Tech Geek Site Row. Why: Tech Geek's card shows its support site. How: This captures techgeek.support.
	{ namStr : 'the-bernie-bears', urlStr : 'https://theberniebears.dog/'                                        }, // What: The Bernie Bears Site Row. Why: The Bernie Bears' card shows its site. How: This captures theberniebears.dog.
	{ namStr : 'tonys-toppers',    urlStr : 'https://tonystoppers.com/'                                          }  // What: Tony's Toppers Site Row. Why: Tony's Toppers' card shows its site. How: This captures tonystoppers.com.


];

// #endregion SIT_REC_ARR



const ORI_DIR_STR = fileURLToPath( new URL( './originals/', import.meta.url ) ); // What: Originals Directory String. Why: The screenshots are the originals render.mts encodes, kept outside git. How: This resolves the originals folder beside this script.
const SET_WAI_NUM = 1500;                                                        // What: Settle Wait Number. Why: A site may still be laying out or loading images just after its network goes quiet. How: Each capture waits this many milliseconds more.
const VIE_HEI_NUM = 810;                                                         // What: Viewport Height Number. Why: The cards show a 16:9 frame. How: This is 1,440 times nine sixteenths.
const VIE_WID_NUM = 1440;                                                        // What: Viewport Width Number. Why: A common laptop width shows each site's desktop layout. How: Every site opens this wide.

// #endregion Constants



// #region Module Init

mkdirSync( ORI_DIR_STR, { recursive : true } ); // What: Originals Folder Creation. Why: A fresh checkout has no originals folder. How: This creates it, doing nothing when it exists.



const broInsObj = await chromium.launch(); // What: Browser Instance Object. Why: Every site is photographed in a real browser. How: This launches Chromium.


for ( const sitRecObj of SIT_REC_ARR ) { // What: Site Record Loop. Why: Each project is captured the same way. How: This opens, settles, photographs, and closes one site per pass.


	const capPagObj = await broInsObj.newPage( { reducedMotion : 'reduce', viewport : { height : VIE_HEI_NUM, width : VIE_WID_NUM } } ); // What: Capture Page Object. Why: Each site needs a fresh page at the cards' shape, with its entrances finished. How: This opens one at 1,440 by 810 with reduced motion.


	await capPagObj.goto( sitRecObj.urlStr, { waitUntil : 'networkidle' } ); // What: Site Navigation Call. Why: The screenshot should show the site fully loaded. How: This opens it and waits until its network goes quiet.

	await capPagObj.evaluate( () => document.fonts.ready ); // What: Fonts Ready Wait. Why: A screenshot taken before the fonts arrive shows fallback text. How: This waits for every font to load.

	await capPagObj.waitForTimeout( SET_WAI_NUM ); // What: Settle Wait Call. Why: Late images and layout should land first. How: This waits a little longer.



	if ( sitRecObj.disStr ) { // What: First Visit Dialog Check. Why: A dialog over the content would hide the site. How: This dismisses it when the row names its button.


		await capPagObj.getByRole( 'button', { name : sitRecObj.disStr } ).click(); // What: Dismiss Click. Why: The site shows its real screen once the dialog closes. How: This clicks the named button.

		await capPagObj.waitForTimeout( SET_WAI_NUM ); // What: Dismiss Settle Wait. Why: The screen behind the dialog should finish appearing. How: This waits again.


	}



	await capPagObj.screenshot({ // What: Screenshot Call. Why: The card shows the site's first screen. How: This saves the window as the project's original, with any looping animation held still.


		animations : 'disabled',                                           // What: Animations. Why: A looping animation would be caught mid-frame. How: This holds every animation still for the capture.
		path       : `${ ORI_DIR_STR }${ sitRecObj.namStr }-website.png` // What: Path. Why: render.mts reads each original by the project's name. How: This saves it in the originals folder under that name.


	});

	await capPagObj.close(); // What: Page Close Call. Why: Each site gets a fresh page. How: This closes the finished one.


	console.log( `Captured ${ sitRecObj.urlStr }` ); // What: Progress Log Call. Why: A slow site shouldn't look like a hang. How: This prints each site as it finishes.


}



await broInsObj.close(); // What: Browser Close Call. Why: The script should exit once every site is captured. How: This shuts Chromium down.

// #endregion Module Init


