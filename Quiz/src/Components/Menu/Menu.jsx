import { useRef, useState } from "react"
import "./Menu.css"
import useOnClickOutside from "../../customHooks/useOnClickOutside"



const Menu = ( {quizID, data, icon} ) => {

    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setOpen(false))
    if (!true) return null

    const renderFilter = () => (
        <>
            {
                data.map(item => (
                    <div className="linkAtDropDown_22" onClick={() => item.function(quizID)}>
                        {item.name}
                    </div>
                ))
            }
        </>
    )


    return (
        <button className="relative removerBtnCss" onClick={() => setOpen(!open)}>
            <div className="ProfileDrop_22">
                {icon}
            </div>
            {open && (
                <div onClick={(e) => e.stopPropagation()} ref={ref} className="DropDownContainer_22" >
                    {renderFilter()}
                </div>
            )}
        </button>
    )
}

export default Menu