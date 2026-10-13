


/**
 * page-links.ts = Page Links
 *
 * @summary
 * The site's pages in the order the bar, the phone menu, and the footer link
 * to them, so a page added or renamed changes in one place.
 *
 * Sections:
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

type PagLinTyp = { labStr : string, patStr : string }; // What: Page Link Type. Why: Every link names its page and where it goes. How: This holds the link's label and its route.

const PAG_LIN_ARR : PagLinTyp[] = [ // What: Page Link Array. Why: The bar, the phone menu, and the footer all link to the same pages in the same order. How: Each row names a page's label and route.


	{ labStr : 'Home',    patStr : '/'        }, // What: Home Link Row. Why: Every page links back to the home page. How: This routes to the root path.
	{ labStr : 'Work',    patStr : '/work'    }, // What: Work Link Row. Why: The project portfolio is the site's main content. How: This routes to the Work page.
	{ labStr : 'About',   patStr : '/about'   }, // What: About Link Row. Why: A visitor can read who built the projects. How: This routes to the About page.
	{ labStr : 'Contact', patStr : '/contact' }  // What: Contact Link Row. Why: A visitor can get in touch. How: This routes to the Contact page.


];

// #endregion Constants



// #region Exports

export { PAG_LIN_ARR }; // What: Named Exports. Why: The bar and the footer render their links from this list. How: This exports the list.

// #endregion Exports


