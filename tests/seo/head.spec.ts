


// #region Imports

import { expect } from '@playwright/test'; // What: Expect. Why: Each check passes only when the page says what it should. How: This asserts on the page's head, its links, and the crawler files.
import { test   } from '@playwright/test'; // What: Test. Why: Each page and each file is its own test. How: This declares them.


import type { Page } from '@playwright/test'; // What: Page. Why: The head helper reads a Playwright page. How: This types its page parameter.

// #endregion Imports



/**
 * head.spec.ts = Head Spec
 *
 * @summary
 * Checks the site's SEO setup in whichever engine the project runs. Home,
 * Work, About, and Contact are all indexed: each has its own title, a
 * description of 100 to 125 characters, and one canonical address on this
 * domain, while the 404 page carries noindex and no canonical link. Every page
 * has exactly one description, index.html's, which Work, About, and Contact
 * swap for their own, names z4nta0 as its author, and has one h1, and moving
 * between pages swaps the tags rather than piling them up. The raw page, read
 * without running the site's script the way link checkers read it, carries the
 * home page's full title and description. The structured data describes z4nta0
 * as a Person, with the GitHub and LinkedIn profiles the footer links to and
 * the email the Contact page offers, and this domain as a WebSite z4nta0
 * wrote. The social preview tags are complete, use absolute addresses, and
 * match the home page's title and description; the card they point at is a
 * 1,200x630 PNG under 300 KB; and every icon the head links to is served, the
 * PNGs at the size their links promise. robots.txt lets every crawler in and
 * names the sitemap, which lists the four indexed pages. Adapted from
 * the-bernie-bears.
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

const HOM_DES_STR = 'Portfolio of z4nta0, a full stack web developer building fast, accessible websites and web apps for small businesses.'; // What: Home Description String. Why: The raw page and the social tags carry the home page's description. How: This is the exact text they should hold.
const LIV_URL_STR = 'https://techgeek.dev/';                                                                                                 // What: Live URL String. Why: The canonical links, structured data, social tags, and sitemap all name the live site. How: This is its address.



// #region PAG_HEA_ARR

/**
 * PAG_HEA_ARR = Page Head Array
 *
 * @summary
 * What each page's head should say. Every row shares one shape, so its fields
 * carry no comments of their own:
 * - `canStr` (String or null): Canonical String, the page's canonical
 *   address, or null for a page that carries noindex and no canonical link.
 * - `patStr` (String): Path String, the address the page is loaded from.
 * - `titStr` (String): Title String, the page's exact title.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const PAG_HEA_ARR = [ // What: Page Head Array. Why: Every page's head is checked against what it should say. How: Each row names one page, its title, and its canonical address or null.


	{ canStr : LIV_URL_STR,               patStr : '/',             titStr : 'z4nta0, Full Stack Web Developer Portfolio | TechGeek.dev' },
	{ canStr : `${ LIV_URL_STR }work`,    patStr : '/work',         titStr : 'Projects & Case Studies | TechGeek.dev'                    },
	{ canStr : `${ LIV_URL_STR }about`,   patStr : '/about',        titStr : 'About z4nta0, Full Stack Web Developer | TechGeek.dev'     },
	{ canStr : `${ LIV_URL_STR }contact`, patStr : '/contact',      titStr : 'Contact z4nta0 About Your Project | TechGeek.dev'          },
	{ canStr : null,                      patStr : '/no-such-page', titStr : 'Page Not Found | TechGeek.dev'                             }


];

// #endregion PAG_HEA_ARR



// #region SOC_KEY_ARR

/**
 * SOC_KEY_ARR = Social Key Array
 *
 * @summary
 * Every Open Graph and Twitter tag key a complete social preview card needs,
 * per the social preview rule; twitter:site is left out, since the site has
 * no X account. Every row is one tag key the home page must carry, so no row
 * needs a comment of its own.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const SOC_KEY_ARR = [ // What: Social Key Array. Why: The social preview rule lists every tag a complete card needs. How: Each entry names one Open Graph or Twitter tag the page must carry.


	'og:description',
	'og:image',
	'og:image:alt',
	'og:image:height',
	'og:image:type',
	'og:image:width',
	'og:locale',
	'og:site_name',
	'og:title',
	'og:type',
	'og:url',
	'twitter:card',
	'twitter:description',
	'twitter:image',
	'twitter:image:alt',
	'twitter:title'


];

// #endregion SOC_KEY_ARR

// #endregion Constants



// #region Helpers

// #region heaCheFun

/**
 * heaCheFun = Head Check Function
 *
 * @summary
 * Checks that the page showing now has the head its row describes: its exact
 * title, exactly one description, z4nta0 as author, and one h1. A page
 * with a canonical address has that one canonical link, a description of 100
 * to 125 characters, and no robots tag; a page without one has a noindex
 * robots tag and no canonical link. Counting the tags also catches a
 * navigation that left the previous page's tags behind.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param curPagObj - Current Page Object: The page to check.
 * @param heaRowObj - Head Row Object: The page's row from PAG_HEA_ARR.
 *
 * @returns A promise that settles once every check has passed, with no
 *          value.
 *
 * @example
 * ```ts
 * heaCheFun(page, PAG_HEA_ARR[0]) // => Promise<void>
 * ```
 *
*/

async function heaCheFun ( curPagObj : Page, heaRowObj : typeof PAG_HEA_ARR[ number ] ) : Promise< void > {


	await expect( curPagObj ).toHaveTitle( heaRowObj.titStr ); // What: Title Assertion. Why: Search listings and tabs name the page by its title. How: This waits for the page's own title.

	expect( heaRowObj.titStr.length ).toBeLessThanOrEqual( 60 ); // What: Title Length Assertion. Why: Search listings and link cards cut long titles off. How: This keeps it to 60 characters.

	await expect( curPagObj.locator( 'meta[name="author"]' ) ).toHaveAttribute( 'content', 'z4nta0' ); // What: Author Assertion. Why: The site names z4nta0, who built and owns it, as its author. How: This checks the author tag.

	await expect( curPagObj.locator( 'meta[name="description"]' ) ).toHaveCount( 1 ); // What: Single Description Assertion. Why: Two descriptions leave search engines to guess. How: This checks there's exactly one, index.html's, on every page.

	await expect( curPagObj.getByRole( 'heading', { level : 1 } ) ).toHaveCount( 1 ); // What: Single Heading Assertion. Why: One h1 tells search engines and screen readers what the page is about. How: This checks there's exactly one.



	if ( heaRowObj.canStr === null ) { // What: Noindex Page Branch. Why: The 404 page must stay out of search results. How: This checks for the noindex tag and the absence of the indexed pages' tags.


		await expect( curPagObj.locator( 'meta[name="robots"]' ) ).toHaveAttribute( 'content', 'noindex' ); // What: Noindex Assertion. Why: Search engines must leave the page out. How: This checks the one robots tag says noindex.

		await expect( curPagObj.locator( 'link[rel="canonical"]' ) ).toHaveCount( 0 ); // What: No Canonical Assertion. Why: A page kept out of search has no use for a canonical address, and one left over from the previous page would contradict it. How: This checks there's none.


	}

	else { // What: Indexed Page Branch. Why: Home, Work, About, and Contact have to be findable and described. How: This checks their one description and canonical link, and that nothing keeps them out.


		const desConStr = await curPagObj.locator( 'meta[name="description"]' ).getAttribute( 'content' ) ?? ''; // What: Description Content String. Why: The description's length is checked against what listings show. How: This reads the one description's text.


		expect( desConStr.length ).toBeGreaterThanOrEqual( 100 ); // What: Description Minimum Assertion. Why: A summary that's too short wastes the space a listing gives it. How: This checks it runs at least 100 characters.

		expect( desConStr.length ).toBeLessThanOrEqual( 125 ); // What: Description Maximum Assertion. Why: Phones cut a summary off around 125 characters. How: This checks it stays within that.

		await expect( curPagObj.locator( 'link[rel="canonical"]' ) ).toHaveCount( 1 ); // What: Single Canonical Assertion. Why: Two canonical links leave search engines to guess. How: This checks there's exactly one.

		await expect( curPagObj.locator( 'link[rel="canonical"]' ) ).toHaveAttribute( 'href', heaRowObj.canStr ); // What: Canonical Assertion. Why: Every address Netlify serves the page at should count as its live one. How: This checks the canonical link names it.

		await expect( curPagObj.locator( 'meta[name="robots"]' ) ).toHaveCount( 0 ); // What: Indexable Assertion. Why: The page has to stay findable. How: This checks it carries no robots tag that could keep it out.


	}


}

// #endregion heaCheFun

// #endregion Helpers



// #region Module Init

for ( const heaRowObj of PAG_HEA_ARR ) { // What: Page Head Loop. Why: Every page's head is checked when it's loaded directly, as a search engine loads it. How: This declares one test per page.


	test( `${ heaRowObj.patStr } has the right head`, async ( { page : curPagObj } ) => { // What: Page Head Test. Why: Each page should say what it is and whether it belongs in search results. How: This loads the page and checks its head.


		await curPagObj.goto( heaRowObj.patStr ); // What: Page Open Call. Why: The check starts on its page. How: This loads it.

		await heaCheFun( curPagObj, heaRowObj ); // What: Head Check Call. Why: The page's head is checked against its row. How: This runs every head check.


	} );


}



test( 'moving between pages swaps their head tags', async ( { page : curPagObj } ) => { // What: Navigation Head Test. Why: React adds and removes each page's tags as visitors move around, and a leftover description or canonical link would mislabel the next page. How: This walks from Home through Work and About to Contact by the footer's links, checking each head.


	await curPagObj.goto( '/' ); // What: Home Open Call. Why: The walk starts on the home page. How: This loads the root path.

	await heaCheFun( curPagObj, PAG_HEA_ARR[ 0 ] ); // What: Home Head Check. Why: The walk starts from a known head. How: This checks Home's.


	for ( const heaRowObj of PAG_HEA_ARR.slice( 1, 4 ) ) { // What: Footer Walk Loop. Why: Each page should take over the head from the one before. How: This follows the footer's link to Work, About, and Contact in turn.


		const linNamStr = heaRowObj.patStr.slice( 1, 2 ).toUpperCase() + heaRowObj.patStr.slice( 2 ); // What: Link Name String. Why: The footer names each page the way its path reads, capitalized. How: This capitalizes the path's first letter and drops its slash.


		await curPagObj.getByRole( 'navigation', { name : 'Footer navigation' } ).getByRole( 'link', { exact : true, name : linNamStr } ).click(); // What: Footer Link Click. Why: Visitors move between pages without reloading. How: This clicks the footer link named after the page's path.

		await expect( curPagObj ).toHaveURL( heaRowObj.patStr ); // What: Destination Assertion. Why: The head is only checked once the new page shows. How: This waits for the address to change.

		await heaCheFun( curPagObj, heaRowObj ); // What: Page Head Check. Why: The previous page's tags must be gone and this page's in place. How: This checks its head.

		await expect( curPagObj.locator( 'meta[name="description"]' ) ).not.toHaveAttribute( 'content', HOM_DES_STR ); // What: Own Description Assertion. Why: Each page should describe itself, not repeat the home page. How: This checks the description changed.


	}


} );



test( 'the structured data describes z4nta0 and matches the pages', async ( { page : curPagObj } ) => { // What: Structured Data Test. Why: Search engines may show z4nta0's details from the JSON-LD, so every claim has to match what the pages show. How: This reads the data and checks the person, the site, the profiles, and the email against the pages.


	await curPagObj.goto( '/' ); // What: Home Open Call. Why: The profiles in the data have to be the ones the footer links to. How: This loads the home page.


	const ldjTexStr = await curPagObj.locator( 'script[type="application/ld+json"]' ).textContent() ?? '{}'; // What: Linked-Data-JSON Text String. Why: The data is checked as the page serves it. How: This reads the script's text.
	const socHreArr = await curPagObj.getByRole( 'contentinfo' ).locator( 'a[href^="https://"][target="_blank"]' ).evaluateAll( ( ancEleArr ) => ancEleArr.map( ( ancCurEle ) => ancCurEle.getAttribute( 'href' ) ?? '' ) ); // What: Social Href Array. Why: The data's profiles have to be the footer's. How: This reads every outside link the footer opens in a new tab, which are its profiles, leaving out the sister sites, which open in the same tab.


	type LdjNodTyp = { '@id'? : string, '@type'? : string, author? : { '@id' : string }, email? : string, name? : string, sameAs? : string[], url? : string }; // What: Linked-Data-JSON Node Type. Why: The checks read a handful of each node's fields. How: This types the fields they use.

	const ldjGraArr : LdjNodTyp[] = JSON.parse( ldjTexStr )[ '@graph' ] ?? []; // What: Linked-Data-JSON Graph Array. Why: The person and the site are separate nodes, each checked on its own. How: This parses the text and reads its graph.

	const perNodObj = ldjGraArr.find( ( graNodObj ) => graNodObj[ '@type' ] === 'Person' ) ?? {};  // What: Person Node Object. Why: z4nta0's details are checked together. How: This finds the person node, or an empty object.
	const webNodObj = ldjGraArr.find( ( graNodObj ) => graNodObj[ '@type' ] === 'WebSite' ) ?? {}; // What: WebSite Node Object. Why: This site's details are checked together. How: This finds its node, or an empty object.


	expect( [ perNodObj.name, perNodObj.url, webNodObj.name, webNodObj.url ] ).toEqual( [ 'z4nta0', LIV_URL_STR, 'TechGeek.dev', LIV_URL_STR ] ); // What: Person And Site Assertion. Why: The site is z4nta0's portfolio, never a business's. How: This checks both nodes' names and addresses.

	expect( webNodObj.author?.[ '@id' ] ).toBe( perNodObj[ '@id' ] ); // What: Author Link Assertion. Why: Search engines join the nodes by their ids. How: This checks the site names z4nta0 as its author.

	expect( [ ...( perNodObj.sameAs ?? [] ) ].sort() ).toEqual( [ ...socHreArr ].sort() ); // What: Profiles Assertion. Why: Every profile in the data has to be one the site links to. How: This compares the data's profiles with the footer's outside links.


	await curPagObj.goto( '/contact' ); // What: Contact Open Call. Why: The data's email has to be the one the Contact page offers. How: This loads it.

	await expect( curPagObj.locator( `a[href="mailto:${ perNodObj.email }"]` ).first() ).toBeAttached(); // What: Email Shown Assertion. Why: The email in the data has to be one the site offers. How: This checks the Contact page links to it.


} );



test( 'the raw page carries the home title and description for script-free readers', async ( { request : reqConObj } ) => { // What: Raw Head Test. Why: Link checkers and many crawlers read the page without running the site's script, so the title and description have to be in index.html itself. How: This fetches the root as raw HTML and checks both.


	const rawHtmStr = await ( await reqConObj.get( '/' ) ).text();                                        // What: Raw HTML String. Why: The page is read the way a script-free reader reads it. How: This fetches the root's HTML without a browser.
	const titTexStr = rawHtmStr.match( /<title>([^<]*)<\/title>/ )?.[ 1 ].replace( /&amp;/g, '&' ) ?? ''; // What: Title Text String. Why: The raw title is checked as written. How: This reads the title element's text and decodes its ampersand.


	expect( titTexStr ).toBe( PAG_HEA_ARR[ 0 ].titStr ); // What: Raw Title Assertion. Why: The raw page should name the home page in full, not the bare site name. How: This checks it matches the home page's title.

	expect( titTexStr.length ).toBeGreaterThanOrEqual( 50 ); // What: Raw Title Length Assertion. Why: Checkers flag a title that leaves most of a listing's room unused. How: This checks it runs at least 50 characters.

	expect( rawHtmStr ).toContain( `<meta name='description' content='${ HOM_DES_STR }' />` ); // What: Raw Description Assertion. Why: Checkers and crawlers without the script need a description to show. How: This checks the raw page carries the home page's.


} );



test( 'robots.txt welcomes crawlers and names the sitemap', async ( { request : reqConObj } ) => { // What: Robots File Test. Why: Crawlers read robots.txt before anything else. How: This fetches it and checks its rules and sitemap line.


	const robTexStr = await ( await reqConObj.get( '/robots.txt' ) ).text(); // What: Robots Text String. Why: The file's rules are checked as served. How: This fetches and reads it.


	expect( robTexStr ).toContain( 'User-agent: *\nAllow: /' ); // What: Allow All Assertion. Why: Every crawler may read the site, since the unwanted pages keep themselves out with noindex. How: This checks the one rule group.

	expect( robTexStr ).toContain( `Sitemap: ${ LIV_URL_STR }sitemap.xml` ); // What: Sitemap Line Assertion. Why: Crawlers find the sitemap from this line. How: This checks it names the live sitemap.


} );



test( 'the sitemap lists the four indexed pages', async ( { request : reqConObj } ) => { // What: Sitemap Test. Why: The sitemap should list exactly the indexed pages, by their canonical addresses. How: This fetches it and compares its addresses with the indexed rows.


	const sitXmlStr = await ( await reqConObj.get( '/sitemap.xml' ) ).text(); // What: Sitemap XML String. Why: The file's addresses are checked as served. How: This fetches and reads it.


	expect( [ ...sitXmlStr.matchAll( /<loc>([^<]+)<\/loc>/g ) ].map( ( locMatArr ) => locMatArr[ 1 ] ) ).toEqual( PAG_HEA_ARR.filter( ( heaRowObj ) => heaRowObj.canStr !== null ).map( ( heaRowObj ) => heaRowObj.canStr ) ); // What: Indexed Pages Assertion. Why: Listing a noindex page would contradict it, and missing an indexed page slows its discovery. How: This checks the sitemap's addresses equal the indexed pages' canonical addresses, in order.


} );



test( 'the social preview tags are complete', async ( { page : curPagObj } ) => { // What: Social Tags Test. Why: A link shared anywhere should show a full card that matches the page. How: This loads the home page and checks every social tag, its absolute URLs, and its copy against the page's own title and description.


	await curPagObj.goto( '/' ); // What: Home Load Call. Why: Link scrapers read the page every route shares. How: This opens the home page.


	const socTagArr = await curPagObj.locator( 'meta[property^="og:"], meta[name^="twitter:"]' ).evaluateAll( ( tagEleArr ) => tagEleArr.map( ( tagCurEle ) => [ tagCurEle.getAttribute( 'property' ) || tagCurEle.getAttribute( 'name' ) || '', tagCurEle.getAttribute( 'content' ) || '' ] ) ); // What: Social Tag Array. Why: Every social tag is checked by its key and value. How: This reads each Open Graph and Twitter tag as a key and content pair.
	const socTagObj = Object.fromEntries( socTagArr ); // What: Social Tag Object. Why: Tags are easier to check by key. How: This turns the pairs into an object.


	expect( Object.keys( socTagObj ) ).toEqual( expect.arrayContaining( SOC_KEY_ARR ) ); // What: Complete Tags Assertion. Why: A missing tag leaves part of the card blank. How: This checks every required key is present, allowing optional extras.

	expect( [ socTagObj[ 'og:image' ], socTagObj[ 'og:url' ], socTagObj[ 'twitter:image' ] ] ).toEqual( [ `${ LIV_URL_STR }og-image.png`, LIV_URL_STR, `${ LIV_URL_STR }og-image.png` ] ); // What: Absolute URLs Assertion. Why: Scrapers can't resolve a relative address. How: This checks each URL tag names the live https address.

	expect( [ socTagObj[ 'og:image:type' ], socTagObj[ 'og:image:width' ], socTagObj[ 'og:image:height' ] ] ).toEqual( [ 'image/png', '1200', '630' ] ); // What: Image Facts Assertion. Why: The tags have to describe the file they point at. How: This checks the type and size they give.

	expect( [ socTagObj[ 'og:title' ], socTagObj[ 'twitter:title' ] ] ).toEqual( [ await curPagObj.title(), await curPagObj.title() ] ); // What: Title Match Assertion. Why: A card should name the page the way its tab does. How: This checks both card titles match the page title.

	expect( [ socTagObj[ 'og:description' ], socTagObj[ 'twitter:description' ] ] ).toEqual( Array( 2 ).fill( await curPagObj.locator( 'meta[name="description"]' ).getAttribute( 'content' ) ) ); // What: Description Match Assertion. Why: A card should sum the page up the way its search listing does. How: This checks both card descriptions match the page's description.


} );



test( 'the social preview image is a 1,200x630 PNG under 300 KB', async ( { request : reqConObj } ) => { // What: Preview Image Test. Why: The social tags promise a 1,200x630 card small enough for WhatsApp. How: This fetches the image, checks its byte count, and reads its size from the PNG's header.


	const imaResObj = await reqConObj.get( '/og-image.png' ); // What: Image Response Object. Why: The image has to exist where the tags point. How: This fetches it from the site.
	const pngBufObj = await imaResObj.body();                 // What: PNG Buffer Object. Why: The image's size is written in its header. How: This reads the response bytes.


	expect( imaResObj.headers()[ 'content-type' ] ).toBe( 'image/png' ); // What: PNG Type Assertion. Why: The tags promise a PNG. How: This checks the served type.

	expect( pngBufObj.length ).toBeLessThan( 300 * 1024 ); // What: PNG Bytes Assertion. Why: WhatsApp drops a preview image of 300 KB or more. How: This checks the file's byte count.

	expect( [ pngBufObj.readUInt32BE( 16 ), pngBufObj.readUInt32BE( 20 ) ] ).toEqual( [ 1200, 630 ] ); // What: PNG Size Assertion. Why: The tags promise 1,200 by 630 pixels. How: This reads the width and height the PNG's header chunk stores.


} );



test( 'every icon the head links to is served at its size', async ( { page : curPagObj, request : reqConObj } ) => { // What: Icons Test. Why: Browsers and apps fetch the icons the head names, and a missing or wrong-sized one shows a blank or blurry mark. How: This reads every icon link and checks each file exists and, for PNGs, has the size its link promises.


	await curPagObj.goto( '/' ); // What: Home Load Call. Why: The icon links live in the page's head. How: This opens the home page.


	const icoLinArr = await curPagObj.locator( 'link[rel="icon"], link[rel="apple-touch-icon"]' ).evaluateAll( ( linEleArr ) => linEleArr.map( ( linCurEle ) => [ linCurEle.getAttribute( 'href' ) || '', linCurEle.getAttribute( 'sizes' ) || '' ] ) ); // What: Icon Link Array. Why: Each icon is checked against its own link. How: This reads every icon link's address and size.


	expect( icoLinArr.length ).toBe( 7 ); // What: Icon Count Assertion. Why: The set is the SVG, the ICO, four PNG sizes, and the Apple touch icon. How: This checks all seven are linked.


	for ( const [ icoHreStr, icoSizStr ] of icoLinArr ) { // What: Icon Check Loop. Why: Every linked icon has to be real. How: This fetches each one in turn.


		const icoResObj = await reqConObj.get( icoHreStr ); // What: Icon Response Object. Why: The icon has to exist where its link points. How: This fetches it.
		const icoBufObj = await icoResObj.body();           // What: Icon Buffer Object. Why: A PNG's size is written in its header. How: This reads the bytes.


		expect( icoResObj.ok() ).toBe( true ); // What: Icon Served Assertion. Why: A missing icon falls through to the app's HTML. How: This checks the file is served.



		if ( icoHreStr.endsWith( '.svg' ) ) { // What: SVG Icon Guard. Why: The SVG mark has no fixed size to check. How: This checks it's served as an SVG and moves on.


			expect( icoResObj.headers()[ 'content-type' ] ).toContain( 'image/svg+xml' ); // What: SVG Type Assertion. Why: Browsers only draw an SVG favicon served as one. How: This checks the served type.



			continue; // What: SVG Skip. Why: The size checks below don't apply to it. How: This moves on to the next icon.


		}



		if ( icoSizStr === 'any' ) { // What: ICO Header Guard. Why: favicon.ico isn't a PNG and has no single size. How: This checks its header marks it an icon file and moves on.


			expect( icoBufObj.readUInt16LE( 2 ) ).toBe( 1 ); // What: ICO Type Assertion. Why: The file has to be a real icon file. How: This checks its header's type field reads 1.



			continue; // What: ICO Skip. Why: The PNG size check below doesn't apply to it. How: This moves on to the next icon.


		}



		expect( `${ icoBufObj.readUInt32BE( 16 ) }x${ icoBufObj.readUInt32BE( 20 ) }` ).toBe( icoSizStr ); // What: PNG Icon Size Assertion. Why: Each PNG should be the size its link promises. How: This reads the width and height from its header.


	}


} );

// #endregion Module Init


