import { ReactNode } from "react";
import NavbarMain from "@/components/navbar";
import Footer from "@/components/footer";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col mt-[75px]">
      <NavbarMain />
      <div className="flex flex-1">
        <main className="pt-0 h-full pl-0 flex flex-col justify-center items-center">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
