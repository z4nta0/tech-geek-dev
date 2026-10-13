


// #region Imports

import cssModObj from './about.module.css';    // What: CSS Module Object. Why: The About page's own hero, skills, timeline, and values styles live in its own module. How: This maps each class name in about.module.css to its hashed module class.
import selPorUrl from './self-portrait.webp'; // What: Self Portrait URL. Why: The hero shows z4nta0's portrait. How: Vite resolves this to the image's fingerprinted URL.


import { GeoBacCom   } from '../../ui/geo-bg.tsx';         // What: Geometric Background Component. Why: The hero and the timeline sit over faint patterns. How: This draws the dots and the grid.
import { Link        } from 'react-router';                // What: Link. Why: The hero's button moves to the Contact page without a full page load. How: This renders it as a router link.
import { SecHeaCom   } from '../../ui/section-header.tsx'; // What: Section Header Component. Why: The skills, timeline, and values sections open with a heading block. How: This renders each label, title, and subtitle.
import { SHI_COU_NUM } from '../../ui/projects.ts';        // What: Shipped Count Number. Why: The hero's floating fact counts the projects shipped. How: This is the count taken from the project list.
import { TagLabCom   } from '../../ui/tag.tsx';            // What: Tag Label Component. Why: Each skill shows as a pill. How: This renders one tag per skill.


import type { JSX } from 'react'; // What: JSX. Why: The component declares the element it returns. How: This types its return as a JSX element.

// #endregion Imports



/**
 * about.tsx = About
 *
 * @summary
 * The About page: a hero introducing z4nta0 beside a portrait framed by
 * hexagons, with two floating facts; the skills grouped by area; the
 * journey from a first computer in 2004 to today, as a timeline; and the
 * four values behind the work. The projects shipped fact is counted from the
 * project list, so it grows as projects are added.
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

// #region SKI_GRO_ARR

/**
 * SKI_GRO_ARR = Skill Group Array
 *
 * @summary
 * The skills grid's groups, in the order they show. Every row shares one
 * shape, so its fields carry no comments of their own:
 * - `labStr` (String): Label String, the group's heading, also its React
 *   key.
 * - `skiArr` (Array): Skill Array, the technologies in the group, each shown
 *   as a tag.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const SKI_GRO_ARR = [ // What: Skill Group Array. Why: The skills grid shows the same groups every visit. How: Each row names a group and its technologies.


	{ labStr : 'Frontend', skiArr : [ 'React', 'TypeScript', 'Next.js', 'Vite', 'CSS / Sass', 'GreenSock', 'React Router' ] }, // What: Frontend Group Row. Why: The interface side of the work. How: This lists its technologies.
	{ labStr : 'Backend',  skiArr : [ 'Node.js', 'Express', 'REST APIs', 'PHP' ]                                            }, // What: Backend Group Row. Why: The server side of the work. How: This lists its technologies.
	{ labStr : 'Data',     skiArr : [ 'MongoDB', 'MySQL' ]                                                                  }, // What: Data Group Row. Why: Where the work stores its data. How: This lists its databases.
	{ labStr : 'DevOps',   skiArr : [ 'Apache', 'Netlify', 'GitHub Actions' ]                                               }  // What: DevOps Group Row. Why: How the work is served and deployed. How: This lists its tools.


];

// #endregion SKI_GRO_ARR



// #region TIM_LIN_ARR

/**
 * TIM_LIN_ARR = Timeline Array
 *
 * @summary
 * The journey the timeline shows, newest first. Every row shares one shape,
 * so its fields carry no comments of their own:
 * - `desStr` (String): Description String, what happened that year.
 * - `orgStr` (String): Organization String, who the work was for.
 * - `titStr` (String): Title String, the milestone's name.
 * - `yeaStr` (String): Year String, the milestone's year, also its React
 *   key.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const TIM_LIN_ARR = [ // What: Timeline Array. Why: The timeline shows the same milestones every visit. How: Each row holds one milestone.


	{ orgStr : 'Freelance', titStr : 'Web Veteran',          yeaStr : '2026', desStr : 'With the rise of AI it is no longer a constraint to design websites and I can focus on just coding, rapidly increasing the rate at which I could deliver solutions.' }, // What: Web Veteran Row. Why: The latest milestone. How: This is the 2026 entry.

	{ orgStr : 'Self',      titStr : 'Web App Developer',    yeaStr : '2018', desStr : 'A personal web app that creates a todo list using randomly generated tasks with a Node.js, Express.js and MongoDB backend.' }, // What: Web App Developer Row. Why: The first web app. How: This is the 2018 entry.

	{ orgStr : 'Freelance', titStr : 'Full Stack Developer', yeaStr : '2015', desStr : 'My first real website, it was for a local church with some simple social features that taught me all about backend architecture using Apache, PHP and MySQL.' }, // What: Full Stack Developer Row. Why: The first website for someone else. How: This is the 2015 entry.

	{ orgStr : 'Self',      titStr : 'Tech Veteran',         yeaStr : '2014', desStr : 'My first fully custom built computer, allowing me to explore advanced hardware configurations and performance optimizations.' }, // What: Tech Veteran Row. Why: The first custom computer. How: This is the 2014 entry.

	{ orgStr : 'Self',      titStr : 'Web Newbie',           yeaStr : '2013', desStr : 'My first foray into coding, starting with developing websites using simple HTML and CSS.' }, // What: Web Newbie Row. Why: The start of coding. How: This is the 2013 entry.

	{ orgStr : 'Self',      titStr : 'Tech Tinkerer',        yeaStr : '2007', desStr : 'My first experiments with changing and upgrading my computer hardware, setting the stage for building my own custom computers.' }, // What: Tech Tinkerer Row. Why: The first hardware upgrades. How: This is the 2007 entry.

	{ orgStr : 'Self',      titStr : 'Tech Newbie',          yeaStr : '2004', desStr : 'I purchased my first personally owned computer, sparking my passion for technology.' } // What: Tech Newbie Row. Why: Where it all began. How: This is the 2004 entry.


];

// #endregion TIM_LIN_ARR



// #region VAL_CAR_ARR

/**
 * VAL_CAR_ARR = Value Card Array
 *
 * @summary
 * The values section's cards, in the order they show. Every row shares one
 * shape, so its fields carry no comments of their own:
 * - `desStr` (String): Description String, the sentence under the title.
 * - `icoStr` (String): Icon String, the geometric symbol above the title.
 * - `titStr` (String): Title String, the value's name, also its React key.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
*/

const VAL_CAR_ARR = [ // What: Value Card Array. Why: The values section shows the same four cards every visit. How: Each row holds one value.


	{ icoStr : '⬡', titStr : 'Craft Over Speed',     desStr : 'I take time to do it right. Technical debt has compounding interest.'                      }, // What: Craft Over Speed Row. Why: Doing it right comes first. How: This is the first value.
	{ icoStr : '◎', titStr : 'Accessibility First',  desStr : 'The web is for everyone. I build with WCAG compliance as a baseline, not an afterthought.' }, // What: Accessibility First Row. Why: The work serves everyone. How: This is the second value.
	{ icoStr : '△', titStr : 'Honest Communication', desStr : "I'd rather tell you something takes three weeks than promise one and deliver late."        }, // What: Honest Communication Row. Why: Clients hear the truth. How: This is the third value.
	{ icoStr : '◇', titStr : 'Continuous Learning',  desStr : 'The best developers I know are the most curious. I read, I experiment, I teach.'           }  // What: Continuous Learning Row. Why: The craft keeps moving. How: This is the last value.


];

// #endregion VAL_CAR_ARR

// #endregion Constants



// #region Components

// #region AboPagCom

/**
 * AboPagCom = About Page Component
 *
 * @summary
 * Renders the About page. The hero pairs the introduction and its button to
 * the Contact page with the portrait in its hexagon frame and two floating
 * facts, the second counted from the project list. The skills section shows
 * a card per group in SKI_GRO_ARR with a tag per skill; the timeline shows
 * TIM_LIN_ARR's milestones joined by a line that stops at the last one; and
 * the values section shows a card per value in VAL_CAR_ARR. Every
 * decorative frame, line, and symbol is hidden from screen readers.
 *
 * @author z4nta0 <https://github.com/z4nta0>
 *
 * @param props - This component does not use any props.
 *
 * @returns The page's wrapper div.
 *
 * @example
 * ```tsx
 * AboPagCom() // => <AboPagCom />
 * ```
 *
*/

function AboPagCom () : JSX.Element {


	return (


		<div className='page-enter'>{ /* What: About Page Div Element. Why: The page's sections stack in one column. How: This holds them and fades in like every page. */ }


			<section className={ cssModObj.hero }>{ /* What: Hero Section Element. Why: The page opens by introducing z4nta0. How: This holds the pattern and the hero's two columns. */ }


				<GeoBacCom
					patOpaNum={ 0.2 }
					patVarStr='dots'
				/>{ /* What: Hero Geometric Background Component. Why: A faint field of dots sits behind the hero. How: This draws it at 20% strength. */ }



				<div className={` container   ${ cssModObj.heroGrid } `}>{ /* What: Hero Grid Div Element. Why: The introduction and the portrait sit side by side in the page's centered column. How: This lays out the two columns. */ }


					<div className={ cssModObj.heroText }>{ /* What: Hero Text Div Element. Why: The introduction reads as one column. How: This stacks the label, heading, paragraphs, and button. */ }


						<span className={ cssModObj.heroLabel }>{ /* What: Hero Label Span Element. Why: A small label names the page above its heading. How: This shows About Me after a short rule. */ }
							<span className={ cssModObj.heroLine } />{ /* What: Hero Line Span Element. Why: A short rule leads into the label. How: This draws the rule. */ }

							About Me
						</span>

						<h1 className={ cssModObj.heroTitle }>{ /* What: Hero Title Heading Element. Why: The page's heading sums up z4nta0 in three words. How: This sets Dev and Creator over Problem Solver, the second line in the accent. */ }
							Dev. Creator.<br />
							<span className={ cssModObj.accent }>Problem Solver.</span>
						</h1>

						<p className={ cssModObj.lead }>{ /* What: Lead Paragraph Element. Why: The opening line says who z4nta0 is. How: This shows it in the larger lead style. */ }
							I'm a full-stack web developer with a passion for building things that
							are fast, accessible, and beautiful. I live at the intersection of
							engineering discipline and creative curiosity.
						</p>

						<p className={ cssModObj.body }>{ /* What: Body Paragraph Element. Why: A second paragraph tells the longer story. How: This describes the years of work and who it's for. */ }
							Based in the American Midwest, I've spent the last ten plus years turning
							my coding curiosity into a deep understanding of web development. Whether
							that's a side project for myself, fun websites for friends and family, or
							websites for local businesses, I bring the same level of care to all of it.
						</p>

						<div className={ cssModObj.ctaRow }>{ /* What: Button Row Div Element. Why: The introduction ends with its next step. How: This holds the button. */ }


							<Link
								className={ cssModObj.ctaPrimary }

								to='/contact'
							>Work With Me</Link>{ /* What: Work With Me Link. Why: A visitor who likes what they read can get in touch. How: This routes to the Contact page as a button. */ }


						</div>


					</div>



					<div className={ cssModObj.heroVisual }>{ /* What: Hero Visual Div Element. Why: The portrait and the facts illustrate the introduction. How: This holds the framed portrait and the two floating facts. */ }


						<div className={ cssModObj.portraitWrap }>{ /* What: Portrait Wrap Div Element. Why: The portrait sits inside its hexagon frame. How: This layers the frame and the photo. */ }


							<div
								className={ cssModObj.portraitFrame }

								aria-hidden='true'
							>{ /* What: Portrait Frame Div Element. Why: Hexagons frame the portrait in the site's geometric style. How: This holds the frame drawing, hidden from screen readers as decoration. */ }


								<svg
									className={ cssModObj.frameSvg }

									fill='none'
									viewBox='0 0 320 360'
								>{ /* What: Frame SVG Element. Why: The frame is two nested hexagons. How: This draws them behind the photo. */ }


									<polygon
										opacity='0.5'
										points='160,10 310,90 310,270 160,350 10,270 10,90'
										stroke='var(--orange)' // Orange = #F26419
										strokeWidth='2'
									/>{ /* What: Outer Frame Polygon Element. Why: The frame's outer hexagon is orange. How: This traces it at half strength. */ }

									<polygon
										opacity='0.35'
										points='160,30 290,100 290,260 160,330 30,260 30,100'
										stroke='var(--blue)' // Blue = #7DB9D8
										strokeWidth='1'
									/>{ /* What: Inner Frame Polygon Element. Why: A thinner blue hexagon nests inside the first. How: This traces it at 35% strength. */ }


								</svg>


							</div>


							<img
								className={ cssModObj.portrait }

								src={ selPorUrl }

								alt='Portrait of z4nta0'
							/>{ /* What: Portrait Image Element. Why: A visitor sees who they'd be working with. How: This shows the portrait inside the frame. */ }


						</div>


						<div className={` ${ cssModObj.floatCard }   ${ cssModObj.floatTop } `}>{ /* What: Top Fact Div Element. Why: A floating fact highlights the years of experience. How: This shows the figure over its label at the portrait's top corner. */ }
							<span className={ cssModObj.floatNum }>10+</span>{ /* What: Years Figure Span Element. Why: z4nta0 has been a developer since 2013. How: This shows ten plus. */ }

							<span className={ cssModObj.floatLabel }>Years coding</span>{ /* What: Years Label Span Element. Why: The label says what the figure counts. How: This shows Years coding. */ }
						</div>

						<div className={` ${ cssModObj.floatCard }   ${ cssModObj.floatBottom } `}>{ /* What: Bottom Fact Div Element. Why: A floating fact highlights the projects shipped. How: This shows the figure over its label at the portrait's bottom corner. */ }
							<span className={ cssModObj.floatNum }>{ SHI_COU_NUM }+</span>{ /* What: Projects Figure Span Element. Why: The count should grow as projects are added, and older projects that are no longer online still count. How: This shows the project list's count with a plus. */ }

							<span className={ cssModObj.floatLabel }>Projects shipped</span>{ /* What: Projects Label Span Element. Why: The label says what the figure counts. How: This shows Projects shipped. */ }
						</div>


					</div>


				</div>


			</section>



			<section className={` section   ${ cssModObj.skillsSection } `}>{ /* What: Skills Section Element. Why: A visitor sees what z4nta0 works with. How: This holds the heading block and the skill groups. */ }


				<div className='container'>{ /* What: Skills Container Div Element. Why: The section sits in the page's centered column. How: This stacks the heading block and the grid. */ }


					<SecHeaCom
						labTexStr='Technical Skills'
						subTexStr='The tools and technologies I reach for, and know deeply enough to teach.'
						titTexStr='What I Work With'
					/>{ /* What: Skills Section Header Component. Why: The section opens with its heading. How: This shows its label, title, and subtitle. */ }



					<div className={ cssModObj.skillsGrid }>{ /* What: Skills Grid Div Element. Why: The groups line up in columns. How: This lays out one card per group. */ }


						{ SKI_GRO_ARR.map( ( skiGroObj ) => ( // What: Skill Group Map Call. Why: Every group gets a card. How: This renders one per row.


							<div
								key={ skiGroObj.labStr }

								className={ cssModObj.skillGroup }
							>{ /* What: Skill Group Div Element. Why: Each group is one card. How: This stacks its heading and its tags. */ }


								<div className={ cssModObj.skillGroupHeader }>{ /* What: Skill Group Header Div Element. Why: A dot leads into the group's name. How: This sets them side by side. */ }


									<span className={ cssModObj.skillGroupDot } />{ /* What: Skill Group Dot Span Element. Why: A small dot marks the group's heading. How: This draws it. */ }

									<h3 className={ cssModObj.skillGroupTitle }>{ skiGroObj.labStr }</h3>{ /* What: Skill Group Title Heading Element. Why: Each group is named. How: This shows the name as an h3 under the section's h2. */ }


								</div>

								<div className={ cssModObj.skillTags }>{ /* What: Skill Tags Div Element. Why: The group's technologies read as one cluster of pills. How: This wraps the tags. */ }


									{ skiGroObj.skiArr.map( ( skiNamStr ) => ( // What: Skill Tag Map Call. Why: Every technology gets a pill. How: This renders one medium blue tag per name.


										<TagLabCom
											key={ skiNamStr }

											labTexStr={ skiNamStr }
											tagSizStr='md'
											tagVarStr='blue'
										/> // What: Skill Tag Label Component. Why: The pill names one technology. How: This shows the name in the medium blue variant.


									))}


								</div>


							</div>


						))}


					</div>


				</div>


			</section>



			<section className={` section   ${ cssModObj.timelineSection } `}>{ /* What: Timeline Section Element. Why: A visitor sees how z4nta0 got here. How: This holds the pattern, the heading block, and the timeline. */ }


				<GeoBacCom
					patOpaNum={ 0.12 }
					patVarStr='grid'
				/>{ /* What: Timeline Geometric Background Component. Why: A faint grid sits behind the timeline. How: This draws it at 12% strength. */ }



				<div className={` container   ${ cssModObj.timelineInner } `}>{ /* What: Timeline Inner Div Element. Why: The timeline sits in the page's centered column. How: This stacks the heading block and the milestones. */ }


					<SecHeaCom
						labTexStr='Experience'
						titTexStr='My Journey'
					/>{ /* What: Timeline Section Header Component. Why: The section opens with its heading. How: This shows its label and title. */ }



					<div className={ cssModObj.timeline }>{ /* What: Timeline Div Element. Why: The milestones stack newest first. How: This holds one item per milestone. */ }


						{ TIM_LIN_ARR.map( ( timLinObj, timIndNum ) => ( // What: Timeline Item Map Call. Why: Every milestone shows in order. How: This renders each one, with a connecting line under every one but the last.


							<div
								key={ timLinObj.yeaStr }

								className={ cssModObj.timelineItem }
							>{ /* What: Timeline Item Div Element. Why: Each milestone is one row. How: This sets its year, its connector, and its text side by side. */ }


								<div className={ cssModObj.timelineLeft }>{ /* What: Timeline Left Div Element. Why: The year sits in its own column. How: This holds the year. */ }


									<span className={ cssModObj.timelineYear }>{ timLinObj.yeaStr }</span>{ /* What: Timeline Year Span Element. Why: Each milestone is dated. How: This shows the year. */ }


								</div>

								<div
									className={ cssModObj.timelineConnector }

									aria-hidden='true'
								>{ /* What: Timeline Connector Div Element. Why: A dot and a line join the milestones. How: This draws them, hidden from screen readers as decoration. */ }


									<div className={ cssModObj.timelineDot } />{ /* What: Timeline Dot Div Element. Why: Each milestone has its own dot. How: This draws it. */ }

									{ timIndNum < TIM_LIN_ARR.length - 1 && ( // What: Timeline Line Check. Why: The line joins a milestone to the next, so the last has none. How: This draws it under every milestone but the last.


										<div className={ cssModObj.timelineLine } /> // What: Timeline Line Div Element. Why: A line leads down to the next milestone. How: This draws it.


									) }


								</div>

								<div className={ cssModObj.timelineContent }>{ /* What: Timeline Content Div Element. Why: The milestone's text sits in its own column. How: This stacks its title, organization, and description. */ }


									<h3 className={ cssModObj.timelineTitle }>{ timLinObj.titStr }</h3>{ /* What: Timeline Title Heading Element. Why: Each milestone is named. How: This shows the title as an h3 under the section's h2. */ }

									<span className={ cssModObj.timelineOrg }>{ timLinObj.orgStr }</span>{ /* What: Timeline Organization Span Element. Why: The milestone says who the work was for. How: This shows the organization. */ }

									<p className={ cssModObj.timelineDesc }>{ timLinObj.desStr }</p>{ /* What: Timeline Description Paragraph Element. Why: A sentence says what happened. How: This shows it. */ }


								</div>


							</div>


						))}


					</div>


				</div>


			</section>



			<section className={` section   ${ cssModObj.valuesSection } `}>{ /* What: Values Section Element. Why: The page closes with what drives the work. How: This holds the heading block and the value cards. */ }


				<div className='container'>{ /* What: Values Container Div Element. Why: The section sits in the page's centered column. How: This stacks the heading block and the grid. */ }


					<SecHeaCom
						aliPosStr='center'
						labTexStr='How I Think'
						titTexStr='My Values'
					/>{ /* What: Values Section Header Component. Why: The section opens with its heading. How: This centers its label and title. */ }



					<div className={ cssModObj.valuesGrid }>{ /* What: Values Grid Div Element. Why: The value cards line up in columns. How: This lays out one card per value. */ }


						{ VAL_CAR_ARR.map( ( valCarObj ) => ( // What: Value Card Map Call. Why: Every value gets a card. How: This renders one per row.


							<div
								key={ valCarObj.titStr }

								className={ cssModObj.valueCard }
							>{ /* What: Value Card Div Element. Why: Each value is one card. How: This stacks its symbol, title, and description. */ }


								<span
									className={ cssModObj.valueIcon }

									aria-hidden='true'
								>{ valCarObj.icoStr }</span>{ /* What: Value Icon Span Element. Why: A geometric symbol marks each value. How: This shows the row's symbol, hidden from screen readers as decoration. */ }

								<h3 className={ cssModObj.valueTitle }>{ valCarObj.titStr }</h3>{ /* What: Value Title Heading Element. Why: Each value is named. How: This shows the title as an h3 under the section's h2. */ }

								<p className={ cssModObj.valueDesc }>{ valCarObj.desStr }</p>{ /* What: Value Description Paragraph Element. Why: A sentence says what the value means in practice. How: This shows it. */ }


							</div>


						))}


					</div>


				</div>


			</section>


		</div>


	);


}

// #endregion AboPagCom

// #endregion Components



// #region Exports

export { AboPagCom }; // What: Named Exports. Why: The router's About route renders this page. How: This exports AboPagCom.

// #endregion Exports


