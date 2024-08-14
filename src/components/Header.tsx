import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

function Header() {
    return (
        <header className="flex w-full bg-zinc-800 justify-between items-center p-3">
            <h2 className="text-lg text-white font-bold ">bell</h2>
            <div className="flex gap-x-2">
                <button className="text-white p-2  rounded-sm transition delay-100 hover:bg-white hover:text-black ">
                    <GrCart />
                </button>
                <button className="text-white p-2  rounded-sm transition delay-100 hover:bg-white hover:text-black ">
                    <FaRegUser />
                </button>
            </div>
        </header>
    );
}

export default Header;
