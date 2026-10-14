


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only at the expected scroll position. How: This asserts and polls the window's scroll offset.
import { test   } from '@playwright/test'; // What: Test. Why: Each navigation case is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The helpers drive a Playwright page. How: This types their page parameters.

// #endregion Imports



/**
 * navigation.spec.ts = Navigation Spec
 *
 * @summary
 * Checks that moving between pages behaves like a multi-page site, in
 * whichever engine the project runs. A client-side router keeps the scroll
 * position when it swaps pages, so the useScrTopFun hook the app root calls
 * puts every link-driven navigation back at the top. Footer links clicked at
 * the bottom of each page open the next page at its top, the current page's
 * own bar link scrolls back to the top, a phone menu link does the same,
 * back returns the visitor to where they were rather than to the top, and the
 * Hire Me button switches to Contact without reloading the site.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

// #region PAG_LIN_ARR

/**
 * PAG_LIN_ARR = Page Link Array
 *
 * @summary
 * Every page of the site, in the bar's order, each one both a starting point
 * and a destination. Every row shares one shape, so its fields carry no
 * comments of their own:
 * - `labStr` (String): Label String, the page's link text in the bar and the
 *   footer.
 * - `patStr` (String): Path String, the route the link goes to.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const PAG_LIN_ARR = [ // What: Page Link Array. Why: Every page is checked as a starting point and as a destination. How: Each row pairs a route's path with its link text, in the bar's order.


	{ labStr : 'Home',    patStr : '/'        },
	{ labStr : 'Work',    patStr : '/work'    },
	{ labStr : 'About',   patStr : '/about'   },
	{ labStr : 'Contact', patStr : '/contact' }


];

// #endregion PAG_LIN_ARR

// #endregion Constants



// #region Helpers

// #region botScrFun

/**
 * botScrFun = Bottom Scroll Function
 *
 * @summary
 * Jumps the window to the end of the page, instantly whatever the stylesheet's
 * scroll-behavior says, and returns how far down that is, so a check starts
 * from a page scrolled as far as a visitor reaching the footer would be.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to scroll.
 *
 * @returns The window's scroll offset once at the bottom.
 *
 * @example
 * ```ts
 * botScrFun(page) // => Promise<1087>
 * ```
 *
*/

async function botScrFun ( curPagObj : Page ) : Promise< number > {


	await curPagObj.evaluate( () => window.scrollTo( { behavior : 'instant', top : document.documentElement.scrollHeight } ) ); // What: Bottom Scroll Call. Why: The footer's links are clicked from the end of the page. How: This jumps past the page's full height, which the browser clamps to the bottom.



	return curPagObj.evaluate( () => window.scrollY ); // What: Scroll Offset Return. Why: Back is checked against where the page was. How: This reads the window's scroll offset.


}

// #endregion botScrFun

// #endregion Helpers



// #region Module Init

test.use( { reducedMotion : 'reduce' } ); // What: Reduced Motion Use. Why: The page's entrance and any smooth scroll would otherwise still be moving when the offset is read. How: This makes every page in this file match prefers-reduced-motion: reduce.



for ( const [ froIndNum, froLinObj ] of PAG_LIN_ARR.entries() ) { // What: Start Page Loop. Why: Every page should hand off to the next at the top. How: This declares one footer test per page, going to the next page in the list.


	const nexLinObj = PAG_LIN_ARR[ ( froIndNum + 1 ) % PAG_LIN_ARR.length ]; // What: Next Link Object. Why: Each page links on to another. How: This picks the next page in the list, wrapping from the last back to Home.


	test( `the footer's ${ nexLinObj.labStr } link from the bottom of ${ froLinObj.labStr } opens at the top`, async ( { page : curPagObj } ) => { // What: Footer Link Test. Why: A link clicked at the end of a page should open the next page at its top. How: This scrolls to the bottom, clicks the footer link, and checks the offset.


		await curPagObj.setViewportSize( { height : 900, width : 1440 } ); // What: Desktop Viewport Call. Why: The footer shows every page link side by side at desktop width. How: This sizes the page before it loads.

		await curPagObj.goto( froLinObj.patStr ); // What: Start Page Navigation. Why: The check starts on its page. How: This loads it.

		await botScrFun( curPagObj ); // What: Bottom Scroll Call. Why: The click happens where the footer is. How: This scrolls to the end of the page.

		await curPagObj.getByRole( 'navigation', { name : 'Footer navigation' } ).getByRole( 'link', { exact : true, name : nexLinObj.labStr } ).click(); // What: Footer Link Click. Why: The footer's links are the ones clicked furthest down a page. How: This clicks the link to the next page.

		await expect( curPagObj ).toHaveURL( nexLinObj.patStr ); // What: Destination Assertion. Why: The offset only means something on the new page. How: This waits for the address to change.

		await expect.poll( () => curPagObj.evaluate( () => window.scrollY ) ).toBe( 0 ); // What: Top Offset Assertion. Why: The new page has to open at its top. How: This polls the scroll offset until it reads 0, failing if it never does.


	} );


}



test( "the current page's own bar link scrolls back to the top", async ( { page : curPagObj } ) => { // What: Same Page Link Test. Why: Clicking the page already showing is a request to go back to its start. How: This scrolls down About, clicks About in the bar, and checks the offset.


	await curPagObj.setViewportSize( { height : 900, width : 1440 } ); // What: Desktop Viewport Call. Why: The bar shows its links at desktop width. How: This sizes the page before it loads.

	await curPagObj.goto( '/about' ); // What: About Page Navigation. Why: About is long enough to scroll well down. How: This loads it.

	await botScrFun( curPagObj ); // What: Bottom Scroll Call. Why: The click should come from far down the page. How: This scrolls to the end of the page.

	await curPagObj.getByRole( 'navigation', { name : 'Primary navigation' } ).getByRole( 'link', { exact : true, name : 'About' } ).click(); // What: Bar Link Click. Why: The bar stays in view at every scroll position. How: This clicks the link for the page already showing.

	await expect.poll( () => curPagObj.evaluate( () => window.scrollY ) ).toBe( 0 ); // What: Top Offset Assertion. Why: The page has to return to its top. How: This polls the scroll offset until it reads 0.


} );



test( 'a phone menu link opens its page at the top', async ( { page : curPagObj } ) => { // What: Phone Menu Link Test. Why: Phone visitors move between pages through the menu. How: This scrolls down Home, opens the menu, clicks Contact, and checks the offset.


	await curPagObj.setViewportSize( { height : 844, width : 390 } ); // What: Phone Viewport Call. Why: The menu only replaces the bar's links on a phone. How: This sizes the page before it loads.

	await curPagObj.goto( '/' ); // What: Home Page Navigation. Why: Home is long enough to scroll well down. How: This loads it.

	await botScrFun( curPagObj ); // What: Bottom Scroll Call. Why: The menu link should be clicked from far down the page. How: This scrolls to the end of the page.

	await curPagObj.getByRole( 'button', { name : 'Toggle menu' } ).click(); // What: Menu Toggle Click. Why: The menu's links only show once it's open. How: This opens it from the sticky bar.

	await curPagObj.locator( '[data-mobile-menu-open]' ).getByRole( 'link', { exact : true, name : 'Contact' } ).click(); // What: Menu Link Click. Why: A phone visitor picks a page from the open menu. How: This clicks Contact inside the open drawer, found by the attribute the drawer carries while open.

	await expect( curPagObj ).toHaveURL( '/contact' ); // What: Destination Assertion. Why: The offset only means something on the new page. How: This waits for the address to change.

	await expect.poll( () => curPagObj.evaluate( () => window.scrollY ) ).toBe( 0 ); // What: Top Offset Assertion. Why: The new page has to open at its top. How: This polls the scroll offset until it reads 0.


} );



test( 'back returns to where the visitor was, not the top', async ( { page : curPagObj } ) => { // What: Back Navigation Test. Why: Back should undo a click, returning to the earlier position the way a multi-page site does. How: This scrolls Home to the bottom, follows a footer link, goes back, and checks the offset.


	await curPagObj.setViewportSize( { height : 900, width : 1440 } ); // What: Desktop Viewport Call. Why: The footer shows every page link side by side at desktop width. How: This sizes the page before it loads.

	await curPagObj.goto( '/' ); // What: Home Page Navigation. Why: Home is long enough to scroll well down. How: This loads it.


	const botOffNum = await botScrFun( curPagObj ); // What: Bottom Offset Number. Why: Back should return close to this position. How: This scrolls to the end of the page and keeps how far down that is.


	await curPagObj.getByRole( 'navigation', { name : 'Footer navigation' } ).getByRole( 'link', { exact : true, name : 'About' } ).click(); // What: Footer Link Click. Why: Back needs a page to come back from. How: This follows the footer's About link.

	await expect( curPagObj ).toHaveURL( '/about' ); // What: Destination Assertion. Why: Back is only pressed once the new page is showing. How: This waits for the address to change.

	await curPagObj.goBack(); // What: Back Navigation Call. Why: The visitor returns to Home. How: This presses the browser's back.

	await expect( curPagObj ).toHaveURL( '/' ); // What: Return Assertion. Why: The offset is read on Home again. How: This waits for the address to change back.

	await expect.poll( () => curPagObj.evaluate( () => window.scrollY ) ).toBeGreaterThan( botOffNum / 2 ); // What: Restored Offset Assertion. Why: Back should land near the earlier position, not the top. How: This polls until the offset is past half the earlier one, leaving room for the few pixels engines differ by.


} );



test( 'the Hire Me button opens Contact without reloading the site', async ( { page : curPagObj } ) => { // What: Hire Me Link Test. Why: A plain link would reload the whole site instead of switching pages. How: This marks the document, clicks the bar's Hire Me, and checks the mark survived, which only happens without a reload.


	await curPagObj.setViewportSize( { height : 900, width : 1440 } ); // What: Desktop Viewport Call. Why: The bar shows its Hire Me button at desktop width. How: This sizes the page before it loads.

	await curPagObj.goto( '/' ); // What: Home Page Navigation. Why: The check starts away from Contact. How: This loads Home.

	await curPagObj.evaluate( () => document.documentElement.setAttribute( 'data-test-reload-marker', '' ) ); // What: Reload Marker Call. Why: A reload would build a fresh document without the mark. How: This sets a presence-only attribute on the root element.

	await curPagObj.getByRole( 'banner' ).getByRole( 'link', { exact : true, name : 'Hire Me' } ).click(); // What: Hire Me Click. Why: This is the link that used to reload the site. How: This clicks the bar's Hire Me.

	await expect( curPagObj ).toHaveURL( '/contact' ); // What: Destination Assertion. Why: The button has to reach Contact. How: This waits for the address to change.

	expect( await curPagObj.evaluate( () => document.documentElement.hasAttribute( 'data-test-reload-marker' ) ) ).toBe( true ); // What: No Reload Assertion. Why: The router should switch pages within the same document. How: This checks the mark is still on the root element.


} );

// #endregion Module Init


