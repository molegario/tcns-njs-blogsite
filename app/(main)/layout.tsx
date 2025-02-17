import { ReactNode } from "react";
import NavbarMain from "@/components/navbar";
import Footer from "@/components/footer";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <NavbarMain />
      </div>
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
