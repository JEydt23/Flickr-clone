import { NavLink } from "react-router-dom"
import './LandingPage.css'

function LandingPage() {
    return (
        <div className="main-landing">
            <div className="landing-page">
                <h1 className="find-your">Find your inspiration.</h1>
                <p>Join the Picture This community.</p>
                <NavLink to={`/sign-up`}>
                    <button className="start-button">Start for free</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage
