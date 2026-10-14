


// #region Imports

import cssModObj from './section-header.module.css'; // What: CSS Module Object. Why: The header's own label, heading, and subtitle styles live in its own module. How: This maps each class name in section-header.module.css to its hashed module class.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * section-header.tsx = Section Header
 *
 * @summary
 * The heading block that opens most sections: a small label in the mono
 * font with a short rule before it, the section's heading, and an optional
 * subtitle, aligned to the left or centered.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type ShcProTyp = { aliPosStr? : 'center' | 'left', labTexStr : string, subTexStr? : string, titTexStr : string }; // What: Section-Header-Component Props Type. Why: Every section header has a label and a heading, and some add a subtitle or centering. How: This types SecHeaCom's props.

// #region SecHeaCom

/**
 * SecHeaCom = Section Header Component
 *
 * @summary
 * Renders a section's heading block: the label with its decorative rule, the
 * heading as an h2, and the subtitle when one is given.
 * The block is left-aligned unless the section asks for it centered.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.aliPosStr - Alignment Position String: 'left' or 'center',
 *                          defaulting to 'left'.
 * @param props.labTexStr - Label Text String: The small label above the
 *                          heading.
 * @param props.subTexStr - Subtitle Text String: The line under the heading,
 *                          left out when not given.
 * @param props.titTexStr - Title Text String: The section's heading.
 *
 * @returns The header's wrapper div.
 *
 * @example
 * ```tsx
 * SecHeaCom({ aliPosStr, labTexStr, subTexStr, titTexStr }) // => <SecHeaCom />
 * ```
 *
*/

function SecHeaCom ( { aliPosStr = 'left', labTexStr, subTexStr, titTexStr } : ShcProTyp ) : JSX.Element {


	return (


		<div className={` ${ cssModObj.secHeaDiv }   ${ aliPosStr === 'center' ? cssModObj.secHeaDivCenter : '' } `}>{ /* What: Section Header Div Element. Why: The label, heading, and subtitle read as one block. How: This stacks them, centered when the section asks. */ }


			<span className={ cssModObj.secLabSpa }>{ /* What: Section Label Span Element. Why: A small label names the section before its heading. How: This shows the label after its decorative rule. */ }
				<span
					className={ cssModObj.labLinSpa }

					aria-hidden='true'
				/>{ /* What: Label Line Span Element. Why: A short rule leads into the label. How: This draws the rule, hidden from screen readers as decoration. */ }

				{ labTexStr }
			</span>

			<h2 className={ cssModObj.secTitHea }>{ titTexStr }</h2>{ /* What: Section Title Heading Element. Why: Every section is introduced by its heading. How: This shows the title as an h2. */ }

			{ subTexStr && ( // What: Subtitle Presence Check. Why: Not every section has a subtitle. How: This renders the subtitle only when one is given.


				<p className={ cssModObj.secSubPar }>{ subTexStr }</p> // What: Section Subtitle Paragraph Element. Why: A short line expands on the heading. How: This shows the subtitle under it.


			) }


		</div>


	);


}

// #endregion SecHeaCom

// #endregion Components



// #region Exports

export { SecHeaCom }; // What: Named Exports. Why: Most pages open their sections with this header. How: This exports SecHeaCom.

// #endregion Exports


