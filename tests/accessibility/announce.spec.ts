


// #region Imports

import { cheAxeFun   } from '../support/axe.ts';    // What: Check Axe Function. Why: Each result state is scanned with the shared axe check. How: This scans the page, reports anything needing review, and returns the violations.
import { expect      } from '@playwright/test';     // What: Expect. Why: Each check passes only when the result is announced and focus lands where it should. How: This asserts on the alert region, the focused element, and the scan.
import { opeStaFun   } from '../support/states.ts'; // What: Open State Function. Why: Each result state has to be opened and settled before it's scanned. How: This loads the Contact page, sends the form through the state's action, and waits for the page to settle.
import { STA_REC_ARR } from '../support/states.ts'; // What: State Record Array. Why: The result states reuse the Contact page's phone and desktop states. How: This lists every state, from which the Contact ones are picked.
import { test        } from '@playwright/test';     // What: Test. Why: Each check is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The helper and the state actions drive a Playwright page. How: This types their page parameters.

// #endregion Imports



/**
 * announce.spec.ts = Announce Spec
 *
 * @summary
 * Checks that the Contact form tells screen reader users what happened once
 * it's sent, in whichever engine the project runs. The error's alert region is
 * in the page and empty on load and holds the error after a failed send, a
 * sent message moves focus to the thank-you that replaces the form, and its
 * "Send Another Message" button moves focus back to the name field. Each
 * result is also scanned with axe at phone and desktop widths. Netlify isn't
 * there in testing, so the root's POST is answered here instead, with a 200
 * for a sent message and a 500 for a failed one.
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

const CON_STA_ARR = STA_REC_ARR.filter( ( staRecObj ) => staRecObj.patStr === '/contact' );           // What: Contact State Array. Why: Each result is scanned at the Contact page's phone and desktop widths. How: This picks the Contact rows from the shared state list.
const ERR_MES_STR = 'Something went wrong. Please try again or email contact@techgeek.dev directly.'; // What: Error Message String. Why: A failed send has to put this message in the alert region. How: This is the error the page shows.



/**
 * RES_REC_ARR = Result Record Array
 *
 * @summary
 * The two ways a send can end, each scanned with axe. Every row shares one
 * shape, so its fields carry no comments of their own:
 * - `ideStr` (String): Identifier String, the result's name in test titles.
 * - `staNum` (Number): Status Number, the status the root's POST answers with.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const RES_REC_ARR = [ // What: Result Record Array. Why: Both the thank-you and the error have to pass the scan. How: Each row names a result and the status that brings it about.


	{ ideStr : 'sent',   staNum : 200 }, // What: Sent Result Row. Why: An ok reply shows the thank-you. How: This answers with a 200.
	{ ideStr : 'failed', staNum : 500 }  // What: Failed Result Row. Why: A failed reply shows the error. How: This answers with a 500.


];

// #endregion Constants



// #region Helpers

// #region senForFun

/**
 * senForFun = Send Form Function
 *
 * @summary
 * Sends the Contact form and waits for its result: answers the root's POST
 * with the given status, fills in a valid name, email, and message, presses
 * "Send Message", then waits until the thank-you's heading shows for a 200,
 * or the error shows in the alert region for any other status. It expects
 * the Contact page already loaded.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page showing the form.
 * @param staCodNum - Status Code Number: The status the root's POST answers
 *                    with.
 *
 * @returns A promise that settles once the result shows, with no value.
 *
 * @example
 * ```ts
 * senForFun(page, 500) // => Promise<void>
 * ```
 *
*/

async function senForFun ( curPagObj : Page, staCodNum : number ) : Promise< void > {


	await curPagObj.route( ( urlCurObj ) => urlCurObj.pathname === '/', async ( rouCurObj ) => { // What: Root Route Handler. Why: Netlify Forms answers the root's POST on the live site, but not in testing. How: This answers a POST with an empty body at the given status, and lets any other request to the root through.


		if ( rouCurObj.request().method() !== 'POST' ) return rouCurObj.continue(); // What: Other Request Guard. Why: Only the form's POST needs answering. How: This lets any other request to the root through untouched.



		await rouCurObj.fulfill( { body : '', status : staCodNum } ); // What: Status Answer Call. Why: The form shows its thank-you only on an ok reply, and its error otherwise. How: This answers with an empty body at the given status.


	} );


	await curPagObj.getByPlaceholder( 'Your name' ).fill( 'Test Visitor' );              // What: Name Fill Call. Why: Every required field is filled. How: This fills in a name.
	await curPagObj.getByPlaceholder( 'you@example.com' ).fill( 'visitor@example.com' ); // What: Email Fill Call. Why: Every required field is filled. How: This fills in a reserved example address.
	await curPagObj.getByPlaceholder( 'Tell me about your project…' ).fill( 'Hello.' );  // What: Message Fill Call. Why: Every required field is filled. How: This fills in a message.

	await curPagObj.getByRole( 'button', { name : 'Send Message' } ).click(); // What: Send Click Call. Why: The valid form is submitted. How: This presses "Send Message".


	const resLocObj = staCodNum === 200 ? curPagObj.getByRole( 'heading', { name : 'Message Sent!' } ) : curPagObj.getByRole( 'alert' ).getByText( ERR_MES_STR ); // What: Result Locator Object. Why: Each status ends in its own result. How: This finds the thank-you's heading for a 200, or the error inside the alert region otherwise.


	await expect( resLocObj ).toBeVisible(); // What: Result Shown Assertion. Why: The checks read the page only once the result is there. How: This waits until the result shows.


}

// #endregion senForFun

// #endregion Helpers



// #region Module Init

test.use( { reducedMotion : 'reduce' } ); // What: Reduced Motion Use. Why: The thank-you's and the error's fades would otherwise still be running when the checks read them. How: This makes every page in this file match prefers-reduced-motion: reduce.



test( 'the alert region is in the page and empty on load, and focus stays put', async ( { page : curPagObj } ) => { // What: Empty Alert Test. Why: A live region added at the moment it speaks is often missed, and a first visit shouldn't move focus. How: This loads the Contact page and checks the alert region is there, empty, and that the name field isn't focused.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await expect( curPagObj.getByRole( 'alert' ) ).toHaveCount( 1 );             // What: One Alert Assertion. Why: The alert region has to be in the page from the first render. How: This checks exactly one alert region exists.
	await expect( curPagObj.getByRole( 'alert' ) ).toBeEmpty();                  // What: Empty Alert Assertion. Why: Nothing has gone wrong yet. How: This checks the region holds no text.
	await expect( curPagObj.getByPlaceholder( 'Your name' ) ).not.toBeFocused(); // What: Unmoved Focus Assertion. Why: Only a return from the thank-you moves focus to the name field. How: This checks the field isn't focused on load.


} );



test( 'a failed send puts the error in the alert region', async ( { page : curPagObj } ) => { // What: Failed Send Test. Why: Screen reader users have to hear that the message didn't go out. How: This sends the form against a 500 and checks the alert region holds the error.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await senForFun( curPagObj, 500 ); // What: Failed Send Call. Why: The error shows only after a failed send. How: This sends the form with the root's POST answered by a 500.

	await expect( curPagObj.getByRole( 'alert' ) ).toHaveText( ERR_MES_STR ); // What: Error Alert Assertion. Why: The alert region announces the error. How: This checks it holds the error message.


} );



test( 'a sent message moves focus to the thank-you, and sending another moves it to the name field', async ( { page : curPagObj } ) => { // What: Result Focus Test. Why: The focused submit button disappears with the form, so focus has to land on what replaces it each way. How: This sends the form against a 200, checks the thank-you panel is focused, presses "Send Another Message", and checks the name field is focused.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await senForFun( curPagObj, 200 ); // What: Sent Send Call. Why: The thank-you shows only after a sent message. How: This sends the form with the root's POST answered by a 200.

	await expect( curPagObj.getByRole( 'heading', { name : 'Message Sent!' } ).locator( '..' ) ).toBeFocused(); // What: Thank-You Focus Assertion. Why: Focus on the panel announces it, and keeps focus from falling to the page. How: This checks the heading's parent, the thank-you panel, is the focused element.

	await curPagObj.getByRole( 'button', { name : 'Send Another Message' } ).click(); // What: Send Another Click Call. Why: The form comes back for another message. How: This presses "Send Another Message".

	await expect( curPagObj.getByPlaceholder( 'Your name' ) ).toBeFocused(); // What: Name Field Focus Assertion. Why: The visitor starts the next message at the first field. How: This checks the name field is focused.


} );



for ( const resRecObj of RES_REC_ARR ) { // What: Result Loop. Why: The thank-you and the error each have to pass the scan. How: This declares one set of scans per result.


	for ( const staRecObj of CON_STA_ARR ) { // What: Width Loop. Why: Each result is scanned at phone and desktop widths. How: This declares one scan per Contact state.


		const resStaObj = { // What: Result State Object. Why: The scan opens the Contact page at the state's width with the form already sent. How: This copies the Contact state, sends the form in its action, and names it after the result.


			...staRecObj, // What: State Record Spread. Why: The result state keeps the Contact state's path and viewport. How: This copies the row.

			actFun : ( curPagObj : Page ) => senForFun( curPagObj, resRecObj.staNum ), // What: Action Function. Why: The state shows the form's result. How: This sends the form with the root's POST answered at the result's status.
			ideStr : `${ staRecObj.ideStr }-${ resRecObj.ideStr }`,                    // What: Identifier String. Why: Each test names its width and result. How: This joins the Contact state's name and the result's.


		};


		test( `${ resStaObj.ideStr } has no axe violations`, async ( { page : curPagObj }, tesInfObj ) => { // What: Result Axe Test. Why: A form's result states pass only with zero axe violations. How: This opens the state with the form sent, scans it, reports anything needing review, and fails on any violation.


			await opeStaFun( curPagObj, resStaObj ); // What: State Open Call. Why: The scan should see the result settled. How: This loads the page, sends the form, and settles it.

			expect( await cheAxeFun( curPagObj, tesInfObj, resStaObj.ideStr ) ).toEqual( [] ); // What: No Violations Assertion. Why: The state passes only with zero violations. How: This scans the page and compares its summarized violations with an empty list, so a failure prints each one.


		} );


	}


}

// #endregion Module Init


