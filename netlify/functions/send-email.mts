


// #region Imports

import type { Handler         } from '@netlify/functions'; // What: Handler. Why: Netlify calls the function with its own event and expects its own response shape. How: This types senEmaFun as a Netlify handler.
import type { HandlerResponse } from '@netlify/functions'; // What: Handler Response. Why: Each early answer is built before it's returned. How: This types those responses.

// #endregion Imports



/**
 * send-email.mts = Send Email Function
 *
 * @summary
 * The serverless function behind the Contact page's form. The page posts the
 * visitor's message here rather than to EmailJS directly, so the EmailJS keys
 * stay in Netlify's environment variables and never reach the browser. It
 * accepts only a POST whose JSON body names a known template, forwards the
 * message to EmailJS's send endpoint with that template and the server-side
 * keys, and answers with EmailJS's own status, so the page can tell a sent
 * message from a failed one. Netlify serves it at
 * /.netlify/functions/send-email.
 *
 * Sections:
 *  - Types
 *  - Helpers
 *  - Exports
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/



// #region Types

type EmaReqTyp = { // What: Email Request Type. Why: The page and the EmailJS template agree on these field names, so they're an external contract and keep EmailJS's own spelling. How: This names every field the form posts.


	budget       : string, // What: Budget. Why: The template shows the visitor's budget range. How: This is the chosen range, or 'Not specified'.
	from_email   : string, // What: From Email. Why: A reply goes back to the visitor. How: This is the address they entered.
	from_name    : string, // What: From Name. Why: The template greets the sender by name. How: This is the name they entered.
	message      : string, // What: Message. Why: The message is the point of the email. How: This is what they wrote.
	subject      : string, // What: Subject. Why: The template's subject line reads it. How: This is the subject the page sets.
	templateType : string, // What: Template Type. Why: The function picks the EmailJS template from it. How: This names a key of the template map.
	to_email     : string  // What: To Email. Why: The template sends to this address. How: This is the site's contact address.


};

// #endregion Types



// #region Helpers

// #region senEmaFun

/**
 * senEmaFun = Send Email Function
 *
 * @summary
 * Handles one request from the contact form. Anything but a POST gets a 405,
 * a request with no body or an unknown template type gets a 400, and anything
 * else is sent through EmailJS with the template the type names and the keys
 * held in Netlify's environment variables. EmailJS's reply is logged for
 * Netlify's function logs and passed back: a 200 when it sent the email, or
 * EmailJS's own status and text when it didn't. A network failure reaching
 * EmailJS answers with a 500 and the error's message.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param eveReqObj - Event Request Object: The request Netlify received,
 *                    with its method and JSON body.
 *
 * @returns A promise of the response Netlify sends back to the page.
 *
 * @example
 * ```ts
 * senEmaFun(eveReqObj) // => Promise<HandlerResponse>
 * ```
 *
*/

const senEmaFun : Handler = async ( eveReqObj ) => { // What: Send Email Function. Why: Netlify runs this for every request to the function. How: This validates the request, sends it through EmailJS, and answers with the result.


	if ( eveReqObj.httpMethod !== 'POST' ) return { body : 'Method Not Allowed', statusCode : 405 }; // What: Method Guard. Why: The form only ever posts, so any other method is a stray request. How: This answers anything else with a 405.



	if ( !eveReqObj.body ) return { body : 'Missing request body', statusCode : 400 }; // What: Body Guard. Why: A request with nothing to send can't become an email. How: This answers it with a 400 before parsing.



	const emaReqObj = JSON.parse( eveReqObj.body ) as EmaReqTyp; // What: Email Request Object. Why: The form posts its fields as JSON. How: This parses the body. // What: Type Assertion Note. Why: JSON.parse returns any, and the fields are read by name below. How: The form always posts this shape, and a missing template type is caught by the template guard.

	const temMapObj : Record< string, string | undefined > = { contact : process.env.EMAILJS_CONTACT_TEMPLATE_ID }; // What: Template Map Object. Why: Each kind of form has its own EmailJS template, kept in the environment rather than the code. How: This maps each template type to its template's ID.

	const temIdeStr = temMapObj[ emaReqObj.templateType ]; // What: Template Identifier String. Why: The request names which template to send with. How: This looks its ID up, undefined for an unknown type.


	if ( !temIdeStr ) return { body : 'Invalid template type', statusCode : 400 }; // What: Template Guard. Why: An unknown type, or a template whose variable isn't set, can't be sent. How: This answers it with a 400.



	const emaPayObj = { // What: Email Payload Object. Why: EmailJS's send endpoint expects its own field names. How: This holds the service, the template, both keys, and the template's parameters.


		accessToken : process.env.EMAILJS_PRIVATE_KEY, // What: Access Token. Why: EmailJS only accepts a server-side send with the account's private key. How: This reads it from the environment.
		service_id  : process.env.EMAILJS_SERVICE_ID,  // What: Service Identifier. Why: EmailJS sends through the account's email service. How: This reads its ID from the environment.
		template_id : temIdeStr,                       // What: Template Identifier. Why: EmailJS fills in and sends the chosen template. How: This is the ID the template map found.
		user_id     : process.env.EMAILJS_PUBLIC_KEY,  // What: User Identifier. Why: EmailJS identifies the account by its public key. How: This reads it from the environment.

		template_params : { // What: Template Parameters. Why: The template fills its blanks from these. How: This passes each form field under the name the template uses.


			budget     : emaReqObj.budget,     // What: Budget. Why: The template shows the visitor's budget range. How: This passes it through.
			from_email : emaReqObj.from_email, // What: From Email. Why: The template's reply-to reads it. How: This passes it through.
			from_name  : emaReqObj.from_name,  // What: From Name. Why: The template greets the sender. How: This passes it through.
			message    : emaReqObj.message,    // What: Message. Why: The template's body reads it. How: This passes it through.
			subject    : emaReqObj.subject,    // What: Subject. Why: The template's subject line reads it. How: This passes it through.
			to_email   : emaReqObj.to_email    // What: To Email. Why: The template sends to it. How: This passes it through.


		}


	};



	try {


		const emaResObj = await fetch( 'https://api.emailjs.com/api/v1.0/email/send', { // What: Email Response Object. Why: EmailJS sends the email and reports how it went. How: This posts the payload to its send endpoint as JSON.


			body    : JSON.stringify( emaPayObj ),               // What: Body. Why: EmailJS reads a JSON payload. How: This serializes it.
			headers : { 'Content-Type' : 'application/json' }, // What: Headers. Why: EmailJS has to know the body is JSON. How: This sets the content type.
			method  : 'POST'                                    // What: Method. Why: The send endpoint only accepts a POST. How: This sets it.


		} );

		const resTexStr = await emaResObj.text(); // What: Response Text String. Why: EmailJS explains a failure in its reply's text, and a body can only be read once. How: This reads it a single time for the log and the answer.


		console.log( 'EmailJS Response:', resTexStr ); // What: Response Log Call. Why: A failed send is diagnosed from Netlify's function logs. How: This logs EmailJS's reply.



		const senResObj : HandlerResponse = emaResObj.ok // What: Send Response Object. Why: The page needs to know whether the email went out. How: This answers a 200 on success, or EmailJS's own status and text otherwise.
			? { body : 'Sent!', statusCode : 200 }                 // What: Success Response. Why: EmailJS sent the email. How: This answers a 200.
			: { body : resTexStr, statusCode : emaResObj.status }; // What: Failure Response. Why: EmailJS refused the send. How: This passes its status and explanation back.



		return senResObj;


	}

	catch ( errCatObj ) {


		console.warn( errCatObj ); // What: Error Warning Call. Why: A failure reaching EmailJS should stay visible in the logs. How: This logs the error.



		return { body : errCatObj instanceof Error ? errCatObj.message : 'Unknown error', statusCode : 500 }; // What: Error Response Return. Why: The page should learn the send failed rather than hang. How: This answers a 500 with the error's message.


	}


};

// #endregion senEmaFun

// #endregion Helpers



// #region Exports

export { senEmaFun as handler }; // What: Named Export. Why: Netlify runs the function's export named handler. How: This exports senEmaFun under that name.

// #endregion Exports


