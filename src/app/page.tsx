"use client"

import { useState, useEffect } from "react";

import Image from "next/image";
import MainLeftBar from "./main_left_bar";
import BottomBar from "./bottom_bar"; // Add this import
import BottomBar2 from "./bottom_bar_2"; // Add this import
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

interface ChildrenVisibility {
  [key: string]: boolean
}

interface Colors {
  [key: string]: string
}

export default function Home() {
  const [treeData, setTreeData] = useState<{course_trees: any[], commonality: CommonalityData}>();
  const [showCompleted, setShowCompleted] = useState(false)

  // This can be set to true when the left bar is open by the component itself
  const [leftBarIsOpen, setLeftBarIsOpen] = useState(false)
  
  const [colors, setColors] = useState<Colors>()
  
  const [showChildren, setShowChildren] = useState<ChildrenVisibility>(() => {
    const initialState: ChildrenVisibility = {};
    for (let i = 1; i <= 1000; i++) { // Adjust the number as needed
      initialState[`node-${i}`] = false;
    }
    return initialState;
  })
  let nodeCountRef = 0

  /**
   * For showChildren functionality, we want to toggle the state of the course node that is clicked
   * Track a global index for each course node, and use the global index as the node's id
   *  (Incremented by 1 everytime a course node is added)
   * Once node is clicked, toggle the state of the course node using e in showChildren
   * The StyledNode's onclick function will toggle the state of the course node
   * Use showChildren[id] to set if node is expanded or not 
  */
  
  // Reset the node count everytime there is a reload.
  useEffect(() => {
    nodeCountRef = 0;
  }, [])

  useEffect(() => {
    console.log("RECEIVED DATA!", treeData)
  }, [treeData])


  useEffect(() => {
    console.log("LEFT BAR IS OPEN!", leftBarIsOpen)
  }, [leftBarIsOpen])

  useEffect(() => {
    console.log("CALLING SETTING COLORS")
    if (treeData) {
      settingColors(treeData)
    }
  }, [treeData])

  
  const getNextNodeId = (): string => {
    nodeCountRef += 1
    return `node-${nodeCountRef}`
  }

  const toggleNodeExpansion = (id: string) => {
    console.log("TOGGLE NODE EXPANSION", id)
    setShowChildren(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  /**
   * This Function converts the JSON return from the server action fetch into a Tree with TreeNodes as children.
   * 
   * This should be aware of the different common course intersections from the color key tab. And is able to be activated by a toggle state.
   * 
   * @param data 
   * @returns void
   */
  interface CourseTree {
    label: string;
    marked: boolean;
    ready_to_take: boolean;
    completed: boolean;
    code: string;
    full_name: string;
    children: CourseTree[] | null

    
  }

  interface ContainmentDict {
    [key: string]: string[]; // This allows any string key with any value type
  }

  interface CommonalityList {
    [key: string]: string[];
  }

  interface CommonalityData {
    containment_dict: ContainmentDict,
    commonality_list: CommonalityList
    
  }
  
  /**
   * Check if a single course is contained in a value's list
   * @param containment_dict 
   * @param code 
   * 
   */
  function course_contained_in_another_course(containment_dict: ContainmentDict, code: string) {
    for (const [key, value] of Object.entries(containment_dict)) {
      if (value.includes(code)) {
        return true
      }
    }
    console.log("RETURNS FALSE FOR CONTAINMENT", containment_dict, code)

    return false
  }

  function create_color_labels(commonality_list: CommonalityList){
    let course_to_color: { [key: string]: string } = {};
    let group_to_color: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(commonality_list)){
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

      for (const course of value) {
        course_to_color[course] = randomColor
      }
      
      group_to_color[key] = randomColor
    }
    
    return {course_to_color, group_to_color}
  }

  function settingColors(data: { course_trees: CourseTree[], commonality: CommonalityData }) {
    const containment_dict = data.commonality.containment_dict
    const commonality_list = data.commonality.commonality_list

    const {course_to_color, group_to_color} = create_color_labels(commonality_list)
    setColors(group_to_color)
  }
  

  function convert_data_to_jsx(data: { course_trees: CourseTree[], commonality: CommonalityData}) {
    const arr = data.course_trees
    const containment_dict = data.commonality.containment_dict
    const commonality_list = data.commonality.commonality_list

    let list_of_elements = []
    
    // to separate out the first node from the rest of the nodes
    if (arr && arr.length > 0 ) {
      for (let i = 0; i < arr.length; i++) {
        const {label, marked, ready_to_take, completed, code, children} = arr[i]

        // // Check here if code is in another tree, if so continue
        // if (course_contained_in_another_course(containment_dict, code)) {
        //   continue
        // }

        if (!Array.isArray(children)) {

          const StyledNode = styled.div`
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #FFDC83;"}
            cursor: pointer;
          `;

          list_of_elements.push(<Tree
                lineWidth={'2px'}
                lineColor={'green'}
                lineBorderRadius={'10px'}
                label={<StyledNode>{code}</StyledNode>}
              >
                <TreeNode
                  label={<div>No Prerequisites</div>}
                />
              </Tree>)
        } else {
          const first_children = children[0]
          
          let StyledNode = styled.div`
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            ${showCompleted ? "border: 1px solid red;" : "border: 1px solid green;"}
            cursor: pointer;
          `;
          let status = ""
          if (ready_to_take) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #ECC94B;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `

          } else if (completed) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #FFDC83;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `
          } else if (marked) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #FFDC83;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `
          }

          // Find list of containment
          let node_contains: string[] = []
          if (data.commonality.containment_dict) {
            
            const containmentList = data.commonality.containment_dict[code]
            console.log(containmentList)
            if (containmentList) {
              node_contains = containmentList
            }
          }

          list_of_elements.push(<Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={
              <StyledNode>
                {code} {showCompleted && status} {node_contains ? `contains ${node_contains}`: ""}
              </StyledNode>
            }
          >
            {process_node(first_children)}
          </Tree>)
        }

      }
      return list_of_elements
      
    } else {
      return []
    }


    function process_node(node: CourseTree) {
      let StyledNode = styled.div`
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
        ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #047857;"}
        cursor: pointer;
      `;

      let JunctionNode = styled.div`
        padding: 5px;
        display: inline-block;
        ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #047857;"}
        cursor: pointer;
      `

      let label: any
      if (node.completed) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
        JunctionNode = styled.div`
          padding: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
      } else if (node.marked) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #ECC94B;"}
          cursor: pointer;
        `;
        JunctionNode = styled.div`
          padding: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
      } else if (node.ready_to_take) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #FFDC83;"}
          cursor: pointer;
        `;
      }

      
      const nodeId = getNextNodeId()
      let isExpanded = showChildren[nodeId] ?? false;

      if (node.label == "Course") {
        const code = node.code
        const hasChildren = Array.isArray(node.children)
        // TailwindCSS does not work with TreeNode
        label = <StyledNode id={nodeId} onClick={() => toggleNodeExpansion(nodeId)}>
            {code} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
          </StyledNode>
      }
      else {
        const hasChildren = Array.isArray(node.children)
        label = <JunctionNode id={nodeId} onClick={() => toggleNodeExpansion(nodeId)} style={{padding: "3px"}}>
            {node.label} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
        </JunctionNode>
      }

      // Add children and recurse
      let children = []
      if (Array.isArray(node.children)) { // Check if children is an array
        for (const child of node.children) {
          children.push(process_node(child))
        }
      }

      return (isExpanded ? <TreeNode label={label}>
        {children}
      </TreeNode> : <TreeNode label={label} />)
    }
  }

  /**
   * 
   * This function converts intersection and containments to a color key tab
   * 
   */
  function convert_intersection_and_containments(data: { containment: {} }) {
    
  }

  /**
   * 
   * 
   * 
   */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-">
      <MainLeftBar groupToColor={colors} setTreeData={setTreeData} setLeftBarIsOpen={setLeftBarIsOpen} showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
      
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
