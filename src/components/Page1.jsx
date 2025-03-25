import { useEffect } from 'react';

function Page1() {
  useEffect(() => {
    const easeOutQuad = (t) => t * (2 - t);
    let scrollY = 0;
    let lastScrollTop = window.scrollY;
    let hoverX = 0, hoverY = 0;

    // Mouse move handler to update hover offsets
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Normalize offsets between -1 and 1
      hoverX = (clientX - centerX) / centerX;
      hoverY = (clientY - centerY) / centerY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Combined animation loop for scroll and hover parallax
    const handleAnimation = () => {
      const stars = document.querySelector('.stars');
      const moon = document.querySelector('.moon');
      const mountains = document.querySelector('.mountains');
      const frontTrees = document.querySelector('.trees');
      const text = document.querySelector('.text');
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScrollTop;
      lastScrollTop = currentScroll;

      // Adjust factor for up vs down scrolling
      const scrollFactor = isScrollingDown ? 0.01 : 0.05;
      scrollY += (currentScroll - scrollY) * scrollFactor;
      const easedValue = easeOutQuad(scrollY / window.innerHeight);

      const moonMaxTranslateY = 600;

      // Hover multipliers: adjust these for more/less intensity
      const hoverMultiplierStars = 20;
      const hoverMultiplierMoon = 15;
      const hoverMultiplierMountains = 10;
      const hoverMultiplierTrees = 8;
      const hoverMultiplierText = 12;

      // Determine scaling factor for responsive devices (e.g., mobile)
      const scaleFactor = window.innerWidth < 768 ? 2 : 1;

      if (stars)
        stars.style.transform = `translate(${easedValue * 200 + hoverX * hoverMultiplierStars}px, ${hoverY * hoverMultiplierStars}px) scale(${scaleFactor})`;
      if (moon)
        moon.style.transform = `translate(${hoverX * hoverMultiplierMoon}px, ${Math.min(
          easedValue * 600,
          moonMaxTranslateY
        ) + hoverY * hoverMultiplierMoon}px) scale(${scaleFactor})`;
      if (mountains)
        mountains.style.transform = `translate(${hoverX * hoverMultiplierMountains}px, ${easedValue * 400 + hoverY * hoverMultiplierMountains}px) scale(${scaleFactor})`;
      if (frontTrees)
        frontTrees.style.transform = `translate(${hoverX * hoverMultiplierTrees}px, ${easedValue * 300 + hoverY * hoverMultiplierTrees}px) scale(${scaleFactor})`;
      // For text, we keep the original transform (no zoom)
      if (text)
        text.style.transform = `translate(${hoverX * hoverMultiplierText}px, ${easedValue * 350 + hoverY * hoverMultiplierText}px)`;

      requestAnimationFrame(handleAnimation);
    };

    handleAnimation();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    background: 'linear-gradient(180deg, #3A4D66 0%, #0B0D19 50%, #0B0D19 100%)',
    backgroundAttachment: 'fixed',
  };

  return (
    <div style={gradientStyle} className="relative z-0 h-[225vh] md:h-[300vh] overflow-hidden">
      {/* Fixed-position Logo */}
      <a href="https://www.wcewlug.org/" className="fixed right-5 top-3 z-[100]">
        <img className="w-[10vh] md:w-[18vh]" src="wlug.png" alt="WLUG Logo" />
      </a>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="stars absolute top-0 left-0 w-full h-[40vh] md:h-[100vh] object-cover z-0 opacity-70"
          src="stars.png"
          alt="Stars"
        />
        <img
          className="moon absolute top-[10vh] -left-16 md:-top-[10vh] md:-left-[80vh] w-[90vw] md:h-[50vh] object-cover object-top z-0 mix-blend-screen opacity-80"
          src="moon.png"
          alt="Moon"
        />
        <img
          className="mountains absolute top-32 left-20 w-full h-[35vh] md:h-[50vh] object-cover md:left-1 z-35"
          src="mountains.svg"
          alt="Mountains"
        />
        <img
          className="trees absolute -top-[36vh] left-0 w-full h-[165vh] md:h-[150vh] md:object-cover object-contain z-40"
          src="front_trees.svg"
          alt="Buildings"
        />
        <img
          className="trees absolute top-[30vh] md:top-[10vh] md:left-0  w-[100vw] h-[150vh] md:h-[500vh] md:object-cover object-contain z-40"
          src="cliff.svg"
          alt="Cliff"
        />
      </div>

      {/* Centered Heading Text */}
      <div className="text text-white font-bold  md:text-[10vh] text-[3vh] top-4 text-center z-25 pt-32 md:pt-20 whitespace-nowrap">
        Walchand Linux Users&#39; Group
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
        <div className="w-8 h-14 rounded-3xl border-4 border-white/50 relative">
          <div className="w-2 h-2 bg-white/80 rounded-full absolute top-2 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default Page1;
