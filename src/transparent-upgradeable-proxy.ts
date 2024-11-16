import {
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  UnionAccepted as UnionAcceptedEvent,
  UnionProposed as UnionProposedEvent,
  UnionRevoked as UnionRevokedEvent,
} from "../generated/CivilRegistry/CivilRegistry";
import {
  Initialized,
  OwnershipTransferred,
  UnionAccepted,
  UnionProposed,
  UnionRevoked,
} from "../generated/schema";

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.version = event.params.version;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUnionAccepted(event: UnionAcceptedEvent): void {
  let entity = new UnionAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.unionId = event.params.unionId;
  entity.attestationUid = event.params.attestationUid;
  entity.sender = event.transaction.from; // add this line
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  let unionId = event.params.unionId.toString();
  let union = Union.load(unionId);
  if (!union) {
    union = new Union(unionId);
  } // Load contract
  let contract = CivilRegistry.bind(event.address);

  // Get union data from contract
  let unionData = contract.try_getUnion(event.params.unionId);

  if (!unionData.reverted) {
    let participantsBytes: Array<Bytes> = [];
    const participants = unionData.value.getParticipants();
    for (let i = 0; i < participants.length; i++) {
      participantsBytes.push(participants[i] as Bytes);
    }
    union.participants = participantsBytes;
    union.vows = unionData.value.getVows();
    union.ringIds = unionData.value.getRingIds();
    union.accepted = unionData.value.getAccepted();
    union.attestationUid = unionData.value.getAttestationUid();
    union.save();
  }
}

import { CivilRegistry } from "../generated/CivilRegistry/CivilRegistry";
import { Union } from "../generated/schema";
import { Address, Bytes } from "@graphprotocol/graph-ts";

export function handleUnionProposed(event: UnionProposedEvent): void {
  let entity = new UnionProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  // Create Union entity
  let unionId = event.params.unionId.toString();
  let union = Union.load(unionId);
  if (!union) {
    union = new Union(unionId);
  }

  // Load contract
  let contract = CivilRegistry.bind(event.address);

  // Get union data from contract
  let unionData = contract.try_getUnion(event.params.unionId);

  if (!unionData.reverted) {
    let participantsBytes: Array<Bytes> = [];
    const participants = unionData.value.getParticipants();
    for (let i = 0; i < participants.length; i++) {
      participantsBytes.push(participants[i] as Bytes);
    }
    union.participants = participantsBytes;
    union.vows = unionData.value.getVows();
    union.ringIds = unionData.value.getRingIds();
    union.accepted = unionData.value.getAccepted();
    union.attestationUid = unionData.value.getAttestationUid();
    union.save();
  }

  // Set UnionProposed entity data
  entity.unionId = event.params.unionId;
  entity.sender = event.transaction.from;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.union = unionId;

  entity.save();
}

export function handleUnionRevoked(event: UnionRevokedEvent): void {
  let entity = new UnionRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.unionId = event.params.unionId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
