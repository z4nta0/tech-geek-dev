


// #region Imports

import { cheAxeFun   } from '../support/axe.ts';     // What: Check Axe Function. Why: Each result state is scanned with the shared axe check. How: This scans the page, reports anything needing review, and returns the violations.
import { ERR_MES_STR } from '../support/contact.ts'; // What: Error Message String. Why: A failed send has to put this message in the alert region. How: This is the error the page shows.
import { expect      } from '@playwright/test';      // What: Expect. Why: Each check passes only when the result is announced and focus lands where it should. How: This asserts on what each check reads, such as the alert region.
import { opeStaFun   } from '../support/states.ts';  // What: Open State Function. Why: Each result state has to be opened and settled before it's scanned. How: This loads the Contact page, sends the form through the state's action, and waits for the page to settle.
import { RES_STA_ARR } from '../support/contact.ts'; // What: Result State Array. Why: Each result is scanned at the Contact page's phone and desktop widths. How: This lists the Contact states with the form sent, one per result and width.
import { senForFun   } from '../support/contact.ts'; // What: Send Form Function. Why: The focus and alert checks send the form themselves. How: This answers the root's POST at a given status, fills in and sends the form, and waits for its result.
import { test        } from '@playwright/test';      // What: Test. Why: Each check is its own test. How: This declares them.

// #endregion Imports



/**
 * announce.spec.ts = Announce Spec
 *
 * @summary
 * Checks that the Contact form tells screen reader users what happened once
 * it's sent, in whichever engine the project runs. The error's alert region is
 * in the page and empty on load and holds the error after a failed send, which
 * also leaves focus on the submit button, a sent message moves focus to the
 * thank-you that replaces the form, and its "Send Another Message" button
 * moves focus back to the name field. The form fades up into view on that
 * return, though not on a first visit, and simply appears under reduced
 * motion. Each result is also scanned with axe at phone and desktop widths.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



test.use( { reducedMotion : 'reduce' } ); // What: Reduced Motion Use. Why: The thank-you's and the error's fades would otherwise still be running when the checks read them. How: This makes every page in this file match prefers-reduced-motion: reduce.



test( 'the alert region is in the page and empty on load, and focus stays put', async ( { page : curPagObj } ) => { // What: Empty Alert Test. Why: A live region added at the moment it speaks is often missed, and a first visit shouldn't move focus. How: This loads the Contact page and checks the alert region is there, empty, and that the name field isn't focused.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await expect( curPagObj.getByRole( 'alert' ) ).toHaveCount( 1 );             // What: One Alert Assertion. Why: The alert region has to be in the page from the first render. How: This checks exactly one alert region exists.
	await expect( curPagObj.getByRole( 'alert' ) ).toBeEmpty();                  // What: Empty Alert Assertion. Why: Nothing has gone wrong yet. How: This checks the region holds no text.
	await expect( curPagObj.getByPlaceholder( 'Your name' ) ).not.toBeFocused(); // What: Unmoved Focus Assertion. Why: Only a return from the thank-you moves focus to the name field. How: This checks the field isn't focused on load.


} );



test( 'a failed send puts the error in the alert region and keeps focus on the submit button', async ( { page : curPagObj } ) => { // What: Failed Send Test. Why: Screen reader users have to hear that the message didn't go out, and the button's disabled spell while sending mustn't drop focus to the page. How: This sends the form against a 500 and checks the alert region holds the error and the submit button is focused.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await senForFun( curPagObj, 500 ); // What: Failed Send Call. Why: The error shows only after a failed send. How: This sends the form with the root's POST answered by a 500.

	await expect( curPagObj.getByRole( 'alert' ) ).toHaveText( ERR_MES_STR );                 // What: Error Alert Assertion. Why: The alert region announces the error. How: This checks it holds the error message.
	await expect( curPagObj.getByRole( 'button', { name : 'Send Message' } ) ).toBeFocused(); // What: Submit Focus Assertion. Why: Focus never falls to the page, so the visitor can try again from where they were. How: This checks the submit button is the focused element once sending ends.


} );



test( 'a sent message moves focus to the thank-you, and sending another moves it to the name field', async ( { page : curPagObj } ) => { // What: Result Focus Test. Why: The focused submit button disappears with the form, so focus has to land on what replaces it each way. How: This sends the form against a 200, checks the thank-you panel is focused, presses "Send Another Message", and checks the name field is focused.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await senForFun( curPagObj, 200 ); // What: Sent Send Call. Why: The thank-you shows only after a sent message. How: This sends the form with the root's POST answered by a 200.

	await expect( curPagObj.getByRole( 'heading', { name : 'Message Sent!' } ).locator( '..' ) ).toBeFocused(); // What: Thank-You Focus Assertion. Why: Focus on the panel announces it, and keeps focus from falling to the page. How: This checks the heading's parent, the thank-you panel, is the focused element.

	await curPagObj.getByRole( 'button', { name : 'Send Another Message' } ).click(); // What: Send Another Click Call. Why: The form comes back for another message. How: This presses "Send Another Message".

	await expect( curPagObj.getByPlaceholder( 'Your name' ) ).toBeFocused(); // What: Name Field Focus Assertion. Why: The visitor starts the next message at the first field. How: This checks the name field is focused.


} );



test( 'the form fades up into view on its return from the thank-you, but not on a first visit', async ( { page : curPagObj } ) => { // What: Returning Form Fade Test. Why: The thank-you fades in as it replaces the form, so the form coming back should be seen too, while a first visit arrives with the page's own entrance. How: This allows motion, checks the form plays no entrance of its own on load, sends the form against a 200, presses "Send Another Message", and checks the form plays the shared entrance.


	await curPagObj.emulateMedia( { reducedMotion : 'no-preference' } ); // What: Motion Allowed Call. Why: The fade plays only when motion is allowed, and this file asks for reduced motion. How: This lifts the preference for this page.

	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.


	const forLocObj = curPagObj.locator( 'form' ).filter( { has : curPagObj.getByPlaceholder( 'Your name' ) } ); // What: Form Locator Object. Why: The checks read the visible form, not the hidden copy Netlify detects. How: This finds the form holding the name field.


	await expect( forLocObj ).toHaveCSS( 'animation-name', 'none' ); // What: No First Fade Assertion. Why: A first visit's form arrives with the page's entrance, not one of its own. How: This checks the form plays no animation on load.

	await senForFun( curPagObj, 200 ); // What: Sent Send Call. Why: The form returns only from the thank-you. How: This sends the form with the root's POST answered by a 200.

	await curPagObj.getByRole( 'button', { name : 'Send Another Message' } ).click(); // What: Send Another Click Call. Why: The form comes back for another message. How: This presses "Send Another Message".

	await expect( forLocObj ).toHaveCSS( 'animation-name', 'contentEnterFadeUp' ); // What: Return Fade Assertion. Why: The form coming back should fade up the way the thank-you did. How: This checks the returning form plays the shared entrance keyframe.


} );



test( 'the returning form simply appears under reduced motion', async ( { page : curPagObj } ) => { // What: Motionless Returning Form Test. Why: Someone who asked for less motion shouldn't see the form slide back in. How: This sends the form against a 200 under this file's reduced motion, presses "Send Another Message", and checks the form plays no animation.


	await curPagObj.goto( '/contact' ); // What: Contact Page Navigation. Why: The form lives on the Contact page. How: This loads it.

	await senForFun( curPagObj, 200 ); // What: Sent Send Call. Why: The form returns only from the thank-you. How: This sends the form with the root's POST answered by a 200.

	await curPagObj.getByRole( 'button', { name : 'Send Another Message' } ).click(); // What: Send Another Click Call. Why: The form comes back for another message. How: This presses "Send Another Message".

	await expect( curPagObj.getByPlaceholder( 'Your name' ) ).toBeFocused();                                                                         // What: Return Shown Assertion. Why: The check should read the form once it's back. How: This waits until the name field takes focus.
	await expect( curPagObj.locator( 'form' ).filter( { has : curPagObj.getByPlaceholder( 'Your name' ) } ) ).toHaveCSS( 'animation-name', 'none' ); // What: No Return Fade Assertion. Why: The returning form should simply appear. How: This checks the form holding the name field plays no animation.


} );



for ( const resStaObj of RES_STA_ARR ) { // What: Result State Loop. Why: The thank-you and the error each have to pass the scan at phone and desktop widths. How: This declares one scan per result state.


	test( `${ resStaObj.ideStr } has no axe violations`, async ( { page : curPagObj }, tesInfObj ) => { // What: Result Axe Test. Why: A form's result states pass only with zero axe violations. How: This opens the state with the form sent, scans it, reports anything needing review, and fails on any violation.


		await opeStaFun( curPagObj, resStaObj ); // What: State Open Call. Why: The scan should see the result settled. How: This loads the page, sends the form, and settles it.

		expect( await cheAxeFun( curPagObj, tesInfObj, resStaObj.ideStr ) ).toEqual( [] ); // What: No Violations Assertion. Why: The state passes only with zero violations. How: This scans the page and compares its summarized violations with an empty list, so a failure prints each one.


	} );


}


