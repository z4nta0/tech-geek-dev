


// #region Imports

import cssModObj from './footer.module.css'; // What: CSS Module Object. Why: The footer's own layout and link styles live in its own module. How: This maps each class name in footer.module.css to its hashed module class.


import { Link        } from 'react-router';    // What: Link. Why: The footer's page links move between routes without a full page load. How: This renders each one as a router link.
import { PAG_LIN_ARR } from './page-links.ts'; // What: Page Link Array. Why: The footer links to the same pages as the bar. How: This is the shared list it renders.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * footer.tsx = Footer
 *
 * @summary
 * The site's footer: the hexagon mark with the tagline, a link to each page,
 * and the copyright line beside links to z4nta0's GitHub and LinkedIn. It
 * reads the current year each time it renders, so the copyright never goes
 * stale. Every page renders it below its content.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region SitFooCom

/**
 * SitFooCom = Site Footer Component
 *
 * @summary
 * Renders the footer: the hexagon mark, hidden from screen readers as
 * decoration, beside the tagline; a link to each page in a navigation
 * landmark labelled Footer navigation, so screen readers can tell it from the
 * bar's; and the copyright with the current year beside the GitHub and
 * LinkedIn links, each named by its aria-label and opening in a new tab.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The footer element.
 *
 * @example
 * ```tsx
 * SitFooCom() // => <SitFooCom />
 * ```
 *
*/

function SitFooCom () : JSX.Element {


	const curYeaNum = new Date().getFullYear(); // What: Current Year Number. Why: The copyright line names the current year. How: This reads it from today's date.



	return (


		<footer className={ cssModObj.footer }>{ /* What: Site Footer Element. Why: Every page ends with the brand, its page links, and the copyright. How: This holds the footer's centered column. */ }


			<div className={` container   ${ cssModObj.inner } `}>{ /* What: Footer Inner Div Element. Why: The footer's content sits in the page's centered column. How: This lays out the brand, the links, and the copyright. */ }


				<div className={ cssModObj.brand }>{ /* What: Footer Brand Div Element. Why: The mark and the tagline read as one block. How: This sets them side by side. */ }


					<svg
						fill='none'
						height='24'
						viewBox='0 0 28 28'
						width='24'

						aria-hidden='true'
					>{ /* What: Hexagon Mark SVG Element. Why: The site's hexagon mark signs off the footer. How: This draws the outlined hexagon, its filled core, and its center dot, hidden from screen readers as decoration. */ }


						<polygon
							fill='none'
							points='14,2 26,8 26,20 14,26 2,20 2,8'
							stroke='var(--orange)' // Orange = #F26419
							strokeWidth='2'
						/>{ /* What: Outer Hexagon Polygon Element. Why: The mark's outline is an orange hexagon. How: This traces it around the whole mark. */ }

						<polygon
							fill='var(--blue)' // Blue = #7DB9D8
							opacity='0.5'
							points='14,7 21,11 21,17 14,21 7,17 7,11'
						/>{ /* What: Inner Hexagon Polygon Element. Why: A softer blue hexagon fills the mark's center. How: This draws it at half strength inside the outline. */ }

						<circle
							cx='14'
							cy='14'
							fill='var(--orange)' // Orange = #F26419
							r='3'
						/>{ /* What: Center Dot Circle Element. Why: An orange dot finishes the mark's center. How: This draws it in the middle of the hexagons. */ }


					</svg>

					<span className={ cssModObj.tagline }>Building the web, one commit at a time.</span>{ /* What: Footer Tagline Span Element. Why: The tagline sums up the site in a line. How: This shows it beside the mark. */ }


				</div>


				<nav
					className={ cssModObj.links }

					aria-label='Footer navigation'
				>{ /* What: Footer Navigation Nav Element. Why: Every page can be reached from the bottom of any page, and a second navigation landmark needs a label to tell it from the bar's. How: This holds a link to each page. */ }


					{ PAG_LIN_ARR.map( ( pagLinObj ) => ( // What: Page Link Map Call. Why: The footer links to every page in the shared order. How: This renders one router link per row.


						<Link
							key={ pagLinObj.patStr }

							className={ cssModObj.link }

							to={ pagLinObj.patStr }
						>{ pagLinObj.labStr }</Link> // What: Footer Page Link. Why: Each page has its own link. How: This routes to the row's path, labelled with its name.


					))}


				</nav>


				<div className={ cssModObj.copy }>{ /* What: Footer Copy Div Element. Why: The copyright and the profile links share the footer's last row. How: This sets them side by side. */ }


					<span className='mono text-muted'>© { curYeaNum } TechGeek.dev. All rights reserved.</span>{ /* What: Copyright Span Element. Why: The footer ends with the copyright. How: This prints the current year read on each render. */ }

					<div className={ cssModObj.social }>{ /* What: Social Links Div Element. Why: The footer links to z4nta0's profiles. How: This holds the GitHub and LinkedIn links. */ }


						<a
							className={ cssModObj.icon }

							href='https://github.com/z4nta0'
							rel='noreferrer'
							target='_blank'

							aria-label='GitHub'
						>{ /* What: GitHub Anchor Element. Why: A visitor can browse z4nta0's code. How: This links to the GitHub profile in a new tab, named by its aria-label since it shows only an icon. */ }


							<svg
								fill='currentColor'
								height='18'
								viewBox='0 0 24 24'
								width='18'
							>{ /* What: GitHub Mark SVG Element. Why: GitHub's mark tells a visitor where the link goes. How: This draws the mark in the link's color. */ }


								<path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />{ /* What: GitHub Mark Path Element. Why: The mark is GitHub's cat silhouette. How: This traces it in the link's color. */ }


							</svg>


						</a>

						<a
							className={ cssModObj.icon }

							href='https://www.linkedin.com/in/gary-s-walton-654739400/'
							rel='noreferrer'
							target='_blank'

							aria-label='LinkedIn'
						>{ /* What: LinkedIn Anchor Element. Why: A visitor can find z4nta0's work history. How: This links to the LinkedIn profile in a new tab, named by its aria-label since it shows only an icon. */ }


							<svg
								fill='currentColor'
								height='18'
								viewBox='0 0 24 24'
								width='18'
							>{ /* What: LinkedIn Mark SVG Element. Why: LinkedIn's mark tells a visitor where the link goes. How: This draws the mark in the link's color. */ }


								<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />{ /* What: LinkedIn Mark Path Element. Why: The mark is LinkedIn's "in" square. How: This traces it in the link's color. */ }


							</svg>


						</a>


					</div>


				</div>


			</div>


		</footer>


	);


}

// #endregion SitFooCom

// #endregion Components



// #region Exports

export { SitFooCom }; // What: Named Exports. Why: Every page renders the footer below its content. How: This exports SitFooCom.

// #endregion Exports


