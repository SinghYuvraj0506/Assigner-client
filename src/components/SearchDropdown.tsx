import React, { useEffect } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type DropdownList = {
  value:string,
  label:string
}

interface SearchDropdownProps{
  placeholder?:string,
  setCurrentValue:(value:string) => void,
  dropDownList:DropdownList[],
  currentValue:string
}

const SearchDropdown:React.FC<SearchDropdownProps> = ({placeholder , setCurrentValue , dropDownList , currentValue}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);

  const handleChange = (e) => {
    setOpen(true);

    if (e.target.value === "") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if(currentValue){
      let item = dropDownList?.find((e)=>(e?.value == currentValue))
      setValue(item?.label || null);
    }
    
  }, [currentValue,dropDownList])
  


  useEffect(() => {
    document.addEventListener("click",()=>{setOpen(false)})
  
    return () => {
      document.removeEventListener("click",()=>{setOpen(false)})
    }
  }, [])
  

  return (
    <div className="relative" onClick={(e)=> {e?.stopPropagation()}}>
      <div className="relative flex items-center w-full justify-center cursor-pointer">
        <Input onChange={handleChange} placeholder={placeholder} value={value} className="pr-10 box-border"/>

        <ChevronsUpDown className="absolute right-3" size={14} onClick={()=>{setOpen(!open)}}/>
      </div>

      {open && (
        <ScrollArea style={{position:"absolute"}} className="h-[200px] w-full rounded-md border p-4 top-10 bg-white">
          {dropDownList?.map((item) => {
            return (
              <div
                className="w-full hover:bg-gray-100 p-2 box-border cursor-pointer flex items-center justify-between text-sm"
                key={item?.value}
                onClick={() =>{
                    setValue(item?.label)
                    setCurrentValue(item?.value)
                    setOpen(false)
                }}
              >
                {item?.label}{" "}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item?.label ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            );
          })}
        </ScrollArea>
      )}
    </div>
  );
};

export default SearchDropdown;
