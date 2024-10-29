import penisProducts from '../importProducts.js';

import {
    SfLink,
    SfButton,
    SfIconFavorite,
    SfIconChevronLeft,
    SfIconChevronRight,
    SfScrollable,
} from '@storefront-ui/react';
import classNames from 'classnames';


function ButtonPrev({ disabled = false, ...attributes }) {
    return (
        <SfButton
            className={classNames('absolute !rounded-full z-10 left-4 bg-white hidden md:block', {
                '!hidden': disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronLeft />
        </SfButton>
    );
}

function ButtonNext({ disabled = false, ...attributes }) {
    return (
        <SfButton
            className={classNames('absolute !rounded-full z-10 right-4 bg-white hidden md:block', {
                '!hidden': disabled,
            })}
            variant="secondary"
            size="lg"
            square
            {...attributes}
        >
            <SfIconChevronRight />
        </SfButton>
    );
}

export default async function ProductSliderBasic() {
    let products = penisProducts();
    return penisProducts().then((data) => {
        products = data;
        return (
            <SfScrollable
                className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                buttons-placement="floating"
                drag
                slotPreviousButton={<ButtonPrev />}
                slotNextButton={<ButtonNext />}
            >
                {products.map(({ id, name, price, size, img }) => (
                    <div
                        key={id}
                        className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
                    >
                        <div className="relative">
                            <SfLink href="#" className="block">
                                <img
                                    src={img}
                                    alt={name}
                                    className="block object-cover h-auto rounded-md aspect-square lg:w-[190px] lg:h-[190px]"
                                    width="146"
                                    height="146"
                                />
                            </SfLink>
                            <SfButton
                                variant="tertiary"
                                size="sm"
                                square
                                className="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
                                aria-label="Add to wishlist"
                            >
                                <SfIconFavorite size="sm" />
                            </SfButton>
                        </div>
                        <div className="p-2 border-t border-neutral-200 typography-text-sm">
                            <SfLink href="#" variant="secondary" className="no-underline">
                                {name}
                            </SfLink>
                            <span className="block mt-2">{size}</span>
                            <span className="block mt-2 font-bold">{price}</span>
                        </div>
                    </div>
                ))}
            </SfScrollable>
        );
    });
}
