


// #region Imports

import { AboPagCom   } from './pages/about/about.tsx';         // What: About Page Component. Why: The About route shows who built the projects. How: The about route renders it.
import { ConPagCom   } from './pages/contact/contact.tsx';     // What: Contact Page Component. Why: The Contact route shows the form and the contact details. How: The contact route renders it.
import { HomPagCom   } from './pages/home/home.tsx';           // What: Home Page Component. Why: The site's root address is its home page. How: The home route renders it.
import { NavBarCom   } from './ui/nav.tsx';                    // What: Navigation Bar Component. Why: Every page starts with the shared bar. How: This renders above the routes.
import { NotFouCom   } from './pages/not-found/not-found.tsx'; // What: Not Found Component. Why: Every unknown address shows the 404 page. How: The catch-all route renders it.
import { Route       } from 'react-router';                    // What: Route. Why: Each page is matched to its path. How: This declares one route per page.
import { Routes      } from 'react-router';                    // What: Routes. Why: Only one page should render for any path. How: This renders the first route whose path matches.
import { SitFooCom   } from './ui/footer.tsx';                 // What: Site Footer Component. Why: Every page ends with the shared footer. How: This renders below the routes.
import { useLocation } from 'react-router';                    // What: Use Location. Why: Each page change remounts the page, replaying its entrance. How: This reads the current path for the routes' key.
import { WorPagCom   } from './pages/work/work.tsx';           // What: Work Page Component. Why: The Work route shows every project. How: The work route renders it.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * app.tsx = App
 *
 * @summary
 * The site's root component, mounted by main.tsx inside the router: the bar,
 * the main landmark holding whichever page the address matches, and the
 * footer. The routes are keyed by the current path, so every change of page
 * mounts the new page fresh and its entrance fade plays again. A new page is
 * added as another route here.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

// #region AppRooCom

/**
 * AppRooCom = App Root Component
 *
 * @summary
 * The top of the component tree: renders the bar, the page the address
 * matches inside the main landmark, and the footer, so every page shares the
 * same frame. The routes take the current location and use its path as their
 * key, so moving to another page replaces the old page's tree rather than
 * updating it, which restarts the new page's entrance animation.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns A fragment holding the bar, the main landmark, and the footer.
 *
 * @example
 * ```tsx
 * AppRooCom() // => <AppRooCom />
 * ```
 *
*/

function AppRooCom () : JSX.Element {


	const curLocObj = useLocation(); // What: Current Location Object. Why: The routes remount on each change of page. How: This reads the router's current location.



	return (


		<>{ /* What: App Fragment. Why: The bar, the main landmark, and the footer sit directly in the mount element. How: This groups them without a wrapper. */ }


			<NavBarCom />{ /* What: Navigation Bar Component. Why: Every page starts with the shared bar. How: This renders it above the page. */ }



			<main>{ /* What: App Main Element. Why: Each page's content is the main landmark. How: This holds whichever page the address matches. */ }


				<Routes
					key={ curLocObj.pathname } // What: Routes Key. Why: A new key makes React mount the new page fresh instead of reusing the old one, so its entrance fade replays. How: The path changes on every change of page.

					location={ curLocObj }
				>{ /* What: Page Routes. Why: Only one page should render for any path. How: This renders the first route below whose path matches the current location. */ }


					<Route
						element={ <HomPagCom /> }
						path='/'
					/>{ /* What: Home Route. Why: The site's root address is its home page. How: This renders HomPagCom at the root path. */ }



					<Route
						element={ <WorPagCom /> }
						path='/work'
					/>{ /* What: Work Route. Why: The project catalog has its own page. How: This renders WorPagCom at /work. */ }



					<Route
						element={ <AboPagCom /> }
						path='/about'
					/>{ /* What: About Route. Why: The builder's story has its own page. How: This renders AboPagCom at /about. */ }



					<Route
						element={ <ConPagCom /> }
						path='/contact'
					/>{ /* What: Contact Route. Why: The ways to get in touch have their own page. How: This renders ConPagCom at /contact. */ }



					<Route
						element={ <NotFouCom /> }
						path='*'
					/>{ /* What: Not Found Route. Why: Every unknown address should land somewhere useful. How: This catch-all renders NotFouCom for any path the routes above miss. */ }


				</Routes>


			</main>



			<SitFooCom />{ /* What: Site Footer Component. Why: Every page ends with the shared footer. How: This renders it below the page. */ }


		</>


	);


}

// #endregion AppRooCom

// #endregion Components



// #region Exports

export { AppRooCom }; // What: Named Exports. Why: main.tsx is the sole consumer, mounting this as the site's root. How: This exports AppRooCom.

// #endregion Exports


