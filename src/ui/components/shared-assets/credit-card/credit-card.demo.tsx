import { CreditCard } from "./credit-card";

export function CreditCardExample() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="brand-dark" company="Untitled." cardNumber="1234 1234 1234 1234" cardHolder="OLIVIA RHYE" cardExpiration="06/28" />
        </div>
    );
}

// Normal types
export function CreditCardTransparent() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="transparent" />
        </div>
    );
}

export function CreditCardTransparentGradient() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="transparent-gradient" />
        </div>
    );
}

export function CreditCardBrandDark() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="brand-dark" />
        </div>
    );
}

export function CreditCardBrandLight() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="brand-light" />
        </div>
    );
}

export function CreditCardGrayDark() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gray-dark" />
        </div>
    );
}

export function CreditCardGrayLight() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gray-light" />
        </div>
    );
}

// Strip types
export function CreditCardTransparentStrip() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="transparent-strip" />
        </div>
    );
}

export function CreditCardGrayStrip() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gray-strip" />
        </div>
    );
}

export function CreditCardGradientStrip() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gradient-strip" />
        </div>
    );
}

export function CreditCardSalmonStrip() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="salmon-strip" />
        </div>
    );
}

// Vertical strip types
export function CreditCardGrayStripVertical() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gray-strip-vertical" />
        </div>
    );
}

export function CreditCardGradientStripVertical() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="gradient-strip-vertical" />
        </div>
    );
}

export function CreditCardSalmonStripVertical() {
    return (
        <div className="flex items-center justify-center">
            <CreditCard type="salmon-strip-vertical" />
        </div>
    );
}

export function CreditCardCustomization() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center">
                <CreditCard type="brand-dark" company="Brex" cardNumber="5678 9012 3456 7890" cardHolder="PEDRO FRANCESCHI" cardExpiration="12/28" />
            </div>
            <div className="flex items-center justify-center">
                <CreditCard type="gradient-strip" company="Apple Inc." cardNumber="0987 6543 2109 8765" cardHolder="TIM COOK" cardExpiration="06/29" />
            </div>
        </div>
    );
}

export function CreditCardSizes() {
    return (
        <div className="flex flex-col items-center gap-8">
            <CreditCard type="brand-dark" width={240} />
            <CreditCard type="brand-dark" width={316} />
        </div>
    );
}
