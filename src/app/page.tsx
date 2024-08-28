"use client"

import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Image from "next/image";
import MainLeftBar from "./main_left_bar";
import BottomBar from "./bottom_bar"; // Add this import
import BottomBar2 from "./bottom_bar_2"; // Add this import
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

export default function Home() {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    border: 1px solid #047857;
  `;
  const [treeData, setTreeData] = useState<{course_trees: any[]}>();
  const [showCompleted, setShowCompleted] = useState(false)

  // This can be set to true when the left bar is open by the component itself
  const [leftBarIsOpen, setLeftBarIsOpen] = useState(false)


  useEffect(() => {
    console.log("RECEIVED DATA!", treeData)
  }, [treeData])


  useEffect(() => {
    console.log("LEFT BAR IS OPEN!", leftBarIsOpen)
  }, [leftBarIsOpen])

  function convert_data_to_jsx(data: { course_trees: any[] }) {
    const arr = data.course_trees

    let list_of_elements = []
    // to separate out the first node from the rest of the nodes
    if (arr && arr.length > 0 ) {
      for (let i = 0; i < arr.length; i++) {
        const {label, marked, ready_to_take, completed, code, children} = arr[i]
        if (children.length == 0) {
            list_of_elements.push(<Tree
                  lineWidth={'2px'}
                  lineColor={'green'}
                  lineBorderRadius={'10px'}
                  label={<div>{code}</div>}
                >
                  <TreeNode
                    label={<StyledNode>No Prerequisites</StyledNode>}
                  />
                </Tree>)
        } else {
          const first_children = children[0]
          
          let status = ""
          if (ready_to_take) {
            status = "⬅️"
          } else if (completed) {
            status = "✅"
          } else if (marked) {
            status = "👍"
          }
          // construct the first node
          list_of_elements.push(<Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div>
              {code} {showCompleted && status}
              </div>}
          >
            {process_node(first_children)}
          </Tree>) 
        }

      }
      return list_of_elements
      
    } else {
      return []
    }


    function process_node(node: { 
      label: string,
      marked: boolean,
      ready_to_take: boolean,
      completed: false,
      code: string,
      full_name: null,
      children: []
    }) {

      let label: any
      let status = ""
      if (node.ready_to_take) {
        status = "⬅️"
      } else if (node.completed) {
        status = "✅"
      } else if (node.marked) {
        status = "👍"
      }

      if (node.label == "Course") {
        const code = node.code

        // TailwindCSS does not work with TreeNode
        label = <StyledNode>
            {code} {showCompleted && status}
          </StyledNode>
      } 
      else {
        label = <div style={{padding: "3px"}}>
            {node.label} {showCompleted && status}
        </div>
      }
      
      // Add children and recurse
      let children = []
      if (Array.isArray(node.children)) { // Check if children is an array
        for (const child of node.children) {
          children.push(process_node(child))
        }
      }
      return <TreeNode label={label}>
        {children}
      </TreeNode>
    }

    // let list_of_elements = []
    // for (const node of arr) {
    //   list_of_elements.push(process_node(node))
    // }
    // return list_of_elements

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-">
      <MainLeftBar setTreeData={setTreeData} setLeftBarIsOpen={setLeftBarIsOpen} showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
      
      {/* Make this component align from the right of the screen */}
      <div className="w-full flex flex-grow flex-col items-end ">
          <div className={`flex flex-col flex-grow h-full pb-12 ${leftBarIsOpen ? "w-[calc(100%-400px)]" : "w-full"}`}>

              <div className="z-10 pt-5">
                  {treeData && convert_data_to_jsx(treeData)}
              </div>

          <BottomBar isLeftBarOpen={leftBarIsOpen} />
          <BottomBar2 isLeftBarOpen={leftBarIsOpen} />
          </div>
      </div>
    </main>

  );
}
