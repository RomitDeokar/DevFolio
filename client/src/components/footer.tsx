import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" },
    { name: "About", href: "/#about" },
  ];

  const categories = [
    { name: "Web Development", href: "/category/web-development" },
    { name: "Mobile Apps", href: "/category/mobile-development" },
    { name: "UI/UX Design", href: "/category/design" },
    { name: "Tutorials", href: "/category/tutorial" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              DevFolio
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              A passionate developer sharing insights through code and content.
              Building the future one project at a time.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-footer-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <span
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      data-testid={`link-category-${category.name
                        .toLowerCase()
                        .replace(/[\/\s]/g, "-")}`}
                    >
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2023 DevFolio. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                data-testid="link-contact"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
