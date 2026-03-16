import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-foreground/20">
      <h1>ResumeAI</h1>
      <div className="space-x-8">
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
    </header>
  );
};
