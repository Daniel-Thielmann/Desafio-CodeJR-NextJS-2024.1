import { fetchMembers } from "@/actions/admin/members/actions"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import ManageMembersTable from "@/components/table/manage-members"
import { IBM_Plex_Sans } from 'next/font/google'


const ibmplex = IBM_Plex_Sans({
    weight: ['400'],
    style: "normal",
    subsets: ['latin']
})

export default async function Page() {
    const { members, count } = await fetchMembers()


    return (
        <div className="w-full space-y-12">
            <div className={ibmplex.className}>
                <DashboardTitle title="Gerenciar Membros" description="Faça as ações administrativas por aqui" />
                <ManageMembersTable members={members} count={count} />
            </div>
        </div>
    )
}