import { NavLink } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div>
            <div>Page Not Found</div>
            <div>
                <NavLink to='/photos'>
                    Return to the photos page
                </NavLink>
            </div>
        </div>
    )
}

export default PageNotFound
