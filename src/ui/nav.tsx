


// #region Imports

import cssModObj from './nav.module.css'; // What: CSS Module Object. Why: The bar's own layout, link, toggle, and drawer styles live in its own module. How: This maps each class name in nav.module.css to its hashed module class.


import { NavLink     } from 'react-router';    // What: Nav Link. Why: The bar's links mark the page that's showing. How: This renders each link and reports whether its route is active.
import { PAG_LIN_ARR } from './page-links.ts'; // What: Page Link Array. Why: The bar and the phone menu link to the same pages as the footer. How: This is the shared list they render.
import { useEffect   } from 'react';           // What: Use Effect. Why: The bar listens for scrolling and for page changes. How: This runs both listeners.
import { useLocation } from 'react-router';    // What: Use Location. Why: The phone menu closes whenever the page changes. How: This reports the current location.
import { useState    } from 'react';           // What: Use State. Why: The bar remembers whether the page has scrolled and whether the menu is open. How: This holds both flags.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * nav.tsx = Navigation Bar
 *
 * @summary
 * The bar fixed to the top of every page: the hexagon mark and the
 * TechGeek.dev wordmark linking home, a link to each page with the current
 * one marked, a Hire Me button, and on phones a toggle that opens a drawer
 * holding the same links. The bar takes its scrolled style once the page
 * moves, and the drawer closes whenever the page changes.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region NavBarCom

/**
 * NavBarCom = Navigation Bar Component
 *
 * @summary
 * Renders the bar and the phone drawer. It tracks whether the page has
 * scrolled past 24px, switching the bar to its scrolled style, and whether
 * the drawer is open, which the toggle flips and any change of page resets.
 * Both the bar's and the drawer's links come from the shared page list, each
 * adding the active class while its route shows. The Hire Me buttons are
 * plain links to the Contact page.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The bar's header element.
 *
 * @example
 * ```tsx
 * NavBarCom() // => <NavBarCom />
 * ```
 *
*/

function NavBarCom () : JSX.Element {


	// #region Scroll State

	const [ isaScrBoo, setIsaScrBoo ] = useState( false ); // What: Is-A Scrolled Boolean And Setter. Why: The bar changes its look once the page moves under it. How: This starts false, at the top of the page.


	useEffect( () => { // What: Scroll Listener Effect. Why: The scrolled flag has to follow the page as it moves. How: This listens for scrolling and removes the listener on unmount.


		const onScrFun = () => setIsaScrBoo( window.scrollY > 24 ); // What: On Scroll Function. Why: The bar counts as scrolled once the page has moved more than 24px. How: This sets the flag from the scroll position.


		window.addEventListener( 'scroll', onScrFun, { passive : true } ); // What: Scroll Listener Registration. Why: The flag updates as the visitor scrolls. How: This listens passively, so it never delays scrolling.



		return () => window.removeEventListener( 'scroll', onScrFun ); // What: Scroll Listener Cleanup. Why: A listener left behind would update a bar that no longer exists. How: This removes it when the bar unmounts.


	}, [] ); // What: Effect Dependency Array. Why: The listener only needs adding once. How: This runs the effect on mount only.

	// #endregion Scroll State



	// #region Menu State

	const [ menOpeBoo, setMenOpeBoo ] = useState( false ); // What: Menu Open Boolean And Setter. Why: The phone drawer opens and closes with the toggle. How: This starts closed.

	const curLocObj = useLocation(); // What: Current Location Object. Why: The drawer closes whenever the page changes. How: This reads the router's current location.


	useEffect( () => { // What: Menu Close Effect. Why: A link in the drawer changes the page, and the drawer shouldn't stay open over the new one. How: This closes the drawer.


		setMenOpeBoo( false ); // What: Menu Close Call. Why: The new page should show without the drawer. How: This clears the open flag.


	}, [ curLocObj ] ); // What: Effect Dependency Array. Why: The drawer closes on every change of page. How: curLocObj is a new object for each navigation, so the effect runs after each one.

	// #endregion Menu State



	return (


		<header className={` ${ cssModObj.header }   ${ isaScrBoo ? cssModObj.scrolled : '' } `}>{ /* What: Navigation Header Element. Why: The bar sits at the top of every page. How: This holds the bar's row and the phone drawer, with the scrolled class once the page moves. */ }


			<div className={` container   ${ cssModObj.inner } `}>{ /* What: Navigation Inner Div Element. Why: The bar's content sits in the page's centered column. How: This lays out the brand, the links, the button, and the toggle in a row. */ }


				<NavLink
					className={ cssModObj.logo }

					to='/'
				>{ /* What: Brand Logo Link. Why: The mark and wordmark take a visitor home from any page. How: This routes to the root path. */ }


					<svg
						fill='none'
						height='28'
						viewBox='0 0 28 28'
						width='28'

						aria-hidden='true'
					>{ /* What: Hexagon Mark SVG Element. Why: The site's hexagon mark leads the wordmark. How: This draws the outlined hexagon, its filled core, and its center dot, hidden from screen readers since the wordmark names the link. */ }


						<polygon
							fill='none'
							points='14,2 26,8 26,20 14,26 2,20 2,8'
							stroke='var(--orange)' // Orange = #F26419
							strokeWidth='2'
						/>{ /* What: Outer Hexagon Polygon Element. Why: The mark's outline is an orange hexagon. How: This traces it around the whole mark. */ }

						<polygon
							fill='var(--blue)' // Blue = #7DB9D8
							opacity='0.6'
							points='14,7 21,11 21,17 14,21 7,17 7,11'
						/>{ /* What: Inner Hexagon Polygon Element. Why: A softer blue hexagon fills the mark's center. How: This draws it at 60% strength inside the outline. */ }

						<circle
							cx='14'
							cy='14'
							fill='var(--orange)' // Orange = #F26419
							r='3'
						/>{ /* What: Center Dot Circle Element. Why: An orange dot finishes the mark's center. How: This draws it in the middle of the hexagons. */ }


					</svg>

					<span className={ cssModObj.wordmark }>{ /* What: Wordmark Span Element. Why: The site's name reads beside its mark. How: This sets the name's two parts in their own colors. */ }
						<span className={ cssModObj.first }>TechGeek</span>{ /* What: Wordmark First Span Element. Why: The name's first part is the brand. How: This shows TechGeek in the main text color. */ }

						<span className={ cssModObj.last }>.dev</span>{ /* What: Wordmark Last Span Element. Why: The name's ending is the domain. How: This shows .dev in its accent color. */ }
					</span>


				</NavLink>



				<nav
					className={ cssModObj.nav }

					aria-label='Primary navigation'
				>{ /* What: Primary Navigation Nav Element. Why: The bar links to every page, and it shares the page with the footer's navigation, so it needs its own label. How: This holds a link to each page, shown above the phone breakpoint. */ }


					{ PAG_LIN_ARR.map( ( pagLinObj ) => ( // What: Bar Link Map Call. Why: The bar links to every page in the shared order. How: This renders one link per row.


						<NavLink
							key={ pagLinObj.patStr }

							className={ ( linStaObj ) => ` ${ cssModObj.link }   ${ linStaObj.isActive ? cssModObj.active : '' } ` } // What: Bar Link Class Function. Why: The link for the page that's showing is marked. How: React Router passes the link's state, and this adds the active class while its route matches.

							to={ pagLinObj.patStr }
						>{ pagLinObj.labStr }</NavLink> // What: Bar Page Link. Why: Each page has its own link in the bar. How: This routes to the row's path, labelled with its name.


					))}


				</nav>


				<a
					className={ cssModObj.cta }

					href='/contact'
				>Hire Me</a>{ /* What: Hire Me Anchor Element. Why: The bar's one call to action leads to the Contact page. How: This links there as a button. */ }

				<button
					className={` ${ cssModObj.burger }   ${ menOpeBoo ? cssModObj.open : '' } `}

					aria-expanded={ menOpeBoo }
					aria-label='Toggle menu'

					onClick={ () => setMenOpeBoo( ( preOpeBoo ) => !preOpeBoo ) }
				>{ /* What: Menu Toggle Button Element. Why: On phones the page links live in the drawer, opened and closed here. How: This flips the open flag, reporting it through aria-expanded and turning its bars into a cross while open. */ }
					<span />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which turns into half of the cross while the drawer is open. */ }

					<span />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which fades out while the drawer is open. */ }

					<span />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which turns into half of the cross while the drawer is open. */ }
				</button>


			</div>


			<div className={` ${ cssModObj.drawer }   ${ menOpeBoo ? cssModObj.drawerOpen : '' } `}>{ /* What: Menu Drawer Div Element. Why: On phones the page links and the button move into a drawer under the bar. How: This holds them, sliding into view while the menu is open. */ }


				{ PAG_LIN_ARR.map( ( pagLinObj ) => ( // What: Drawer Link Map Call. Why: The drawer links to every page in the shared order. How: This renders one link per row.


					<NavLink
						key={ pagLinObj.patStr }

						className={ ( linStaObj ) => ` ${ cssModObj.drawerLink }   ${ linStaObj.isActive ? cssModObj.active : '' } ` } // What: Drawer Link Class Function. Why: The link for the page that's showing is marked. How: React Router passes the link's state, and this adds the active class while its route matches.

						to={ pagLinObj.patStr }
					>{ pagLinObj.labStr }</NavLink> // What: Drawer Page Link. Why: Each page has its own link in the drawer. How: This routes to the row's path, labelled with its name.


				))}



				<a
					className={ cssModObj.drawerCta }

					href='/contact'
				>Hire Me</a>{ /* What: Drawer Hire Me Anchor Element. Why: The drawer repeats the bar's call to action. How: This links to the Contact page as a button. */ }


			</div>


		</header>


	);


}

// #endregion NavBarCom

// #endregion Components



// #region Exports

export { NavBarCom }; // What: Named Exports. Why: Every page shows the bar above its content. How: This exports NavBarCom.

// #endregion Exports


