


// #region Imports

import cssModObj from './home.module.css'; // What: CSS Module Object. Why: The home page's own hero, stats, services, and banner styles live in its own module. How: This maps each class name in home.module.css to its hashed module class.


import { CLI_COU_NUM } from '../../ui/projects.ts';        // What: Client Count Number. Why: The stats count the clients served. How: This is the count taken from the project list.
import { GeoBacCom   } from '../../ui/geo-bg.tsx';         // What: Geometric Background Component. Why: The hero and the services sit over faint patterns. How: This draws the circuit and the dots.
import { Link        } from 'react-router';                // What: Link. Why: The page's buttons move between routes without a full page load. How: This renders each one as a router link.
import { PRO_REC_ARR } from '../../ui/projects.ts';        // What: Project Record Array. Why: The featured section picks its projects from the featured ones. How: This is the list it filters.
import { ProCarCom   } from '../../ui/project-card.tsx';   // What: Project Card Component. Why: Each featured project shows as a card. How: This renders one card per project.
import { SecHeaCom   } from '../../ui/section-header.tsx'; // What: Section Header Component. Why: The featured and services sections open with a heading block. How: This renders each label, title, and subtitle.
import { SHI_COU_NUM } from '../../ui/projects.ts';        // What: Shipped Count Number. Why: The stats count the projects shipped. How: This is the count taken from the project list.
import { useState    } from 'react';                       // What: Use State. Why: The featured projects picked on arrival have to stay put while the page is open. How: This holds the pick made when the page mounts.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * home.tsx = Home
 *
 * @summary
 * The home page: a hero introducing z4nta0 beside a code window, with a
 * ticker of the main technologies; a strip of stats; four featured projects
 * picked at random on each visit; the services offered; and a closing
 * banner inviting a visitor to start a project. The projects shipped and
 * clients served stats are counted from the project list, so they grow as
 * projects are added.
 *
 * Sections:
 *  - Constants
 *  - Helpers
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Constants

const COD_WIN_STR = `const developer = {
  name: "z4nta0",
  role: "Full Stack Dev",
  stack: [
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
  ],
  available: true,
  passion: "Building things
            that matter.",
}`; // What: Code Window String. Why: The hero's code window shows z4nta0 as a code object. How: This is the window's text, shown as written inside its pre element, so its spacing is exact.



// #region SER_CAR_ARR

/**
 * SER_CAR_ARR = Service Card Array
 *
 * @summary
 * The services the services section offers, in the order they show. Every
 * row shares one shape, so its fields carry no comments of their own:
 * - `desStr` (String): Description String, the sentence under the title.
 * - `icoEle` (Element): Icon Element, the service's line icon.
 * - `titStr` (String): Title String, the service's name, also the card's
 *   React key.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const SER_CAR_ARR = [ // What: Service Card Array. Why: The services section shows the same cards every visit. How: Each row holds one service's title, description, and icon.


	{ // What: Local SEO Service Row. Why: Local businesses need to be found nearby. How: This describes the local search service.


		titStr : 'Local SEO Optimized',

		desStr : 'Optimized for local search visibility, helping businesses attract nearby customers.',

		icoEle : ( // What: Magnifier Icon. Why: A magnifying glass over lines stands for search. How: This draws it at the card's icon size.


			<svg
				fill='none'
				height='28'
				stroke='currentColor'
				strokeWidth='1.8'
				viewBox='0 0 24 24'
				width='28'
			>{ /* What: Search Icon SVG Element. Why: The icon marks the search service. How: This draws a magnifier over lines of text. */ }


				<circle
					cx='11'
					cy='11'
					r='7'
				/>{ /* What: Lens Circle Element. Why: The lens is the magnifier's head. How: This draws it. */ }

				<line
					x1='16.5'
					x2='21'
					y1='16.5'
					y2='21'
				/>{ /* What: Handle Line Element. Why: The handle completes the magnifier. How: This draws it from the lens outward. */ }

				<line
					x1='8'
					x2='14'
					y1='11'
					y2='11'
				/>{ /* What: Text Line Element. Why: Lines inside the lens stand for the text being searched. How: This draws one line. */ }

				<line
					x1='8'
					x2='11'
					y1='8'
					y2='8'
				/>{ /* What: Text Line Element. Why: Lines inside the lens stand for the text being searched. How: This draws one line. */ }

				<line
					x1='8'
					x2='13'
					y1='14'
					y2='14'
				/>{ /* What: Text Line Element. Why: Lines inside the lens stand for the text being searched. How: This draws one line. */ }


			</svg>


		)


	},

	{ // What: Frontend Service Row. Why: The interface is what visitors use. How: This describes the frontend service.


		titStr : 'Frontend Development',

		desStr : 'Pixel-perfect UIs built with React, TypeScript, and modern CSS. Performant, accessible, and a joy to use.',

		icoEle : ( // What: Monitor Icon. Why: A screen stands for the interface. How: This draws it at the card's icon size.


			<svg
				fill='none'
				height='28'
				stroke='currentColor'
				strokeWidth='1.8'
				viewBox='0 0 24 24'
				width='28'
			>{ /* What: Monitor Icon SVG Element. Why: The icon marks the frontend service. How: This draws a screen on a stand. */ }


				<rect
					height='14'
					rx='2'
					width='20'
					x='2'
					y='3'
				/>{ /* What: Screen Rect Element. Why: The screen is the icon's body. How: This draws it with rounded corners. */ }

				<path d='M8 21h8M12 17v4' />{ /* What: Stand Path Element. Why: The stand holds the screen up. How: This draws its neck and base. */ }


			</svg>


		)


	},

	{ // What: Backend Service Row. Why: Data and services run behind the interface. How: This describes the backend service.


		titStr : 'Backend Development',

		desStr : 'Scalable Node.js services, Next.js and React Router APIs, with dependable database design.',

		icoEle : ( // What: Database Icon. Why: A stack of disks stands for stored data. How: This draws it at the card's icon size.


			<svg
				fill='none'
				height='28'
				stroke='currentColor'
				strokeWidth='1.8'
				viewBox='0 0 24 24'
				width='28'
			>{ /* What: Database Icon SVG Element. Why: The icon marks the backend service. How: This draws a cylinder of stacked disks. */ }


				<ellipse
					cx='12'
					cy='5'
					rx='9'
					ry='3'
				/>{ /* What: Top Ellipse Element. Why: The cylinder's top is an ellipse. How: This draws it. */ }

				<path d='M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5' />{ /* What: Body Path Element. Why: The cylinder's sides and base hold the data. How: This draws them. */ }

				<path d='M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3' />{ /* What: Middle Ring Path Element. Why: A ring splits the cylinder into stacked disks. How: This draws it across the middle. */ }


			</svg>


		)


	},

	{ // What: Hosting Service Row. Why: A site has to launch and keep running after it's built, which completes the end-to-end story. How: This describes the hosting and maintenance service.


		titStr : 'Hosting & Maintenance',

		desStr : 'Fast, secure launches on modern hosting, with updates, backups, and fixes so your site keeps running smoothly.',

		icoEle : ( // What: Cloud Check Icon. Why: A cloud with a check stands for a site hosted and looked after. How: This draws it at the card's icon size.


			<svg
				fill='none'
				height='28'
				stroke='currentColor'
				strokeWidth='1.8'
				viewBox='0 0 24 24'
				width='28'
			>{ /* What: Cloud Check Icon SVG Element. Why: The icon marks the hosting service. How: This draws a cloud holding a check mark. */ }


				<path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' />{ /* What: Cloud Path Element. Why: The cloud stands for hosting. How: This draws its outline. */ }

				<path d='M9 14.5l2 2 4-4' />{ /* What: Check Path Element. Why: The check says the site is kept in good shape. How: This draws a check mark inside the cloud. */ }


			</svg>


		)


	}


];

// #endregion SER_CAR_ARR



const SKI_TIC_ARR = [ // What: Skill Ticker Array. Why: The hero's ticker scrolls through the main technologies. How: This lists each one in order.


	'TypeScript', // What: TypeScript Skill. Why: Every project is written in TypeScript. How: This is the first ticker item.
	'React',      // What: React Skill. Why: Every project's interface is built with React. How: This is the second ticker item.
	'Node.js',    // What: Node.js Skill. Why: The tooling and servers run on Node.js. How: This is the third ticker item.
	'Next.js',    // What: Next.js Skill. Why: z4nta0 has worked with Next.js beyond the listed projects. How: This is the fourth ticker item.
	'Vite'        // What: Vite Skill. Why: Every project builds with Vite. How: This is the last ticker item.


];

const STA_REC_ARR = [ // What: Stat Record Array. Why: The stats strip shows the same four figures every visit. How: Each row holds a figure and its label.


	{ labStr : 'Years Experience',    valStr : '10+'                }, // What: Years Stat Row. Why: z4nta0 has been a developer since 2013. How: This shows ten plus years.
	{ labStr : 'Projects Shipped',    valStr : `${ SHI_COU_NUM }+` }, // What: Projects Stat Row. Why: The count should grow as projects are added, and older projects that are no longer online still count. How: This shows the project list's count with a plus.
	{ labStr : 'Happy Clients',       valStr : `${ CLI_COU_NUM }+` }, // What: Clients Stat Row. Why: The count should grow as client projects are added, and earlier clients whose sites are no longer online still count. How: This shows the client count with a plus.
	{ labStr : 'Client Satisfaction', valStr : '100%'               }  // What: Satisfaction Stat Row. Why: Every client has been satisfied. How: This shows one hundred percent.


];

// #endregion Constants



// #region Helpers



// #region ranPicFun

/**
 * ranPicFun = Random Pick Function
 *
 * @summary
 * Picks a given number of items from a list at random, in a random order,
 * never repeating one. It shuffles a copy of the list with the Fisher-Yates
 * method, so every item is equally likely to land in every position, and
 * keeps the first ones. The list itself is left untouched.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param souRecArr - Source Record Array: The list to pick from, which stays
 *                    unchanged.
 * @param picCouNum - Pick Count Number: How many items to pick, or every item
 *                    when the list holds fewer.
 *
 * @returns The picked items in their shuffled order.
 *
 * @example
 * ```ts
 * ranPicFun(PRO_REC_ARR, 4) // => four project records in a random order
 * ```
 *
*/

function ranPicFun< T > ( souRecArr : readonly T[], picCouNum : number ) : T[] {


	const shuRecArr = [ ...souRecArr ]; // What: Shuffled Record Array. Why: The source list has to keep its own order. How: This copies it, so the shuffle works on the copy.


	for ( let curIndNum = shuRecArr.length - 1; curIndNum > 0; curIndNum-- ) { // What: Fisher-Yates Loop. Why: Every order should be equally likely. How: This walks down the copy, swapping each item with a random one at or before it.


		const swaIndNum = Math.floor( Math.random() * ( curIndNum + 1 ) ); // What: Swap Index Number. Why: The item trades places with a random earlier one, or stays put. How: This picks a whole number from 0 to the current index.


		[ shuRecArr[ curIndNum ], shuRecArr[ swaIndNum ] ] = [ shuRecArr[ swaIndNum ], shuRecArr[ curIndNum ] ]; // What: Item Swap. Why: The shuffle moves each item into its random place. How: This swaps the two items through array destructuring.


	}



	return shuRecArr.slice( 0, picCouNum );


}

// #endregion ranPicFun

// #endregion Helpers



// #region Components

// #region HomPagCom

/**
 * HomPagCom = Home Page Component
 *
 * @summary
 * Renders the home page. The hero pairs the pitch, its two buttons, and a
 * ticker that scrolls SKI_TIC_ARR twice over, so the loop has no seam, with
 * a code window and a floating badge, all decoration hidden from screen
 * readers. Below it come the stats from STA_REC_ARR, four featured
 * projects picked at random with a link to the rest, a card per service in
 * SER_CAR_ARR, and a banner leading to the Contact page.
 *
 * It also sets the page's canonical address, which React moves into the
 * document head.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's canonical link and wrapper div.
 *
 * @example
 * ```tsx
 * HomPagCom() // => <HomPagCom />
 * ```
 *
*/

function HomPagCom () : JSX.Element {


	const [ feaProArr ] = useState( () => ranPicFun( PRO_REC_ARR.filter( ( proRecObj ) => proRecObj.feaBoo ), 4 ) ); // What: Featured Project Array. Why: Home shows a taste of the work that changes from visit to visit, four cards so the grid's rows always stay even. How: This picks four featured projects at random once, when the page mounts, and keeps them while it stays open.



	return (


		<>{ /* What: Page Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<link
				href='https://techgeek.dev/'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every address Netlify serves the page at should count as its one live address. How: React 19 moves this link into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page's sections stack in one column. How: This holds them and fades in like every page. */ }


				<section className={ cssModObj.homHerSec }>{ /* What: Home Hero Section Element. Why: The page opens by introducing z4nta0. How: This holds the pattern, the shapes, the hero's two columns, and the divider. */ }


					<GeoBacCom
						patOpaNum={ 0.18 }
						patVarStr='circuit'
					/>{ /* What: Hero Geometric Background Component. Why: A faint circuit sits behind the hero. How: This draws it at 18% strength. */ }



					<div
						className={ cssModObj.shaLayDiv }

						aria-hidden='true'
					>{ /* What: Shape Layer Div Element. Why: Slowly turning shapes give the hero motion. How: This holds them, hidden from screen readers as decoration. */ }


						<div className={` ${ cssModObj.herShaDiv }   ${ cssModObj.herShaDivHexagon } `} />{ /* What: Hero Shape Div Element. Why: A hexagon echoes the site's mark. How: This draws it turning slowly. */ }

						<div className={` ${ cssModObj.herShaDiv }   ${ cssModObj.herShaDivCircle } `} />{ /* What: Hero Shape Div Element. Why: A circle varies the shapes. How: This draws it turning slowly. */ }

						<div className={` ${ cssModObj.herShaDiv }   ${ cssModObj.herShaDivSquare } `} />{ /* What: Hero Shape Div Element. Why: A square varies the shapes. How: This draws it turning slowly. */ }


					</div>



					<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The pitch and the code window sit side by side in the page's centered column. How: This lays out the two columns. */ }


						<div className={ cssModObj.herConDiv }>{ /* What: Hero Content Div Element. Why: The pitch reads as one column. How: This stacks the label, heading, line, buttons, and ticker. */ }


							<div className={ cssModObj.herLabDiv }>{ /* What: Hero Label Div Element. Why: The label says z4nta0 is taking on work. How: This shows a pulsing dot beside the line. */ }
								<span
									className={ cssModObj.pulDotSpa }

									aria-hidden='true'
								/>{ /* What: Pulse Dot Span Element. Why: A pulsing dot signals availability. How: This draws it, hidden from screen readers as decoration. */ }

								<span className={ cssModObj.avaTexSpa }>Available for freelance work</span>{ /* What: Availability Text Span Element. Why: The label's words say what the dot means. How: This shows them in the mono font. */ }
							</div>

							<h1 className={ cssModObj.herTitHea }>{ /* What: Hero Title Heading Element. Why: The page's heading sums up what z4nta0 does. How: This sets I Build Digital Experiences over two lines, with Digital in the accent and a closing dot. */ }
								I Build <span className={ cssModObj.titAccSpa }>Digital</span>
								<br />
								Experiences
								<span className={ cssModObj.titDotSpa }>.</span>
							</h1>

							<p className={ cssModObj.herSubPar }>{ /* What: Hero Subtitle Paragraph Element. Why: A line under the heading says what kind of work this is. How: This describes the full-stack work for local businesses. */ }
								Full-stack web developer specializing in performant, accessible, and
								beautifully crafted websites for local businesses, from backend architecture to
								pixel-perfect frontends.
							</p>

							<div className={ cssModObj.herActDiv }>{ /* What: Hero Actions Div Element. Why: The pitch ends with the two next steps. How: This sets the buttons side by side. */ }


								<Link
									className={ cssModObj.butPriAnc }

									to='/work'
								>{ /* What: Button Primary Anchor Element. Why: Most visitors want to see the work first. How: This routes to the Work page with an arrow. */ }


									View My Work

									<svg
										fill='none'
										height='16'
										stroke='currentColor'
										strokeWidth='2.5'
										viewBox='0 0 24 24'
										width='16'
									>{ /* What: Arrow SVG Element. Why: An arrow invites the click. How: This draws it after the label. */ }


										<path d='M5 12h14M12 5l7 7-7 7' />{ /* What: Arrow Path Element. Why: The arrow is a shaft and a head. How: This traces both in one stroke. */ }


									</svg>


								</Link>



								<Link
									className={ cssModObj.butSecAnc }

									to='/contact'
								>Get In Touch</Link>{ /* What: Button Secondary Anchor Element. Why: A visitor ready to talk can go straight to Contact. How: This routes there as the secondary button. */ }


							</div>


							<div className={ cssModObj.skiTicDiv }>{ /* What: Skills Ticker Div Element. Why: The main technologies scroll past under the pitch. How: This clips the scrolling row. */ }


								<div className={ cssModObj.ticInnDiv }>{ /* What: Ticker Inner Div Element. Why: The row moves as one strip. How: This holds every item and slides it along. */ }


									{ [ ...SKI_TIC_ARR, ...SKI_TIC_ARR ].map( ( skiNamStr, skiIndNum ) => ( // What: Ticker Item Map Call. Why: The strip repeats the list once, so its loop has no seam. How: This renders each technology twice over, keyed by position since each name appears twice.


										<span
											key={ skiIndNum }

											className={ cssModObj.ticIteSpa }
										>{ skiNamStr }</span> // What: Ticker Item Span Element. Why: Each technology is one item in the strip. How: This shows its name.


									))}


								</div>


							</div>


						</div>



						<div
							className={ cssModObj.herVisDiv }

							aria-hidden='true'
						>{ /* What: Hero Visual Div Element. Why: A code window and a badge illustrate the pitch. How: This holds both, hidden from screen readers as decoration. */ }


							<div className={ cssModObj.codWinDiv }>{ /* What: Code Window Div Element. Why: z4nta0 is introduced as a code object, the way a developer would. How: This draws an editor window around the code. */ }


								<div className={ cssModObj.winBarDiv }>{ /* What: Window Bar Div Element. Why: A title bar makes the window read as an editor. How: This shows three dots and the file name. */ }


									<span className={` ${ cssModObj.winDotSpa }   ${ cssModObj.winDotSpaFirst } `} />{ /* What: Window Dot Span Element. Why: Editor windows have three colored dots. How: This draws the first. */ }

									<span className={` ${ cssModObj.winDotSpa }   ${ cssModObj.winDotSpaSecond } `} />{ /* What: Window Dot Span Element. Why: Editor windows have three colored dots. How: This draws the second. */ }

									<span className={` ${ cssModObj.winDotSpa }   ${ cssModObj.winDotSpaThird } `} />{ /* What: Window Dot Span Element. Why: Editor windows have three colored dots. How: This draws the third. */ }

									<span className={ cssModObj.winTitSpa }>techgeek.dev.ts</span>{ /* What: Window Title Span Element. Why: The window names its file after the site. How: This shows techgeek.dev.ts. */ }


								</div>

								<pre className={ cssModObj.codBloPre }>{ /* What: Code Block Pre Element. Why: The code keeps its line breaks and indentation. How: This shows the code as written. */ }
									<code className={ cssModObj.codTexCod }>{ COD_WIN_STR }</code>{ /* What: Code Text Code Element. Why: The text is code. How: This marks it as code and prints COD_WIN_STR. */ }
								</pre>

								<svg
									className={ cssModObj.nodOveSvg }

									viewBox='0 0 320 240'
								>{ /* What: Node Overlay SVG Element. Why: A few linked nodes give the window the site's geometric touch. How: This draws three dots joined by two lines. */ }


									<circle
										cx='280'
										cy='20'
										fill='var(--acc-mai-col)' // Accent Main Color = #F26419
										opacity='0.8'
										r='4'
									/>{ /* What: Node Circle Element. Why: Each node is a dot. How: This draws one in orange. */ }

									<circle
										cx='300'
										cy='60'
										fill='var(--acc-sec-col)' // Accent Secondary Color = #7DB9D8
										opacity='0.7'
										r='2.5'
									/>{ /* What: Node Circle Element. Why: Each node is a dot. How: This draws one in blue. */ }

									<circle
										cx='260'
										cy='200'
										fill='var(--acc-mai-col)' // Accent Main Color = #F26419
										opacity='0.6'
										r='4'
									/>{ /* What: Node Circle Element. Why: Each node is a dot. How: This draws one in orange. */ }

									<line
										opacity='0.5'
										stroke='var(--acs-tin-col)' // Accent-Secondary Tint Color = #B8D9EC
										strokeWidth='1'
										x1='280'
										x2='300'
										y1='20'
										y2='60'
									/>{ /* What: Link Line Element. Why: Lines join the nodes. How: This draws one in the light blue. */ }

									<line
										opacity='0.5'
										stroke='var(--acs-tin-col)' // Accent-Secondary Tint Color = #B8D9EC
										strokeWidth='1'
										x1='300'
										x2='260'
										y1='60'
										y2='200'
									/>{ /* What: Link Line Element. Why: Lines join the nodes. How: This draws one in the light blue. */ }


								</svg>


							</div>


							<div className={ cssModObj.floBadDiv }>{ /* What: Floating Badge Div Element. Why: A badge highlights that z4nta0's work is open source. How: This shows a small mark beside its figure and label. */ }


								<svg
									fill='none'
									height='32'
									viewBox='0 0 28 28'
									width='32'
								>{ /* What: Badge Mark SVG Element. Why: A small hexagon echoes the site's mark. How: This draws it with a blue center. */ }


									<polygon
										fill='none'
										points='14,2 26,8 26,20 14,26 2,20 2,8'
										stroke='var(--acc-mai-col)' // Accent Main Color = #F26419
										strokeWidth='1.5'
									/>{ /* What: Badge Hexagon Polygon Element. Why: The mark's outline is an orange hexagon. How: This traces it. */ }

									<circle
										cx='14'
										cy='14'
										fill='var(--acc-sec-col)' // Accent Secondary Color = #7DB9D8
										r='4'
									/>{ /* What: Badge Center Circle Element. Why: A blue dot fills the mark's center. How: This draws it. */ }


								</svg>

								<div>{ /* What: Badge Text Div Element. Why: The figure and its label read as one. How: This stacks them. */ }


									<div className={ cssModObj.badValDiv }>100%</div>{ /* What: Badge Value Div Element. Why: The figure is the badge's point. How: This shows one hundred percent. */ }

									<div className={ cssModObj.badLabDiv }>Open Source</div>{ /* What: Badge Label Div Element. Why: The label says what the figure counts. How: This shows Open Source. */ }


								</div>


							</div>


						</div>


					</div>



					<div className={ cssModObj.herDivDiv } />{ /* What: Hero Divider Div Element. Why: A diagonal edge leads from the hero into the stats. How: This draws the slanted divider. */ }


				</section>



				<section className={ cssModObj.homStaSec }>{ /* What: Home Stats Section Element. Why: A few figures sum up z4nta0's track record. How: This holds the stats strip. */ }


					<div className={ cssModObj.staInnDiv }>{ /* What: Stats Inner Div Element. Why: The strip sits in the page's centered column. How: This holds the grid. */ }


						<div className={ cssModObj.staGriDiv }>{ /* What: Stats Grid Div Element. Why: The figures line up in a row. How: This lays out one item per stat. */ }


							{ STA_REC_ARR.map( ( staRecObj ) => ( // What: Stat Map Call. Why: Every stat shows. How: This renders one item per row.


								<div
									key={ staRecObj.labStr }

									className={ cssModObj.staIteDiv }
								>{ /* What: Stat Item Div Element. Why: Each figure sits above its label. How: This stacks them. */ }
									<span className={ cssModObj.staValSpa }>{ staRecObj.valStr }</span>{ /* What: Stat Value Span Element. Why: The figure is the stat's point. How: This shows it large. */ }

									<span className={ cssModObj.staLabSpa }>{ staRecObj.labStr }</span>{ /* What: Stat Label Span Element. Why: The label says what the figure counts. How: This shows it under the figure. */ }
								</div>


							))}


						</div>


					</div>


				</section>



				<section className={ cssModObj.homFeaSec }>{ /* What: Home Featured Section Element. Why: The best projects show right on the home page. How: This holds the heading row and the cards. */ }


					<div className={ cssModObj.feaInnDiv }>{ /* What: Featured Inner Div Element. Why: The section sits in the page's centered column. How: This stacks the heading row and the grid. */ }


						<div className={ cssModObj.feaHeaDiv }>{ /* What: Featured Header Div Element. Why: The heading and the link to every project share a row. How: This sets them side by side. */ }


							<SecHeaCom
								labTexStr='Selected Work'
								subTexStr='A curated selection of full-stack projects, from idea to deployed product.'
								titTexStr="Projects I'm Proud Of"
							/>{ /* What: Featured Section Header Component. Why: The section opens with its heading. How: This shows its label, title, and subtitle. */ }



							<Link
								className={ cssModObj.vieAllAnc }

								to='/work'
							>{ /* What: View All Anchor Element. Why: Home shows only four projects, so the rest are a click away. How: This routes to the Work page with an arrow. */ }


								View all projects

								<svg
									className={ cssModObj.vieArrSvg }

									fill='none'
									height='14'
									stroke='currentColor'
									strokeWidth='2.5'
									viewBox='0 0 24 24'
									width='14'
								>{ /* What: View Arrow SVG Element. Why: An arrow invites the click and nudges toward the Work page on hover. How: This draws it after the label. */ }


									<path d='M5 12h14M12 5l7 7-7 7' />{ /* What: Arrow Path Element. Why: The arrow is a shaft and a head. How: This traces both in one stroke. */ }


								</svg>


							</Link>


						</div>

						<div className={ cssModObj.proGriDiv }>{ /* What: Projects Grid Div Element. Why: The featured cards line up in columns. How: This lays out one card per featured project. */ }


							{ feaProArr.map( ( proRecObj ) => ( // What: Featured Card Map Call. Why: Every featured project gets a card. How: This renders one per record.


								<ProCarCom
									key={ proRecObj.ideStr }

									isaFeaBoo
									proRecObj={ proRecObj }
								/> // What: Project Card Component. Why: Each featured project shows as a card. How: This renders the record with the featured styling.


							))}


						</div>


					</div>


				</section>



				<section className={ cssModObj.homSerSec }>{ /* What: Home Services Section Element. Why: A visitor learns what z4nta0 offers. How: This holds the pattern, the heading block, and the service cards. */ }


					<GeoBacCom
						patOpaNum={ 0.25 }
						patVarStr='dots'
					/>{ /* What: Services Geometric Background Component. Why: A faint field of dots sits behind the services. How: This draws it at 25% strength. */ }



					<div className={ cssModObj.serInnDiv }>{ /* What: Services Inner Div Element. Why: The services sit in the page's centered column. How: This stacks the heading block and the cards. */ }


						<SecHeaCom
							aliPosStr='center'
							labTexStr='What I Do'
							subTexStr='From backend architecture to frontend UI, I handle the full picture.'
							titTexStr='End-to-End Development'
						/>{ /* What: Services Section Header Component. Why: The section opens with its heading. How: This centers the label, title, and subtitle. */ }



						<div className={ cssModObj.serGriDiv }>{ /* What: Service Grid Div Element. Why: The service cards line up in columns. How: This lays out one card per service. */ }


							{ SER_CAR_ARR.map( ( serCarObj ) => ( // What: Service Card Map Call. Why: Every service gets a card. How: This renders one per row.


								<div
									key={ serCarObj.titStr }

									className={ cssModObj.serCarDiv }
								>{ /* What: Service Card Div Element. Why: Each service is one card. How: This stacks its icon, title, and description. */ }


									<div className={ cssModObj.serIcoDiv }>{ serCarObj.icoEle }</div>{ /* What: Service Icon Div Element. Why: An icon marks each service at a glance. How: This frames the row's icon. */ }

									<h3 className={ cssModObj.serTitHea }>{ serCarObj.titStr }</h3>{ /* What: Service Title Heading Element. Why: Each service is named. How: This shows the title as an h3 under the section's h2. */ }

									<p className={ cssModObj.serDesPar }>{ serCarObj.desStr }</p>{ /* What: Service Description Paragraph Element. Why: A sentence says what the service covers. How: This shows it. */ }


								</div>


							))}


						</div>


					</div>


				</section>



				<section className={ cssModObj.homCtaSec }>{ /* What: Home Call-To-Action Section Element. Why: The page ends by inviting a visitor to start a project. How: This holds the banner's line and button. */ }


					<div className={ cssModObj.ctaInnDiv }>{ /* What: Call-To-Action Inner Div Element. Why: The banner sits in the page's centered column. How: This sets the text and the button side by side. */ }


						<div>{ /* What: Banner Text Div Element. Why: The label and heading read as one. How: This stacks them. */ }


							<span className={ cssModObj.ctaLabSpa }>Ready to build something?</span>{ /* What: Call-To-Action Label Span Element. Why: A question leads into the invitation. How: This shows it above the heading. */ }

							<h2 className={ cssModObj.ctaTitHea }>Let's Work Together</h2>{ /* What: Call-To-Action Title Heading Element. Why: The banner's heading makes the invitation. How: This shows it as an h2. */ }


						</div>

						<div className={ cssModObj.ctaActDiv }>{ /* What: Call-To-Action Actions Div Element. Why: The banner's button sits apart from its text. How: This holds the button. */ }


							<Link
								className={ cssModObj.ctaStaAnc }

								to='/contact'
							>Start a Project</Link>{ /* What: Call-To-Action Start Anchor Element. Why: A visitor ready to start goes straight to Contact. How: This routes there as the banner's button. */ }


						</div>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion HomPagCom

// #endregion Components



// #region Exports

export { HomPagCom }; // What: Named Exports. Why: The router's home route renders this page. How: This exports HomPagCom.

// #endregion Exports


