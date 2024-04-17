import React from 'react';
import '../css/RightSidebar.css' // 임포트
import styled from 'styled-components'; // styled-components 임포트
import {
    Menu,
    MenuItem,
    Sidebar,
    SubMenu,
} from "react-pro-sidebar";

// Sidebar 컴포넌트에 스타일 적용
const StyledSidebar = styled(Sidebar)`
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  background-color: #333;
`;



function RightSidebar() {
    return (
       
        <StyledSidebar>
            <Menu>
                <SubMenu label="Charts">
                    <MenuItem> 1 </MenuItem>
                    <MenuItem> 2 </MenuItem>
                </SubMenu>
                <MenuItem> 3 </MenuItem>
                <MenuItem> 4 </MenuItem>
            </Menu>
        </StyledSidebar>
    );
}

export default RightSidebar;