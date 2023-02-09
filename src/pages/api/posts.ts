/* eslint-disable prettier/prettier */
import { request, gql } from "graphql-request";

export const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL_API;
export const grpahCMSImageLoader = ({ src }: any) => src;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            id
                            name
                            title
                            bio
                            photo {
                                url
                            }
                            createdAt
                        }
                        slug
                        title
                        excerpt
                        featuredImage {
                url
                }
                createdAt
            }
            }
        }
        }
    `;
    const result = await request(graphQLAPI!, query);
    return result.postsConnection.edges;
}

export const getPostDetails = async (title: string) => {
  const query = gql`
    query GetPostDetails($title : String!) {
      post(where: {slug: $title}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          photo {
            url
          }
          bio
        }
        createdAt
        slug
        content {
          raw
        }        
      }
    }
  `;
  const result = await request(graphQLAPI!, query, { title });

  return result.post;
};

export const getSimilarPosts = async (title: any) => {
  const query = gql`
    query GetPostDetails($title: String!) {
      posts(
        where: {slug_not: $title}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphQLAPI!, query, { title });

  return result.posts;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphQLAPI!, query);

  return result.posts;
};