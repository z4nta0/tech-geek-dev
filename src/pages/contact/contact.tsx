


// #region Imports

import cssModObj from './contact.module.css'; // What: CSS Module Object. Why: The Contact page's own hero, form, and sidebar styles live in its own module. How: This maps each class name in contact.module.css to its hashed module class.


import { GeoBacCom    } from '../../ui/geo-bg.tsx';          // What: Geometric Background Component. Why: The hero sits over a faint pattern. How: This draws the circuit.
import { usePagDesFun } from '../../ui/page-description.ts'; // What: Use Page Description Function. Why: The page's search description differs from the home page's. How: The page calls it to swap the one description tag's text while it shows.
import { useState     } from 'react';                        // What: Use State. Why: The page remembers the form's fields and whether a message is sending, sent, or failed. How: This holds each of those.


import type { ChangeEvent } from 'react'; // What: Change Event. Why: The fields report each edit. How: This types chaFieFun's event.
import type { FormEvent   } from 'react'; // What: Form Event. Why: The form reports its submission. How: This types subForFun's event.
import type { JSX         } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * contact.tsx = Contact
 *
 * @summary
 * The Contact page: a hero inviting a visitor to get in touch, the message
 * form, and a sidebar with the contact details, availability, and response
 * time. The form posts to Netlify Forms, which emails each message to the
 * address set in Netlify's dashboard, then shows a thank-you in its place, or
 * an error above the message field when the send fails.
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

// #region CON_ITE_ARR

/**
 * CON_ITE_ARR = Contact Item Array
 *
 * @summary
 * The sidebar's contact details, in the order they show. Every row shares one
 * shape, so its fields carry no comments of their own:
 * - `extBoo` (Boolean): External Boolean, true for a profile on another site,
 *   which opens in a new tab, and false for the email address.
 * - `hreStr` (String): Hypertext Reference String, where the item links.
 * - `icoEle` (Element): Icon Element, the item's small icon.
 * - `labStr` (String): Label String, the item's name, also its React key.
 * - `valStr` (String): Value String, the address shown under the name.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const CON_ITE_ARR = [ // What: Contact Item Array. Why: The sidebar lists the same ways to reach z4nta0 every visit. How: Each row holds one item's link, icon, name, and address.


	{ // What: Email Item Row. Why: Email is the most direct way to get in touch. How: This links to the contact address.


		extBoo : false,
		hreStr : 'mailto:contact@techgeek.dev',
		labStr : 'Email',
		valStr : 'contact@techgeek.dev',

		icoEle : ( // What: Envelope Icon. Why: An envelope stands for email. How: This draws it at the item's icon size.


			<svg
				fill='none'
				height='16'
				stroke='currentColor'
				strokeWidth='2'
				viewBox='0 0 24 24'
				width='16'
			>{ /* What: Envelope SVG Element. Why: The icon marks the email item. How: This draws an envelope. */ }


				<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />{ /* What: Envelope Body Path Element. Why: The envelope's body is a rounded rectangle. How: This draws it. */ }

				<polyline points='22,6 12,13 2,6' />{ /* What: Envelope Flap Polyline Element. Why: The flap makes the rectangle read as an envelope. How: This draws its fold. */ }


			</svg>


		)


	},

	{ // What: GitHub Item Row. Why: A visitor can browse z4nta0's code. How: This links to the GitHub profile.


		extBoo : true,
		hreStr : 'https://github.com/z4nta0',
		labStr : 'GitHub',
		valStr : 'github.com/z4nta0',

		icoEle : ( // What: GitHub Mark Icon. Why: GitHub's mark tells a visitor where the link goes. How: This draws it at the item's icon size.


			<svg
				fill='currentColor'
				height='16'
				viewBox='0 0 24 24'
				width='16'
			>{ /* What: GitHub Mark SVG Element. Why: The icon marks the GitHub item. How: This draws GitHub's mark. */ }


				<path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' />{ /* What: GitHub Mark Path Element. Why: The mark is GitHub's cat silhouette. How: This traces it in the item's color. */ }


			</svg>


		)


	},

	{ // What: LinkedIn Item Row. Why: A visitor can find z4nta0's work history. How: This links to the LinkedIn profile.


		extBoo : true,
		hreStr : 'https://www.linkedin.com/in/gary-s-walton-654739400/',
		labStr : 'LinkedIn',
		valStr : 'linkedin.com/in/gary-s-walton-654739400',

		icoEle : ( // What: LinkedIn Mark Icon. Why: LinkedIn's mark tells a visitor where the link goes. How: This draws it at the item's icon size.


			<svg
				fill='currentColor'
				height='16'
				viewBox='0 0 24 24'
				width='16'
			>{ /* What: LinkedIn Mark SVG Element. Why: The icon marks the LinkedIn item. How: This draws LinkedIn's mark. */ }


				<path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />{ /* What: LinkedIn Mark Path Element. Why: The mark is LinkedIn's "in" square. How: This traces it in the item's color. */ }


			</svg>


		)


	}


];

// #endregion CON_ITE_ARR



const EMP_FOR_OBJ = { 'bot-field' : '', budget : '', email : '', message : '', name : '' }; // What: Empty Form Object. Why: The form starts empty and empties again for another message. How: This holds a blank value for each field, keyed by the field's name attribute, which browsers read for autofill. // The bot-field key is the honeypot Netlify reads by that exact name, so it keeps Netlify's spelling.

// #endregion Constants



// #region Components

// #region ConPagCom

/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * Renders the Contact page. The form keeps its fields in state, keyed by
 * each field's name attribute, and the browser checks the required fields
 * and the email format before letting it send. Sending it posts the fields to
 * Netlify Forms, disabling the button and showing Sending while it waits; a
 * reply Netlify doesn't answer with ok counts as an error, just like a
 * network failure, so either one leaves the form in place with an error above
 * the message field, while a sent message swaps the form for a thank-you with
 * a button that empties the form for another. The sidebar lists CON_ITE_ARR's
 * contact details, the profiles opening in a new tab, beside the availability
 * and response time.
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
 * ConPagCom() // => <ConPagCom />
 * ```
 *
*/

function ConPagCom () : JSX.Element {


	usePagDesFun( 'Have a project in mind? Send z4nta0 a message about your website or web app and expect a reply within 24 hours.' ); // What: Page Description Call. Why: Search listings should describe this page, not repeat the home page. How: This swaps the one description tag's text for the page's own while it shows.



	// #region Form State

	const [ errMesStr, setErrMesStr ] = useState< string | null >( null ); // What: Error Message String And Setter. Why: A failed send has to say so above the message field. How: This starts with no error.
	const [ forDatObj, setForDatObj ] = useState( EMP_FOR_OBJ );           // What: Form Data Object And Setter. Why: The fields are controlled, so their values live here. How: This starts with every field blank.
	const [ isaLoaBoo, setIsaLoaBoo ] = useState( false );                 // What: Is-A Loading Boolean And Setter. Why: The button shows Sending while the message is on its way. How: This starts false.
	const [ isaSenBoo, setIsaSenBoo ] = useState( false );                 // What: Is-A Sent Boolean And Setter. Why: A sent message swaps the form for a thank-you. How: This starts false.



	// #region chaFieFun

	/**
	 * chaFieFun = Change Field Function
	 *
	 * @summary
	 * Writes one field's edit into the form's state. The edited field's name
	 * attribute picks the key it writes, so every field's name has to match a
	 * key of EMP_FOR_OBJ (name, email, budget, message, or bot-field); a field
	 * named anything else would add a stray key that never posts. The previous
	 * fields are copied, so the other fields keep their values.
	 *
	 * @author z4nta0 <https://github.com/z4nta0>
	 *
	 * @param chaEveObj - Change Event Object: The edited field's change event.
	 *
	 * @returns This function does not return anything.
	 *
	 * @example
	 * ```ts
	 * chaFieFun(chaEveObj) // => void
	 * ```
	 *
	*/

	const chaFieFun = ( chaEveObj : ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > ) => setForDatObj( ( preForObj ) => ( { ...preForObj, [ chaEveObj.target.name ] : chaEveObj.target.value } ) ); // What: Change Field Function. Why: Every field writes its edits into the form's state. How: This copies the previous fields and replaces the one named by the edited field's name attribute.

	// #endregion chaFieFun



	const resForFun = () => { // What: Reset Form Function. Why: The thank-you's button lets a visitor send another message. How: This hides the thank-you and empties the fields.


		setIsaSenBoo( false ); // What: Sent Flag Reset Call. Why: The form shows again in place of the thank-you. How: This clears the sent flag.

		setForDatObj( EMP_FOR_OBJ ); // What: Fields Reset Call. Why: The next message starts blank. How: This restores the empty form.


	};

	// #endregion Form State



	// #region subForFun

	/**
	 * subForFun = Submit Form Function
	 *
	 * @summary
	 * Sends the form through Netlify Forms, running only once the browser has
	 * passed the required fields and the email format. It stops the browser's
	 * own submission, marks the form as sending, and clears any earlier error,
	 * then posts the fields form-encoded to the site's root under the contact
	 * form's name, which Netlify matches to the hidden copy of the form in
	 * index.html, with the budget or Not specified when none was chosen and
	 * the honeypot as it stands. Netlify then emails the submission to the
	 * address set in its dashboard. Only an ok reply counts as success; a
	 * failed reply or a network failure is logged and shown as an error above
	 * the message field. Sending ends either way.
	 *
	 * @author z4nta0 <https://github.com/z4nta0>
	 *
	 * @param subEveObj - Submit Event Object: The form's submit event.
	 *
	 * @returns A promise that settles once the send has succeeded or failed,
	 *          with no value.
	 *
	 * @example
	 * ```ts
	 * subForFun(subEveObj) // => Promise<void>
	 * ```
	 *
	*/

	const subForFun = async ( subEveObj : FormEvent ) => { // What: Submit Form Function. Why: The form's submission sends the message. How: This posts the fields to Netlify Forms and records the outcome.


		subEveObj.preventDefault(); // What: Default Submission Prevention Call. Why: The browser would otherwise reload the page to submit the form. How: This stops it, so the message is sent in the background.

		setIsaLoaBoo( true ); // What: Loading Flag Set Call. Why: The button shows Sending while the message is on its way. How: This sets the loading flag.

		setErrMesStr( null ); // What: Error Clear Call. Why: A new attempt shouldn't show the last one's error. How: This clears it.



		try {


			const senResObj = await fetch( '/', { // What: Send Response Object. Why: Netlify Forms takes a form-encoded POST on any path of the site, matches it to a detected form by its form-name field, and emails it on. How: This posts the fields to the site's root.


				headers : { 'Content-Type' : 'application/x-www-form-urlencoded' }, // What: Headers. Why: Netlify only parses a form-encoded body. How: This sets the matching content type.
				method  : 'POST',                                                   // What: Method. Why: A form submission is a POST. How: This sets it.

				body : new URLSearchParams({ // What: Body. Why: Netlify reads a standard form-encoded body whose field names match the hidden form in index.html. How: This encodes the form's name, the honeypot, and the four real fields.


					'bot-field' : forDatObj[ 'bot-field' ],            // What: Bot Field. Why: Netlify drops a submission whose honeypot is filled, which a person never does. How: This posts the hidden field as it stands.
					budget      : forDatObj.budget || 'Not specified', // What: Budget. Why: The email shows the visitor's budget range. How: This sends the choice, or Not specified when none was made.
					email       : forDatObj.email,                     // What: Email. Why: Netlify sets a field named email as the notification's reply-to, so a reply goes straight back to the visitor. How: This sends the address they entered.
					'form-name' : 'contact',                           // What: Form Name. Why: Netlify matches the POST to its detected form by this field. How: This names the contact form.
					message     : forDatObj.message,                   // What: Message. Why: The message is the point of the email. How: This sends what they wrote.
					name        : forDatObj.name                       // What: Name. Why: The email says who wrote. How: This sends the name they entered.


				}).toString() // What: Body String Call. Why: Netlify reads the fields as one form-encoded string. How: This serializes the URLSearchParams into it.


			} );


			if ( !senResObj.ok ) throw new Error( `Netlify Forms answered with status ${ senResObj.status }.` ); // What: Failed Reply Guard. Why: Netlify can take the connection yet reject the submission, which must not show the thank-you. How: This throws into the catch below.



			setIsaSenBoo( true ); // What: Sent Flag Set Call. Why: The message went out. How: This swaps the form for the thank-you.


		}

		catch ( errCatObj ) {


			console.warn( errCatObj ); // What: Error Warning Call. Why: A failed send should stay visible to anyone debugging. How: This logs the error.

			setErrMesStr( 'Something went wrong. Please try again or email contact@techgeek.dev directly.' ); // What: Error Message Set Call. Why: The visitor needs to know the message didn't go out and how else to reach z4nta0. How: This shows the error above the message field.


		}

		finally {


			setIsaLoaBoo( false ); // What: Loading Flag Clear Call. Why: Sending is over whether it worked or not. How: This clears the loading flag.


		}


	};

	// #endregion subForFun



	return (


		<>{ /* What: Page Fragment. Why: The page's head tags and its content render side by side. How: This groups them without adding an element. */ }


			<title>Contact z4nta0 About Your Project | TechGeek.dev</title>{ /* What: Page Title Element. Why: A visitor's tab, history, and search listings should name the page. How: React 19 moves this title into the document head while the page is shown. */ }

			<link
				href='https://techgeek.dev/contact'
				rel='canonical'
			/>{ /* What: Canonical Link Element. Why: Every address Netlify serves the page at should count as its one live address. How: React 19 moves this link into the document head while the page is shown. */ }



			<div className={ cssModObj.pagEntDiv }>{ /* What: Page Enter Div Element. Why: The page's sections stack in one column. How: This holds them and fades in like every page. */ }


				<section className={ cssModObj.conHerSec }>{ /* What: Contact Hero Section Element. Why: The page opens by inviting a visitor to get in touch. How: This holds the pattern and the heading block. */ }


					<GeoBacCom
						patOpaNum={ 0.14 }
						patVarStr='circuit'
					/>{ /* What: Geometric Background Component. Why: A faint circuit sits behind the hero. How: This draws it at 14% strength. */ }



					<div className={ cssModObj.herInnDiv }>{ /* What: Hero Inner Div Element. Why: The hero's text sits in the page's centered column. How: This stacks the label, heading, and line. */ }


						<span className={ cssModObj.herLabSpa }>{ /* What: Hero Label Span Element. Why: A small label names the page above its heading. How: This shows Get In Touch after a short rule. */ }
							<span className={ cssModObj.herLinSpa } />{ /* What: Hero Line Span Element. Why: A short rule leads into the label. How: This draws the rule. */ }

							Get In Touch
						</span>

						<h1 className={ cssModObj.herTitHea }>{ /* What: Hero Title Heading Element. Why: The page's heading makes the invitation. How: This sets Let's Build over Something Together, with Something in the accent. */ }
							Let's Build<br />
							<span className={ cssModObj.titAccSpa }>Something</span> Together
						</h1>

						<p className={ cssModObj.herSubPar }>{ /* What: Hero Subtitle Paragraph Element. Why: A line under the heading says what to expect. How: This promises a reply within a day. */ }
							Have a project in mind? I'd love to hear about it. Send me a message
							and I'll get back to you within 24 hours.
						</p>


					</div>


				</section>



				<section className={ cssModObj.conBodSec }>{ /* What: Contact Body Section Element. Why: The form and the details sit together. How: This holds the two columns. */ }


					<div className={ cssModObj.conGriDiv }>{ /* What: Contact Grid Div Element. Why: The form and the sidebar sit side by side in the page's centered column. How: This lays out the two columns. */ }


						<div className={ cssModObj.forWraDiv }>{ /* What: Form Wrap Div Element. Why: The form and its thank-you share one place. How: This holds whichever one shows. */ }


							{ isaSenBoo ? ( // What: Sent Or Form Check. Why: A sent message replaces the form with a thank-you. How: This renders the thank-you once sent, or the form otherwise.


								<div className={ cssModObj.sucStaDiv }>{ /* What: Success State Div Element. Why: A visitor learns the message went out. How: This fades up into view with a check, a thank-you, and a button for another message. */ }


									<svg
										fill='none'
										height='56'
										stroke='var( --acc-mai-col )' // Accent Main Color = #F26419
										strokeWidth='1.5'
										viewBox='0 0 24 24'
										width='56'
									>{ /* What: Check SVG Element. Why: A circled check says the message went out. How: This draws it in orange. */ }


										<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />{ /* What: Check Circle Path Element. Why: An open circle frames the check. How: This draws it. */ }

										<polyline points='22 4 12 14.01 9 11.01' />{ /* What: Check Mark Polyline Element. Why: The check mark is the success sign. How: This draws it through the circle's gap. */ }


									</svg>

									<h2 className={ cssModObj.sucTitHea }>Message Sent!</h2>{ /* What: Success Title Heading Element. Why: The thank-you's heading says what happened. How: This shows Message Sent. */ }

									<p className={ cssModObj.sucTexPar }>Thanks for reaching out. I'll be in touch within 24 hours.</p>{ /* What: Success Text Paragraph Element. Why: A visitor learns when to expect a reply. How: This thanks them and promises a reply within a day. */ }

									<button
										className={ cssModObj.resForBut }

										onClick={ resForFun }
									>Send Another Message</button>{ /* What: Reset Form Button Element. Why: A visitor may want to send another message. How: This empties the form and shows it again. */ }


								</div>


							) : ( // What: Form Branch. Why: Until a message is sent, the form shows. How: This renders the form.


								<form
									className={ cssModObj.conForFor }

									onSubmit={ subForFun }
								>{ /* What: Contact Form Form Element. Why: A visitor writes their message here. How: The browser first checks the required fields and the email format, then this sends the fields through subForFun. */ }


									<h2 className={ cssModObj.forTitHea }>Send a Message</h2>{ /* What: Form Title Heading Element. Why: The form's heading names it. How: This shows Send a Message as an h2. */ }

									<p
										className={ cssModObj.forHonPar }

										aria-hidden='true'
									>{ /* What: Form Honeypot Paragraph Element. Why: A person never sees or fills this field, so a bot that does gives itself away, and Netlify drops its submission. How: This holds a label and input moved off screen and hidden from screen readers. */ }


										<label>{ /* What: Honeypot Label Element. Why: A hidden field still needs a label. How: This wraps the honeypot input in its label text. */ }


											Leave this field blank:

											<input
												name='bot-field'

												autoComplete='off'
												value={ forDatObj[ 'bot-field' ] }

												tabIndex={ -1 }

												onChange={ chaFieFun }
											/>{ /* What: Bot Field Input Element. Why: A filled honeypot marks a bot. How: This writes into the form's bot-field through the shared change handler and posts with the other fields. */ }


										</label>


									</p>


									<div className={ cssModObj.forRowDiv }>{ /* What: Form Row Div Element. Why: The name and email fields share a row on wide screens. How: This sets them side by side. */ }


										<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The name's label and input read as one field. How: This stacks them. */ }


											<label
												className={ cssModObj.fieLabLab }

												htmlFor='forNamInp'
											>Full Name</label>{ /* What: Field Label Label Element. Why: The input needs a visible name. How: This labels it Full Name. */ }

											<input
												id='forNamInp'

												className={ cssModObj.forConInp }

												name='name'

												placeholder='Your name'
												required
												type='text'
												value={ forDatObj.name }

												onChange={ chaFieFun }
											/>{ /* What: Form Control Input Element. Why: The visitor says who they are. How: This holds the name in the form's state. */ }


										</div>

										<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The email's label and input read as one field. How: This stacks them. */ }


											<label
												className={ cssModObj.fieLabLab }

												htmlFor='forEmaInp'
											>Email</label>{ /* What: Field Label Label Element. Why: The input needs a visible name. How: This labels it Email. */ }

											<input
												id='forEmaInp'

												className={ cssModObj.forConInp }

												name='email'

												placeholder='you@example.com'
												required
												type='email'
												value={ forDatObj.email }

												onChange={ chaFieFun }
											/>{ /* What: Form Control Input Element. Why: A reply needs somewhere to go. How: This holds the address in the form's state. */ }


										</div>


									</div>


									<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The budget's label and menu read as one field. How: This stacks them. */ }


										<label
											className={ cssModObj.fieLabLab }

											htmlFor='forBudSel'
										>Project Budget</label>{ /* What: Field Label Label Element. Why: The menu needs a visible name. How: This labels it Project Budget. */ }

										<select
											id='forBudSel'

											className={ cssModObj.forConSel }

											name='budget'

											value={ forDatObj.budget }

											onChange={ chaFieFun }
										>{ /* What: Form Control Select Element. Why: A visitor can say roughly what they mean to spend. How: This offers the ranges, holding the choice in the form's state. */ }


											<option value=''>Select a range…</option>{ /* What: Placeholder Option Element. Why: The menu starts with no range chosen. How: This prompts a choice with an empty value. */ }

											<option>Under $100</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers under $100. */ }

											<option>$100 – $250</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $100 to $250. */ }

											<option>$250 – $500</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $250 to $500. */ }

											<option>$500 – $1,000</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $500 to $1,000. */ }

											<option>$1,000+</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $1,000 and up. */ }


										</select>


									</div>

									{ errMesStr && ( // What: Error Presence Check. Why: An error shows only after a failed send. How: This renders the message when there is one.


										<p className={ cssModObj.errMesPar }>{ errMesStr }</p> // What: Error Message Paragraph Element. Why: A visitor learns the message didn't go out. How: This fades the error up into view above the message field.


									) }

									<div className={ cssModObj.forFieDiv }>{ /* What: Form Field Div Element. Why: The message's label and box read as one field. How: This stacks them. */ }


										<label
											className={ cssModObj.fieLabLab }

											htmlFor='forMesTex'
										>Message</label>{ /* What: Field Label Label Element. Why: The box needs a visible name. How: This labels it Message. */ }

										<textarea
											id='forMesTex'

											className={ cssModObj.forConTex }

											name='message'

											placeholder='Tell me about your project…'
											required
											rows={ 6 }
											value={ forDatObj.message }

											onChange={ chaFieFun }
										/>{ /* What: Form Control Textarea Element. Why: The visitor writes their message here. How: This holds it in the form's state, six rows tall. */ }


									</div>


									<button
										className={ cssModObj.senMesBut }

										disabled={ isaLoaBoo }
										type='submit'
									>{ /* What: Send Message Button Element. Why: The visitor sends the message. How: This submits the form, disabled and reading Sending while it's on its way. */ }


										{ isaLoaBoo ? 'Sending…' : 'Send Message' }{ /* What: Submit Label Text. Why: The button says what's happening. How: This reads Sending while sending, or Send Message otherwise. */ }

										{ !isaLoaBoo && ( // What: Send Icon Check. Why: The paper plane only shows while the button is ready. How: This renders it unless sending.


											<svg
												fill='none'
												height='16'
												stroke='currentColor'
												strokeWidth='2.5'
												viewBox='0 0 24 24'
												width='16'
											>{ /* What: Paper Plane SVG Element. Why: A paper plane stands for sending. How: This draws it after the label. */ }


												<line
													x1='22'
													x2='11'
													y1='2'
													y2='13'
												/>{ /* What: Plane Fold Line Element. Why: The fold splits the plane's wings. How: This draws it. */ }

												<polygon points='22 2 15 22 11 13 2 9 22 2' />{ /* What: Plane Body Polygon Element. Why: The plane's outline is one shape. How: This traces it. */ }


											</svg>


										) }


									</button>


								</form>


							) }


						</div>



						<aside className={ cssModObj.conSidAsi }>{ /* What: Contact Sidebar Aside Element. Why: The other ways to get in touch sit beside the form. How: This stacks the details, availability, and response time cards. */ }


							<div className={ cssModObj.sidCarDiv }>{ /* What: Sidebar Card Div Element. Why: A visitor may prefer email or a profile to the form. How: This lists each contact item. */ }


								<h3 className={ cssModObj.sidTitHea }>Contact Details</h3>{ /* What: Sidebar Title Heading Element. Why: The card is named. How: This shows its title. */ }

								<div className={ cssModObj.conIteDiv }>{ /* What: Contact Item Div Element. Why: The items stack in a list. How: This holds one link per item. */ }


									{ CON_ITE_ARR.map( ( conIteObj ) => ( // What: Contact Item Map Call. Why: Every contact item shows. How: This renders one link per row.


										<a
											key={ conIteObj.labStr }

											className={ cssModObj.conIteAnc }

											href={ conIteObj.hreStr }
											rel={ conIteObj.extBoo ? 'noreferrer' : undefined } // What: Relationship Ternary. Why: A profile on another site shouldn't learn which page sent the visitor. How: This sets noreferrer on the external rows and leaves the email row without one.
											target={ conIteObj.extBoo ? '_blank' : undefined } // What: Target Ternary. Why: A profile opens beside the site, while a mailto link in a new tab would leave an empty tab behind. How: This opens only the external rows in a new tab.
										>{ /* What: Contact Item Anchor Element. Why: Each item links to its address. How: This opens a profile in a new tab, or the email address in the visitor's mail app, showing the icon beside the name and address. */ }


											<span className={ cssModObj.conIcoSpa }>{ conIteObj.icoEle }</span>{ /* What: Contact Icon Span Element. Why: An icon marks each item at a glance. How: This frames the row's icon. */ }

											<div>{ /* What: Contact Text Div Element. Why: The name and the address read as one. How: This stacks them. */ }


												<span className={ cssModObj.conLabSpa }>{ conIteObj.labStr }</span>{ /* What: Contact Label Span Element. Why: The item is named. How: This shows its name. */ }

												<span className={ cssModObj.conValSpa }>{ conIteObj.valStr }</span>{ /* What: Contact Value Span Element. Why: The address is shown, not just linked. How: This shows it. */ }


											</div>


										</a>


									))}


								</div>


							</div>



							<div className={ cssModObj.sidCarDiv }>{ /* What: Sidebar Card Div Element. Why: A visitor learns whether z4nta0 can take on their project. How: This shows the status and the earliest start. */ }


								<h3 className={ cssModObj.sidTitHea }>Availability</h3>{ /* What: Sidebar Title Heading Element. Why: The card is named. How: This shows its title. */ }


								<div className={ cssModObj.avaRowDiv }>{ /* What: Availability Row Div Element. Why: The status dot sits beside its text. How: This sets them side by side. */ }


									<span className={ cssModObj.staDotSpa } />{ /* What: Status Dot Span Element. Why: A pulsing dot signals availability. How: This draws it. */ }

									<div>{ /* What: Status Text Div Element. Why: The status and the start date read as one. How: This stacks them. */ }


										<span className={ cssModObj.staTexSpa }>Available for new projects</span>{ /* What: Status Text Span Element. Why: The card says z4nta0 is taking on work. How: This shows the status. */ }

										<span className={ cssModObj.staSubSpa }>Earliest start: Anytime</span>{ /* What: Status Subtitle Span Element. Why: A visitor learns how soon work can start. How: This shows the earliest start. */ }


									</div>


								</div>


							</div>



							<div className={ cssModObj.sidCarDiv }>{ /* What: Sidebar Card Div Element. Why: A visitor learns how soon to expect a reply. How: This shows the response promise. */ }


								<h3 className={ cssModObj.sidTitHea }>Response Time</h3>{ /* What: Sidebar Title Heading Element. Why: The card is named. How: This shows its title. */ }

								<p className={ cssModObj.resTexPar }>{ /* What: Response Text Paragraph Element. Why: The promise is the card's point. How: This says inquiries get a reply within a business day, with LinkedIn for anything urgent. */ }
									I respond to all inquiries within <strong className={ cssModObj.resTimStr }>24 hours</strong> on business days.
									For urgent matters, reach out on LinkedIn.
								</p>


							</div>


						</aside>


					</div>


				</section>


			</div>


		</>


	);


}

// #endregion ConPagCom

// #endregion Components



// #region Exports

export { ConPagCom }; // What: Named Export. Why: The router's Contact route renders this page. How: This exports ConPagCom.

// #endregion Exports


