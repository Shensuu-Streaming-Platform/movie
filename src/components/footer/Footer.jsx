import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
			    <ul className="menuItems">
                {/*    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
					<li className="menuItem">FAQ</li> */}
					<a href="https://stats.uptimerobot.com/y8sQL00Dtj" > <li className="menuItem">Server Status</li> </a>
				</ul>
				<div className="infoText">
					<h3>Disclaimer</h3>
						<p>Shensuu Movie does not host any files, it merely links to 3rd party services. Legal issues should be taken up with the file hosts and providers. Shensuu Movie is not responsible for any media files shown by the video providers.
						</p>
				</div>
                <div className="infoText">
                    © Shensuu Movie 2024
                </div>
				
                {/* <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div> */}
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
