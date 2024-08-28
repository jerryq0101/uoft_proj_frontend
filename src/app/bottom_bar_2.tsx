"use client"
import { useState } from 'react';
import { Select } from '@chakra-ui/react'

const BottomBar2 = ({isLeftBarOpen}: {isLeftBarOpen: boolean}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`z-30 shadow-md fixed rounded-t-md bottom-0 w-[445px] transition-all ease-in-out duration-400 ${isLeftBarOpen ? 'left-[885px]' : 'left-[485px]'} right-0 bg-white transition-all duration-300 ${isExpanded ? 'h-[689px]' : 'h-12'}`}>
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
                    <summary >Description</summary>
                    LMAOLMAOLMAOLMAO
                </details>

                <details>
                    <summary>Enrolment Requirements</summary>
                    LMAOLMAOLMAOLMAO
                </details>

                <details>
                    <summary>Prerequisites</summary>

                    (3.5 credits)
                    <br></br>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>CSC373H1, CSC463H1</li>
                        <li>2.5 credits from the following:

                            <ul className="list-disc list-inside text-sm space-y-2">
                                <li>
                                    CSC304H1, CSC310H1, CSC336H1, CSC436H1, CSC438H1/​ MAT309H1, CSC448H1, CSC473H1, MAT332H1, MAT344H1
                                </li>  
                                <li>
                                    at UTM: MAT302H5
                                </li> 
                                <li>
                                    graduate courses: CSC2221H, CSC2240H, CSC2401H, CSC2410H, CSC2412H, CSC2420H, CSC2421H, CSC2426H, CSC2451H, CSC2556H (Note that students must contact cs.undergrad@utoronto.ca during the course enrolment period to request permission to take a graduate course.)
                                </li>
                            </ul>
                        </li>
                        
                    </ol>

                    <br></br>
                    Students who complete an independent study project ( CSC494H1/​ CSC495H1) under the supervision of a faculty member from the Theory group may request to substitute one of CSC494H1/​ CSC495H1 for one of the courses in list 2 above. This request must be made directly to the department's Undergraduate Office.
                    <br></br>
                    Students who complete a graduate Topics course in Theory may request to count it towards the completion of list 2 above. This request must be made directly to the department's Undergraduate Office.
                </details>
            </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar2;