import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'Vaz Mobile Admin',
    description: "Vaz Mobile Admin Dashboard"
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div>
            <AdminNav />
            {children}
        </div>
    );
}
 
export default AdminLayout;