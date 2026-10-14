


// #region Imports

import cssModObj from './project-card.module.css'; // What: CSS Module Object. Why: The card's own layout, overlay, and badge styles live in its own module. How: This maps each class name in project-card.module.css to its hashed module class.


import { TagLabCom } from './tag.tsx'; // What: Tag Label Component. Why: The card lists the project's technologies as tags. How: This renders one pill per technology.


import type { JSX       } from 'react';         // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.
import type { ProRecTyp } from './projects.ts'; // What: Project Record Type. Why: The card shows one project record. How: This types the record it reads.

// #endregion Imports



/**
 * project-card.tsx = Project Card
 *
 * @summary
 * The card that shows one project on Home and the Work page: a screenshot of
 * the site with its year in a badge, an overlay that reveals links to the
 * live site and the source on hover, then the project's name, description,
 * and technologies, finished with a small orange corner accent.
 *
 * Sections:
 *  - Constants
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const SCR_HEI_NUM = 752;  // What: Screenshot Height Number. Why: The screenshot's img needs its intrinsic size so the card doesn't shift while it loads. How: This is the height every screenshot is written at, the project box in design/images/render.mts.
const SCR_WID_NUM = 1336; // What: Screenshot Width Number. Why: The screenshot's img needs its intrinsic size so the card doesn't shift while it loads. How: This is the width every screenshot is written at, the project box in design/images/render.mts.

// #endregion Constants



// #region Components

type PccProTyp = { isaFeaBoo? : boolean, proRecObj : ProRecTyp }; // What: Project-Card-Component Props Type. Why: A card shows one project and may be styled as featured. How: This types ProCarCom's props.

// #region ProCarCom

/**
 * ProCarCom = Project Card Component
 *
 * @summary
 * Renders one project as an article: its screenshot, loaded lazily, with the
 * year badge and the hover overlay, whose live site and GitHub links appear
 * only when the record has those addresses and open in a new tab; then the
 * project's title, description, and a tag for each technology. A featured
 * card adds the module's featured class.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.isaFeaBoo - Is-A Featured Boolean: Whether the card takes the
 *                          featured styling, defaulting to false.
 * @param props.proRecObj - Project Record Object: {@link ProRecTyp}
 *
 * @returns The card's article element.
 *
 * @example
 * ```tsx
 * ProCarCom({ isaFeaBoo, proRecObj }) // => <ProCarCom />
 * ```
 *
*/

function ProCarCom ( { isaFeaBoo = false, proRecObj } : PccProTyp ) : JSX.Element {


	return (


		<article className={` ${ cssModObj.proCarArt }   ${ isaFeaBoo ? cssModObj.proCarArtFeatured : '' } `}>{ /* What: Project Card Article Element. Why: Each project is a self-contained piece of content. How: This holds the screenshot, the text, and the corner accent, with the featured class when asked. */ }


			<div className={ cssModObj.imaWraDiv }>{ /* What: Image Wrap Div Element. Why: The screenshot, its overlay, and its badge share one frame. How: This crops the screenshot and positions the overlay and badge over it. */ }


				<img
					className={ cssModObj.proScrIma }

					height={ SCR_HEI_NUM } // What: Intrinsic Height. Why: The browser reserves the image's shape before it loads, so nothing below it moves. How: This passes the size every screenshot is written at.
					loading='lazy'
					src={ proRecObj.imaStr }
					width={ SCR_WID_NUM } // What: Intrinsic Width. Why: The browser reserves the image's shape before it loads, so nothing below it moves. How: This passes the size every screenshot is written at.

					alt={ proRecObj.titStr }
				/>{ /* What: Project Screenshot Image Element. Why: A screenshot shows what the project looks like. How: This loads the record's screenshot lazily, named by the project's title. */ }


				<div className={ cssModObj.imaOveDiv }>{ /* What: Image Overlay Div Element. Why: The project's links appear over the screenshot on hover. How: This covers the frame and holds the links. */ }


					<div className={ cssModObj.oveLinDiv }>{ /* What: Overlay Links Div Element. Why: The links sit together in the overlay's center. How: This lines them up in a row. */ }


						{ proRecObj.livStr && ( // What: Live Link Presence Check. Why: Not every project has a live site. How: This renders the link only when the record has one.


							<a
								className={ cssModObj.oveButAnc }

								href={ proRecObj.livStr }
								rel='noreferrer'
								target='_blank'
							>{ /* What: Overlay Button Anchor Element. Why: A visitor can open the finished site. How: This links to the live site in a new tab. */ }


								<svg
									fill='none'
									height='14'
									stroke='currentColor'
									strokeWidth='2.5'
									viewBox='0 0 24 24'
									width='14'
								>{ /* What: External Link SVG Element. Why: An arrow out of a box marks a link that leaves the site. How: This draws the icon at the link text's size. */ }


									<path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />{ /* What: Icon Box Path Element. Why: The open box is the icon's frame. How: This traces the box with its top right corner open. */ }

									<polyline points='15 3 21 3 21 9' />{ /* What: Icon Arrowhead Polyline Element. Why: The arrowhead points out of the box. How: This draws the head at the top right corner. */ }

									<line
										x1='10'
										x2='21'
										y1='14'
										y2='3'
									/>{ /* What: Icon Arrow Line Element. Why: The arrow's shaft leads out of the box. How: This draws it from inside the box to the arrowhead. */ }


								</svg>

								Live Site


							</a>


						) }

						{ proRecObj.gitStr && ( // What: GitHub Link Presence Check. Why: Not every project's source is public. How: This renders the link only when the record has one.


							<a
								className={` ${ cssModObj.oveButAnc }   ${ cssModObj.oveButAncGhost } `}

								href={ proRecObj.gitStr }
								rel='noreferrer'
								target='_blank'
							>{ /* What: Overlay Button Anchor Element. Why: A visitor can read the project's source. How: This links to its repository in a new tab, styled as the lighter ghost button. */ }


								<svg
									fill='currentColor'
									height='14'
									viewBox='0 0 24 24'
									width='14'
								>{ /* What: GitHub Mark SVG Element. Why: GitHub's mark tells a visitor where the link goes. How: This draws the mark at the link text's size. */ }


									<path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />{ /* What: GitHub Mark Path Element. Why: The mark is GitHub's cat silhouette. How: This traces it in the link's text color. */ }


								</svg>

								GitHub


							</a>


						) }


					</div>


				</div>


				<div className={ cssModObj.yeaBadDiv }>{ proRecObj.yeaNum }</div>{ /* What: Year Badge Div Element. Why: The badge shows when the project was built. How: This prints the record's year over the screenshot's corner. */ }


			</div>



			<div className={ cssModObj.carBodDiv }>{ /* What: Card Body Div Element. Why: The project's text sits below its screenshot. How: This stacks the title, description, and tags. */ }


				<h3 className={ cssModObj.proTitHea }>{ proRecObj.titStr }</h3>{ /* What: Project Title Heading Element. Why: The card names its project. How: This shows the record's title as an h3. */ }

				<p className={ cssModObj.proDesPar }>{ proRecObj.desStr }</p>{ /* What: Project Description Paragraph Element. Why: The card says what the project is. How: This shows the record's description. */ }

				<div className={ cssModObj.proTagDiv }>{ /* What: Project Tags Div Element. Why: The project's technologies read as one row of pills. How: This wraps the tags. */ }


					{ proRecObj.tagArr.map( ( tagNamStr ) => ( // What: Tag Map Call. Why: Every technology gets its own pill. How: This renders a blue tag per name.


						<TagLabCom
							key={ tagNamStr }

							labTexStr={ tagNamStr }
							tagVarStr='blue'
						/> // What: Tag Label Component. Why: The pill names one technology. How: This shows the name in the blue variant.


					))}


				</div>


			</div>


			<svg
				className={ cssModObj.corAccSvg }

				height='24'
				viewBox='0 0 24 24'
				width='24'

				aria-hidden='true'
			>{ /* What: Corner Accent SVG Element. Why: A small angled stroke gives the card the site's geometric touch. How: This draws an orange corner, hidden from screen readers as decoration. */ }


				<path
					d='M0 0 L24 0 L24 24'
					fill='none'
					stroke='var(--acc-mai-col)' // Accent Main Color = #F26419
					strokeWidth='2'
				/>{ /* What: Corner Path Element. Why: The accent is two strokes meeting at the card's corner. How: This traces them in the site's orange. */ }


			</svg>


		</article>


	);


}

// #endregion ProCarCom

// #endregion Components



// #region Exports

export { ProCarCom }; // What: Named Exports. Why: Home and the Work page show projects as cards. How: This exports ProCarCom.

// #endregion Exports


