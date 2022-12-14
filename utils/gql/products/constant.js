import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      stock
      description
      price
      image
    }
  }
`;
export const DELETE_PRODUCTS = gql`
  mutation ($id: String!) {
    deleteProduct(id: $id) {
      id
      name
      stock
      description
    }
  }
`;
export const POST_PRODUCTS = gql`
mutation ($input:CreateProductInput!){
    createProduct(input:$input){
      name
      id
      stock
      description
      price  
      }
    }
  `