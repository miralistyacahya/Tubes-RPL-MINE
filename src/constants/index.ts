import { NavItem } from "./types"

export const NAV_ADMIN:NavItem[] = [
    // { href: '/', key: 'laporan', label: 'Laporan Transaksi'},
    { href: '/account', label: 'Daftar Akses'},
]

export const NAV_KASIR:NavItem[] = [
    { href: '/transaction', label: 'Riwayat Transaksi'},
    { href: '/cart', label: 'Transaksi'},
]

export const NAV_INVENTARIS:NavItem[] = [
    { href: '/product', label: 'Daftar Produk'},
]

export const NAV_PUBLIC:NavItem[] = [
    
]