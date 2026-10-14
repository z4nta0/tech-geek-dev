


// #region Imports

import cssModObj from './footer.module.css'; // What: CSS Module Object. Why: The footer's own layout and link styles live in its own module. How: This maps each class name in footer.module.css to its hashed module class.


import { Link        } from 'react-router';       // What: Link. Why: The footer's page links move between routes without a full page load. How: This renders each one as a router link.
import { PAG_LIN_ARR } from './page-links.ts';    // What: Page Link Array. Why: The footer links to the same pages as the bar. How: This is the shared list it renders.
import { PRO_LIN_ARR } from './profile-links.ts'; // What: Profile Link Array. Why: The footer links to the same profiles as the phone menu. How: This is the shared list its icons render.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * footer.tsx = Footer
 *
 * @summary
 * The site's footer: the hexagon mark with the tagline and links to the
 * sister sites, a link to each page, and the copyright line beside links to
 * z4nta0's GitHub and LinkedIn. It reads the current year each time it
 * renders, so the copyright never goes stale. Every page renders it below
 * its content.
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
 * decoration, above the tagline and a line linking the sister sites,
 * TechGeek.support and TechGeek.cards; a link to each page in a navigation
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


		<footer className={ cssModObj.sitFooFoo }>{ /* What: Site Footer Footer Element. Why: Every page ends with the brand, its page links, and the copyright. How: This holds the footer's centered column. */ }


			<div className={ cssModObj.fooInnDiv }>{ /* What: Footer Inner Div Element. Why: The footer's content sits in the page's centered column. How: This lays out the brand, the links, and the copyright. */ }


				<div className={ cssModObj.fooBraDiv }>{ /* What: Footer Brand Div Element. Why: The mark, the tagline, and the sister sites read as one block. How: This stacks them. */ }


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
							stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
							strokeWidth='2'
						/>{ /* What: Outer Hexagon Polygon Element. Why: The mark's outline is an orange hexagon. How: This traces it around the whole mark. */ }

						<polygon
							fill='var( --acc-sec-col )' // Accent Secondary Color = #7DB9D8
							opacity='0.5'
							points='14,7 21,11 21,17 14,21 7,17 7,11'
						/>{ /* What: Inner Hexagon Polygon Element. Why: A softer blue hexagon fills the mark's center. How: This draws it at half strength inside the outline. */ }

						<circle
							cx='14'
							cy='14'
							fill='var( --acc-mai-col )' // Accent Main Color = #F26419
							r='3'
						/>{ /* What: Center Dot Circle Element. Why: An orange dot finishes the mark's center. How: This draws it in the middle of the hexagons. */ }


					</svg>

					<span className={ cssModObj.fooTagSpa }>Building the web, one commit at a time.</span>{ /* What: Footer Tagline Span Element. Why: The tagline sums up the site in a line. How: This shows it under the mark. */ }

					<p className={ cssModObj.fooSisPar }>More from TechGeek: <span className={ cssModObj.fooSisSpa }><a className={ cssModObj.fooSisAnc } href='https://techgeek.support/'>TechGeek.support</a> <span aria-hidden='true'>·</span> <a className={ cssModObj.fooSisAnc } href='https://techgeek.cards/'>TechGeek.cards</a></span></p>{ /* What: Footer Sister Paragraph Element. Why: TechGeek.dev is one of three sister sites, and a visitor here may want tech support or a greeting card. How: This links to TechGeek.support and TechGeek.cards in the same tab, kept together on one line so a narrow screen breaks after the colon, their dot hidden from screen readers as decoration. */ }


				</div>


				<nav
					className={ cssModObj.fooLinNav }

					aria-label='Footer navigation'
				>{ /* What: Footer Links Nav Element. Why: Every page can be reached from the bottom of any page, and a second navigation landmark needs a label to tell it from the bar's. How: This holds a link to each page. */ }


					{ PAG_LIN_ARR.map( ( pagLinObj ) => ( // What: Page Link Map Call. Why: The footer links to every page in the shared order. How: This renders one router link per row.


						<Link
							key={ pagLinObj.patStr }

							className={ cssModObj.fooLinAnc }

							to={ pagLinObj.patStr }
						>{ pagLinObj.labStr }</Link> // What: Footer Page Link. Why: Each page has its own link. How: This routes to the row's path, labelled with its name.


					))}


				</nav>


				<div className={ cssModObj.fooCopDiv }>{ /* What: Footer Copy Div Element. Why: The copyright and the profile links share the footer's last row. How: This sets them side by side. */ }


					<span className={ cssModObj.fooCopSpa }>© { curYeaNum } TechGeek.dev. All rights reserved.</span>{ /* What: Footer Copyright Span Element. Why: The footer ends with the copyright. How: This prints the current year read on each render. */ }

					<div className={ cssModObj.fooSocDiv }>{ /* What: Footer Social Div Element. Why: The footer links to z4nta0's profiles. How: This holds the GitHub and LinkedIn links. */ }


						{ PRO_LIN_ARR.map( ( proLinObj ) => ( // What: Footer Profile Map Call. Why: Every profile gets an icon link. How: This renders one link per row of the shared profile list.


							<a
								key={ proLinObj.labStr }

								className={ cssModObj.fooIcoAnc }

								href={ proLinObj.urlStr }
								rel='noreferrer'
								target='_blank'

								aria-label={ proLinObj.labStr }
							>{ /* What: Footer Icon Anchor Element. Why: A visitor can reach z4nta0's profiles from any page. How: This links to the row's profile in a new tab, named by its aria-label since it shows only an icon. */ }


								<svg
									className={ cssModObj.fooIcoSvg }

									fill='currentColor'
									height='18'
									viewBox='0 0 24 24'
									width='18'

									aria-hidden='true'
								>{ /* What: Footer Icon SVG Element. Why: The platform's mark tells a visitor where the link goes. How: This draws the mark in the link's color, hidden from screen readers since the link is named, and lets presses fall through to the link. */ }


									<path d={ proLinObj.icoStr } />{ /* What: Profile Mark Path Element. Why: The mark is one path. How: This traces the row's path data. */ }


								</svg>


							</a>


						))}


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


