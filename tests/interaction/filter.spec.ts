


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the grid arrives the way it should. How: This asserts on what each check reads, such as the grid's animation.
import { test   } from '@playwright/test'; // What: Test. Why: Each check is its own test. How: This declares them.

// #endregion Imports



/**
 * filter.spec.ts = Filter Spec
 *
 * @summary
 * Checks Work's filter in whichever engine the project runs: the project grid
 * plays no fade of its own when the page opens, since the page's entrance
 * already brings it in, while choosing another technology narrows the grid
 * and its count and fades the new result up into view. Pressing the pill
 * that's already chosen changes nothing, and under reduced motion the result
 * simply appears.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



test( 'the grid fades up as a new filter result arrives, but not on load or for the chosen pill', async ( { page : curPagObj } ) => { // What: Filter Fade Test. Why: Choosing a filter is an action whose result should be seen arriving, while opening the page or pressing the chosen pill again isn't. How: This allows motion, opens Work, checks the grid plays nothing on load or after "All" is pressed again, chooses "GSAP", and checks the count and the fade.


	await curPagObj.emulateMedia( { reducedMotion : 'no-preference' } ); // What: Motion Allowed Call. Why: The fade plays only when motion is allowed. How: This lifts any preference for this page.

	await curPagObj.goto( '/work' ); // What: Work Page Navigation. Why: The filter lives on the Work page. How: This loads it.


	const griLocObj = curPagObj.locator( '[class*="proGriDiv"]' ); // What: Grid Locator Object. Why: The checks read the project grid's animation. How: This finds it by the class name Vite keeps inside its hashed module class.


	await expect( griLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Load Fade Assertion. Why: The grid arrives with the page's entrance on load. How: This checks it plays no animation of its own.

	await curPagObj.getByRole( 'button', { name : 'All', exact : true } ).click(); // What: Chosen Pill Click Call. Why: Pressing the pill that's already chosen shouldn't replay anything. How: This presses "All", the starting filter.

	await expect( griLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Repeat Fade Assertion. Why: Nothing changed, so nothing should move. How: This checks the grid still plays no animation.

	await curPagObj.getByRole( 'button', { name : 'GSAP', exact : true } ).click(); // What: New Filter Click Call. Why: A different technology changes the result. How: This presses "GSAP", which only one project uses.

	await expect( curPagObj.getByText( '1 project', { exact : true } ) ).toBeVisible(); // What: Narrowed Count Assertion. Why: The count follows the result. How: This checks it reads "1 project".
	await expect( griLocObj ).toHaveCSS( 'animation-name', /proGriDivArriveFadeUp/ );   // What: Arrival Fade Assertion. Why: The new result should fade up into view. How: This checks the grid plays its arriving keyframe, whose name Vite keeps inside the hashed one.


} );



test( 'a new filter result simply appears under reduced motion', async ( { page : curPagObj } ) => { // What: Motionless Filter Test. Why: Someone who asked for less motion shouldn't see the cards rise. How: This asks for reduced motion, opens Work, chooses "GSAP", and checks the narrowed grid plays no animation.


	await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Call. Why: The check is about the reduced-motion variant. How: This makes the page match prefers-reduced-motion: reduce.

	await curPagObj.goto( '/work' ); // What: Work Page Navigation. Why: The filter lives on the Work page. How: This loads it.

	await curPagObj.getByRole( 'button', { name : 'GSAP', exact : true } ).click(); // What: New Filter Click Call. Why: A different technology changes the result. How: This presses "GSAP", which only one project uses.

	await expect( curPagObj.getByText( '1 project', { exact : true } ) ).toBeVisible();                // What: Narrowed Count Assertion. Why: The check should read the grid once the result is in. How: This waits until the count reads "1 project".
	await expect( curPagObj.locator( '[class*="proGriDiv"]' ) ).toHaveCSS( 'animation-name', 'none' ); // What: No Fade Assertion. Why: The result should simply appear. How: This checks the grid plays no animation.


} );


