'use client';
import { useRouter } from "next/navigation";


export default function RightNavButton({ item }) {
    const router = useRouter();

    const handleButtonClick = (event) => {
        event.preventDefault();
        router.push(`/${item.role}`);
    };

    return (
        <button
            aria-label={item.ariaLabel}
            onClick={handleButtonClick}
            style={{ width: '60px', marginRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ width: '90%' }}>
                {item.icon}
            </div>
        <p style={{ fontSize: '90%', fontWeight: 'bold' }}>{item.label}</p>
        </button>
    );
}

