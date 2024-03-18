import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
    return (
        <div className="aboutPage">
            <ContentWrapper>
                <span className="aboutTitle">About</span>
                <span className="aboutSubText">
					Shensuu Movie is your one-stop portal to a world of captivating movies and enthralling TV shows. Forget the frustration of intrusive ads and pesky subscription fees. With Shensuu Movie, you can browse a vast library of content and stream your favorites for free, all without compromising on quality.
				</span>
				<ul className="aboutSubText">
					<li><b>Ad-Free Experience:</b> Say goodbye to disruptive ads that constantly interrupt your viewing pleasure. Shensuu Movie prioritizes an uninterrupted experience, allowing you to focus on the stories that unfold before you.</li>
					<li><b>Movie Mania:</b> From action-packed blockbusters to soul-stirring dramas, Shensuu Movie boasts a comprehensive collection of movies to cater to every taste. Dive into the latest releases, rediscover timeless classics, or explore hidden gems waiting to be unearthed.</li>
					<li><b>TV Show Extravaganza:</b> Binge-watch your favorite shows or embark on new adventures with captivating series. Shensuu Movie offers a wide spectrum of TV shows, encompassing everything from sitcoms and dramas to documentaries and reality TV.</li>
					<li><b>Always Something New:</b> Our library is constantly expanding, ensuring you'll never run out of fresh entertainment options. Shensuu Movie is dedicated to providing you with the latest releases and a never-ending stream of discoveries. </li>
				</ul>
				
				<span className="aboutSubText">
					<b>Join the Shensuu Movie Experience Today:</b>
				</span>
				<span className="aboutSubText">
					Shensuu Movie is your gateway to a world of limitless entertainment. Stream your favorite movies and TV shows, discover hidden gems, and lose yourself in captivating stories – all for free and without any annoying interruptions. Visit Shensuu Movie today and unlock a universe of cinematic adventures!
				</span>
				
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;
