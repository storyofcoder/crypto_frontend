import React from 'react'
import styled from 'styled-components'

const PillText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.text};
  margin-right: auto;
`

const CheckboxContainer = styled.div`
  cursor: pointer;
  padding: 3px 0;
  display: flex;

  .checkBoxContainer {
    position: relative;
    width: 17.5px;
    height: 17.5px;

    label {
      width: 17.5px;
      height: 17.5px;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 2px;
      border: 1px solid ${(p) => p.theme.colors.foreground};

      &:after {
        content: '';
        width: 9px;
        height: 5px;
        position: absolute;
        top: 4px;
        left: 3px;
        border: 1.5px solid ${(p) => p.theme.colors.background};
        border-top: none;
        border-right: none;
        background: transparent;
        opacity: 0;
        transform: rotate(-45deg);
      }
    }

    input[type='checkbox'] {
      visibility: hidden;

      &:checked + label {
        background: ${(p) => p.theme.colors.foreground};

        &:after {
          opacity: 1;
        }
      }
    }
  }
`

const Pill = ({ name, active, onClick }: any) => {
  return (
    <CheckboxContainer>
      <PillText onClick={onClick}>{name}</PillText>
      <div className="checkBoxContainer">
        <input type="checkbox" id={name} name={name} defaultChecked={active} checked={active} />
        <label htmlFor={name} onClick={onClick} />
      </div>
    </CheckboxContainer>
  )
}

export default Pill
