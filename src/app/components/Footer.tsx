import Link from "next/link";

const Footer = () => (
    <footer className=" border-t">
        <div className="max-w-7xl bg-black mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-teal-300 uppercase">Về chúng tôi</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href="#" className="text-gray-100 hover:text-blue-600">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-100 hover:text-blue-600">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-teal-300 uppercase">Chuyên mục</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href="/suckhoe" className="text-gray-100 hover:text-blue-600">
                                Sức khỏe
                            </Link>
                        </li>
                        <li>
                            <Link href="/doisong" className="text-gray-100 hover:text-blue-600">
                                Đời sống
                            </Link>
                        </li>
                        <li>
                            <Link href="/thethao" className="text-gray-100 hover:text-blue-600">
                                Thể thao
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-teal-300 uppercase">Theo dõi</h3>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <Link href="#" className="text-gray-100 hover:text-blue-600">
                                Facebook
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="text-gray-100 hover:text-blue-600">
                                Twitter
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-2 border-t border-gray-200 pt-4 text-center">
                <p className="text-gray-500">© 2024 News App. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;