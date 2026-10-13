


// #region Imports

import cssModObj from './tag.module.css'; // What: CSS Module Object. Why: The tag's own pill styles live in its own module. How: This maps each class name in tag.module.css to its hashed module class.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * tag.tsx = Tag
 *
 * @summary
 * The small pill that names a technology, used on every project card and in
 * the About page's skills grid. It comes in three colors (blue, orange, and
 * a neutral grey) and two sizes (small and medium), each a class in its own
 * module.
 *
 * Sections:
 *  - Components
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Components

type TlcProTyp = { labTexStr : string, tagSizStr? : 'md' | 'sm', tagVarStr? : 'blue' | 'neutral' | 'orange' }; // What: Tag-Label-Component Props Type. Why: A tag shows its text in one of the module's colors and sizes. How: This types TagLabCom's props.

// #region TagLabCom

/**
 * TagLabCom = Tag Label Component
 *
 * @summary
 * Renders one pill holding its label, styled by the base tag class plus the
 * classes for its color and its size, which the module names after the
 * values themselves.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props.labTexStr - Label Text String: The text the pill shows, such
 *                          as a technology's name.
 * @param props.tagSizStr - Tag Size String: The pill's size, 'sm' or 'md',
 *                          defaulting to 'sm'.
 * @param props.tagVarStr - Tag Variant String: The pill's color, 'blue',
 *                          'neutral', or 'orange', defaulting to 'neutral'.
 *
 * @returns The tag's span.
 *
 * @example
 * ```tsx
 * TagLabCom({ labTexStr, tagSizStr, tagVarStr }) // => <TagLabCom />
 * ```
 *
*/

function TagLabCom ( { labTexStr, tagSizStr = 'sm', tagVarStr = 'neutral' } : TlcProTyp ) : JSX.Element {


	return (


		<span className={` ${ cssModObj.tagLabSpa }   ${ tagVarStr === 'blue' ? cssModObj.tagLabSpaBlue : '' }   ${ tagVarStr === 'neutral' ? cssModObj.tagLabSpaNeutral : '' }   ${ tagVarStr === 'orange' ? cssModObj.tagLabSpaOrange : '' }   ${ tagSizStr === 'md' ? cssModObj.tagLabSpaMedium : '' }   ${ tagSizStr === 'sm' ? cssModObj.tagLabSpaSmall : '' } `}>{ labTexStr }</span> // What: Tag Label Span Element. Why: The pill is a single inline element. How: This shows the label with the base class plus the one color and one size modifier its props name, each written out since a hashed module class can't be looked up by a built string.


	);


}

// #endregion TagLabCom

// #endregion Components



// #region Exports

export { TagLabCom }; // What: Named Exports. Why: Project cards and the About page's skills grid show technologies as tags. How: This exports TagLabCom.

// #endregion Exports


