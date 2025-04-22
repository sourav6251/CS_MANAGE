import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust path based on your setup

function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 border-t">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} PBC-Online . All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <a href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact Us
          </a>
        </div>

        {/* Optional Button
        <Button variant="outline" size="sm" asChild>
          <a href="/subscribe">Subscribe</a>
        </Button> */}
      </div>
    </footer>
  );
}

export default Footer;