


// #region Imports

import { cheAxeFun   } from '../support/axe.ts';    // What: Check Axe Function. Why: Every state is scanned with the shared axe check. How: This scans the page, reports anything needing review, and returns the violations.
import { expect      } from '@playwright/test';     // What: Expect. Why: A state passes only with no violations. How: This asserts the violation list is empty.
import { opeStaFun   } from '../support/states.ts'; // What: Open State Function. Why: Each state has to be opened and settled before it's scanned. How: This loads it and waits for it.
import { STA_REC_ARR } from '../support/states.ts'; // What: State Record Array. Why: Every page state is scanned. How: This lists them.
import { test        } from '@playwright/test';     // What: Test. Why: Each state is its own test. How: This declares them.

// #endregion Imports



/**
 * axe.spec.ts = Axe Spec
 *
 * @summary
 * Scans every page state with axe-core against WCAG 2.2 A and AA plus axe's
 * best-practice rules, in whichever engine the project runs. A state passes
 * only with zero violations, and each failure names its rule, its impact,
 * and the elements it found. Anything axe can't decide on its own (its
 * "incomplete" results, such as text over an image) can't fail the run, so
 * it's printed and attached to the test as needing review by hand.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



for ( const staRecObj of STA_REC_ARR ) { // What: State Test Loop. Why: Every page state must pass the scan. How: This declares one axe test per state.


	test( `${ staRecObj.ideStr } has no axe violations`, async ( { page : curPagObj }, tesInfObj ) => { // What: Axe Test. Why: A state passes only with zero axe violations. How: This opens the state, scans it, reports anything needing review, and fails on any violation.


		await opeStaFun( curPagObj, staRecObj ); // What: State Open Call. Why: The scan should see the state settled. How: This loads and settles it.

		expect( await cheAxeFun( curPagObj, tesInfObj, staRecObj.ideStr ) ).toEqual( [] ); // What: No Violations Assertion. Why: The state passes only with zero violations. How: This scans the page and compares its summarized violations with an empty list, so a failure prints each one.


	} );


}


