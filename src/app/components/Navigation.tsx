import Link from "next/link";

const Navigation = () => {
    return (
        <div>
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 bg-teal-200 md:flex space-x-6">
                <Link
                    href="/suckhoe"
                    className="text-black hover:text-teal-600 transition-colors">
                    Sức khỏe
                </Link>
                <Link
                    href="/doisong"
                    className="text-black hover:text-teal-600 transition-colors">
                    Đời sống
                </Link>
                <Link
                    href="/thethao"
                    className="text-black hover:text-teal-600 transition-colors">
                    Thể thao
                </Link>
            </nav>
        </div>
    );
}

export default Navigation;