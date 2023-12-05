import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  min-width: fit-content;
  width: 16rem;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: 14px;
  top: 30px;
  z-index: 9999;
`;

// const StyledList = styled.ul`
//   position: fixed;

//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);

//   right: ${(props) => props.position.x}px;
//   top: ${(props) => props.position.y}px;
// `;

const StyledButton = styled.button`
  width: 100%;
  min-width: fit-content;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    min-width: fit-content;
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
  & span {
    min-width: fit-content;
    display: block;
  }
`;

const MenuContext = createContext();

export default function Menus({ children }) {
  const [menuId, setMenuId] = useState(null);
  const toggle = (newId) => setMenuId((id) => (newId === id ? null : newId));
  return (
    <MenuContext.Provider value={{ menuId, toggle }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ icon, rowId }) {
  const { toggle } = useContext(MenuContext);
  return (
    <StyledToggle onClick={() => toggle(rowId)}>
      {icon ? icon : "="}
    </StyledToggle>
  );
}

function List({ children, rowId }) {
  const { menuId } = useContext(MenuContext);
  if (!menuId || menuId !== rowId) return null;
  return <StyledList>{children}</StyledList>;
  // return <div>hey</div>;
}

function Button({ children, icon, onClick }) {
  const { toggle } = useContext(MenuContext);
  function handleClick() {
    onClick?.();
    toggle(null);
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.Menu = Menu;
