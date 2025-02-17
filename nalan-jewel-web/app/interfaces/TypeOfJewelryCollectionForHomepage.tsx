export interface SubCategory {
    id: String;
    name: String;
    image: String;
    path: String;
}

export interface Category {
    id: String;
    name: String;
    subCategories: { [key: string]: SubCategory[] };
}

export const jewelryCatergories: Category[] = [
    {
        id: 'all-jewelry',
        name: 'All Jewelry',
        subCategories : {
            'Category': [
                {
                    id: 'all-jewelry',
                    name: 'All Jewelry',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-earrings',
                    name: 'Earrings',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-pendants',
                    name: 'Pendants',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-finger-rings',
                    name: 'Finger Rings',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-mangalsutra',
                    name: 'Mangalsutra',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-chains',
                    name: 'Chains',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-nose-pins',
                    name: 'Nose Pins',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-necklace',
                    name: 'Necklaces',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-necklace-set',
                    name: 'Necklace Sets',
                    image: '',
                    path: ''
                }, 
                {
                    id: 'all-bangles',
                    name: 'Bangles',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-bracelets',
                    name: 'Bracelets',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-pendants-and-earring-set',
                    name: 'Pendants & Earring Set',
                    image: '',
                    path: ''
                },
                {
                    id: 'all-gold-coins',
                    name: 'Gold Coins',
                    image: '',
                    path: ''
                }
            ],

            'Gender': [
                {
                    id: 'men',
                    name: 'Men',
                    image: '',
                    path: ''
                }, 
                {
                    id: 'women',
                    name: 'Women',
                    image: '',
                    path: ''
                },
                {
                    id: 'kids',
                    name: 'Kids',
                    image: '',
                    path: ''
                }
            ], 

            'Price Band': [
                {
                    id: 'below5k',
                    name: 'Below 5k',
                    image: '',
                    path: ''
                },
                {
                    id: '5kto10k',
                    name: '5k to 10k',
                    image: '',
                    path: ''
                },
                {
                    id: '10kto20k',
                    name: '10k to 20k',
                    image: '',
                    path: ''
                },
                {
                    id: '20kto30k',
                    name: '20k to 30k',
                    image: '',
                    path: ''
                },
                {
                    id: '30k-and-above',
                    name: '30k and Above',
                    image: '',
                    path: ''
                }
            ]
        },
    },

    {
        id: 'gold',
        name: 'Gold',
        subCategories : {
            'Category': [
                {
                    id: 'gold-bangles',
                    name: 'Bangles',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-bracelets',
                    name: 'Bracelets',
                    image: '',
                    path: ''
                },{
                    id: 'gold-chains',
                    name: 'Gold Chains',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-earrings',
                    name: 'Earrings',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-pendants',
                    name: 'Pendants',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-rings',
                    name: 'Rings',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-engagement-rings',
                    name: 'Engagement Rings',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-necklaces',
                    name: 'Necklaces',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-nose-pins',
                    name: 'Nose Pins',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-kadas',
                    name: 'Kadas',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-mangalsutra',
                    name: 'Mangalsutra',
                    image: '',
                    path: ''
                },
                {
                    id: 'gold-jhumkas',
                    name: 'Jhumkas',
                    image: '',
                    path: ''
                }

            ]
        }
    },

    {
        id: 'diamond',
        name: 'Diamond',
        subCategories : {
            'Category': [
                
            ]
        }
    },

    {
        id: 'earrings',
        name: 'Earrings',
        subCategories : {
            'Category': [
                
            ]
        }
    },

    {
        id: 'rings',
        name: 'Rings',
        subCategories : {
            'Category': [
                
            ]
        }
    },
]