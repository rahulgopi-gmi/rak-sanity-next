"use client"

import DropDown from "@/components/ui/dropdown"

type Item = {
  label: string
  value: string
}

type Props = {
  buttonLabel: string;
  buttonIcon?: React.ReactNode;
  showHeader?: boolean;
  showClear?: boolean;
  items: Item[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

export default function FilterDropdown({ 
    buttonLabel, 
    buttonIcon, 
    items, 
    showHeader, 
    showClear,
    selectedValues,
    onChange
  }: Props) {  


  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newSelected: string[];
    if (checked) {      
      newSelected = [...selectedValues, value];
    } else {      
      newSelected = selectedValues.filter((v) => v !== value);
    }
    onChange(newSelected);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <DropDown
      buttonLabel={buttonLabel}
      buttonIcon={buttonIcon}
      showHeader={showHeader}
      showClear={showClear}
      onClear={clearAll}
      onClose={() => console.log("Dropdown closed")}
      items={items.map(item => ({
        label: item.label,
        checkbox: true,
        checked: selectedValues.includes(item.value),
        onChange: (checked: boolean) => handleCheckboxChange(item.value, checked),
      }))}
    />
  )
}
