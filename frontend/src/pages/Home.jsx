import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const homeRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const hasAnimationPlayed = sessionStorage.getItem("animationPlayed");
    if (hasAnimationPlayed) return;

    gsap.set(homeRef.current, { scale: 1.3 });
    gsap.set(logoRef.current, { y: -150, opacity: 0 });
    gsap.set(navRef.current, { x: 220, opacity: 0 });
    gsap.set(contentRef.current, { y: 180, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(homeRef.current, {
      scale: 1,
      duration: 3.2,
      ease: "power2.out",
    })

      .to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power4.out",
      })

      .to(navRef.current, {
        x: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power4.out",
      })

      .to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      });

    sessionStorage.setItem("animationPlayed", "true");
  }, []);

  return (
    <div
      className="home"
      ref={homeRef}
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/hero.png)",
      }}
    >
      <nav className="navbar">
        <div className="logo" ref={logoRef}>
          LUXURY SCENT
        </div>

        <ul className="nav-links" ref={navRef}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Collection">Explore Collection</Link>
          </li>
          <li>
            <Link to="/learn-more">Learn More</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </nav>
      <section className="hero">
        <div className="hero-content" ref={contentRef}>
          <h1>
            Crafted for <span>Elegance</span>
          </h1>

          <p>
            Experience luxury fragrances designed to define your presence. Every
            scent tells a powerful story.
          </p>

          <div className="hero-buttons">
            <Link to="/Collection">
              <button className="primary-btn">Explore Collection</button>
            </Link>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
