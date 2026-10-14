


// #region Imports

import cssModObj from './not-found.module.css'; // What: CSS Module Object. Why: The 404 page's own layout and button styles live in its own module. How: This maps each class name in not-found.module.css to its hashed module class.


import { Link } from 'react-router'; // What: Link. Why: The page's button takes a visitor home without a full page load. How: This renders it as a router link.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * not-found.tsx = Not Found
 *
 * @summary
 * The page every unknown address shows: a large 404 over a pair of nested
 * hexagons, a heading and a line saying the page doesn't exist, and two ways
 * onward, back home and to the Contact page. Its own title and a noindex
 * robots tag keep search engines from indexing it under every mistyped
 * address. The router's catch-all route renders it.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region NotFouCom

/**
 * NotFouCom = Not Found Component
 *
 * @summary
 * Renders the 404 page's title and its noindex robots tag, which React moves
 * into the document head, and the page itself. The large 404 and the
 * hexagon drawing behind it are hidden from screen readers as decoration,
 * since the heading already says the page wasn't found. Go Home routes to
 * the root path, and Get In Touch to the Contact page, the site's main
 * action.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The 404 page's title, robots tag, and wrapper div.
 *
 * @example
 * ```tsx
 * NotFouCom() // => <NotFouCom />
 * ```
 *
*/

function NotFouCom () : JSX.Element {


	return (


		<>{ /* What: Not Found Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>Page Not Found | TechGeek.dev</title>{ /* What: Page Title Element. Why: A visitor's tab and history should say the address they tried doesn't exist. How: React 19 moves this title into the document head while the page is shown. */ }

			<meta
				name='robots'

				content='noindex'
			/>{ /* What: Robots Meta Element. Why: The host answers every unknown path with the site and a 200 status, so search engines would otherwise index this page under every mistyped address. How: React 19 moves this tag into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The 404 content sits centered in the page. How: This fills the space between the bar and the footer and fades in like every page. */ }


				<div className={ cssModObj.nofInnDiv }>{ /* What: Not-Found Inner Div Element. Why: The number, the drawing, the text, and the buttons read as one centered block. How: This stacks them. */ }


					<div
						className={ cssModObj.errCodDiv }

						aria-hidden='true'
					>404</div>{ /* What: Error Code Div Element. Why: A large 404 tells a visitor at a glance what happened. How: This shows the number, hidden from screen readers since the heading says the same. */ }

					<svg
						className={ cssModObj.hexDraSvg }

						fill='none'
						viewBox='0 0 200 200'

						aria-hidden='true'
					>{ /* What: Hexagon Drawing SVG Element. Why: Nested hexagons echo the site's mark behind the number. How: This draws two hexagons and a ring, hidden from screen readers as decoration. */ }


						<polygon
							opacity='0.5'
							points='100,10 190,55 190,145 100,190 10,145 10,55'
							stroke='var( --acc-sec-col )' // Accent Secondary Color = #7DB9D8
							strokeWidth='1.5'
						/>{ /* What: Outer Hexagon Polygon Element. Why: The drawing's outer shape is a faint blue hexagon. How: This traces it at half strength. */ }

						<polygon
							opacity='0.4'
							points='100,30 170,67.5 170,132.5 100,170 30,132.5 30,67.5'
							stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
							strokeWidth='1'
						/>{ /* What: Inner Hexagon Polygon Element. Why: A thinner orange hexagon sits inside the blue one. How: This traces it at 40% strength. */ }

						<circle
							cx='100'
							cy='100'
							fill='none'
							opacity='0.6'
							r='20'
							stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
							strokeWidth='1.5'
						/>{ /* What: Center Ring Circle Element. Why: An orange ring marks the drawing's center. How: This traces it at 60% strength. */ }


					</svg>

					<h1 className={ cssModObj.nofTitHea }>Page Not Found</h1>{ /* What: Not-Found Title Heading Element. Why: The page's heading says what went wrong. How: This shows it as the page's h1. */ }

					<p className={ cssModObj.nofDesPar }>{ /* What: Not-Found Description Paragraph Element. Why: A short line explains why the page is missing. How: This says the address doesn't exist or has moved. */ }
						The page you're looking for doesn't exist or has been moved.
					</p>

					<div className={ cssModObj.nofActDiv }>{ /* What: Not-Found Actions Div Element. Why: A visitor who lands here gets two ways onward side by side. How: This sets the buttons in a row that wraps. */ }


						<Link
							className={ cssModObj.butPriAnc }

							to='/'
						>Go Home</Link>{ /* What: Go Home Link. Why: Home is the natural place to start over. How: This routes to the home page as a button. */ }



						<Link
							className={ cssModObj.butSecAnc }

							to='/contact'
						>Get In Touch</Link>{ /* What: Get In Touch Link. Why: Getting in touch is the site's main action. How: This routes to the Contact page as an outlined button. */ }


					</div>


				</div>


			</div>


		</>


	);


}

// #endregion NotFouCom

// #endregion Components



// #region Exports

export { NotFouCom }; // What: Named Exports. Why: The router's catch-all route renders the 404 page. How: This exports NotFouCom.

// #endregion Exports


