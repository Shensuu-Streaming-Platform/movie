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
	
	const serverStatus = () => {
	const url = `https://stats.uptimerobot.com/y8sQL00Dtj`;
	window.open(url, '_blank');	
	};
	
	const HLSDownload = () => {
	const url = `https://dl.movie.8888008.xyz`;
	window.open(url, '_blank');	
	};
	
	const aboutPage = () => {
	const url = `/about`;
	window.location.href = url;	{/* window.open(url, '_blank'); */}
	};
	
    return (
        <footer className="footer">
            <ContentWrapper>
			    <ul className="menuItems">
                    <li className="menuItem" onClick={aboutPage}><i class="bi bi-info-circle"></i> About</li>
					<li className="menuItem" onClick={serverStatus}><i class="bi bi-hdd-rack"></i> Server Status</li>
					<li className="menuItem" onClick={HLSDownload}><i class="bi bi-cloud-arrow-down-fill"></i> HLS Download</li>
				</ul>
				<div className="infoText">
					<h3>Disclaimer</h3>
						<p>Shensuu Movie does not host any files, it merely links to 3rd party services. Legal issues should be taken up with the file hosts and providers. Shensuu Movie is not responsible for any media files shown by the video providers.
						</p>
				</div>
                <div className="infoText">
                    © Shensuu Streaming Platform 2024
                </div>
				
                {/* <div className="socialIcons">
					<a href="https://github.com/Shensuu-Streaming-Platform" target="_blank">
						<span className="icon">
							<i class="bi bi-github"></i>
						</span>
					</a>
				
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
                </div>  */}
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
