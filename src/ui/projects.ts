


// #region Imports

import emlScrUrl from '../assets/images/ease-my-life-website.webp';     // What: Ease-My-Life Screenshot URL. Why: The Ease My Life project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import hadScrUrl from '../assets/images/hair-designs-website.webp';     // What: Hair-Designs Screenshot URL. Why: The Hair Designs project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import rerScrUrl from '../assets/images/reese-roofing-website.webp';    // What: Reese-Roofing Screenshot URL. Why: The Reese Roofing project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import sasScrUrl from '../assets/images/seal-and-shield-website.webp';  // What: Seal-And-Shield Screenshot URL. Why: The Seal and Shield project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import tbbScrUrl from '../assets/images/the-bernie-bears-website.webp'; // What: The-Bernie-Bears Screenshot URL. Why: The Bernie Bears project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import tegScrUrl from '../assets/images/tech-geek-website.webp';        // What: Tech-Geek Screenshot URL. Why: The Tech Geek project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.
import totScrUrl from '../assets/images/tonys-toppers-website.webp';    // What: Tonys-Toppers Screenshot URL. Why: The Tony's Toppers project card shows a screenshot of its site. How: Vite resolves this to the image's fingerprinted URL.

// #endregion Imports



/**
 * projects.ts = Projects
 *
 * @summary
 * The list of projects the site showcases, in the order the Work page shows
 * them, with the type every record follows. Home shows four featured ones,
 * picked at random on each visit, and the Work page shows them all behind its
 * tag filter. Home and About also show two counts taken from the list, the
 * projects shipped and the clients served, so both grow as projects are added;
 * the pages add a plus to each, since z4nta0's older projects that are no
 * longer online still count. Each record's screenshot comes from
 * src/assets/images, rendered there by npm run images.
 *
 * Sections:
 *  - Types
 *  - Constants
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type ProRecTyp = { // What: Project Record Type. Why: The project card, Home, and the Work page all read the same fields. How: This names every field a project record carries.


	cliBoo  : boolean,  // What: Client Boolean. Why: Home and About count the client projects apart from z4nta0's own. How: This is true for a site built for a client.
	desStr  : string,   // What: Description String. Why: The card says what the project is. How: This is a sentence shown under the title.
	feaBoo? : boolean,  // What: Featured Boolean. Why: Home shows only featured projects. How: This marks a project as one of them.
	gitStr? : string,   // What: GitHub String. Why: A visitor can read the project's source. How: This is its repository's URL.
	ideStr  : string,   // What: Identifier String. Why: React needs a stable key for each card. How: This is a unique id per project.
	imaStr  : string,   // What: Image String. Why: The card shows a screenshot of the site. How: This is the screenshot's resolved URL.
	livStr? : string,   // What: Live String. Why: A visitor can open the finished site. How: This is the live site's URL.
	tagArr  : string[], // What: Tag Array. Why: The card lists the project's technologies, and the Work page filters by them. How: This holds each technology's name.
	titStr  : string,   // What: Title String. Why: The card names the project. How: This is its name.
	yeaNum  : number    // What: Year Number. Why: The card's badge shows when the project was built. How: This is the year.


};

// #endregion Types



// #region Constants

// #region PRO_REC_ARR

/**
 * PRO_REC_ARR = Project Record Array
 *
 * @summary
 * Every project the site showcases, in the order the Work page shows them.
 * Every record shares the {@link ProRecTyp} shape, so its fields carry no
 * comments of their own:
 * - `cliBoo` (Boolean): Client Boolean, true for a site built for a client.
 * - `desStr` (String): Description String, the sentence under the title.
 * - `feaBoo` (Boolean): Featured Boolean, true for a project Home can show.
 * - `gitStr` (String): GitHub String, the repository's URL.
 * - `ideStr` (String): Identifier String, the card's unique React key.
 * - `imaStr` (String): Image String, the screenshot's resolved URL.
 * - `livStr` (String): Live String, the live site's URL.
 * - `tagArr` (Array): Tag Array, the technologies the card lists.
 * - `titStr` (String): Title String, the project's name.
 * - `yeaNum` (Number): Year Number, the year the badge shows.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const PRO_REC_ARR : ProRecTyp[] = [ // What: Project Record Array. Why: Every page that lists projects reads this one list, so a new project is added in one place. How: Each record holds one project's card content.


	{ // What: Ease My Life Project Record. Why: Ease My Life is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : false,
		desStr : "A progressive web app todo list application that decides what to do, so that you don't have to.",
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/ease-my-life',
		ideStr : 'proj-01',
		imaStr : emlScrUrl,
		livStr : 'https://easemylife.app/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'Ease My Life',
		yeaNum : 2026


	},

	{ // What: Hair Designs Project Record. Why: Hair Designs is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : true,
		desStr : 'A website for a local business of hair designers and licensed cosmetologists.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/hair-designs',
		ideStr : 'proj-02',
		imaStr : hadScrUrl,
		livStr : 'https://hairdesigns.hair/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'Hair Designs',
		yeaNum : 2026


	},

	{ // What: The Bernie Bears Project Record. Why: The Bernie Bears is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : true,
		desStr : 'A website for a social media influencer about two adorable Bernese Mountain Dogs.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/the-bernie-bears',
		ideStr : 'proj-03',
		imaStr : tbbScrUrl,
		livStr : 'https://theberniebears.dog/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'The Bernie Bears',
		yeaNum : 2026


	},

	{ // What: Tony's Toppers Project Record. Why: Tony's Toppers is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : true,
		desStr : 'A website for a young man with down syndrome who sells hand made crafts.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/tonys-toppers',
		ideStr : 'proj-04',
		imaStr : totScrUrl,
		livStr : 'https://tonystoppers.com/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : "Tony's Toppers",
		yeaNum : 2026


	},

	{ // What: Seal and Shield Project Record. Why: Seal and Shield is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : true,
		desStr : 'A website for Seal and Shield, a commercial roofing contractor based in Lawrence, Kansas.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/seal-and-shield',
		ideStr : 'proj-05',
		imaStr : sasScrUrl,
		livStr : 'https://sealandshieldroof.com/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'Seal and Shield',
		yeaNum : 2026


	},

	{ // What: Reese Roofing Project Record. Why: Reese Roofing is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : true,
		desStr : 'A mockup website for a fictional roofing company, designed as a concept for a Lawrence, Kansas client.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/reese-roofing',
		ideStr : 'proj-06',
		imaStr : rerScrUrl,
		livStr : 'https://reese-roofing.netlify.app/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'Reese Roofing',
		yeaNum : 2026


	},

	{ // What: Tech Geek Project Record. Why: Tech Geek is one of the projects the site showcases. How: This holds its card's text, links, screenshot, and tags.


		cliBoo : false,
		desStr : 'A website for helping local businesses get online in order to reach larger audiences and grow their reach.',
		feaBoo : true,
		gitStr : 'https://github.com/z4nta0/techgeek',
		ideStr : 'proj-07',
		imaStr : tegScrUrl,
		livStr : 'https://techgeek.support/',
		tagArr : [ 'React', 'TypeScript', 'Node.js', 'React Router', 'Vite' ],
		titStr : 'Tech Geek',
		yeaNum : 2026


	}


];

// #endregion PRO_REC_ARR



const CLI_COU_NUM = PRO_REC_ARR.filter( ( proRecObj ) => proRecObj.cliBoo ).length; // What: Client Count Number. Why: Home and About count the clients served, and the count should grow as client projects are added. How: This counts the records built for a client.
const SHI_COU_NUM = PRO_REC_ARR.length;                                                 // What: Shipped Count Number. Why: Home and About count the projects shipped, and the count should grow as projects are added. How: This counts every record.

// #endregion Constants



// #region Exports

export { CLI_COU_NUM, PRO_REC_ARR, type ProRecTyp, SHI_COU_NUM }; // What: Named Exports. Why: The project card reads the record type, Home and the Work page read the list, and Home and About show the counts. How: This exports the list, its type, and both counts.

// #endregion Exports


