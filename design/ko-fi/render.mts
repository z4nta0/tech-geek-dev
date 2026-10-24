


// #region Imports

import { chromium      } from '@playwright/test'; // What: Chromium. Why: The images are captured in a real browser so they use the family's own fonts and tokens. How: This launches Playwright's Chromium.
import { fileURLToPath } from 'node:url';         // What: File URL To Path. Why: The output paths are resolved from this script's own location. How: This turns a file URL into a path.
import { statSync      } from 'node:fs';          // What: Stat Sync. Why: Each finished image has to stay under the size Ko-fi accepts. How: This reads its size in bytes.

// #endregion Imports



/**
 * render.mts = Ko-fi Images Renderer
 *
 * @summary
 * Rebuilds the two images TechGeek's Ko-fi page shows from the pages beside
 * this script: cover.png, the 3:1 banner across the top of the page, with the
 * TechGeek.dev wordmark and tagline beside a small code window, and
 * profile.png, the square picture Ko-fi crops to a circle, the hexagon mark
 * with steam rising from it on the ink. Each page is opened in Chromium at
 * its own size, Ko-fi's recommended 1,200x400 for the cover and 400x400 for
 * the picture, captured at twice that for sharp screens once the family's
 * fonts load, and checked against Ko-fi's 8 MB upload limit. The images are
 * PNGs because they're flat artwork, which a PNG keeps exact. Nothing serves
 * them: they're uploaded to Ko-fi by hand, so they stay here beside their
 * pages. Run it with npm run ko-fi whenever the pages or the family's look
 * change.
 *
 * Sections:
 *  - Constants
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const IMA_REC_ARR = [ // What: Image Record Array. Why: The cover and the picture are rendered the same way at their own sizes. How: Each row names a page, its capture size, and the file it writes.


	{ heiNum : 400, namStr : 'cover',   widNum : 1200 }, // What: Cover Image Record. Why: Ko-fi's banner is 3:1, ideally 1,200x400. How: This renders cover.html at that size.
	{ heiNum : 400, namStr : 'profile', widNum : 400  }  // What: Profile Image Record. Why: Ko-fi's picture is square and cropped to a circle. How: This renders profile.html at 400x400.


];

const MAX_BYT_NUM = 8 * 1024 * 1024; // What: Maximum Bytes Number. Why: Ko-fi refuses an upload of 8 MB or more. How: This is the limit each finished file is checked against.
const SCA_FAC_NUM = 2;               // What: Scale Factor Number. Why: The images should stay sharp on high-density screens. How: This captures each page at twice its size.

// #endregion Constants



// #region Module Init

const broInsObj = await chromium.launch(); // What: Browser Instance Object. Why: The images are drawn by a real browser. How: This launches Chromium.


for ( const imaRecObj of IMA_REC_ARR ) { // What: Image Render Loop. Why: Each image is opened, captured, and checked the same way. How: This walks the records in order.


	const imaPagObj = await broInsObj.newPage( { deviceScaleFactor : SCA_FAC_NUM, viewport : { height : imaRecObj.heiNum, width : imaRecObj.widNum } } ); // What: Image Page Object. Why: The capture has to be exactly the image's size. How: This opens a page at that size, at twice the pixel density.
	const outPatStr = fileURLToPath( new URL( `./${ imaRecObj.namStr }.png`, import.meta.url ) );                                                         // What: Output Path String. Why: Each image sits beside its page. How: This resolves the PNG's path from this script's folder.
	const pagUrlStr = new URL( `./${ imaRecObj.namStr }.html`, import.meta.url ).href;                                                                    // What: Page URL String. Why: Each page loads its fonts and styles by paths relative to itself. How: This is the page's own file URL.


	await imaPagObj.goto( pagUrlStr ); // What: Page Load Call. Why: The image has to be on screen before it's captured. How: This opens its page.

	await imaPagObj.evaluate( () => document.fonts.ready ); // What: Fonts Ready Wait. Why: Text captured before its web font loads would be set in a fallback. How: This waits for every font face.

	await imaPagObj.screenshot( { path : outPatStr, type : 'png' } ); // What: Image Capture Call. Why: This writes the finished image. How: This saves the page as a PNG beside it.


	const outBytNum = statSync( outPatStr ).size; // What: Output Bytes Number. Why: Each image has to stay under Ko-fi's limit. How: This reads the saved file's size.


	if ( outBytNum >= MAX_BYT_NUM ) throw new Error( `${ imaRecObj.namStr }.png is ${ outBytNum } bytes, at or over the ${ MAX_BYT_NUM } byte limit.` ); // What: Size Guard. Why: Ko-fi would refuse an image over the limit. How: This fails the run with the file's size.



	console.log( `Wrote ${ outPatStr } (${ outBytNum } bytes).` ); // What: Result Log Call. Why: The run should say what it wrote. How: This prints the path and size.


}



await broInsObj.close(); // What: Browser Close Call. Why: The script should exit once both images are saved. How: This shuts Chromium down.

// #endregion Module Init


