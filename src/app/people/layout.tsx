import PeopleHeader from './header';
import PeopleFooter from "@/app/people/footer";
import PeopleSidebar from "@/app/people/sidebar";
export default function PeopleLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <div>
            <PeopleHeader/>
            <main className="flex">
                <div className="flex-none w-64">
                    <PeopleSidebar/>
                </div>
                <div className="flex-1 p-4">
                    {children}
                </div>
            </main>
            <PeopleFooter/>
        </div>
    )
}