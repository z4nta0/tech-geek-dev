


// #region Imports

import { expect    } from '@playwright/test';     // What: Expect. Why: Each width passes only when every card grid keeps its rows. How: This asserts the problem list is empty.
import { opeStaFun } from '../support/states.ts'; // What: Open State Function. Why: Each width is measured settled. How: This loads the page and waits for it.
import { test      } from '@playwright/test';     // What: Test. Why: Each page at each width is its own test. How: This declares them.

// #endregion Imports



/**
 * grids.spec.ts = Grids Spec
 *
 * @summary
 * Checks the Card Grids rule on every page with a grid of cards, in whichever
 * engine the project runs: at each width, a grid's visible cards are grouped
 * into rows by where their tops land, and every row has to hold the same
 * number of cards. Work's project grid follows the project's own exception
 * instead, since its cards change with the filter: every row but the last is
 * full, and a short last row sits centered, the room left of its first card
 * within 2px of the room right of its last, measured against the grid's own
 * content box. It's checked under every filter. The widths are the
 * responsive suite's, a pixel either side of each breakpoint included, since
 * a grid changes its column count there. A wrapping row of tags, such as
 * each skill group's technologies, isn't a grid of cards, so only the groups
 * themselves are checked.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Helpers
 *  - Module Init
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type GriCasTyp = { // What: Grid Case Type. Why: Each grid is found and judged the same way. How: This names the grid, its page, its module classes, and how its rows are judged.


	cenBoo : boolean, // What: Centered Boolean. Why: Work's project grid may leave a short last row, which has to sit centered. How: This is true for that grid, and false for every grid that keeps even rows.
	chiStr : string,  // What: Child String. Why: A grid can hold more than cards, such as the arrows between the process steps. How: This names the cards' module class, or is empty when every child is a card.
	filBoo : boolean, // What: Filter Boolean. Why: Only a grid the page's filter changes needs checking under each filter. How: This is true for that grid.
	griStr : string,  // What: Grid String. Why: The grid is found by its module class, whose hashed name keeps the source name between underscores. How: This names that class.
	ideStr : string,  // What: Identifier String. Why: A problem should name the grid in plain words. How: This opens each of its problem entries.
	pagStr : string   // What: Page String. Why: Each test opens one page and checks the grids on it. How: This names the page's case.


};

// #endregion Types



// #region Constants

const GRI_CAS_ARR : GriCasTyp[] = [ // What: Grid Case Array. Why: Every grid of cards on the site is checked the same way. How: Each row names a grid, its page, its module classes, and how its rows are judged, in markup order.


	{ cenBoo : false, chiStr : '',          filBoo : false, griStr : 'staGriDiv', ideStr : 'stats',             pagStr : 'home'  }, // What: Stats Grid Case. Why: The four figures are equal tiles, four in a row, then two by two at 1,024px and below. How: This checks every row holds the same number.
	{ cenBoo : false, chiStr : '',          filBoo : false, griStr : 'proGriDiv', ideStr : 'featured projects', pagStr : 'home'  }, // What: Featured Projects Grid Case. Why: Home always picks four featured projects, set two by two, then one column at 640px and below. How: This checks every row holds the same number.
	{ cenBoo : false, chiStr : '',          filBoo : false, griStr : 'serGriDiv', ideStr : 'services',          pagStr : 'home'  }, // What: Services Grid Case. Why: The four service cards step through four, two, and one columns. How: This checks every row holds the same number.
	{ cenBoo : false, chiStr : '',          filBoo : false, griStr : 'skiGriDiv', ideStr : 'skills',            pagStr : 'about' }, // What: Skills Grid Case. Why: The four skill groups are cards of their own, while the tags inside them aren't. How: This checks the groups' rows hold the same number.
	{ cenBoo : false, chiStr : '',          filBoo : false, griStr : 'valGriDiv', ideStr : 'values',            pagStr : 'about' }, // What: Values Grid Case. Why: The four value cards step through four, two, and one columns. How: This checks every row holds the same number.
	{ cenBoo : true,  chiStr : '',          filBoo : true,  griStr : 'proGriDiv', ideStr : 'projects',          pagStr : 'work'  }, // What: Projects Grid Case. Why: Work's project grid changes with the filter, so its project-level exception allows a short last row, centered. How: This checks the full rows and the last row's centering under every filter.
	{ cenBoo : false, chiStr : 'steCarDiv', filBoo : false, griStr : 'prcSteDiv', ideStr : 'process steps',     pagStr : 'work'  }  // What: Process Steps Grid Case. Why: The four steps sit in a row, two by two at 1,024px and below, and stacked at 768px and below, with arrows between them in a row or a stack. How: This checks the step cards' rows hold the same number, leaving the arrows out.


];



type PagCasTyp = { ideStr : string, patStr : string }; // What: Page Case Type. Why: Each test opens one page. How: This names the page and its path.

const PAG_CAS_ARR : PagCasTyp[] = [ // What: Page Case Array. Why: Only the pages holding a grid of cards are opened. How: Each row names a page and its path.


	{ ideStr : 'home',  patStr : '/'      }, // What: Home Case. Why: The home page holds the stats, featured projects, and services grids. How: This opens the home page.
	{ ideStr : 'about', patStr : '/about' }, // What: About Case. Why: The About page holds the skills and values grids. How: This opens the About page.
	{ ideStr : 'work',  patStr : '/work'  }  // What: Work Case. Why: The Work page holds the project grid and the process steps. How: This opens the Work page.


];



const WID_LIS_ARR = [ 320, 360, 390, 414, 480, 640, 641, 768, 769, 1024, 1025, 1280, 1440, 1920 ]; // What: Width List Array. Why: A grid changes its column count at the breakpoints. How: This lists the responsive suite's widths, the site's 640px, 768px, and 1,024px breakpoints and the pixel past each included.

// #endregion Constants



// #region Helpers

type GriArgTyp = { casArr : GriCasTyp[], filStr : string, widStr : string }; // What: Grid Argument Type. Why: The page function can't read this file, so it takes what it checks as its argument. How: This names the grids to check, the filter in use, and the width for the problem entries.

// #region griProFun

/**
 * griProFun = Grid Problems Function
 *
 * @summary
 * Runs inside the page and returns a problem for each grid whose rows break
 * the Card Grids rule. Each grid is found by its module class, and its
 * visible cards (every child, or only those with the case's card class) are
 * grouped into rows by their rounded tops. A grid that keeps even rows fails
 * when any two rows hold different numbers of cards. A centered grid fails
 * when a row before the last holds fewer cards than the fullest row, or when
 * the room left of its last row differs by more than 2px from the room right
 * of it, measured inside the grid's padding. A missing grid or one with no
 * visible cards is a problem too. Passed to Playwright's evaluate, so it
 * reads its grids from its argument rather than from this file.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param griArgObj - Grid Argument Object: {@link GriArgTyp}
 *
 * @returns Every grid problem found.
 * @see {@link proLisArr}
 *
 * @example
 * ```ts
 * page.evaluate(griProFun, griArgObj) // => [ 'services grid ...' ]
 * ```
 *
*/

function griProFun ( griArgObj : GriArgTyp ) : string[] {


	const proLisArr : string[] = []; // What: Problem List Array. Why: Every grid's problems should be reported, not just the first. How: This collects them.


	for ( const griCasObj of griArgObj.casArr ) { // What: Grid Loop. Why: Every grid named for the page is checked. How: This judges each in turn.


		const griCurEle = document.querySelector( `[class*="_${ griCasObj.griStr }_"]` ); // What: Grid Current Element. Why: The grid's rows are measured from its cards. How: This finds the grid by the source name inside its hashed module class.


		if ( !griCurEle ) { proLisArr.push( `${ griCasObj.ideStr } grid is missing` ); continue; } // What: Missing Grid Guard. Why: A grid that can't be found can't keep its rows, and the check shouldn't pass by finding nothing. How: This records it and moves to the next grid.



		const chiSelStr = griCasObj.chiStr ? `[class*="_${ griCasObj.chiStr }_"]` : '*';                                                                         // What: Child Selector String. Why: Only the grid's cards count toward its rows. How: This matches the card class when the case names one, or any child otherwise.
		const carEleArr = [ ...griCurEle.querySelectorAll( `:scope > ${ chiSelStr }` ) ].filter( ( carCurEle ) => carCurEle.getBoundingClientRect().width > 0 ); // What: Card Element Array. Why: A hidden child takes no place in a row. How: This keeps the grid's matching children that have width.


		if ( !carEleArr.length ) { proLisArr.push( `${ griCasObj.ideStr } grid has no visible cards` ); continue; } // What: Empty Grid Guard. Why: A grid with no cards would pass without being checked. How: This records it and moves to the next grid.



		const rowTopMap = new Map< number, DOMRect[] >(); // What: Row Top Map. Why: Cards in one row share a top. How: This groups each card's box under its rounded top.


		for ( const carCurEle of carEleArr ) { // What: Card Loop. Why: Every card belongs to one row. How: This files each card's box under its row.


			const carRecObj = carCurEle.getBoundingClientRect(); // What: Card Rect Object. Why: A card's row and edges come from its box. How: This measures it.
			const rowTopNum = Math.round( carRecObj.top );       // What: Row Top Number. Why: Cards in one row can differ by a fraction of a pixel. How: This rounds the card's top to a whole pixel.


			rowTopMap.set( rowTopNum, [ ...( rowTopMap.get( rowTopNum ) ?? [] ), carRecObj ] ); // What: Row Add Call. Why: The card joins the row at its top. How: This appends its box to that row's list.


		}



		const labGriStr = `${ griCasObj.ideStr } grid${ griCasObj.filBoo ? ` under "${ griArgObj.filStr }"` : '' } at ${ griArgObj.widStr }`;                          // What: Label Grid String. Why: A problem should say which grid, filter, and width it appeared at. How: This names the grid, the filter for a grid the filter changes, and the width.
		const rowRecArr = [ ...rowTopMap.entries() ].sort( ( oneEntArr, twoEntArr ) => oneEntArr[ 0 ] - twoEntArr[ 0 ] ).map( ( rowEntArr ) => rowEntArr[ 1 ] );       // What: Row Rect Array. Why: Rows are judged from top to bottom, the last one by its place. How: This lists each row's card boxes, ordered by their top.
		const rowCouArr = rowRecArr.map( ( rowCurArr ) => rowCurArr.length );                                                                                          // What: Row Count Array. Why: The rule compares how many cards each row holds. How: This counts each row's cards.
		const fulCouArr = griCasObj.cenBoo ? rowCouArr.slice( 0, -1 ) : rowCouArr;                                                                                     // What: Full Count Array. Why: Every row of an even grid has to be full, while a centered grid's last row may be short. How: This keeps every row's count, or every count but the last for a centered grid.
		const maxCouNum = Math.max( ...rowCouArr ); // What: Maximum Count Number. Why: A full row holds as many cards as the fullest row. How: This finds the most cards any row holds.
		const rowLisStr = rowCouArr.length > 2 ? `${ rowCouArr.slice( 0, -1 ).join( ', ' ) }, and ${ rowCouArr[ rowCouArr.length - 1 ] }` : rowCouArr.join( ' and ' ); // What: Row List String. Why: A problem should read as a phrase. How: This joins the counts with commas and "and".


		if ( fulCouArr.some( ( rowCouNum ) => rowCouNum !== maxCouNum ) ) proLisArr.push( `${ labGriStr } has rows of ${ rowLisStr }` ); // What: Full Row Check. Why: A row short of the others breaks the Card Grids rule, apart from the centered grid's last row. How: This records the row counts when a row that has to be full isn't.



		if ( !griCasObj.cenBoo ) continue; // What: Even Grid Guard. Why: Only the centered grid's last row is checked for centering. How: This moves on from every grid that keeps even rows.



		const griRecObj = griCurEle.getBoundingClientRect();                                                                    // What: Grid Rect Object. Why: The last row is centered within the grid. How: This measures the grid's box.
		const griStyObj = getComputedStyle( griCurEle );                                                                        // What: Grid Style Object. Why: The grid's padding sits outside its content box. How: This reads its computed styles.
		const conLefNum = griRecObj.left + griCurEle.clientLeft + parseFloat( griStyObj.paddingLeft );                          // What: Content Left Number. Why: The room left of the row is measured from the content box's edge. How: This is the grid's left edge inside its border and padding.
		const conRigNum = griRecObj.left + griCurEle.clientLeft + griCurEle.clientWidth - parseFloat( griStyObj.paddingRight ); // What: Content Right Number. Why: The room right of the row is measured to the content box's edge. How: This is the grid's right edge inside its border and padding.
		const lasRowArr = rowRecArr[ rowRecArr.length - 1 ];                                                                    // What: Last Row Array. Why: Only the last row may be short, so its centering is what's checked. How: This holds its card boxes.
		const lefSpaNum = Math.min( ...lasRowArr.map( ( carRecObj ) => carRecObj.left ) ) - conLefNum;                          // What: Left Space Number. Why: A centered row leaves the same room on each side. How: This measures the room left of the row's first card.
		const rigSpaNum = conRigNum - Math.max( ...lasRowArr.map( ( carRecObj ) => carRecObj.right ) );                         // What: Right Space Number. Why: A centered row leaves the same room on each side. How: This measures the room right of the row's last card.


		if ( Math.abs( lefSpaNum - rigSpaNum ) > 2 ) proLisArr.push( `${ labGriStr } has its last row ${ Math.round( lefSpaNum ) }px from the left and ${ Math.round( rigSpaNum ) }px from the right` ); // What: Centered Row Check. Why: A short last row has to sit centered under the project-level exception. How: This records the two rooms when they differ by more than 2px.


	}



	return proLisArr; // What: Problem List Return. Why: The test prints whatever was found. How: This hands back every problem collected.


}

// #endregion griProFun

// #endregion Helpers



// #region Module Init

for ( const pagCasObj of PAG_CAS_ARR ) { // What: Page Loop. Why: Every page with a grid of cards is checked. How: This declares each page's tests.


	const griCasArr = GRI_CAS_ARR.filter( ( griCasObj ) => griCasObj.pagStr === pagCasObj.ideStr ); // What: Grid Case Array. Why: Each test checks only the grids on its page. How: This keeps the rows naming the page.


	for ( const widCurNum of WID_LIS_ARR ) { // What: Width Loop. Why: A grid's rows change with the width. How: This declares one test per width.


		test( `${ pagCasObj.ideStr } card grids keep their rows at ${ widCurNum.toLocaleString( 'en-US' ) }px`, async ( { page : curPagObj } ) => { // What: Grid Rows Test. Why: Every grid of cards should keep its rows at every width. How: This opens the page at the width, then checks its grids, under each filter where a grid has one.


			await curPagObj.emulateMedia( { reducedMotion : 'reduce' } ); // What: Reduced Motion Emulation. Why: Entrance animations don't change the rows, so waiting on them only slows the run. How: This makes the page match prefers-reduced-motion, which turns them off.

			await opeStaFun( curPagObj, { heiNum : 900, ideStr : pagCasObj.ideStr, patStr : pagCasObj.patStr, widNum : widCurNum } ); // What: Page Open Call. Why: The rows are measured settled. How: This opens the page's path at the width, with the same height for every width.


			const filNamArr = griCasArr.some( ( griCasObj ) => griCasObj.filBoo ) ? await curPagObj.locator( '[class*="_filOptBut_"]' ).allTextContents() : [ '' ]; // What: Filter Name Array. Why: A grid the filter changes has to keep its rows under every filter. How: This reads every filter button's words on a page with such a grid, starting with "All", or holds one empty name for no filtering.
			const widLabStr = `${ widCurNum.toLocaleString( 'en-US' ) }px`;                                                                                         // What: Width Label String. Why: A problem should say its width the way a person reads it. How: This writes the width with a thousands separator.

			const proAllArr : string[] = []; // What: Problem All Array. Why: Every filter's problems should be reported together. How: This collects them.


			for ( const [ filIndNum, filNamStr ] of filNamArr.entries() ) { // What: Filter Loop. Why: Each filter can change a grid's cards. How: This chooses each filter in turn and checks the grids.


				if ( filNamStr ) await curPagObj.locator( '[class*="_filOptBut_"]' ).nth( filIndNum ).dispatchEvent( 'click' ); // What: Filter Click Call. Why: The grid has to be checked with the filter chosen. How: This clicks the filter's button, sent straight to it, since the row scrolls sideways on phones and its button can sit under the bar.



				await curPagObj.evaluate( () => new Promise( ( resFun ) => requestAnimationFrame( () => requestAnimationFrame( resFun ) ) ) ); // What: Two Frame Wait. Why: The filtered cards should be drawn before they're measured. How: This waits two animation frames.


				const casCurArr = filIndNum ? griCasArr.filter( ( griCasObj ) => griCasObj.filBoo ) : griCasArr; // What: Case Current Array. Why: A grid the filter doesn't change only needs checking once. How: This holds every grid on the first pass and only the grids the filter changes after it.


				proAllArr.push( ...await curPagObj.evaluate( griProFun, { casArr : casCurArr, filStr : filNamStr, widStr : widLabStr } ) ); // What: Problem Record Call. Why: Each filter's problems join the test's list. How: This checks the pass's grids with the filter and width they're reported under.


			}



			expect( proAllArr ).toEqual( [] ); // What: No Grid Problems Assertion. Why: The width passes only when every grid keeps its rows. How: This compares the problems with an empty list, so a failure prints each one.


		} );


	}


}

// #endregion Module Init


