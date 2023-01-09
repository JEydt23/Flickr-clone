import { NavLink } from "react-router-dom"
import './404Page.css'

const PageNotFound = () => {
    return (
        <div className="main-404-div">
            <div className="main-404">Page Not Found</div>
            <div>
                <NavLink to='/photos' className="navlink-photos">
                    Click here to return to the photos page
                </NavLink>
            </div>
        </div>
    )
}

export default PageNotFound
