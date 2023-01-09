import './AboutMe.css'

const AboutMe = () => {
    return (
        <div className="aboutPageContainer">
            <div className='aboutPageHeader'>
                Picture This!
            </div>
            <div className='thanks'>
                <p>Thanks for visiting my page! Feel free to reach out via the links below!</p>
            </div>
            <div className='teamIndividuals'>

                <div className='playerCard'>
                    <img className="indiImage" src={require('./jeff.png').default} alt='svgImage' />
                    <div className='nameContainer'>
                        <div className='indiName'>Jeff Eydt</div>
                    </div>
                    <div className='socialLinks'>
                        <a href='https://github.com/JEydt23' target="_blank" class='aboutPage'>
                            <img className='gitHub' src={require('./github-mark.png').default} alt='github' />
                        </a>
                        <a href='https://www.linkedin.com/in/jeff-eydt-a5b86b9b/' target="_blank" class='aboutPage'>
                            <img className='linkedin' src={require('./linkedin.png').default} alt='linkedin' />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AboutMe
