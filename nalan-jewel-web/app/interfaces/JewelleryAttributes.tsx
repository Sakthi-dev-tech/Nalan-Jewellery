export interface JewelleryAttributes {
    id: number;
    name: string;
    price: number;
    coverImage: string;
    numInStock: number;
    attributes: {
        priceCategory: '< $5000' | '$5000-$9999' | '$10,000-$15,000' | '> $15,000';
        jewelleryType: 'Diamond Jewellery' | 'Gold Jewellery' | 'Jewellery With Gemstones' | 'Plain Jewellery With Stones' | 'Platinum Jewellery';
        product: 'Bangle' | 'Bracelet' | 'Chain' | 'Earrings' | 'Finger Ring' | 'Haram' | 'Jewellery Set' | 'Kada' | 'Maang Tikka' | 'Mangalsutra' | 'Mangalsutra Set' | 'Necklace' | 'Necklace Set' | 'Nose Pin' | 'Others' | 'Pendant' | 'Pendant And Earrings Set' | 'Pendant With Chain';
        brand: 'Nalan';
        gender: 'Kids' | 'Men' | 'Women' | 'Unisex';
        purity: '14' | '18' | '22' | '95';
        occassion: 'Bridal Wear' | 'Casual Wear' | 'Engagement' | 'Modern Wear' | 'Modern Wear' | 'Traditional and Ethnice Wear' | 'Office Wear';
        metal: 'Gold' | 'Platinum' | 'Diamond';
        diamondClarity: 'B,I1 I2' | 'FL' | 'I1' | 'I1 I2' | 'I2' | 'Mixed' | 'SI' | 'SI, SI1' | 'SI1' | 'SI1,SI2' | 'SI1-SI2,VS,VS2' | 'SI1-SI2, VS1' | 'SI1-SI2, VS2' | 'SI2' | 'VS' | 'VS,VS1' | 'VS1' | 'VS2' | 'VVS' | 'VVS,VS' | 'VVS1' | 'VVS1,VVS2' | 'VVS2';
        collection: '22KT Range' | 'Aaheli' | 'Aalo' | 'Aarambh';
        community: 'Bengali' | 'Bihari' | 'Classic Must Haves' | 'South Indian' | 'Tamil' | 'Telugu';
        type: 'Drops' | 'Hoops' | 'Jhumka' | 'Studs' | 'Others';
        metalColour: 'Rose' | 'White' | 'White and Rose'
    }
}

export interface PriceBreakdown {
    productDetail: string;
    productIcon?: string;
    productSubtitle?: string;
    rate: {
        value: number;
        unit: string;
    };
    weight: {
        carat?: number;
        gram: number;
    };
    discount: number;
    value: number;
    isTotal?: boolean;
}