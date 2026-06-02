import { ReactNode } from "react";
import { ChefHat } from "lucide-react";
const icons = [
  { top: "10%", left: "15%", size: 40 },
  { top: "20%", left: "80%", size: 60 },
  { top: "35%", left: "30%", size: 50 },
  { top: "55%", left: "70%", size: 70 },
  { top: "75%", left: "20%", size: 45 },
  { top: "85%", left: "85%", size: 60 },
];
export const metadata = {
  title: 'Public — My Shop',
  description: 'Public pages for authentication and marketing.',
  keywords: ['login', 'auth', 'signup', 'shop'],
}

const PublicLayout = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {icons.map((icon, index) => (
          <ChefHat
            key={index}
            className="absolute text-white/10"
            size={icon.size}
            style={{
              top: icon.top,
              left: icon.left,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 flex justify-center pt-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg">
            <ChefHat className="h-6 w-6" />
          </span>

          <span className="text-2xl font-bold text-white">
            RecipeNest
            <span className="text-white/70">.</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-100px)] items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;