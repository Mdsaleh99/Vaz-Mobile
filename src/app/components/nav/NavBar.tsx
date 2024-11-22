import Link from "next/link";
import Container from "../Container";
import Image from "next/image";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "../../../../actions/getCurrentUser";



const NavBar = async() => {
    const currentUser = await getCurrentUser()
    // console.log("user>>>><<", currentUser);

    return ( 
        <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href='/'>
                            <Image src="/logo-image.png" alt="Logo" width={90} height={120} className="object-contain font-extrabold" />
                        </Link>
                    
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount />
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default NavBar;