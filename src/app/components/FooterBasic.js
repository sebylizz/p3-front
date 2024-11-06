import {
    SfIconEmail,
    SfIconInstagram,
    SfIconCall,
    SfLink,
} from '@storefront-ui/react';

const contactOptions = [
    {
        label: 'LeghettoOfficial',
        link: 'https://www.instagram.com/leghettoofficial/',
        details: [],
        icon: () => <SfIconInstagram size="lg" style={{ width: '24px', height: '24px' }} />,
    },
    {
        label: 'leghetto.lsh@gmail.com',
        link: 'mailto:leghetto.lsh@gmail.com',
        details: [],
        icon: () => <SfIconEmail size="lg" style={{ width: '24px', height: '24px' }} />,
    },
    {
        label: '(+45) 60884354',
        link: 'tel:+4560884354',
        details: [],
        icon: () => <SfIconCall size="lg" style={{ width: '24px', height: '24px' }} />,
    },
];

export default function FooterBasic() {
    return (
        <footer
            style={{
                width: '100%',
                backgroundColor: 'white',
                marginTop: '20px',
            }}
        >
            <div className="md:flex md:mx-auto max-w-[1536px]">
                {contactOptions.map(({ label, icon: Icon, link, details }) => (
                    <div className="flex flex-col items-center mx-auto my-4 text-center" key={label}>
                        <SfLink href={link} target="_blank" rel="noopener noreferrer">
                            <Icon />
                        </SfLink>
                        <p className="py-1 my-2 font-medium typography-text-lg font-body">
                            <SfLink
                                variant="secondary"
                                className="no-underline text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
                                href={link}
                            >
                                {label}
                            </SfLink>
                        </p>
                        {details?.map((option) => (
                            <p className="leading-5 typography-text-sm text-neutral-600 font-body" key={option}>
                                {option}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
}
