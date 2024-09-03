"use client"
import { useState } from 'react';
import { Select } from '@chakra-ui/react'

const BottomBar2 = ({isLeftBarOpen}: {isLeftBarOpen: boolean}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`z-30 shadow-lg fixed rounded-t-md bottom-0 w-[445px] transition-all ease-in-out duration-400 ${isLeftBarOpen ? 'left-[885px]' : 'left-[485px]'} right-0 bg-white transition-all duration-300 ${isExpanded ? 'h-[689px]' : 'h-12'}`}>
      <button 
        className="w-full h-12 flex items-center justify-between px-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Degree Requirements</span>
        <span>{isExpanded ? '⬇️' : '⬆️'}</span>
      </button>
      {isExpanded && (
        <div className="p-4 h-[calc(100%-3rem)] overflow-y-auto">
          <Select size="sm" placeholder='Select Program'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          
            <div className='flex flex-col pt-5 gap-4'>
         
                <details>
                    <summary >Enrollment Requirements</summary>
                    
                    This is a limited enrolment program. Students must have completed 4.0 credits and meet the requirements listed below to enrol.

                    Completed courses (with minimum grades)
                    The following courses with the stated minimum grades are required:

                    • MAT137Y1 (63%)/ MAT157Y1 (60%)


                </details>

                <details>
                    <summary>Completion Requirements</summary>
                    <br></br>
                    (8.5 credits)

                    First Year:
                    <br></br>
                    
                    <ol>
                        <li>MAT137Y1 (63%)/ MAT157Y1 (60%)</li>
                        <li>MAT223H1/​ MAT240H1 (should be taken in first year, enforced as a prerequisite for MAT237Y1)</li>
                        <li>STA130H1</li>
                    </ol>

                    <p>Note: STA130H1 is restricted to first-year students. If you are unable to complete STA130H1 in first year, see note below for accepted substitutions for this requirement.</p>

                    <h4>To be completed before the end of Second Year:</h4>
                    <ol start="4">
                        <li>CSC108H1/​ CSC120H1/​ CSC148H1. A student who has completed CSC110Y1 also fulfills this program requirement.</li>
                    </ol>

                    <h4>Higher Years:</h4>
                    <ol start="5">
                        <li>ACT240H1, ACT245H1, ACT247H1, ACT348H1, ACT370H1</li>
                        <li>MAT237Y1/​ MAT257Y1</li>
                        <li>( STA257H1, STA261H1)/ ( STA237H1, STA238H1); while either pair of courses is accepted, we strongly recommend ( STA257H1, STA261H1)</li>
                        <li>ACT451H1, ACT452H1, STA302H1</li>
                    </ol>

                    <p>STA314H1 is strongly recommended.</p>

                    <h4>NOTES:</h4>
                    <ul>
                        <li>If you are unable to complete STA130H1 in your first year of study, this requirement must be fulfilled with one of the following 0.5 credits to fulfill your 8.5-credit program requirements: STA314H1, ACT350H1, ACT455H1, ACT460H1, ACT466H1, STA457H1, STA414H1.</li>
                        <li>In order to enrol in ANY 300- or 400-level ACT course, the minimum grade of 63% must be obtained in each of ACT240H1, ACT245H1 and ACT247H1. The enrolment requirements and the prerequisites for all ACT courses will be strictly enforced.</li>
                        <li>Students who have an interest in pursuing studies in mathematical finance should consider taking MAT244H1, MAT336H1/​ MAT337H1 and APM346H1.</li>
                        <li>ACT390H1 is a required course in the actuarial science specialist program. The course is not required in the actuarial major program but a limited number of spots are available for actuarial major students by invitation, after a short application process. International students in the actuarial major program are not eligible for work permits for internships.</li>
                        <li>Students interested in actuarial practices should consider taking ACT371H1, ACT372H1, ACT470H1, ACT471H1, ACT473H1, ACT475H1.</li>
                        <li>The University of Toronto requires that any student who is using a combination of programs to graduate (e.g. two majors, a major and two minors) must complete a total of at least 12.0 distinct credits that are used to satisfy program requirements. It is possible that a student with a combination of actuarial science major and statistics major may not comply with this 12.0 credit rule (depending on how students select their courses within the statistics major) and may need to take additional courses to satisfy this rule. If you have concerns or questions regarding this rule, please consult with the department.</li>
                        <li>Students are highly encouraged to take ECO101H1 and ECO102H1 to obtain SOA VEE (Validation by Educational Experience) credit for Economics, and MGT201H1 and ACT349H1 to obtain VEE credit for Accounting and Finance.</li>
                    </ul>
                </details>

            </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar2;