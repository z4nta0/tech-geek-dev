


// #region Imports

import AxeBuiCla from '@axe-core/playwright'; // What: Axe Builder Class. Why: axe-core finds the mechanical accessibility failures, such as low contrast. How: This runs its scan against a Playwright page.


import type { Page     } from '@playwright/test'; // What: Page. Why: The scan runs against a Playwright page. How: This types the helpers' page parameters.
import type { TestInfo } from '@playwright/test'; // What: Test Info. Why: Results needing review are attached to the test that found them. How: This types cheAxeFun's test info parameter.

// #endregion Imports



/**
 * axe.ts = Axe
 *
 * @summary
 * The axe-core scan the accessibility specs share: it checks a page against
 * WCAG 2.2 A and AA plus axe's best-practice rules, and sums each result up as
 * one readable line naming its rule, its impact, and the elements it found.
 * Anything axe can't decide on its own (its "incomplete" results, such as
 * text over an image) is printed and attached to the test as needing review
 * by hand, while the violations come back for the spec to fail on, along with
 * any incomplete bypass result, since every page opens with a skip link.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type AxeResTyp = Awaited< ReturnType< AxeBuiCla[ 'analyze' ] > >; // What: Axe Results Type. Why: The scan's findings are summarized for the report, and axe-core itself is only a dependency of the Playwright integration. How: This reads the type from what AxeBuiCla's analyze resolves to.

// #endregion Types



// #region Constants

const AXE_TAG_ARR = [ 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice' ]; // What: Axe Tag Array. Why: The site targets WCAG 2.2 AA, which carries forward WCAG 2.1's A and AA rules apart from the obsolete 4.1.1, and axe's best practices catch common problems WCAG doesn't name. How: This limits the scan to those rule sets.

// #endregion Constants



// #region Helpers

// #region scaStaFun

/**
 * scaStaFun = Scan State Function
 *
 * @summary
 * Runs axe-core on the page as it stands, limited to the WCAG and
 * best-practice rule sets, and returns its full results. It expects the state
 * already open and settled.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to scan.
 *
 * @returns A promise that resolves with the scan's results.
 *
 * @example
 * ```ts
 * scaStaFun(page) // => { violations, incomplete, passes, ... }
 * ```
 *
*/

async function scaStaFun ( curPagObj : Page ) : Promise< AxeResTyp > {


	return new AxeBuiCla( { page : curPagObj } ).withTags( AXE_TAG_ARR ).analyze(); // What: Axe Scan Return. Why: The scan's results decide the test. How: This builds an axe run for the page, limits it to the chosen rule sets, and runs it.


}

// #endregion scaStaFun



// #region sumResFun

/**
 * sumResFun = Summarize Results Function
 *
 * @summary
 * Turns one list of axe results into one readable line per rule: the rule's
 * ID, its impact where axe gives one, its help text, and the selectors of the
 * elements it flagged.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param resLisArr - Result List Array: The violations, the incomplete
 *                    results, or both of one scan.
 *
 * @returns One line per rule.
 *
 * @example
 * ```ts
 * sumResFun(axeResObj.violations) // => [ 'color-contrast (serious): ...' ]
 * ```
 *
*/

function sumResFun ( resLisArr : AxeResTyp[ 'violations' ] ) : string[] {


	return resLisArr.map( ( resCurObj ) => `${ resCurObj.id } (${ resCurObj.impact || 'no impact' }): ${ resCurObj.help } at ${ resCurObj.nodes.map( ( nodCurObj ) => nodCurObj.target.join( ' ' ) ).join( ', ' ) }` ); // What: Result Lines Return. Why: A failure should say what broke and where without opening the report. How: This joins each rule's ID, impact, help, and flagged selectors into one line.


}

// #endregion sumResFun



// #region cheAxeFun

/**
 * cheAxeFun = Check Axe Function
 *
 * @summary
 * Scans the page with {@link scaStaFun}, attaches each result axe couldn't
 * decide to the test as a "needs review" annotation and prints them under the
 * project's and the state's names, then returns the violations and any
 * incomplete bypass result as summary lines, empty when the page passes. A
 * bypass result means axe found no way past the bar, which the skip link on
 * every page should give it. It expects the state already open and settled.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to scan.
 * @param tesInfObj - Test Info Object: The running test, which the review
 *                    lines are attached to.
 * @param staIdeStr - State Identifier String: The state's name, printed
 *                    beside its review lines.
 *
 * @returns A promise that resolves with one line per violation or bypass
 *          result.
 *
 * @example
 * ```ts
 * cheAxeFun(page, testInfo, 'contact-phone-sent') // => []
 * ```
 *
*/

async function cheAxeFun ( curPagObj : Page, tesInfObj : TestInfo, staIdeStr : string ) : Promise< string[] > {


	const axeResObj = await scaStaFun( curPagObj );      // What: Axe Result Object. Why: Both the violations and the incomplete results come from one scan. How: This scans the page.
	const revLinArr = sumResFun( axeResObj.incomplete ); // What: Review Line Array. Why: Results axe couldn't decide need a person's look. How: This summarizes them.


	for ( const revLinStr of revLinArr ) tesInfObj.annotations.push( { description : revLinStr, type : 'needs review' } ); // What: Review Annotations Loop. Why: The report should list each result needing review beside its test. How: This attaches each line as an annotation.



	if ( revLinArr.length ) console.log( `[${ tesInfObj.project.name }] ${ staIdeStr } needs review:\n  ${ revLinArr.join( '\n  ' ) }` ); // What: Review Log Call. Why: The terminal run should show what needs a look without opening the report. How: This prints the state's review lines under its project and name.



	return sumResFun( [ ...axeResObj.violations, ...axeResObj.incomplete.filter( ( resCurObj ) => resCurObj.id === 'bypass' ) ] ); // What: Failure Lines Return. Why: The spec fails on any violation, and with a skip link on every page a bypass result left for review is a real problem rather than one to look at by hand. How: This summarizes the violations together with any incomplete bypass result.


}

// #endregion cheAxeFun

// #endregion Helpers



// #region Exports

export { cheAxeFun }; // What: Named Export. Why: The accessibility specs share one axe check. How: This exports cheAxeFun.

// #endregion Exports


