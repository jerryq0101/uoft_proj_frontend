export interface FocusReqs {
    description: string[];
    enroll_req: string[];
    completion_req: (string | { [key: string]: string[] })[];
    notes: string[];
}

export const ai_focus_reqs = {
    "description": [
        "The Focus in Artificial Intelligence (Major) has the same set of requirements as the Focus in Artificial Intelligence (Specialist).",
        "Artificial Intelligence (AI) is aimed at understanding and replicating the computational processes underlying intelligent behaviour. These behaviours include the perception of one's environment, learning how that environment is structured, communicating with other agents, and reasoning to guide one's actions. This focus is designed to provide students with an introduction to some of the key scientific and technical ideas that have been developed in AI. There are four different sub-areas of AI represented in our department: Computer Vision, Computational Linguistics, Machine Learning, and Knowledge Representation and Reasoning. These areas cover a wide variety of ideas and techniques. Students wanting to achieve this focus are required to take courses from at least two of these sub-areas (as in point 2, below)."
    ],
    "enroll_req": ["Enrolment in the Computer Science Major Program (ASMAJ1689)."],
    "completion_req": [
        "(3.5 credits)",
        "1.0 credit from the following: CSC336H1, MAT235Y1/​ MAT237Y1/​ MAT257Y1, APM236H1, MAT224H1/​ MAT247H1, STA238H1/​ STA248H1/​ STA261H1, STA302H1, STA347H1",
        {
            "2.5 credits from the following, so that courses are from at least two of the four areas:":
            [
                "CSC401H1, CSC485H1",
                "CSC320H1, CSC420H1",
                "CSC413H1/​ CSC421H1/​ CSC321H1, CSC311H1/​ STA314H1, CSC412H1/​ STA414H1",
                "CSC304H1, CSC384H1, CSC486H1"
            ]
        }
    ],
    "notes": [
        "Suggested Related Courses:",
        "CSC324H1, COG250Y1, PSY270H1, PHL232H1, PHL342H1"
    ]
}

export const comp_ling_focus_reqs = {
    "description": [
        "The Focus in Computational Linguistics and Natural Language Processing (Major) has the same set of requirements as the Focus in Computational Linguistics and Natural Language Processing (Specialist).",
        "How can we build and analyze systems that enable users to communicate with computers using human language (also called natural language) and automatically process the vast amounts of data on the web available in the form of text? The focus covers appropriate material on natural language interfaces, as well as tools such as document summarization, intelligent search over the web, and so on. Students considering this focus are encouraged to consider a Major in Linguistics."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(4.0 credits)",
        "CSC318H1",
        "CSC401H1, CSC485H1",
        "LIN101H1/​ LIN200H1",
        "1.5 credits from the following: CSC309H1, CSC413H1/​ CSC421H1/​ CSC321H1, CSC311H1, CSC428H1, CSC486H1",
        "0.5 credit from the following: PSY100H1, COG250Y1"
    ],
    "notes": [
        "Suggested Related Courses:",
        "Other relevant Computer Science courses, depending on the student's interests, include other courses in artificial intelligence such as CSC384H1 or CSC420H1. Linguistics, Psychology, and Cognitive Science are all directly relevant to this focus, and we recommend that interested students take additional courses from any or all of those disciplines."
    ]
}

/**
 * Template
 * 
 * const comp_sys_focus_reqs = {
    "description": [],
    "enroll_req": [],
    "completion_req": [],
    "notes": []
}
 */

export const comp_sys_focus_reqs = {
    "description": [
        "Software systems are complex and interesting. Poorly done systems can be incredibly expensive: they can cost society billions of dollars and sometimes make the difference between life and death. Rapid changes in technology and applications means that the underlying systems must continually adapt. This focus takes you under the covers of software systems, laying bare the layers and introducing you to concurrency issues, scalability, multiprocessor systems, distributed computing, and more."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.0 credits)",
        "CSC209H1",
        "1.5 credits from the following: CSC343H1, CSC367H1, CSC369H1, CSC457H1/​ CSC458H1",
        "1.0 credit from the following: CSC457H1/​ CSC458H1 (if not taken in list 2), CSC324H1, CSC368H1, CSC385H1, CSC443H1, CSC469H1, CSC488H1"
    ],
    "notes": [
        "Suggested Related Courses:",
        "CSC301H1, CSC309H1, CSC410H1"
    ]
}

export const comp_vis_focus_reqs = {
    "description": [
        "The Focus in Computer Vision (Major) has the same set of requirements as the Focus in Computer Vision (Specialist).",
        "Computer vision is the science and technology of machines that can see. As a science, the goal of computer vision is to understand the computational processes required for a machine to come to an understanding of the content of a set of images. The data here may be a single snapshot, a video sequence, or a set of images from different viewpoints or provided by medical scanners.",
        "The computer vision focus introduces students to the study of vision from a computational point of view. That is, we attempt to clearly define computational problems for various steps of the overall process, and then show how these problems can be tackled with appropriate algorithms.",
        "Students who wish to pursue computer vision should have an understanding of linear algebra and calculus of several variables. Moreover, they should be solid programmers and have a good understanding of data structures and algorithm design. These basic tools are required in order to first pose computational vision problems, and then develop and test algorithms for the solution to those problems."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.5 credits)",
        "MAT235Y1/​ MAT237Y1/​ MAT257Y1, CSC320H1, CSC336H1, CSC311H1, CSC420H1",
        "0.5 credit from the following: CSC412H1, CSC417H1, CSC317H1/​ CSC418H1, CSC419H1, CSC2503H (Note: students must request permission to take a graduate course.)"
    ],
    "notes": [
        "Suggested Related Courses:",
        "APM462H1, COG250Y1, CSC384H1, CSC485H1, CSC486H1, ECE216H1, PHL232H1, PHY385H1, PSL440Y1, PSY270H1, PSY280H1, STA257H1/​ STA261H1"
    ]
}

export const game_design_focus_reqs = {
    "description": [
        "The Focus in Game Design (Major) has the same set of requirements as the Focus in Game Design (Specialist).",
        "Video game design combines several disciplines within computer science, including software engineering, graphics, artificial intelligence, and human-computer interaction. It also incorporates elements of economics, psychology, music, and creative writing, requiring video game researchers to have a diverse, multidisciplinary set of skills.",
        "Students who wish to pursue video game design should have an understanding of linear algebra (for computer graphics modelling), computer hardware and operating systems (for console architecture), data structures, and algorithm design. Students will gain a general knowledge of the more advanced topics listed in the courses below."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.0 credits)",
        "CSC300H1, CSC301H1, CSC318H1, CSC384H1, CSC317H1/​ CSC417H1/​ CSC418H1/​ CSC419H1, CSC404H1"
    ],
    "notes": [
        "Suggested Related Courses:",
        "CSC303H1, CSC304H1, CSC457H1, CSC458H1, CSC428H1",
        "MUS300H1, CIN212H1/​ INI222H1, CIN432H1/​ INI465H1, ENG235H1",
        "ECO326H1, RSM482H1/​MGT2056H"
    ]
}

export const hci_focus_reqs = {
    "description": [
        "Human-Computer Interaction (HCI) is the scientific study of the use of computers by people and the design discipline that informs the creation of systems and software that are useful, usable, and enjoyable for the people who use them. HCI students have exciting opportunities for research and graduate school; HCI professionals often have jobs with titles such as user interface architect, user interface specialist, interaction designer, or usability engineer."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.5 credits)",
        "CSC300H1, CSC301H1, CSC318H1, CSC428H1",
        "STA238H1/​ STA248H1/​ SOC204H1/​ PSY201H1",
        "PSY100H1/​ SOC100H1/​ MIE343H1/​ MIE344H1/​ MIE448H1 (These MIE courses address Human Factors or Ergonomics, offered by the Department of Mechanical and Industrial Engineering. Human factors is a discipline closely associated with human-computer interaction that approaches problems in slightly different ways.)",
        "CSC302H1/​ CSC309H1/​ CSC311H1/​ CSC316H1/​ CSC320H1/​ CSC384H1/​ CSC401H1/​ CSC404H1/​ CSC420H1/​ CSC454H1/​ CSC485H1"
    ],
    "notes": [
        "Suggested Related Courses:",
        "STA313H1",
        "MIE240H1, MIE449H1",
        "ENV281H1, ENV381H1",
        "IRE260H1",
        "COG250Y1, COG260H1, COG341H1, COG343H1, and COG344H1"
    ]
}

export const sci_comp_focus_reqs = {
    "description": [
        "The Focus in Scientific Computing (Major) has the same set of requirements as the Focus in Scientific Computing (Specialist).",
        "Scientific computing studies the world around us. Known and unknown quantities are related through certain rules, e.g. physical laws, formulating mathematical problems. These problems are solved by numerical methods implemented as algorithms and run on computers. The numerical methods are analyzed and their performance (e.g. accuracy, efficiency) studied. Problems, such as choosing the optimal shape for an airplane (to achieve, for example, minimal fuel consumption), finding the fair price for derivative products of the market, or regulating the amount of radiation in medical scans, can be modelled by mathematical expressions and solved by numerical techniques.",
        "Students wishing to study scientific computing should have a strong background in mathematics—in particular calculus of several variables, linear algebra, and statistics—be fluent in programming, and have a good understanding of data structures and algorithm design."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.5 credits)",
        "MAT235Y1/​ MAT237Y1/​ MAT257Y1",
        "1.5 credits from the following: CSC336H1, CSC436H1, CSC446H1, CSC456H1, CSC466H1",
        "1.0 credit from the following: CSC317H1/​ CSC320H1/​ CSC417H1/​ CSC418H1/​ CSC419H1, CSC311H1, CSC343H1, CSC384H1, CSC457H1/​ CSC458H1"
    ],
    "notes": [
        "Suggested Related Courses:",
        "CSC367H1",
        "MAT224H1/​ MAT240H1/​ MAT247H1, MAT334H1/​ MAT354H1, MAT337H1/​ MAT357H1"
    ]
}

export const toc_focus_reqs = {
    "description": [
        "Why is it easy to sort a list of numbers, but hard to break Internet encryption schemes? Is finding a solution to a problem harder than checking that a solution is correct? Can we find good approximate solutions, even when the exact solutions seem out of reach? Theory of Computation studies the inherent complexity of fundamental algorithmic problems. On one hand, we develop ground-breaking efficient data structures and algorithms. On the other, we have yet to develop good algorithms for many problems despite decades of effort, and for these problems we strive to prove no time- or space-efficient algorithms will ever solve them. While the field has seen some successful impossibility results, there are still many problems (such as those underlying modern cryptography and security) for which we do not know either efficient algorithms or strong lower bounds!",
        "This focus takes a rigorous, mathematical approach to computational problem-solving: students will gain a deep understanding of algorithm paradigms and measures of problem complexity, and develop the skills necessary to convey abstract ideas with precision and clarity. Many of our students go on to graduate studies and sophisticated algorithmic work in industry. This focus has natural ties with many branches of mathematics and is the foundation of many computer science fields. Consequently, our students often apply their theoretical knowledge to other fields of interest.",
        "We advise you to take CSC240H1 and CSC265H1, the enriched versions of CSC236H1 and CSC263H1, because these courses are particularly well-aligned with the goals of this focus and will best prepare you for advanced theory courses. However, students who have already taken CSC236H1/​ CSC236H5/​ CSCB36H3 or CSC263H1/​ CSC263H5/​ CSCB63H3 are also welcome to enrol in the focus."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.5 credits)",
        "CSC373H1, CSC463H1",
        {
            "2.5 credits from the following:": [
                "CSC304H1, CSC310H1, CSC336H1, CSC436H1, CSC438H1/​ MAT309H1, CSC448H1, CSC473H1, MAT332H1, MAT344H1",
                "graduate courses: CSC2221H, CSC2240H, CSC2401H, CSC2410H, CSC2412H, CSC2420H, CSC2421H, CSC2426H, CSC2451H, CSC2556H (Note that students must contact cs.undergrad@utoronto.ca during the course enrolment period to request permission to take a graduate course.)"
            ]
        }
    ],
    "notes": [
        "Students who complete an independent study project ( CSC494H1/​ CSC495H1) under the supervision of a faculty member from the Theory group may request to substitute one of CSC494H1/​ CSC495H1 for one of the courses in list 2 above. This request must be made directly to the department's Undergraduate Office.",
        "Students who complete a graduate Topics course in Theory may request to count it towards the completion of list 2 above. This request must be made directly to the department's Undergraduate Office."
    ]
}

export const web_tech_focus_reqs = {
    "description": [
        "The Web and Internet Technologies focus introduces students to the systems and algorithms that power today's large-scale web and Internet applications such as search engines, social networking applications, web data mining applications, and content distribution networks. The focus covers the architecture of the systems, algorithms and protocols, and machine learning techniques underlying these applications.",
        "Students who wish to pursue the Focus in Web and Internet Technologies should have a solid understanding of statistics, be good programmers, and have a good understanding of data structures and algorithm design.",
        "To get practical experience, students pursuing the web and Internet technologies focus are encouraged to do either a CSC494H1/​ CSC495H1: Computer Science Project course or a summer USRA/UTEA project in web and internet technologies."
    ],
    "enroll_req": [
        "Enrolment in the Computer Science Major Program (ASMAJ1689)."
    ],
    "completion_req": [
        "(3.0 credits)",
        "CSC209H1",
        "2.5 credits from STA238H1/​ STA248H1/​ STA261H1, CSC309H1, CSC311H1, CSC343H1, CSC413H1, CSC443H1, CSC457H1, CSC458H1",
    ],
    "notes": [
        "Suggested Related Courses:",
        "ECE568H1",
        "ENV281H1, ENV381H1"
    ]
}
