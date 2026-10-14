


// #region Imports

import { useEffect } from 'react'; // What: Use Effect. Why: The description has to change after the page renders and change back when it leaves. How: This runs the swap and its cleanup.

// #endregion Imports



/**
 * page-description.ts = Page Description
 *
 * @summary
 * The hook a page calls to show its own search description. index.html
 * carries one description tag holding the home page's, since link checkers
 * and crawlers that never run the site's script read that file alone. React
 * would add a page's own description beside it rather than replace it, so
 * instead a page with a description of its own swaps the one tag's text
 * while it's showing and puts it back when it leaves, keeping a single
 * description at all times.
 *
 * Sections:
 *  - Hooks
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Hooks

// #region usePagDesFun

/**
 * usePagDesFun = Use Page Description Function
 *
 * @summary
 * Sets the content of index.html's description tag to the given text once the
 * page has rendered, and restores whatever it held before when the page
 * leaves, so the home page's description returns on every other page. Pages
 * whose description is index.html's own, and pages kept out of search, don't
 * call it.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param desTexStr - Description Text String: The page's description, 100 to
 *                    125 characters.
 *
 * @returns This function does not return anything.
 *
 * @example
 * ```ts
 * usePagDesFun('Websites and web apps z4nta0 has designed...') // => void
 * ```
 *
*/

function usePagDesFun ( desTexStr : string ) : void {


	useEffect( () => { // What: Description Swap Effect. Why: The page's description should show only while the page does. How: This sets the tag's text and hands back a cleanup that restores it.


		const desMetEle = document.querySelector< HTMLMetaElement >( 'meta[name="description"]' )!; // What: Description Meta Element. Why: The one description tag is the one changed. How: This finds it in the head. // What: Non-Null Note. Why: TypeScript can't see the tag exists. How: index.html always carries it.
		const preConStr = desMetEle.content;                                                        // What: Previous Content String. Why: The tag has to read as before once the page leaves. How: This keeps its current text.


		desMetEle.content = desTexStr; // What: Description Content Assignment. Why: The page shows its own description. How: This sets the tag's text.



		return () => { desMetEle.content = preConStr; }; // What: Description Restore Cleanup. Why: The next page should find the description as it was. How: This puts the earlier text back.


	}, [ desTexStr ] ); // What: Effect Dependency Array. Why: The swap has to follow the description it shows. How: desTexStr changing reruns the effect, restoring the old text and setting the new.


}

// #endregion usePagDesFun

// #endregion Hooks



// #region Exports

export { usePagDesFun }; // What: Named Exports. Why: A page with a description of its own calls the hook. How: This exports usePagDesFun.

// #endregion Exports


