import { useRef, useState } from "react"
import { CiFilter } from "react-icons/ci"


import "./popup.css"

import useOnClickOutside from "../../customHooks/useOnClickOutside"



const Filter = ({ id, filterData }) => {

    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setOpen(false))
    if (!true) return null

    const renderFilter = () => (
        <>
            {filterData.map((data) => {
                if (data.id==id) {
                    return (
                        <>
                            <div className="linkAtDropDown_22" onClick={() => { data.callBack();  }}>
                                {data.icon}
                                {data.title}
                            </div>
                        </>
                    )
                }
            })}
        </>
    )

    return (
        <button className="relative removerBtnCss" onClick={() => setOpen(true)}>
            <div className="ProfileDrop_22">
                <CiFilter onClick={() => console.log("Hey")} className="icon" />
            </div>
            {open && (
                <div onClick={(e) => e.stopPropagation()} ref={ref} className="DropDownContainer_22" >
                    {renderFilter()}
                </div>
            )}
        </button>
    )
}

export default Filter