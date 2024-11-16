# Union Registry

This project is comprised of three different repositories

- Front-End https://github.com/Union-Registry/fe
- Back-End https://github.com/Union-Registry/union-backend
- Smart Contract https://github.com/Union-Registry/unions-contracts

This is a submission for the ETH Global Hackathon Bangkok

## Project Description

Our Project, Union Registry is a way for couples to bring their luv on chain! 

Last year one of our team members got married and had the inspiration to think of how to bring marriages on-chain and how to co-manage finances. He had a massive lightbulb moment when him and his partner wanted to buy a house in their homebase of Mexico City. 

Not enough of a crypto OG to buy a house outright they managed to use the power of DeFi to secure a super low-rate loan on Compound, took out USDC and made the down-payment on their future home. 

So the idea of Union Registry was firmly planted. Bring on-chain human verified unions on-chain, seal the deal with an attestation and be able to share it with the blockchain-infused institutions of the future. 

In addition members of a Union can customize their bond further using unique twist of Nouns NFTs, with each member designing one half of the Noggle which they "gift" to the other person. The noggle design minted when the union is fully accepted is a blend of both halves, making the Noun unique and personalized for each Union.

Users can login with their own wallet or with socials, verify their humanity and propose a union to another person using a secret code. The proposee enters the secret code, the union is made, Nouns are minted and a very special "Union Certificate" is made available to share with friends, family and your local government agency.


# Union Backend
The GraphQL Subgraph Backend for the Union Registry App
## Prerequisites
```
npm install -g @graphprotocol/graph-cli
graph auth ${YOUR_GRAPH_KEY}
```
## Build
```
graph codegen && graph build
```
## Deploy
```
graph deploy union-registry-2
```
