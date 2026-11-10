


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the grid arrives the way it should. How: This asserts on what each check reads, such as the grid's animation.
import { test   } from '@playwright/test'; // What: Test. Why: Each check is its own test. How: This declares them.

// #endregion Imports



/**
 * filter.spec.ts = Filter Spec
 *
 * @summary
 * Checks Work's filter in whichever engine the project runs: the project count
 * and grid play no fade of their own when the page opens, since the page's
 * entrance already brings them in, while choosing another technology narrows
 * the count and the grid and fades both up into view. Pressing the pill
 * that's already chosen changes nothing, and under reduced motion the result
 * simply appears. A card link reached backwards with Shift+Tab lands below the
 * sticky filter bar rather than behind it, at the desktop and phone widths.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



test( 'the count and the grid fade up as a new filter result arrives, but not on load or for the chosen pill', async ( { page : curPagObj } ) => { // What: Filter Fade Test. Why: Choosing a filter is an action whose result should be seen arriving, while opening the page or pressing the chosen pill again isn't. How: This allows motion, opens Work, checks the count and the grid play nothing on load or after "All" is pressed again, chooses "GSAP", and checks the narrowed count and both fades.


	await curPagObj.emulateMedia( { reducedMotion : 'no-preference' } ); // What: Motion Allowed Call. Why: The fade plays only when motion is allowed. How: This lifts any preference for this page.

	await curPagObj.goto( '/work' ); // What: Work Page Navigation. Why: The filter lives on the Work page. How: This loads it.


	const couLocObj = curPagObj.locator( '[class*="filCouSpa"]' ); // What: Count Locator Object. Why: The checks read the project count's animation. How: This finds it by the class name Vite keeps inside its hashed module class.
	const griLocObj = curPagObj.locator( '[class*="proGriDiv"]' ); // What: Grid Locator Object. Why: The checks read the project grid's animation. How: This finds it by the class name Vite keeps inside its hashed module class.


	await expect( couLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Load Count Fade Assertion. Why: The count arrives with the page's entrance on load. How: This checks it plays no animation of its own.
	await expect( griLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Load Fade Assertion. Why: The grid arrives with the page's entrance on load. How: This checks it plays no animation of its own.

	await curPagObj.getByRole( 'button', { exact : true, name : 'All' } ).click(); // What: Chosen Pill Click Call. Why: Pressing the pill that's already chosen shouldn't replay anything. How: This presses "All", the starting filter.

	await expect( couLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Repeat Count Fade Assertion. Why: Nothing changed, so nothing should move. How: This checks the count still plays no animation.
	await expect( griLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No Repeat Fade Assertion. Why: Nothing changed, so nothing should move. How: This checks the grid still plays no animation.

	await curPagObj.getByRole( 'button', { exact : true, name : 'GSAP' } ).click(); // What: New Filter Click Call. Why: A different technology changes the result. How: This presses "GSAP", which only one project uses.

	await expect( couLocObj ).toHaveText( '1 project' );                           // What: Narrowed Count Assertion. Why: The count follows the result. How: This checks it reads "1 project".
	await expect( couLocObj ).toHaveCSS( 'animation-name', /resultArriveFadeUp/ ); // What: Count Arrival Fade Assertion. Why: The new count should fade up into view with its result. How: This checks the count plays the result's arriving keyframe, whose name Vite keeps inside the hashed one.
	await expect( griLocObj ).toHaveCSS( 'animation-name', /resultArriveFadeUp/ ); // What: Arrival Fade Assertion. Why: The new result should fade up into view. How: This checks the grid plays the result's arriving keyframe, whose name Vite keeps inside the hashed one.


} );



test( 'a new filter result simply appears under reduced motion', async ( { page : curPagObj } ) => { // What: Motionless Filter Test. Why: Someone who asked for less motion shouldn't see the result rise. How: This asks for reduced motion, opens Work, chooses "GSAP", and checks the narrowed count and grid play no animation.


	await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Call. Why: The check is about the reduced-motion variant. How: This makes the page match prefers-reduced-motion: reduce.

	await curPagObj.goto( '/work' ); // What: Work Page Navigation. Why: The filter lives on the Work page. How: This loads it.

	await curPagObj.getByRole( 'button', { exact : true, name : 'GSAP' } ).click(); // What: New Filter Click Call. Why: A different technology changes the result. How: This presses "GSAP", which only one project uses.

	await expect( curPagObj.getByText( '1 project', { exact : true } ) ).toBeVisible();                // What: Narrowed Count Assertion. Why: The check should read the grid once the result is in. How: This waits until the count reads "1 project".
	await expect( curPagObj.locator( '[class*="filCouSpa"]' ) ).toHaveCSS( 'animation-name', 'none' ); // What: No Count Fade Assertion. Why: The new count should simply appear. How: This checks the count plays no animation.
	await expect( curPagObj.locator( '[class*="proGriDiv"]' ) ).toHaveCSS( 'animation-name', 'none' ); // What: No Fade Assertion. Why: The result should simply appear. How: This checks the grid plays no animation.


} );



for ( const [ widNum, heiNum ] of [ [ 1440, 900 ], [ 390, 844 ] ] ) { // What: Clearance Width Loop. Why: The filter bar's height changes with the layout, so its clearance is checked at the desktop and phone widths the other suites use. How: This declares the test once per width and height.


	test( `a card link reached by Shift+Tab lands clear of the sticky filter bar at ${ widNum.toLocaleString( 'en-US' ) }px`, async ( { browserName : engNamStr, page : curPagObj } ) => { // What: Filter Bar Clearance Test. Why: The filter bar sticks under the fixed bar, and WebKit scrolled a card's link reached backwards up behind it. How: This sizes the page, opens Work, focuses the footer's last link, presses Shift+Tab back through the cards, and checks each card link it reaches sits below the bar.


		await curPagObj.setViewportSize( { height : heiNum, width : widNum } ); // What: Viewport Size Call. Why: The bar is taller where the filter row takes its own line on phones. How: This sizes the page before it loads.

		await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Call. Why: Each link is measured where it lands, not partway through a smooth scroll. How: This makes the page match prefers-reduced-motion: reduce.

		await curPagObj.goto( '/work' ); // What: Work Page Navigation. Why: The filter bar lives on the Work page. How: This loads it.

		await curPagObj.locator( 'footer a' ).last().focus(); // What: Footer Focus Call. Why: The walk runs backwards from below the cards. How: This focuses the footer's last link.


		const keyNamStr = engNamStr === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'; // What: Key Name String. Why: WebKit skips links on a plain Tab, the way Safari does by default. How: This picks Alt+Shift+Tab there and Shift+Tab everywhere else.

		const proLisArr : string[] = []; // What: Problem List Array. Why: Every link that lands behind the bar should be reported, not just the first. How: This collects them during the walk.

		let carLinNum = 0; // What: Card Link Number. Why: A walk that never reached a card link would pass without checking anything. How: This counts the card links measured.


		for ( let preCouNum = 0; preCouNum < 60; preCouNum++ ) { // What: Backward Walk Loop. Why: Every card link is reached on the way back up to the filter bar. How: This presses Shift+Tab once per pass, up to 60 presses.


			await curPagObj.keyboard.press( keyNamStr ); // What: Backward Press Call. Why: Each pass moves focus to the stop before. How: This presses the engine's Shift+Tab.


			const stoPosObj = await curPagObj.evaluate( () => { // What: Stop Position Object. Why: The focused link and the bar are measured together, once the page has scrolled. How: This reads where focus is and, for a card link, its top and the bar's bottom.


				const actCurEle = document.activeElement; // What: Active Current Element. Why: The stop is whatever holds focus after the press. How: This reads the focused element.



				return { // What: Stop Position Return. Why: The walk decides from these whether to stop and what to check. How: This reports whether focus reached the bar, whether it's on a card link, and both edges.


					barBotNum : document.querySelector( '[class*="filBarSec"]' )!.getBoundingClientRect().bottom, // What: Bar Bottom Number. Why: A card link has to sit below the bar. How: This measures the bar's bottom edge. // What: Non-Null Note. Why: The Work page always renders its filter bar. How: The bar is in the page as soon as Work shows.
					barReaBoo : !!actCurEle?.closest( '[class*="filBarSec"]' ),                                  // What: Bar Reached Boolean. Why: The walk ends once focus is back in the filter bar. How: This is true when the focused element sits inside it.
					carLinBoo : !!actCurEle?.closest( '[class*="proGriDiv"]' ),                                  // What: Card Link Boolean. Why: Only the cards' links are checked. How: This is true when the focused element sits inside the grid.
					linTopNum : actCurEle?.getBoundingClientRect().top ?? 0                                      // What: Link Top Number. Why: The link's top edge is what the bar would hide. How: This measures it, or reads 0 when nothing is focused.


				};


			} );


			if ( stoPosObj.barReaBoo ) break; // What: Bar Reached Guard. Why: Past the filter bar there are no more card links. How: This ends the walk.



			if ( !stoPosObj.carLinBoo ) continue; // What: Other Stop Guard. Why: Only the cards' links can land behind the bar. How: This skips any other stop.



			carLinNum++; // What: Card Link Count Update. Why: The test needs proof that card links were measured. How: This counts this one.


			if ( stoPosObj.linTopNum < stoPosObj.barBotNum ) proLisArr.push( `a card link lands ${ ( stoPosObj.barBotNum - stoPosObj.linTopNum ).toFixed( 1 ) }px behind the filter bar` ); // What: Behind Bar Check. Why: A focused link hidden by the bar fails WCAG's focus-not-obscured rule. How: This records a link whose top sits above the bar's bottom.


		}



		expect( carLinNum ).toBeGreaterThan( 0 ); // What: Links Measured Assertion. Why: A walk that skipped every card link would prove nothing. How: This checks at least one was measured.
		expect( proLisArr ).toEqual( [] );        // What: No Hidden Links Assertion. Why: Every card link should land clear of the bar. How: This compares the problems with an empty list, so a failure prints each one.


	} );


}


