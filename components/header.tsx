"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center sm:px-8 py-4 border-b border-foreground/20 mb-24">
      <h1 className="basis-1/2">ResumeAI</h1>
      <div className="sm:hidden relative basis-1/2 flex items-center justify-end">
        {/* desktop links */}
        <div className="space-x-8 hidden sm:flex">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>

        {!isOpen && (
          <button className="sm:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        )}

        {isOpen && (
          <div className="absolute flex flex-col items-center gap-4 bg-accent h-96 -top-2.5 w-64 z-50">
            <button onClick={() => setOpen(false)} className="self-end">
              <X size={22} />
            </button>
            <div className="w-24">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
