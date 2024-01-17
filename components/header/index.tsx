'use client'
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search as SearchIcon } from "lucide-react"
import Search from '../search';

const esqlinks = [
    { href: '/posts', label: 'Home' },
    { href: '/admin', label: 'Contato' },
    { href: '/admin', label: 'Membros' },
]

const dirlinks = [
    { href: '/admin', label: 'Gerenciamento' },
    { href: '/admin', label: 'Login' },
    { href: '/admin', label: 'FAQ' },
]

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const toggleNav = () => setIsNavOpen(!isNavOpen)
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

    const toggleNavSearch = () => {
        if (isSearchOpen) {
            toggleSearch()
        }
        else {
            toggleNav()
        }
    }

    return (
        <header className="bg-[#E3FC02] sticky top-0 z-20 w-full py-8 px-4 mb-8">

            <div className="flex sm:flex-col md:flex-row items-center justify-between">

                {/* parte esquerda da header */}
                {/* flex wrap para quebrar as linhas automaticamente */}
                <nav className="hidden sm:flex">
                    <div className="flex flex-wrap gap-8">
                        {esqlinks.map((link, index) =>
                            <Link href={link.href} key={index}>
                                <span className="text-2xl text-black hover:bg-white/20 rounded-xl">{link.label}</span>
                            </Link>
                        )}
                    </div>
                </nav>

                {/* parte central da logo e nome adrenalin */}
                <Link href='/' className='flex items-center ml-40'>
                    <Image
                        src={'/logo/logo.png'}
                        alt="logo do blog"
                        width={904}
                        height={904}
                        className="h-20 w-20 rounded-xl"
                    />
                    <span className="text-black text-3xl">Adrenalin</span>
                </Link>

                {/* menu e searchicon do mobile*/}
                <nav className="flex">
                    <div className="sm:hidden">
                        {isNavOpen || isSearchOpen ?
                            <X
                                onClick={toggleNavSearch}
                                className="w-8 h-8 text-black cursor-pointer hover:bg-white/20 transition-all duration-200 p-1 rounded-xl"
                            />
                            :
                            <div className="flex gap-2">
                                <SearchIcon
                                    onClick={toggleSearch}
                                    className="w-8 h-8 text-black cursor-pointer"
                                />
                                <Menu
                                    onClick={toggleNav}
                                    className="w-8 h-8 text-v cursor-pointer"
                                />
                            </div>
                        }
                    </div>
                </nav>
                {isNavOpen && (
                    <Search />
                )}
                {isNavOpen && (
                    <div className="md:hidden flex basis-full flex-col items-center gap-6 mt-10">
                        {esqlinks.map((link, index) =>
                            <Link href={link.href} key={index}>
                                <span className="text-2xl text-black hover:bg-white/20 rounded-xl">{link.label}</span>
                            </Link>
                        )}

                        {dirlinks.map((link, index) =>
                            <Link href={link.href} key={index}>
                                <span className="text-2xl text-black hover:bg-white/20 rounded-xl">{link.label}</span>
                            </Link>
                        )}
                    </div>
                )}

                {/* parte direita da header */}
                <nav className="hidden sm:flex">
                    <div className="flex flex-wrap gap-8">
                        {dirlinks.map((link, index) =>
                            <Link href={link.href} key={index}>
                                <span className="text-2xl text-black hover:bg-white/20 rounded-xl">{link.label}</span>
                            </Link>
                        )}

                        <button onClick={toggleNav}>
                            {isSearchOpen ?
                                <X
                                    onClick={toggleSearch}
                                    className="w-8 h-8 text-black cursor-pointer hover:bg-white/20 transition-all duration-200 p-1 rounded-xl"
                                />
                                :
                                <SearchIcon
                                    onClick={toggleSearch}
                                    className="w-8 h-8 text-black cursor-pointer hover:bg-white/20 transition-all duration-200 p-1 rounded-xl"
                                />
                            }
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}