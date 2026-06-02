import { ReactNode } from 'react'
import Header from '../components/header/Header'

export const metadata = {
    title: 'Recipe',
    description: 'Authenticated area — manage your account and view products.',
    keywords: ['shop', 'account', 'dashboard', 'products'],
}

const PrivateLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <div>
            <Header/>
            {children}
            <footer></footer>
        </div>
    )
}

export default PrivateLayout