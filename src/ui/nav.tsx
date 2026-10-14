


// #region Imports

import cssModObj from './nav.module.css'; // What: CSS Module Object. Why: The bar's own layout, link, toggle, and drawer styles live in its own module. How: This maps each class name in nav.module.css to its hashed module class.


import { Link        } from 'react-router';       // What: Link. Why: The Hire Me buttons move to the Contact page without a full page load. How: This renders each one as a router link.
import { NavLink     } from 'react-router';       // What: Nav Link. Why: The bar's links mark the page that's showing. How: This renders each link and reports whether its route is active.
import { PAG_LIN_ARR } from './page-links.ts';    // What: Page Link Array. Why: The bar and the phone menu link to the same pages as the footer. How: This is the shared list they render.
import { PRO_LIN_ARR } from './profile-links.ts'; // What: Profile Link Array. Why: The phone menu links to the same profiles as the footer. How: This is the shared list its icons render.
import { useEffect   } from 'react';              // What: Use Effect. Why: The bar listens for scrolling and page changes, and the open menu locks the page behind it and listens for Escape and resizing. How: This runs those listeners.
import { useLocation } from 'react-router';       // What: Use Location. Why: The phone menu closes whenever the page changes. How: This reports the current location.
import { useRef      } from 'react';              // What: Use Ref. Why: The open menu's effect needs the bar, the scrim, and the toggle themselves. How: This attaches a reference to each.
import { useState    } from 'react';              // What: Use State. Why: The bar remembers whether the page has scrolled and whether the menu is open. How: This holds both flags.


import type { CSSProperties } from 'react'; // What: CSS Properties. Why: The phone menu hands each row its place in the stagger through a custom property, which React's style type doesn't list. How: This types those style objects.
import type { JSX           } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * nav.tsx = Navigation Bar
 *
 * @summary
 * The bar fixed to the top of every page: the hexagon mark and the
 * TechGeek.dev wordmark linking home, a link to each page with the current
 * one marked, a Hire Me button, and on phones a toggle that opens a drawer
 * over a dimmed page, holding the availability label, the same links and
 * button, z4nta0's profiles and email, and the tagline. The bar takes its
 * scrolled style once the page moves, and the drawer closes when the page
 * changes, the scrim is tapped, Escape is pressed, or the screen widens past
 * the phone layout.
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
 * Renders the scrim and the bar with its phone drawer. It tracks whether the
 * page has scrolled past 24px, switching the bar to its scrolled style, and
 * whether the drawer is open, which the toggle flips and any change of page
 * resets. While the drawer is open the rest of the page is inert, so keyboard
 * and screen reader users stay in the bar; tapping the scrim closes it,
 * Escape closes it and returns focus to the toggle, and a screen widened past
 * the phone layout closes it, since the toggle disappears there. The drawer
 * holds the availability label, the page links, Hire Me, the profile icons
 * and email, and the tagline, each arriving a step after the one above it.
 * Both the bar's and the drawer's links come from the shared page list, and
 * React Router marks the one whose route shows with aria-current. The Hire
 * Me buttons are router links to the Contact page.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The scrim and the bar's header element.
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

	const curLocObj = useLocation();                       // What: Current Location Object. Why: The drawer closes whenever the page changes. How: This reads the router's current location.
	const navBarRef = useRef< HTMLElement >( null );       // What: Navigation Bar Reference. Why: The open menu leaves the bar usable while it makes the rest of the page inert. How: This attaches to the header element.
	const scrDivRef = useRef< HTMLDivElement >( null );    // What: Scrim Div Reference. Why: The scrim has to stay tappable while the page behind it is inert. How: This attaches to the scrim.
	const togButRef = useRef< HTMLButtonElement >( null ); // What: Toggle Button Reference. Why: Escape puts focus back on the toggle, and a hidden toggle means the menu no longer applies. How: This attaches to the toggle.


	useEffect( () => { // What: Menu Close Effect. Why: A link in the drawer changes the page, and the drawer shouldn't stay open over the new one. How: This closes the drawer.


		setMenOpeBoo( false ); // What: Menu Close Call. Why: The new page should show without the drawer. How: This clears the open flag.


	}, [ curLocObj ] ); // What: Effect Dependency Array. Why: The drawer closes on every change of page. How: curLocObj is a new object for each navigation, even to the page already showing, so the effect runs after each one.

	useEffect( () => { // What: Open Menu Effect. Why: The open menu sits over a dimmed page, so keyboard and screen reader users should stay in the bar until it closes, and it needs the usual ways out. How: While the menu is open, this makes the bar's siblings inert and listens for Escape and resizing, and its cleanup undoes both.


		if ( !menOpeBoo ) return; // What: Closed Menu Guard. Why: Only the open menu changes the rest of the page. How: This leaves everything alone while the menu is closed.



		const navBarEle = navBarRef.current!; // What: Navigation Bar Element. Why: The bar stays usable. How: This reads the bar. // What: Non-Null Note. Why: TypeScript can't see the ref is attached. How: Effects run after the bar has mounted.
		const scrDivEle = scrDivRef.current!; // What: Scrim Div Element. Why: The scrim stays tappable to close the menu. How: This reads the scrim. // What: Non-Null Note. Why: TypeScript can't see the ref is attached. How: Effects run after the scrim has mounted.
		const sibEleArr = Array.from( navBarEle.parentElement!.children ).filter( ( sibCurEle ) => sibCurEle !== navBarEle && sibCurEle !== scrDivEle ); // What: Sibling Element Array. Why: The page's main content and footer sit beside the bar. How: This lists the bar's siblings, leaving out the scrim. // What: Non-Null Note. Why: TypeScript can't see the bar has a parent. How: The app root always renders it inside the mount element.
		const togButEle = togButRef.current!; // What: Toggle Button Element. Why: Escape returns focus here, and its visibility says whether the menu still applies. How: This reads the toggle. // What: Non-Null Note. Why: TypeScript can't see the ref is attached. How: Effects run after the toggle has mounted.


		const onKeyDowFun = ( keyEveObj : KeyboardEvent ) => { // What: On Key Down Function. Why: Escape is the expected way out of a layer over the page. How: This closes the menu and puts focus back on the toggle when Escape is pressed.


			if ( keyEveObj.key !== 'Escape' ) return; // What: Escape Key Guard. Why: Only Escape closes the menu. How: This ignores every other key.



			setMenOpeBoo( false ); // What: Menu Close Call. Why: Escape closes the menu. How: This clears the open flag.

			togButEle.focus(); // What: Toggle Focus Call. Why: Focus would otherwise be left inside the closing menu. How: This moves it to the toggle, where the visitor opened the menu.


		};


		const onResWinFun = () => { if ( !togButEle.getClientRects().length ) setMenOpeBoo( false ); }; // What: On Resize Window Function. Why: A screen widened past the phone layout hides the toggle, which would leave the page inert with no way to close the menu. How: This closes the menu once the toggle has no box.



		for ( const sibCurEle of sibEleArr ) sibCurEle.setAttribute( 'inert', '' ); // What: Sibling Inert Loop. Why: Content under the scrim shouldn't take focus or be read while the menu is open. How: This marks each sibling inert, removing it from the tab order and the accessibility tree.



		document.addEventListener( 'keydown', onKeyDowFun ); // What: Key Down Listener Registration. Why: Escape should close the menu wherever focus is. How: This listens on the whole document.
		window.addEventListener( 'resize', onResWinFun );    // What: Resize Listener Registration. Why: Widening the screen can hide the toggle. How: This rechecks on every resize.



		return () => { // What: Open Menu Cleanup. Why: Closing the menu gives the page back. How: This removes the inert marks and both listeners.


			for ( const sibCurEle of sibEleArr ) sibCurEle.removeAttribute( 'inert' ); // What: Sibling Restore Loop. Why: The page has to be usable again once the menu closes. How: This removes each sibling's inert mark.



			document.removeEventListener( 'keydown', onKeyDowFun ); // What: Key Down Listener Cleanup. Why: Escape should do nothing once the menu is closed. How: This removes the listener.
			window.removeEventListener( 'resize', onResWinFun );    // What: Resize Listener Cleanup. Why: Resizing doesn't matter once the menu is closed. How: This removes the listener.


		};


	}, [ menOpeBoo ] ); // What: Effect Dependency Array. Why: The page's inert state and the listeners have to follow the menu opening and closing. How: menOpeBoo changing reruns the effect, which applies them while it's true and its cleanup removes them.

	// #endregion Menu State



	return (


		<>{ /* What: Navigation Fragment. Why: The scrim and the bar render side by side, the scrim first. How: This groups them without adding a wrapper element. */ }


			<div
				ref={ scrDivRef }

				className={ cssModObj.navScrDiv }

				data-mobile-menu-open={ menOpeBoo || undefined } // What: Mobile Menu Open Flag. Why: The scrim fades in only while the menu is open. How: This marks the scrim while menOpeBoo is true, and drops the attribute otherwise.

				aria-hidden='true'

				onClick={ () => setMenOpeBoo( false ) }
			/>{ /* What: Navigation Scrim Div Element. Why: The open menu should stand apart from the dimmed page, and a tap anywhere on the page should close it. How: This covers the page under the bar, dimmed while the menu is open, closing the menu when tapped, and hidden from screen readers as decoration. */ }



			<header
				ref={ navBarRef }

				className={ cssModObj.navBarHed }

				data-nav-bar-scrolled={ isaScrBoo || undefined } // What: Nav Bar Scrolled Flag. Why: The bar firms up and casts its shadow once the page moves under it. How: This marks the bar while isaScrBoo is true, and drops the attribute otherwise.
			>{ /* What: Navigation Bar Header Element. Why: The bar sits at the top of every page. How: This holds the bar's row and the phone drawer, marked with data-nav-bar-scrolled once the page moves, which its module styles. */ }


				<div className={ cssModObj.navInnDiv }>{ /* What: Navigation Inner Div Element. Why: The bar's content sits in the page's centered column. How: This lays out the brand, the links, the button, and the toggle in a row. */ }


					<NavLink
						className={ cssModObj.braLogAnc }

						to='/'
					>{ /* What: Brand Logo Navigation Link. Why: The mark and wordmark take a visitor home from any page. How: This routes to the root path. */ }


						<svg
							className={ cssModObj.braMarSvg }

							fill='none'
							height='28'
							viewBox='0 0 28 28'
							width='28'

							aria-hidden='true'
						>{ /* What: Brand Mark SVG Element. Why: The site's hexagon mark leads the wordmark. How: This draws the outlined hexagon, its filled core, and its center dot, hidden from screen readers since the wordmark names the link, and lets presses fall through to the link. */ }


							<polygon
								fill='none'
								points='14,2 26,8 26,20 14,26 2,20 2,8'
								stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
								strokeWidth='2'
							/>{ /* What: Outer Hexagon Polygon Element. Why: The mark's outline is an orange hexagon. How: This traces it around the whole mark. */ }

							<polygon
								fill='var( --acc-sec-col )' // Accent Secondary Color = #7DB9D8
								opacity='0.6'
								points='14,7 21,11 21,17 14,21 7,17 7,11'
							/>{ /* What: Inner Hexagon Polygon Element. Why: A softer blue hexagon fills the mark's center. How: This draws it at 60% strength inside the outline. */ }

							<circle
								cx='14'
								cy='14'
								fill='var( --acc-mai-col )' // Accent Main Color = #F26419
								r='3'
							/>{ /* What: Center Dot Circle Element. Why: An orange dot finishes the mark's center. How: This draws it in the middle of the hexagons. */ }


						</svg>

						<span className={ cssModObj.braWorSpa }>{ /* What: Brand Wordmark Span Element. Why: The site's name reads beside its mark. How: This sets the name's two parts in their own colors. */ }
							<span className={ cssModObj.worFirSpa }>TechGeek</span>{ /* What: Wordmark First Span Element. Why: The name's first part is the brand. How: This shows TechGeek in the main text color. */ }

							<span className={ cssModObj.worLasSpa }>.dev</span>{ /* What: Wordmark Last Span Element. Why: The name's ending is the domain. How: This shows .dev in its accent color. */ }
						</span>


					</NavLink>



					<nav
						className={ cssModObj.priNavNav }

						aria-label='Primary navigation'
					>{ /* What: Primary Navigation Nav Element. Why: The bar links to every page, and it shares the page with the footer's navigation, so it needs its own label. How: This holds a link to each page, shown above the phone breakpoint. */ }


						{ PAG_LIN_ARR.map( ( pagLinObj ) => ( // What: Bar Link Map Call. Why: The bar links to every page in the shared order. How: This renders one link per row.


							<NavLink
								key={ pagLinObj.patStr }

								className={ cssModObj.barLinAnc }

								to={ pagLinObj.patStr }
							>{ pagLinObj.labStr }</NavLink> // What: Bar Page Navigation Link. Why: Each page has its own link in the bar. How: This routes to the row's path, labelled with its name, and NavLink sets aria-current on the one whose route is showing, which its module styles.


						))}


					</nav>



					<Link
						className={ cssModObj.barHirAnc }

						to='/contact'
					>Hire Me</Link>{ /* What: Bar Hire Link. Why: The bar's one call to action leads to the Contact page. How: This routes there as a button without reloading the site. */ }



					<button
						ref={ togButRef }

						className={ cssModObj.menTogBut }

						aria-expanded={ menOpeBoo }
						aria-label='Toggle menu'

						onClick={ () => setMenOpeBoo( ( preOpeBoo ) => !preOpeBoo ) }
					>{ /* What: Menu Toggle Button Element. Why: On phones the page links live in the drawer, opened and closed here. How: This flips the open flag, reporting it through aria-expanded, which its module also reads to turn the bars into a cross. */ }
						<span className={ cssModObj.togBarSpa } />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which turns into half of the cross while the drawer is open. */ }

						<span className={ cssModObj.togBarSpa } />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which fades out while the drawer is open. */ }

						<span className={ cssModObj.togBarSpa } />{ /* What: Toggle Bar Span Element. Why: Three bars draw the menu icon. How: This is one bar, which turns into half of the cross while the drawer is open. */ }
					</button>


				</div>



				<div
					className={ cssModObj.menDraDiv }

					data-mobile-menu-open={ menOpeBoo || undefined } // What: Mobile Menu Open Flag. Why: The drawer slides into view only while the menu is open. How: This marks the drawer while menOpeBoo is true, and drops the attribute otherwise.
				>{ /* What: Menu Drawer Div Element. Why: On phones the page links and the button move into a drawer under the bar, with a few extras so it doesn't feel bare. How: This holds them, marked with data-mobile-menu-open while the menu is open, which its module styles to slide the drawer into view and bring its rows in one after another. */ }


					<div
						className={ cssModObj.herLabDiv }

						style={ { '--men-ite-ind' : 0 } as CSSProperties } // What: Menu Item Index. Why: The drawer's rows arrive one after another, the label first. How: This hands the label its place, which the stylesheet multiplies into its delay. // What: Type Assertion Note. Why: React's style type doesn't list custom properties. How: The stylesheet reads this one by name.
					>{ /* What: Hero Label Div Element. Why: The drawer opens on Home's availability label, so a visitor on any page sees z4nta0 is taking on work. How: This shows the pulsing dot beside the line, the same pill Home's hero shows. */ }


						<span
							className={ cssModObj.pulDotSpa }

							aria-hidden='true'
						/>{ /* What: Pulse Dot Span Element. Why: A pulsing dot signals availability. How: This draws it, hidden from screen readers as decoration. */ }

						<span className={ cssModObj.avaTexSpa }>Available for freelance work</span>{ /* What: Availability Text Span Element. Why: The label's words say what the dot means. How: This shows them in the mono font. */ }


					</div>

					<nav
						className={ cssModObj.menLinNav }

						aria-label='Menu navigation'
					>{ /* What: Menu Links Nav Element. Why: On a phone the drawer's links are the site's navigation, and the landmark needs a label to tell it from the footer's. How: This stacks a link to each page. */ }


						{ PAG_LIN_ARR.map( ( pagLinObj, linIndNum ) => ( // What: Drawer Link Map Call. Why: The drawer links to every page in the shared order. How: This renders one link per row, with its place in the list.


							<NavLink
								key={ pagLinObj.patStr }

								className={ cssModObj.draLinAnc }

								style={ { '--men-ite-ind' : linIndNum + 1 } as CSSProperties } // What: Menu Item Index. Why: Each link arrives a step after the one above it. How: This hands the link its place after the label. // What: Type Assertion Note. Why: React's style type doesn't list custom properties. How: The stylesheet reads this one by name.

								to={ pagLinObj.patStr }
							>{ pagLinObj.labStr }</NavLink> // What: Drawer Page Navigation Link. Why: Each page has its own link in the drawer. How: This routes to the row's path, labelled with its name, and NavLink sets aria-current on the one whose route is showing, which its module styles.


						))}


					</nav>



					<Link
						className={ cssModObj.draHirAnc }

						style={ { '--men-ite-ind' : PAG_LIN_ARR.length + 1 } as CSSProperties } // What: Menu Item Index. Why: The button arrives after the last link. How: This hands it the next place. // What: Type Assertion Note. Why: React's style type doesn't list custom properties. How: The stylesheet reads this one by name.

						to='/contact'
					>Hire Me</Link>{ /* What: Drawer Hire Link. Why: The drawer repeats the bar's call to action. How: This routes to the Contact page as a button without reloading the site, and the menu closes as the page changes. */ }



					<div
						className={ cssModObj.menConDiv }

						style={ { '--men-ite-ind' : PAG_LIN_ARR.length + 2 } as CSSProperties } // What: Menu Item Index. Why: The extras arrive last. How: This hands the block the place after the button. // What: Type Assertion Note. Why: React's style type doesn't list custom properties. How: The stylesheet reads this one by name.
					>{ /* What: Menu Contents Div Element. Why: Four links and a button alone left the phone menu bare, and a visitor may want z4nta0's profiles or email from any page. How: This holds the profiles, the email, and the tagline under the button. */ }


						<p className={ cssModObj.menEyePar }>Find me on</p>{ /* What: Menu Eyebrow Paragraph Element. Why: The icons need a word on what they're for. How: This labels them in small capitals. */ }

						<div className={ cssModObj.menSocDiv }>{ /* What: Menu Social Div Element. Why: z4nta0's profiles are one tap away from any page. How: This sets the icons in a row. */ }


							{ PRO_LIN_ARR.map( ( proLinObj ) => ( // What: Menu Profile Map Call. Why: Each profile gets an icon. How: This renders one link per row of the shared profile list.


								<a
									key={ proLinObj.labStr }

									className={ cssModObj.menSocAnc }

									href={ proLinObj.urlStr }
									rel='noreferrer'
									target='_blank'

									aria-label={ proLinObj.labStr }
								>{ /* What: Menu Social Anchor Element. Why: Each profile should be recognizable at a glance. How: This shows the platform's mark on a tile, named by the platform for screen readers, opening the profile in a new tab. */ }


									<svg
										className={ cssModObj.menSocSvg }

										fill='currentColor'
										height='1em'
										viewBox='0 0 24 24'
										width='1em'

										aria-hidden='true'
									>{ /* What: Menu Social SVG Element. Why: The platform's mark stays sharp at any size. How: This draws the row's path at the tile's font size, hidden from screen readers since the link is named. */ }


										<path d={ proLinObj.icoStr } />{ /* What: Profile Mark Path Element. Why: The mark is one path. How: This traces the row's path data. */ }


									</svg>


								</a>


							))}


						</div>

						<a
							className={ cssModObj.menEmaAnc }

							href='mailto:contact@techgeek.dev'
						>contact@techgeek.dev</a>{ /* What: Menu Email Anchor Element. Why: Email is the quickest way to reach z4nta0 without the form. How: This opens a new message to the contact address. */ }

						<p className={ cssModObj.menTagPar }>Building the web, one commit at a time.</p>{ /* What: Menu Tagline Paragraph Element. Why: The menu ends on the site's tagline, as the footer does. How: This shows it small and quiet. */ }


					</div>


				</div>


			</header>


		</>


	);


}

// #endregion NavBarCom

// #endregion Components



// #region Exports

export { NavBarCom }; // What: Named Exports. Why: Every page shows the bar above its content. How: This exports NavBarCom.

// #endregion Exports


