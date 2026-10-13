


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
 * hexagons, a heading and a line saying the page doesn't exist, and a button
 * back to the home page. The router's catch-all route renders it.
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
 * Renders the 404 page. The large 404 and the hexagon drawing behind it are
 * hidden from screen readers as decoration, since the heading already says
 * the page wasn't found, and the Go Home button routes to the root path.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * NotFouCom() // => <NotFouCom />
 * ```
 *
*/

function NotFouCom () : JSX.Element {


	return (


		<div className={ cssModObj.wrap }>{ /* What: Not Found Wrap Div Element. Why: The 404 content sits centered in the page. How: This fills the space between the bar and the footer and fades in like every page. */ }


			<div className={ cssModObj.inner }>{ /* What: Not Found Inner Div Element. Why: The number, the drawing, the text, and the button read as one centered block. How: This stacks them. */ }


				<div
					className={ cssModObj.code }

					aria-hidden='true'
				>404</div>{ /* What: Error Code Div Element. Why: A large 404 tells a visitor at a glance what happened. How: This shows the number, hidden from screen readers since the heading says the same. */ }

				<svg
					className={ cssModObj.geo }

					fill='none'
					viewBox='0 0 200 200'

					aria-hidden='true'
				>{ /* What: Hexagon Drawing SVG Element. Why: Nested hexagons echo the site's mark behind the number. How: This draws two hexagons and a ring, hidden from screen readers as decoration. */ }


					<polygon
						opacity='0.5'
						points='100,10 190,55 190,145 100,190 10,145 10,55'
						stroke='var(--acc-sec-col)' // Accent Secondary Color = #7DB9D8
						strokeWidth='1.5'
					/>{ /* What: Outer Hexagon Polygon Element. Why: The drawing's outer shape is a faint blue hexagon. How: This traces it at half strength. */ }

					<polygon
						opacity='0.4'
						points='100,30 170,67.5 170,132.5 100,170 30,132.5 30,67.5'
						stroke='var(--acc-mai-col)' // Accent Main Color = #F26419
						strokeWidth='1'
					/>{ /* What: Inner Hexagon Polygon Element. Why: A thinner orange hexagon sits inside the blue one. How: This traces it at 40% strength. */ }

					<circle
						cx='100'
						cy='100'
						fill='none'
						opacity='0.6'
						r='20'
						stroke='var(--acc-mai-col)' // Accent Main Color = #F26419
						strokeWidth='1.5'
					/>{ /* What: Center Ring Circle Element. Why: An orange ring marks the drawing's center. How: This traces it at 60% strength. */ }


				</svg>

				<h1 className={ cssModObj.title }>Page Not Found</h1>{ /* What: Not Found Title Heading Element. Why: The page's heading says what went wrong. How: This shows it as the page's h1. */ }

				<p className={ cssModObj.desc }>{ /* What: Not Found Description Paragraph Element. Why: A short line explains why the page is missing. How: This says the address doesn't exist or has moved. */ }
					The page you're looking for doesn't exist or has been moved.
				</p>



				<Link
					className={ cssModObj.btn }

					to='/'
				>Go Home</Link>{ /* What: Go Home Link. Why: A visitor who lands here needs a way back into the site. How: This routes to the home page as a button. */ }


			</div>


		</div>


	);


}

// #endregion NotFouCom

// #endregion Components



// #region Exports

export { NotFouCom }; // What: Named Exports. Why: The router's catch-all route renders the 404 page. How: This exports NotFouCom.

// #endregion Exports


