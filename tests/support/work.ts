



// #region Imports

import { expect      } from '@playwright/test'; // What: Expect. Why: The filtered state is ready only once the grid has narrowed. How: This waits until it has.
import { STA_REC_ARR } from './states.ts';      // What: State Record Array. Why: The filtered states reuse the Work page's phone and desktop states. How: This lists every state, from which the Work ones are picked.


import type { Page      } from '@playwright/test'; // What: Page. Why: Choosing a filter drives a Playwright page. How: This types the filter action's page parameter.
import type { StaRecTyp } from './states.ts';      // What: State Record Type. Why: The filtered states are opened like any other state. How: This types the filtered state list.

// #endregion Imports



/**
 * work.ts = Work
 *
 * @summary
 * The Work page's filtered states, for the suites that check every state a
 * visitor can reach: the project grid narrowed to GSAP, the filter with the
 * fewest projects, at the Work page's phone and desktop widths. They're kept
 * out of the shared state list, since the rendering suite captures every state
 * there against a baseline.
 *
 * Sections:
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const FIL_STA_ARR : StaRecTyp[] = STA_REC_ARR.filter( ( staRecObj ) => staRecObj.patStr === '/work' ).map( ( staRecObj ) => ( { // What: Filtered State Array. Why: A chosen filter changes the grid and its count, so it's a state of its own. How: For each Work state, this copies the state, chooses GSAP in its action, and names it after the state.


	...staRecObj, // What: State Record Spread. Why: The filtered state keeps the Work state's path and viewport. How: This copies the row.

	ideStr : `${ staRecObj.ideStr }-filtered`, // What: Identifier String. Why: Each test names its width and the filter. How: This adds filtered to the Work state's name, such as work-desktop-filtered.

	actFun : async ( curPagObj : Page ) => { // What: Action Function. Why: The state shows the grid narrowed by a filter. How: This presses "GSAP" and waits until one card remains.


		await curPagObj.getByRole( 'button', { exact : true, name : 'GSAP' } ).click(); // What: Filter Click Call. Why: GSAP narrows the grid to one card, the filter with the fewest. How: This presses its pill.

		await expect( curPagObj.locator( 'article' ) ).toHaveCount( 1 ); // What: Narrowed Grid Assertion. Why: The checks read the page only once the filter has applied. How: This waits until one card remains.


	}


} ) );

// #endregion Constants



// #region Exports

export { FIL_STA_ARR }; // What: Named Export. Why: The suites that check every reachable state share the filtered states. How: This exports the filtered state list.

// #endregion Exports


