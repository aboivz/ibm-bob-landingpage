import { useState, useEffect } from 'react';
import { Menu, Close, Bot } from '@carbon/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@hooks/useScrollSpy';
import { NAV_SECTIONS, SECTION_IDS } from '@lib/constants';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-carbon-gray-100/95 backdrop-blur-sm shadow-lg' : 'bg-carbon-gray-100'
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group"
            aria-label="IBM Bob — về trang chủ"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-carbon-blue-60 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <span className="font-semibold text-white text-body tracking-tight group-hover:text-carbon-gray-20 transition-colors">
                IBM Bob
              </span>
            </div>
            <span className="hidden sm:block text-caption text-carbon-gray-50 border-l border-carbon-gray-70 pl-3">
              AI SDLC Partner
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_SECTIONS.filter((s) => s.id !== 'hero').map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-3 py-1.5 text-caption transition-colors rounded-sm ${
                  activeId === section.id
                    ? 'text-white bg-carbon-blue-60'
                    : 'text-carbon-gray-30 hover:text-white hover:bg-carbon-gray-80'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-carbon-gray-30 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileOpen ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-carbon-gray-90 border-t border-carbon-gray-80 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_SECTIONS.filter((s) => s.id !== 'hero').map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`text-left px-3 py-2 text-body transition-colors rounded-sm ${
                    activeId === section.id
                      ? 'text-white bg-carbon-blue-60'
                      : 'text-carbon-gray-30 hover:text-white hover:bg-carbon-gray-80'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
