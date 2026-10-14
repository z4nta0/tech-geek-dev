


// #region Imports

import cssModObj from './work.module.css'; // What: CSS Module Object. Why: The Work page's own layout, filter, and process styles live in its own module. How: This maps each class name in work.module.css to its hashed module class.


import { Fragment     } from 'react';                                  // What: Fragment. Why: Each process step and the arrow after it render as one keyed pair with no wrapper. How: This groups them under one key.
import { GeoBacCom    } from '../../ui/geo-bg.tsx';                    // What: Geometric Background Component. Why: The hero and the process section sit over faint patterns. How: This draws the grid and the dots.
import { PRO_REC_ARR  } from '../../ui/projects.ts';                   // What: Project Record Array. Why: The page shows every project. How: This is the list it filters and renders.
import { ProCarCom    } from '../../ui/project-card.tsx';              // What: Project Card Component. Why: Each project shows as a card. How: This renders one card per project.
import { SecHeaCom    } from '../../ui/section-header.tsx';            // What: Section Header Component. Why: The process section opens with a heading block. How: This renders its label, title, and subtitle.
import { togFadFun    } from './edge-fade.ts';                         // What: Toggle Fade Function. Why: The filter row fades whichever edge still hides buttons. How: This sets the row's edge attributes from its scroll position.
import { useEffect    } from 'react';                                  // What: Use Effect. Why: The filter row's fades have to follow its scrolling and resizing. How: This wires and tears down those listeners with the page.
import { usePagDesFun } from 'techgeek-design/ui/page-description.ts'; // What: Use Page Description Function. Why: The page's search description differs from the home page's. How: The page calls it to swap the one description tag's text while it shows.
import { useRef       } from 'react';                                  // What: Use Ref. Why: The fade effect needs the filter row's element. How: This holds it.
import { useState     } from 'react';                                  // What: Use State. Why: The page remembers which technology the visitor filtered by. How: This holds the active tag.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * work.tsx = Work
 *
 * @summary
 * The Work page: a hero introducing the catalog, a filter bar with a
 * button for each technology the projects use, the grid of project cards the
 * filter narrows, and a closing section walking through the four steps every
 * project follows.
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

// #region PRC_STE_ARR

/**
 * PRC_STE_ARR = Process Step Array
 *
 * @summary
 * The four steps the process section walks through, in order, with an arrow
 * drawn between each pair. Every row shares one shape, so its fields carry no
 * comments of their own:
 * - `desStr` (String): Description String, the sentence under the step's
 *   title.
 * - `numStr` (String): Number String, the step's two-digit number.
 * - `titStr` (String): Title String, the step's one-word name.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const PRC_STE_ARR = [ // What: Process Step Array. Why: The process section shows the same four steps every visit. How: Each row holds one step's number, title, and description.


	{ numStr : '01', titStr : 'Discover', desStr : 'Deep-dive into your goals, users, and constraints. No assumptions.' }, // What: Discover Step Row. Why: Every project starts by learning what it needs. How: This is the first step.

	{ numStr : '02', titStr : 'Design',   desStr : 'Architecture diagrams, wireframes, and API contracts before a line of code.' }, // What: Design Step Row. Why: The plan comes before the code. How: This is the second step.

	{ numStr : '03', titStr : 'Build',    desStr : 'Iterative development with regular demos. Fully tested and documented.' }, // What: Build Step Row. Why: The site is built in steps the client can see. How: This is the third step.

	{ numStr : '04', titStr : 'Ship',     desStr : 'CI/CD deployment, monitoring, and handover documentation included.' } // What: Ship Step Row. Why: Every project ends deployed and handed over. How: This is the last step.


];

// #endregion PRC_STE_ARR



const TAG_FIL_ARR = [ 'All', ...Array.from( new Set( PRO_REC_ARR.flatMap( ( proRecObj ) => proRecObj.tagArr ) ) ).sort() ]; // What: Tag Filter Array. Why: The filter bar offers every technology the projects use, plus All. How: This gathers each project's tags, drops repeats, sorts them, and puts All first.

// #endregion Constants



// #region Components

// #region WorPagCom

/**
 * WorPagCom = Work Page Component
 *
 * @summary
 * Renders the Work page. The filter bar's buttons set the active tag, which
 * narrows the grid to the projects using that technology (All shows every
 * one) and updates the count beside them; an empty grid says no projects
 * match. A visually hidden h2 heads the grid, so the cards' h3 titles follow
 * the page's h1 in order. The process section lists PRC_STE_ARR's steps
 * with an arrow, hidden from screen readers, between each pair.
 *
 * It also sets the page's title and canonical address, which React moves
 * into the document head, and swaps the search description for its own
 * through usePagDesFun until the page leaves.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's title, canonical link, and wrapper div.
 *
 * @example
 * ```tsx
 * WorPagCom() // => <WorPagCom />
 * ```
 *
*/

function WorPagCom () : JSX.Element {


	usePagDesFun( 'Websites and web apps z4nta0 has designed, built, and shipped, from sites for local businesses to personal projects.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	const [ actTagStr, setActTagStr ] = useState( 'All' ); // What: Active Tag String And Setter. Why: The grid shows only the projects using the chosen technology. How: This starts on All, showing every project.

	const filScrRef = useRef< HTMLDivElement | null >( null ); // What: Filter Scroll Reference. Why: The fade effect below measures the filter row. How: This is attached to the row's ref prop.


	useEffect( () => { // What: Filter Row Fade Effect. Why: Once the filter buttons outgrow the row, its edges fade on whichever side still hides buttons, so a visitor can tell it scrolls. How: This measures the row now and on every scroll and resize, and removes the listeners when the page leaves.


		const filScrEle = filScrRef.current; // What: Filter Scroll Element. Why: The listeners attach to the row itself. How: This reads it from its ref.


		if ( !filScrEle ) return; // What: Missing Row Guard. Why: There's nothing to measure before the row mounts. How: This stops early when the ref is empty.



		const updFadFun = () => togFadFun( filScrEle ); // What: Update Fade Function. Why: The first measurement, the scroll listener, and the resize observer all recompute the same attributes. How: This calls togFadFun on the row.


		updFadFun(); // What: Initial Update Call. Why: The fades have to be right as soon as the page shows. How: This measures the row once.

		filScrEle.addEventListener( 'scroll', updFadFun, { passive : true } ); // What: Scroll Listener Call. Why: Each fade has to come and go as the visitor scrolls the row. How: This re-measures on every scroll without blocking it.


		const resObsObj = new ResizeObserver( updFadFun ); // What: Resize Observer Object. Why: Resizing the window can make the row start or stop scrolling. How: This re-measures whenever the row's size changes.


		resObsObj.observe( filScrEle ); // What: Resize Observer Start Call. Why: The observer does nothing until it's given an element. How: This starts watching the row.



		return () => { // What: Fade Cleanup Return. Why: The listener and the observer shouldn't outlive the page. How: This removes the scroll listener and disconnects the observer.


			filScrEle.removeEventListener( 'scroll', updFadFun ); // What: Scroll Unsubscribe Call. Why: The listener must not outlive the page. How: This removes updFadFun from the row.

			resObsObj.disconnect(); // What: Observer Disconnect Call. Why: The observer must not outlive the page either. How: This disconnects resObsObj.


		};


	}, [] ); // What: Effect Dependency Array. Why: The row and its buttons never change while the page is open, so the listeners are wired once. How: This empty list runs the effect only on mount and cleans it up on unmount.



	const filProArr = actTagStr === 'All' // What: Filtered Project Array. Why: The grid and the count show only what the filter allows. How: This keeps every project for All, or only those tagged with the active technology.
		? PRO_REC_ARR                                                                    // What: All Projects Branch. Why: All means no filter. How: This keeps the whole list.
		: PRO_REC_ARR.filter( ( proRecObj ) => proRecObj.tagArr.includes( actTagStr ) ); // What: Tagged Projects Branch. Why: A technology narrows the list. How: This keeps the projects whose tags include it.



	return (


		<>{ /* What: Page Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>Projects & Case Studies | TechGeek.dev</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React 19 moves this title into the document head while the page is shown. */ }

			<link
				href='https://techgeek.dev/work'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every address Netlify serves the page at should count as its one live address. How: React 19 moves this link into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page's sections stack in one column. How: This holds them and fades in like every page. */ }


				<section className={ cssModObj.pagHerSec }>{ /* What: Page Hero Section Element. Why: The page opens by introducing the catalog. How: This holds the pattern, the heading block, and the corner accent. */ }


					<GeoBacCom
						patOpaStr='var( --cdn-pow-007-rec )' // Core-Design-Number to the Power of 7 Reciprocal ~= 0.140
						patVarStr='grid'
					/>{ /* What: Geometric Background Component. Why: A faint grid sits behind the hero. How: This draws it at about 14% strength. */ }



					<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The hero's text sits in the page's centered column. How: This stacks the label, heading, and line. */ }


						<span className={ cssModObj.herLabSpa }>{ /* What: Hero Label Span Element. Why: A small label names the page above its heading. How: This shows My Work after a short rule. */ }
							<span className={ cssModObj.herLinSpa } />{ /* What: Hero Line Span Element. Why: A short rule leads into the label. How: This draws the rule. */ }

							My Work
						</span>

						<h1 className={ cssModObj.herTitHea }>{ /* What: Hero Title Heading Element. Why: The page's heading names what it shows. How: This sets Projects and Case Studies over two lines, the second in the accent. */ }
							Projects &<br />
							<span className={ cssModObj.titAccSpa }>Case Studies</span>{ /* What: Title Accent Span Element. Why: The heading's second line carries the accent. How: This sets Case Studies in the dark blue. */ }
						</h1>

						<p className={ cssModObj.herSubPar }>{ /* What: Hero Subtitle Paragraph Element. Why: A line under the heading says what the catalog holds. How: This describes the range of work. */ }
							A full catalog of web applications, APIs, and tools I've designed,
							architected, and shipped, from solo side projects to client builds.
						</p>


					</div>


					<svg
						className={ cssModObj.corAccSvg }

						height='200'
						viewBox='0 0 200 200'
						width='200'

						aria-hidden='true'
					>{ /* What: Corner Accent SVG Element. Why: Two triangles give the hero's corner the site's geometric touch. How: This draws them faintly, hidden from screen readers as decoration. */ }


						<polygon
							style={{ opacity : 'var( --cdn-pow-005-rec )' }} // Core-Design-Number to the Power of 5 Reciprocal ~= 0.245

							fill='none'
							points='200,0 200,200 0,200'
							stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
							strokeWidth='2'
						/>{ /* What: Outer Triangle Polygon Element. Why: The larger triangle fills the corner. How: This traces it in orange at about 25% strength. */ }

						<polygon
							style={{ opacity : 'var( --cdn-pow-006-rec )' }} // Core-Design-Number to the Power of 6 Reciprocal ~= 0.185

							fill='none'
							points='200,40 200,200 40,200'
							stroke='var( --acc-sec-col )' // Accent Secondary Color = #7DB9D8
							strokeWidth='1'
						/>{ /* What: Inner Triangle Polygon Element. Why: A smaller triangle nests inside the first. How: This traces it in blue at about 19% strength. */ }


					</svg>


				</section>



				<section className={ cssModObj.filBarSec }>{ /* What: Filter Bar Section Element. Why: A visitor can narrow the projects to one technology. How: This holds the label, the buttons, and the count. */ }


					<div className={ cssModObj.filInnDiv }>{ /* What: Filter Inner Div Element. Why: The filter sits in the page's centered column. How: This lines up the label, the buttons, and the count. */ }


						<span className={ cssModObj.filLabSpa }>{ /* What: Filter Label Span Element. Why: The row says what its buttons do. How: This shows Filter by tech after a funnel icon. */ }


							<svg
								fill='none'
								height='14'
								stroke='currentColor'
								strokeWidth='2'
								viewBox='0 0 24 24'
								width='14'
							>{ /* What: Funnel Icon SVG Element. Why: A funnel is the familiar mark for a filter. How: This draws it at the label's size. */ }


								<polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />{ /* What: Funnel Polygon Element. Why: The funnel is a single outline. How: This traces it in the label's color. */ }


							</svg>

							Filter by tech


						</span>


						<div
							ref={ filScrRef }

							className={ cssModObj.filScrDiv }

							data-scroll-end-active // What: Scroll End Active Attribute. Why: The row starts with no fades until edge-fade.ts first measures it, so no fade flashes on load. How: This presence-only attribute hides the right fade until togFadFun says otherwise.
							data-scroll-start-active // What: Scroll Start Active Attribute. Why: The row starts with no fades until edge-fade.ts first measures it, so no fade flashes on load. How: This presence-only attribute hides the left fade until togFadFun says otherwise.
						>{ /* What: Filter Scroll Div Element. Why: The buttons can outgrow a narrow screen. How: This lets the row scroll sideways, fading whichever edge still hides buttons. */ }


							{ TAG_FIL_ARR.map( ( tagNamStr ) => ( // What: Filter Button Map Call. Why: Every technology gets a button. How: This renders one per tag.


								<button
									key={ tagNamStr }

									className={ cssModObj.filOptBut }

									data-filter-button-active={ actTagStr === tagNamStr || undefined }

									onClick={ () => setActTagStr( tagNamStr ) }
								>{ tagNamStr }</button> // What: Filter Option Button Element. Why: Each button narrows the grid to its technology. How: This sets the active tag, marked with data-filter-button-active while chosen, which its module styles.


							))}


						</div>

						<span className={ cssModObj.filCouSpa }>{ /* What: Filter Count Span Element. Why: The row says how many projects the filter leaves. How: This shows the count with project or projects to match. */ }
							{ filProArr.length } project{ filProArr.length !== 1 ? 's' : '' }{ /* What: Project Count Text. Why: The count reads as a phrase. How: This adds an s for any count but one. */ }
						</span>


					</div>


				</section>



				<section className={ cssModObj.proLisSec }>{ /* What: Projects List Section Element. Why: The grid of cards is the page's main content. How: This holds the grid or the empty message. */ }


					<div className={ cssModObj.proInnDiv }>{ /* What: Projects Inner Div Element. Why: The grid sits in the page's centered column. How: This holds the hidden heading and the grid. */ }


						<h2 className={ cssModObj.visHidHea }>Projects</h2>{ /* What: Visually Hidden Heading Element. Why: The cards' h3 titles need an h2 between them and the page's h1, and the hero already introduces the grid visually. How: This names the section for screen readers while staying out of sight. */ }

						{ filProArr.length > 0 ? ( // What: Grid Or Empty Check. Why: A filter can leave nothing to show. How: This renders the grid when projects remain, or the empty message otherwise.


							<div className={ cssModObj.proGriDiv }>{ /* What: Projects Grid Div Element. Why: The cards line up in columns. How: This lays out one card per filtered project. */ }


								{ filProArr.map( ( proRecObj ) => ( // What: Project Card Map Call. Why: Every filtered project gets a card. How: This renders one per record.


									<ProCarCom
										key={ proRecObj.ideStr }

										proRecObj={ proRecObj }
									/> // What: Project Card Component. Why: Each project shows as a card. How: This renders the record in the plain card style, since the featured border only means something on Home, where a few projects are picked out.


								))}


							</div>


						) : ( // What: Empty Message Branch. Why: The grid shouldn't just vanish when nothing matches. How: This renders the empty message instead.


							<div className={ cssModObj.empMesDiv }>{ /* What: Empty Message Div Element. Why: The empty message sits where the grid would. How: This holds the message with generous room around it. */ }


								<p className={ cssModObj.empMesPar }>No projects match that filter.</p>{ /* What: Empty Message Paragraph Element. Why: A visitor learns the filter found nothing. How: This says so in muted mono, centered. */ }


							</div>


						) }


					</div>


				</section>



				<section className={ cssModObj.worPrcSec }>{ /* What: Work Process Section Element. Why: The page closes with how every project is run. How: This holds the pattern, the heading block, and the steps. */ }


					<GeoBacCom
						patOpaStr='var( --cdn-pow-006-rec )' // Core-Design-Number to the Power of 6 Reciprocal ~= 0.185
						patVarStr='dots'
					/>{ /* What: Geometric Background Component. Why: A faint field of dots sits behind the process. How: This draws it at about 19% strength. */ }



					<div className={ cssModObj.prcInnDiv }>{ /* What: Process Inner Div Element. Why: The process sits in the page's centered column. How: This stacks the heading block and the steps. */ }


						<SecHeaCom
							aliPosStr='center'
							labTexStr='How I Work'
							subTexStr='Every project follows the same disciplined approach, from first conversation to final deployment.'
							titTexStr='My Process'
						/>{ /* What: Section Header Component. Why: The section opens with its heading. How: This centers the label, title, and subtitle. */ }



						<div className={ cssModObj.prcSteDiv }>{ /* What: Process Steps Div Element. Why: The four steps read in order, with arrows between them where the layout runs in a line. How: This lays out each step and arrow in a row, a two-by-two grid without arrows on tablets, or a column with downward arrows on phones. */ }


							{ PRC_STE_ARR.map( ( prcSteObj, steIndNum ) => ( // What: Process Step Map Call. Why: Every step shows in order. How: This renders each step, followed by an arrow unless it's the last.


								<Fragment key={ prcSteObj.numStr }>{ /* What: Step Fragment. Why: A step and its arrow are one keyed pair with no wrapper. How: This groups them. */ }


									<div className={ cssModObj.steCarDiv }>{ /* What: Step Card Div Element. Why: Each step is one card. How: This stacks its number, title, and description. */ }


										<div className={ cssModObj.steNumDiv }>{ prcSteObj.numStr }</div>{ /* What: Step Number Div Element. Why: The number shows the step's place. How: This prints it. */ }

										<h3 className={ cssModObj.steTitHea }>{ prcSteObj.titStr }</h3>{ /* What: Step Title Heading Element. Why: Each step is named. How: This shows the title as an h3 under the section's h2. */ }

										<p className={ cssModObj.steDesPar }>{ prcSteObj.desStr }</p>{ /* What: Step Description Paragraph Element. Why: A sentence says what the step covers. How: This shows it. */ }


									</div>


									{ steIndNum < PRC_STE_ARR.length - 1 && ( // What: Arrow Presence Check. Why: Arrows only sit between steps. How: This renders one after every step but the last.


										<div
											className={ cssModObj.steArrDiv }

											aria-hidden='true'
										>{ /* What: Step Arrow Div Element. Why: An arrow leads from one step to the next. How: This holds the arrow, hidden from screen readers as decoration. */ }


											<svg
												fill='none'
												height='24'
												stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
												strokeWidth='2'
												viewBox='0 0 24 24'
												width='24'
											>{ /* What: Arrow SVG Element. Why: The arrow is drawn rather than typed, so it matches the site's strokes. How: This draws it in orange. */ }


												<path d='M5 12h14M12 5l7 7-7 7' />{ /* What: Arrow Path Element. Why: The arrow is a shaft and a head. How: This traces both in one stroke. */ }


											</svg>


										</div>


									) }


								</Fragment>


							))}


						</div>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion WorPagCom

// #endregion Components



// #region Exports

export { WorPagCom }; // What: Named Exports. Why: The router's Work route renders this page. How: This exports WorPagCom.

// #endregion Exports


