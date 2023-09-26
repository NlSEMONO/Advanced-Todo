export const Navbar = ({dimmed, toggleSidebar}) => {
    return (
        <>
            <div id="navbar"> 
                <div id="navbar-items"> 
                    <a href="/"> <img id="website-logo" src="/static/img/Group.svg"/> </a>
                    <div id="navbar-pages"> 
                        <a href="/#projects"> <p> Projects </p> </a>
                        <a href="/#contact"> <p> Contact </p> </a>
                    </div>
                    <svg id='burger' viewBox="0 0 60 41" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleSidebar}>
                        <g clip-path="url(#clip0_40_38)">
                            
                        <path d="M6.58177 8.98342H54.5533C57.865 8.98342 60.5498 7.19355 60.5498 4.98579C60.5498 2.77803 57.865 0.988159 54.5533 0.988159H6.58177C3.27014 0.988159 0.585327 2.77803 0.585327 4.98579C0.585327 7.19355 3.27014 8.98342 6.58177 8.98342Z" fill="#9BC3F0"/>
                        <path d="M54.5533 16.9787H6.58177C3.27014 16.9787 0.585327 18.7685 0.585327 20.9760C0.585327 23.1841 3.27014 24.9739 6.58177 24.9739H54.5533C57.865 24.9739 60.5498 23.1841 60.5498 20.9760C60.5498 18.7685 57.865 16.9787 54.5533 16.9787Z" fill="#9BC3F0"/>
                        <path d="M54.5533 32.9692H6.58177C3.27014 32.9692 0.585327 34.759 0.585327 36.9668C0.585327 39.1746 3.27014 40.9644 6.58177 40.9644H54.5533C57.865 40.9644 60.5498 39.1746 60.5498 36.9668C60.5498 34.759 57.865 32.9692 54.5533 32.9692Z" fill="#9BC3F0"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_40_38">
                        <rect width="60" height="39.9760" fill="white" transform="translate(0.585327 0.988159)"/>
                        </clipPath>
                        </defs>
                    </svg> 
                </div>
            <div id="divider"> </div>
        </div>
        <div style={{display: dimmed ?  "block":"none"}} id="sidebar"> 
            <a href="#projects"> <p> Projects </p> </a>
            <a href="#contact"> <p> Contact </p> </a>
        </div>
    </>
    );
}