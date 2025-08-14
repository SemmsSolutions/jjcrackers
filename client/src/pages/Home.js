import React from "react";
import "../styles/Home.css"; // You can customize this CSS file
import { FiStar, FiShoppingBag, FiTruck } from "react-icons/fi";
import sparklers from "../images/Sparklers.jpg";
import rockets from "../images/Rockets.jpg";
import fountains from "../images/Fountains.jpg";



const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
    <section className="hero">
  <div className="hero-content">
    <h1>Welcome to JJ Crackers Hub</h1>
    <p>Celebrate Every Occasion with Sparkle & Safety</p>
    <a href="/products" className="btn-explore">
      Explore Products
    </a>
  </div>
</section>


      {/* About Section */}
      <section className="about">
  <div className="about-content">
    <h2>About Us</h2>
    <p>
      JJ Crackers Hub is a trusted name in the world of fireworks. With
      years of experience and dedication, we bring joy to festivals, weddings,
      and special occasions through safe and colorful fireworks made in Sivakasi.
    </p>
  </div>
  <div className="about-image"></div>
</section>


      {/* Highlights Section */}
     <section className="highlights">
  <h2>Why Choose Us?</h2>
  <div className="cards">
    <div className="card">
      <FiStar className="card-icon" />
      <h3>Premium Quality</h3>
      <p>Every cracker is crafted with safety and brilliance in mind.</p>
    </div>
    <div className="card">
      <FiShoppingBag className="card-icon" />
      <h3>Wholesale & Retail</h3>
      <p>We supply both bulk and individual orders at affordable prices.</p>
    </div>
    <div className="card">
      <FiTruck className="card-icon" />
      <h3>On-time Delivery</h3>
      <p>Fast, reliable, and pan-India shipping available.</p>
    </div>
  </div>
</section>

<section className="fireworks">
  <h2>Our Firework Collections</h2>
  <p className="fireworks-subtext">
    Brighten up every celebration with our colorful and safe fireworks.
  </p>

  <div className="fireworks-grid">
    <div className="firework-item">
      <img src={sparklers} alt="Sparklers" />
      <h3>Sparklers</h3>
      <p>Safe and bright for kids and family fun.</p>
    </div>
    <div className="firework-item">
     <img src={rockets} alt="Rockets" />
      <h3>Rockets</h3>
      <p>Watch the sky light up with vibrant colors.</p>
    </div>
    <div className="firework-item">
     <img src={fountains} alt="Fountains" />
      <h3>Fountains</h3>
      <p>Mesmerizing showers of golden sparks.</p>
    </div>
  </div>
</section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <h2>Need Bulk Orders or Custom Packages?</h2>
        <a href="/contact" className="btn-contact">
          Contact Us Now
        </a>
      </section>
    </main>
  );
};

export default Home;
