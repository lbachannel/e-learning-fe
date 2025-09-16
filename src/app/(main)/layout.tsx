import { auth } from "@/auth";
import ContentLayout from "@/components/layout/Content";
import FooterLayout from "@/components/layout/Footer";
import HeaderLayout from "@/components/layout/Header";
import SidebarLayout from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <ThemeProvider>
        <div className="wrapper">
            <HeaderLayout session={session} />
            <section className="section">
                <SidebarLayout />
                <ContentLayout>{children}</ContentLayout>
            </section>
            <FooterLayout />
        </div>
    </ThemeProvider>
  );
}

export default MainLayout;