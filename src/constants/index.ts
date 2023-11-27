import { NavItem } from "./types"

export const NAV_ADMIN:NavItem[] = [
    { href: '/account', key: 'laporan', label: 'Laporan Transaksi'},
    { href: '/account', key: 'akun', label: 'Daftar Akses'},
]

export const NAV_KASIR:NavItem[] = [
    { href: '/transaction', key: 'riwayatTransaksi', label: 'Riwayat Transaksi'},
    { href: '/cart', key: 'transaksi', label: 'Transaksi'},
]

export const NAV_INVENTARIS:NavItem[] = [
    { href: '/product', key: 'produk', label: 'Daftar Produk'},
]

export const NAV_PUBLIC:NavItem[] = [
    
]
