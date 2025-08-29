import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: "Home", href: "/", type: "link" },
    { name: "Projects", href: "#projects", type: "scroll" },
    { name: "Blog", href: "#blog", type: "scroll" },
    { name: "About", href: "#about", type: "scroll" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNavigation = (item: typeof navigation[0]) => {
    if (item.type === "scroll") {
      // If we're not on the home page, navigate to home first
      if (location !== "/") {
        window.location.href = `/${item.href}`;
        return;
      }
      
      // Scroll to the section
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" data-testid="link-home">
                <h1 className="text-xl font-bold text-primary cursor-pointer">
                  DevFolio
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  item.type === "link" ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      data-testid={`link-${item.name.toLowerCase()}`}
                    >
                      <span
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                          location === item.href
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ) : (
                    <span
                      key={item.name}
                      onClick={() => handleNavigation(item)}
                      className="px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-muted-foreground hover:text-primary"
                      data-testid={`link-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              item.type === "link" ? (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  <span
                    className={`block px-3 py-2 transition-colors cursor-pointer ${
                      location === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ) : (
                <span
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className="block px-3 py-2 transition-colors cursor-pointer text-muted-foreground hover:text-primary"
                  data-testid={`link-mobile-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
