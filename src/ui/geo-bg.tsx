


// #region Imports

import cssModObj from './geo-bg.module.css'; // What: CSS Module Object. Why: The pattern's own positioning styles live in its own module. How: This maps each class name in geo-bg.module.css to its hashed module class.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * geo-bg.tsx = Geometric Background
 *
 * @summary
 * The faint geometric pattern behind several sections: a grid of lines, a
 * field of dots, or a circuit board trace, drawn as a repeating SVG pattern
 * in the text color and faded to the opacity each section asks for. It fills
 * its section behind the content and is hidden from screen readers, since
 * it's decoration only. Each variant's pattern has its own id, so two
 * different variants on one page never clash.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type GbcProTyp = { patOpaNum? : number, patVarStr? : 'circuit' | 'dots' | 'grid' }; // What: Geometric-Background-Component Props Type. Why: A section picks which pattern it shows and how strongly. How: This types GeoBacCom's props.

// #region GeoBacCom

/**
 * GeoBacCom = Geometric Background Component
 *
 * @summary
 * Renders one of three repeating SVG patterns across its section: the grid,
 * the dots, or the circuit, each drawn in the current text color and faded
 * by the opacity the section passes. The wrapper is hidden from screen
 * readers, since the pattern only decorates. Only the chosen variant renders.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.patOpaNum - Pattern Opacity Number: How strongly the pattern
 *                          shows, from 0 to 1, defaulting to 0.4.
 * @param props.patVarStr - Pattern Variant String: Which pattern to draw,
 *                          defaulting to 'grid'.
 *
 * @returns The pattern's wrapper div.
 *
 * @example
 * ```tsx
 * GeoBacCom({ patOpaNum, patVarStr }) // => <GeoBacCom />
 * ```
 *
*/

function GeoBacCom ( { patOpaNum = 0.4, patVarStr = 'grid' } : GbcProTyp ) : JSX.Element {


	return (


		<div
			className={ cssModObj.geo }

			style={{ opacity : patOpaNum }}

			aria-hidden='true'
		>{ /* What: Geometric Background Div Element. Why: The pattern sits behind its section's content without being announced. How: This fills the section, fades to the section's opacity, and is hidden from screen readers. */ }


			{ patVarStr === 'grid' && ( // What: Grid Variant Check. Why: Only the chosen pattern draws. How: This renders the grid when the section asks for it.


				<svg
					height='100%'
					width='100%'
					xmlns='http://www.w3.org/2000/svg'
				>{ /* What: Grid Pattern SVG Element. Why: The grid is drawn as a repeating SVG pattern. How: This fills the wrapper with the pattern below. */ }


					<defs>{ /* What: Grid Definitions Element. Why: A pattern has to be defined before a shape can fill with it. How: This holds the grid's pattern. */ }


						<pattern
							id='geoGriPat'
							height='40'
							patternUnits='userSpaceOnUse'
							width='40'
							x='0'
							y='0'
						>{ /* What: Geometric Grid Pattern Element. Why: The grid repeats one 40px cell. How: This draws the cell once, tiled in page units. */ }


							<path
								d='M 40 0 L 0 0 0 40'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.5'
							/>{ /* What: Grid Cell Path Element. Why: Each cell draws its top and left edges, so tiled cells form the grid. How: This traces both edges in a thin line of the text color. */ }


						</pattern>


					</defs>

					<rect
						fill='url(#geoGriPat)'
						height='100%'
						width='100%'
					/>{ /* What: Grid Fill Rect Element. Why: The pattern only shows once a shape fills with it. How: This covers the SVG with the grid. */ }


				</svg>


			) }

			{ patVarStr === 'dots' && ( // What: Dots Variant Check. Why: Only the chosen pattern draws. How: This renders the dots when the section asks for it.


				<svg
					height='100%'
					width='100%'
					xmlns='http://www.w3.org/2000/svg'
				>{ /* What: Dots Pattern SVG Element. Why: The dots are drawn as a repeating SVG pattern. How: This fills the wrapper with the pattern below. */ }


					<defs>{ /* What: Dots Definitions Element. Why: A pattern has to be defined before a shape can fill with it. How: This holds the dots' pattern. */ }


						<pattern
							id='geoDotPat'
							height='24'
							patternUnits='userSpaceOnUse'
							width='24'
							x='0'
							y='0'
						>{ /* What: Geometric Dot Pattern Element. Why: The dots repeat one 24px cell. How: This draws the cell once, tiled in page units. */ }


							<circle
								cx='2'
								cy='2'
								fill='currentColor'
								r='1.2'
							/>{ /* What: Dot Circle Element. Why: Each cell holds one dot, so tiled cells form an even field. How: This draws a small dot in the text color near the cell's corner. */ }


						</pattern>


					</defs>

					<rect
						fill='url(#geoDotPat)'
						height='100%'
						width='100%'
					/>{ /* What: Dots Fill Rect Element. Why: The pattern only shows once a shape fills with it. How: This covers the SVG with the dots. */ }


				</svg>


			) }

			{ patVarStr === 'circuit' && ( // What: Circuit Variant Check. Why: Only the chosen pattern draws. How: This renders the circuit when the section asks for it.


				<svg
					className={ cssModObj.circuit }

					height='100%'
					width='100%'
					xmlns='http://www.w3.org/2000/svg'
				>{ /* What: Circuit Pattern SVG Element. Why: The circuit is drawn as a repeating SVG pattern. How: This fills the wrapper with the pattern below. */ }


					<defs>{ /* What: Circuit Definitions Element. Why: A pattern has to be defined before a shape can fill with it. How: This holds the circuit's pattern. */ }


						<pattern
							id='geoCirPat'
							height='80'
							patternUnits='userSpaceOnUse'
							width='80'
							x='0'
							y='0'
						>{ /* What: Geometric Circuit Pattern Element. Why: The circuit repeats one 80px tile of traces, pads, and chips. How: This draws the tile once, tiled in page units. */ }


							<path
								d='M 0 20 L 20 20 L 20 0'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Trace Path Element. Why: The tile's traces run between its pads like a circuit board's. How: This draws one bent trace in the text color. */ }

							<circle
								cx='20'
								cy='20'
								fill='none'
								r='2.5'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Pad Circle Element. Why: Each trace ends at a pad like a circuit board's. How: This draws one ring at a trace's bend. */ }

							<path
								d='M 40 0 L 40 40 L 80 40'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Trace Path Element. Why: The tile's traces run between its pads like a circuit board's. How: This draws one bent trace in the text color. */ }

							<circle
								cx='40'
								cy='40'
								fill='none'
								r='2.5'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Pad Circle Element. Why: Each trace ends at a pad like a circuit board's. How: This draws one ring at a trace's bend. */ }

							<path
								d='M 60 80 L 60 60 L 80 60'
								fill='none'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Trace Path Element. Why: The tile's traces run between its pads like a circuit board's. How: This draws one bent trace in the text color. */ }

							<circle
								cx='60'
								cy='60'
								fill='none'
								r='2.5'
								stroke='currentColor'
								strokeWidth='0.8'
							/>{ /* What: Circuit Pad Circle Element. Why: Each trace ends at a pad like a circuit board's. How: This draws one ring at a trace's bend. */ }

							<rect
								fill='none'
								height='4'
								stroke='currentColor'
								strokeWidth='0.8'
								width='8'
								x='10'
								y='48'
							/>{ /* What: Circuit Chip Rect Element. Why: Small chips break up the traces like a circuit board's components. How: This draws one outlined chip in the text color. */ }

							<rect
								fill='none'
								height='4'
								stroke='currentColor'
								strokeWidth='0.8'
								width='8'
								x='50'
								y='8'
							/>{ /* What: Circuit Chip Rect Element. Why: Small chips break up the traces like a circuit board's components. How: This draws one outlined chip in the text color. */ }


						</pattern>


					</defs>

					<rect
						fill='url(#geoCirPat)'
						height='100%'
						width='100%'
					/>{ /* What: Circuit Fill Rect Element. Why: The pattern only shows once a shape fills with it. How: This covers the SVG with the circuit. */ }


				</svg>


			) }


		</div>


	);


}

// #endregion GeoBacCom

// #endregion Components



// #region Exports

export { GeoBacCom }; // What: Named Exports. Why: Several pages draw a pattern behind their sections. How: This exports GeoBacCom.

// #endregion Exports


