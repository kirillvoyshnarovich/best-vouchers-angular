import gql from 'graphql-tag';

import { ASSET_FRAGMENT } from '../../../common/graphql/fragments.graphql';

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                slug
                productName
                description
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
            totalItems
        }
    }
`;

export const GET_COLLECTION = gql`
    query GetCollection($id: ID!) {
        collection(id: $id) {
            id
            name
            description
            translations {
                id
                createdAt
                updatedAt
                languageCode
                name
                description
            }
            featuredAsset {
                ...Asset
            }
            breadcrumbs {
                id
                name
            }
            children {
                id
                featuredAsset {
                    ...Asset
                }
                name
            }
        }
    }
    ${ASSET_FRAGMENT}
`;
