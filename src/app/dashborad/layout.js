import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            <SideBar />
            <main className="flex-1 overflow-auto">
                <Navbar />
                {children}
            </main>
        </div>
    )
}