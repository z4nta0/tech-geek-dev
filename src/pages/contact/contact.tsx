


// #region Imports

import cssModObj from './contact.module.css'; // What: CSS Module Object. Why: The Contact page's own hero, form, and sidebar styles live in its own module. How: This maps each class name in contact.module.css to its hashed module class.


import { GeoBacCom } from '../../ui/geo-bg.tsx'; // What: Geometric Background Component. Why: The hero sits over a faint pattern. How: This draws the circuit.
import { useState  } from 'react';               // What: Use State. Why: The page remembers the form's fields and whether a message is sending, sent, or failed. How: This holds each of those.


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
 * time. The form posts to the site's email function, which sends the message
 * through EmailJS to contact@techgeek.dev, then shows a thank-you in its place,
 * or an error under the fields when the send fails.
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



const EMP_FOR_OBJ = { budget : '', email : '', message : '', name : '' }; // What: Empty Form Object. Why: The form starts empty and empties again for another message. How: This holds a blank value for each field, keyed by the field's name attribute, which browsers read for autofill.

// #endregion Constants



// #region Components

// #region ConPagCom

/**
 * ConPagCom = Contact Page Component
 *
 * @summary
 * Renders the Contact page. The form keeps its fields in state, keyed by
 * each field's name attribute. Sending it posts the fields to the site's
 * email function, disabling the button and showing Sending while it waits;
 * a reply the function marks as failed counts as an error, just like a
 * network failure, so either one leaves the form in place with an error
 * under the fields, while a sent message swaps the form for a thank-you with
 * a button that empties the form for another. The sidebar lists CON_ITE_ARR's
 * contact details, each opening in a new tab, beside the availability and
 * response time.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * ConPagCom() // => <ConPagCom />
 * ```
 *
*/

function ConPagCom () : JSX.Element {


	// #region Form State

	const [ errMesStr, setErrMesStr ] = useState< string | null >( null ); // What: Error Message String And Setter. Why: A failed send has to say so under the fields. How: This starts with no error.
	const [ forDatObj, setForDatObj ] = useState( EMP_FOR_OBJ );           // What: Form Data Object And Setter. Why: The fields are controlled, so their values live here. How: This starts with every field blank.
	const [ isaLoaBoo, setIsaLoaBoo ] = useState( false );                 // What: Is-A Loading Boolean And Setter. Why: The button shows Sending while the message is on its way. How: This starts false.
	const [ isaSenBoo, setIsaSenBoo ] = useState( false );                 // What: Is-A Sent Boolean And Setter. Why: A sent message swaps the form for a thank-you. How: This starts false.

	const chaFieFun = ( chaEveObj : ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > ) => setForDatObj( ( preForObj ) => ( { ...preForObj, [ chaEveObj.target.name ] : chaEveObj.target.value } ) ); // What: Change Field Function. Why: Every field writes its edits into the form's state. How: This copies the previous fields and replaces the one named by the edited field's name attribute.


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
	 * Sends the form. It stops the browser's own submission, marks the form as
	 * sending, and clears any earlier error, then posts the fields to the email
	 * function with the contact template, a fixed subject, and the budget or
	 * Not specified when none was chosen. Only a reply the function marks as
	 * sent counts as success; a failed reply or a network failure is logged
	 * and shown as an error under the fields. Sending ends either way.
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

	const subForFun = async ( subEveObj : FormEvent ) => { // What: Submit Form Function. Why: The form's submission sends the message. How: This posts the fields to the email function and records the outcome.


		subEveObj.preventDefault(); // What: Default Submission Prevention Call. Why: The browser would otherwise reload the page to submit the form. How: This stops it, so the message is sent in the background.

		setIsaLoaBoo( true ); // What: Loading Flag Set Call. Why: The button shows Sending while the message is on its way. How: This sets the loading flag.

		setErrMesStr( null ); // What: Error Clear Call. Why: A new attempt shouldn't show the last one's error. How: This clears it.



		try {


			const senResObj = await fetch( '../../.netlify/functions/send-email', { // What: Send Response Object. Why: The email function sends the message and reports how it went. How: This posts the fields as JSON.


				body : JSON.stringify({ // What: Body. Why: The function and the EmailJS template read these field names. How: This serializes the fields under those names.


					budget       : forDatObj.budget || 'Not specified', // What: Budget. Why: The template shows the visitor's budget range. How: This sends the choice, or Not specified when none was made.
					from_email   : forDatObj.email,                     // What: From Email. Why: A reply goes back to the visitor. How: This sends the address they entered.
					from_name    : forDatObj.name,                      // What: From Name. Why: The template greets the sender by name. How: This sends the name they entered.
					message      : forDatObj.message,                   // What: Message. Why: The message is the point of the email. How: This sends what they wrote.
					subject      : 'Portfolio Contact',                 // What: Subject. Why: The template's subject line reads it, and the form no longer asks for one. How: This sends a fixed subject.
					templateType : 'contact',                           // What: Template Type. Why: The function picks its EmailJS template from it. How: This names the contact template.
					to_email     : 'contact@techgeek.dev'               // What: To Email. Why: The template sends to this address. How: This names the site's contact address.


				}),

				method : 'POST' // What: Method. Why: The function only accepts a POST. How: This sets it.


			} );


			if ( !senResObj.ok ) throw new Error( `The email function answered with status ${ senResObj.status }.` ); // What: Failed Reply Guard. Why: A reply the function marks as failed means the message wasn't sent, and must not show the thank-you. How: This throws into the catch below.



			setIsaSenBoo( true ); // What: Sent Flag Set Call. Why: The message went out. How: This swaps the form for the thank-you.


		}

		catch ( errCatObj ) {


			console.warn( errCatObj ); // What: Error Warning Call. Why: A failed send should stay visible to anyone debugging. How: This logs the error.

			setErrMesStr( 'Something went wrong. Please try again or email contact@techgeek.dev directly.' ); // What: Error Message Set Call. Why: The visitor needs to know the message didn't go out and how else to reach z4nta0. How: This shows the error under the fields.


		}

		finally {


			setIsaLoaBoo( false ); // What: Loading Flag Clear Call. Why: Sending is over whether it worked or not. How: This clears the loading flag.


		}


	};

	// #endregion subForFun



	return (


		<div className={ cssModObj.page }>{ /* What: Contact Page Div Element. Why: The page's sections stack in one column. How: This holds them and fades in like every page. */ }


			<section className={ cssModObj.hero }>{ /* What: Hero Section Element. Why: The page opens by inviting a visitor to get in touch. How: This holds the pattern and the heading block. */ }


				<GeoBacCom
					patOpaNum={ 0.14 }
					patVarStr='circuit'
				/>{ /* What: Hero Geometric Background Component. Why: A faint circuit sits behind the hero. How: This draws it at 14% strength. */ }



				<div className={ cssModObj.heroInner }>{ /* What: Hero Inner Div Element. Why: The hero's text sits in the page's centered column. How: This stacks the label, heading, and line. */ }


					<span className={ cssModObj.heroLabel }>{ /* What: Hero Label Span Element. Why: A small label names the page above its heading. How: This shows Get In Touch after a short rule. */ }
						<span className={ cssModObj.heroLine } />{ /* What: Hero Line Span Element. Why: A short rule leads into the label. How: This draws the rule. */ }

						Get In Touch
					</span>

					<h1 className={ cssModObj.heroTitle }>{ /* What: Hero Title Heading Element. Why: The page's heading makes the invitation. How: This sets Let's Build over Something Together, with Something in the accent. */ }
						Let's Build<br />
						<span className={ cssModObj.accent }>Something</span> Together
					</h1>

					<p className={ cssModObj.heroSub }>{ /* What: Hero Subtitle Paragraph Element. Why: A line under the heading says what to expect. How: This promises a reply within a day. */ }
						Have a project in mind? I'd love to hear about it. Send me a message
						and I'll get back to you within 24 hours.
					</p>


				</div>


			</section>



			<section className={ cssModObj.contactSection }>{ /* What: Contact Section Element. Why: The form and the details sit together. How: This holds the two columns. */ }


				<div className={ cssModObj.contactGrid }>{ /* What: Contact Grid Div Element. Why: The form and the sidebar sit side by side in the page's centered column. How: This lays out the two columns. */ }


					<div className={ cssModObj.formWrap }>{ /* What: Form Wrap Div Element. Why: The form and its thank-you share one place. How: This holds whichever one shows. */ }


						{ isaSenBoo ? ( // What: Sent Or Form Check. Why: A sent message replaces the form with a thank-you. How: This renders the thank-you once sent, or the form otherwise.


							<div className={ cssModObj.successState }>{ /* What: Success State Div Element. Why: A visitor learns the message went out. How: This shows a check, a thank-you, and a button for another message. */ }


								<svg
									fill='none'
									height='56'
									stroke='var(--orange)' // Orange = #F26419
									strokeWidth='1.5'
									viewBox='0 0 24 24'
									width='56'
								>{ /* What: Check SVG Element. Why: A circled check says the message went out. How: This draws it in orange. */ }


									<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />{ /* What: Check Circle Path Element. Why: An open circle frames the check. How: This draws it. */ }

									<polyline points='22 4 12 14.01 9 11.01' />{ /* What: Check Mark Polyline Element. Why: The check mark is the success sign. How: This draws it through the circle's gap. */ }


								</svg>

								<h2 className={ cssModObj.successTitle }>Message Sent!</h2>{ /* What: Success Title Heading Element. Why: The thank-you's heading says what happened. How: This shows Message Sent. */ }

								<p className={ cssModObj.successText }>Thanks for reaching out. I'll be in touch within 24 hours.</p>{ /* What: Success Text Paragraph Element. Why: A visitor learns when to expect a reply. How: This thanks them and promises a reply within a day. */ }

								<button
									className={ cssModObj.resetBtn }

									onClick={ resForFun }
								>Send Another Message</button>{ /* What: Reset Button Element. Why: A visitor may want to send another message. How: This empties the form and shows it again. */ }


							</div>


						) : ( // What: Form Branch. Why: Until a message is sent, the form shows. How: This renders the form.


							<form
								className={ cssModObj.form }

								noValidate

								onSubmit={ subForFun }
							>{ /* What: Contact Form Element. Why: A visitor writes their message here. How: This sends the fields through subForFun, leaving the browser's own validation off. */ }


								<h2 className={ cssModObj.formTitle }>Send a Message</h2>{ /* What: Form Title Heading Element. Why: The form's heading names it. How: This shows Send a Message as an h2. */ }


								<div className={ cssModObj.formRow }>{ /* What: Form Row Div Element. Why: The name and email fields share a row on wide screens. How: This sets them side by side. */ }


									<div className={ cssModObj.field }>{ /* What: Name Field Div Element. Why: The name's label and input read as one field. How: This stacks them. */ }


										<label
											className={ cssModObj.label }

											htmlFor='c-name'
										>Full Name</label>{ /* What: Name Label Element. Why: The input needs a visible name. How: This labels it Full Name. */ }

										<input
											id='c-name'

											className={ cssModObj.input }

											name='name'

											placeholder='Your name'
											required
											type='text'
											value={ forDatObj.name }

											onChange={ chaFieFun }
										/>{ /* What: Name Input Element. Why: The visitor says who they are. How: This holds the name in the form's state. */ }


									</div>

									<div className={ cssModObj.field }>{ /* What: Email Field Div Element. Why: The email's label and input read as one field. How: This stacks them. */ }


										<label
											className={ cssModObj.label }

											htmlFor='c-email'
										>Email</label>{ /* What: Email Label Element. Why: The input needs a visible name. How: This labels it Email. */ }

										<input
											id='c-email'

											className={ cssModObj.input }

											name='email'

											placeholder='you@example.com'
											required
											type='email'
											value={ forDatObj.email }

											onChange={ chaFieFun }
										/>{ /* What: Email Input Element. Why: A reply needs somewhere to go. How: This holds the address in the form's state. */ }


									</div>


								</div>


								<div className={ cssModObj.field }>{ /* What: Budget Field Div Element. Why: The budget's label and menu read as one field. How: This stacks them. */ }


									<label
										className={ cssModObj.label }

										htmlFor='c-budget'
									>Project Budget</label>{ /* What: Budget Label Element. Why: The menu needs a visible name. How: This labels it Project Budget. */ }

									<select
										id='c-budget'

										className={ cssModObj.select }

										name='budget'

										value={ forDatObj.budget }

										onChange={ chaFieFun }
									>{ /* What: Budget Select Element. Why: A visitor can say roughly what they mean to spend. How: This offers the ranges, holding the choice in the form's state. */ }


										<option value=''>Select a range…</option>{ /* What: Placeholder Option Element. Why: The menu starts with no range chosen. How: This prompts a choice with an empty value. */ }

										<option>Under $100</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers under $100. */ }

										<option>$100 – $250</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $100 to $250. */ }

										<option>$250 – $500</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $250 to $500. */ }

										<option>$500 – $1,000</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $500 to $1,000. */ }

										<option>$1,000+</option>{ /* What: Range Option Element. Why: Each range is one choice. How: This offers $1,000 and up. */ }


									</select>


								</div>

								{ errMesStr && ( // What: Error Presence Check. Why: An error shows only after a failed send. How: This renders the message when there is one.


									<p className={ cssModObj.errorMsg }>{ errMesStr }</p> // What: Error Message Paragraph Element. Why: A visitor learns the message didn't go out. How: This shows the error under the fields.


								) }

								<div className={ cssModObj.field }>{ /* What: Message Field Div Element. Why: The message's label and box read as one field. How: This stacks them. */ }


									<label
										className={ cssModObj.label }

										htmlFor='c-message'
									>Message</label>{ /* What: Message Label Element. Why: The box needs a visible name. How: This labels it Message. */ }

									<textarea
										id='c-message'

										className={ cssModObj.textarea }

										name='message'

										placeholder='Tell me about your project…'
										required
										rows={ 6 }
										value={ forDatObj.message }

										onChange={ chaFieFun }
									/>{ /* What: Message Textarea Element. Why: The visitor writes their message here. How: This holds it in the form's state, six rows tall. */ }


								</div>

								<button
									className={ cssModObj.submitBtn }

									disabled={ isaLoaBoo }
									type='submit'
								>{ /* What: Submit Button Element. Why: The visitor sends the message. How: This submits the form, disabled and reading Sending while it's on its way. */ }
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



					<aside className={ cssModObj.sidebar }>{ /* What: Sidebar Aside Element. Why: The other ways to get in touch sit beside the form. How: This stacks the details, availability, and response time cards. */ }


						<div className={ cssModObj.sidebarCard }>{ /* What: Contact Details Card Div Element. Why: A visitor may prefer email or a profile to the form. How: This lists each contact item. */ }


							<h3 className={ cssModObj.sidebarTitle }>Contact Details</h3>{ /* What: Contact Details Heading Element. Why: The card is named. How: This shows its title. */ }

							<div className={ cssModObj.contactItems }>{ /* What: Contact Items Div Element. Why: The items stack in a list. How: This holds one link per item. */ }


								{ CON_ITE_ARR.map( ( conIteObj ) => ( // What: Contact Item Map Call. Why: Every contact item shows. How: This renders one link per row.


									<a
										key={ conIteObj.labStr }

										className={ cssModObj.contactItem }

										href={ conIteObj.hreStr }
										rel='noreferrer'
										target='_blank'
									>{ /* What: Contact Item Anchor Element. Why: Each item links to its address. How: This opens the address in a new tab, showing the icon beside the name and address. */ }


										<span className={ cssModObj.contactIcon }>{ conIteObj.icoEle }</span>{ /* What: Contact Icon Span Element. Why: An icon marks each item at a glance. How: This frames the row's icon. */ }

										<div>{ /* What: Contact Text Div Element. Why: The name and the address read as one. How: This stacks them. */ }


											<span className={ cssModObj.contactLabel }>{ conIteObj.labStr }</span>{ /* What: Contact Label Span Element. Why: The item is named. How: This shows its name. */ }

											<span className={ cssModObj.contactValue }>{ conIteObj.valStr }</span>{ /* What: Contact Value Span Element. Why: The address is shown, not just linked. How: This shows it. */ }


										</div>


									</a>


								))}


							</div>


						</div>


						<div className={ cssModObj.sidebarCard }>{ /* What: Availability Card Div Element. Why: A visitor learns whether z4nta0 can take on their project. How: This shows the status and the earliest start. */ }


							<h3 className={ cssModObj.sidebarTitle }>Availability</h3>{ /* What: Availability Heading Element. Why: The card is named. How: This shows its title. */ }

							<div className={ cssModObj.availabilityRow }>{ /* What: Availability Row Div Element. Why: The status dot sits beside its text. How: This sets them side by side. */ }


								<span className={ cssModObj.statusDot } />{ /* What: Status Dot Span Element. Why: A pulsing dot signals availability. How: This draws it. */ }

								<div>{ /* What: Status Text Div Element. Why: The status and the start date read as one. How: This stacks them. */ }


									<span className={ cssModObj.statusText }>Available for new projects</span>{ /* What: Status Text Span Element. Why: The card says z4nta0 is taking on work. How: This shows the status. */ }

									<span className={ cssModObj.statusSub }>Earliest start: Anytime</span>{ /* What: Status Sub Span Element. Why: A visitor learns how soon work can start. How: This shows the earliest start. */ }


								</div>


							</div>


						</div>


						<div className={ cssModObj.sidebarCard }>{ /* What: Response Time Card Div Element. Why: A visitor learns how soon to expect a reply. How: This shows the response promise. */ }


							<h3 className={ cssModObj.sidebarTitle }>Response Time</h3>{ /* What: Response Time Heading Element. Why: The card is named. How: This shows its title. */ }

							<p className={ cssModObj.responseText }>{ /* What: Response Text Paragraph Element. Why: The promise is the card's point. How: This says inquiries get a reply within a business day, with LinkedIn for anything urgent. */ }
								I respond to all inquiries within <strong className={ cssModObj.responseStrong }>24 hours</strong> on business days.
								For urgent matters, reach out on LinkedIn.
							</p>


						</div>


					</aside>


				</div>


			</section>


		</div>


	);


}

// #endregion ConPagCom

// #endregion Components



// #region Exports

export { ConPagCom }; // What: Named Exports. Why: The router's Contact route renders this page. How: This exports ConPagCom.

// #endregion Exports


