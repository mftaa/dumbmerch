import { gql } from "@apollo/client";

export const POST_LOGIN = gql`
mutation($input:LoginInput){
    login(input:$input){
      token
      user{
        id
        firstName
        lastName
        email
        phoneNumber
        gender
        address
        picture
      }
    }
  }`;

export const POST_REGISTER = gql`
mutation register($input: RegisterInput) {
    register(input: $input) {
        token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }`

 