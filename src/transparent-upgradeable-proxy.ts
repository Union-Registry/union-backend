import {
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  UnionAccepted as UnionAcceptedEvent,
  UnionProposed as UnionProposedEvent,
  UnionRevoked as UnionRevokedEvent
} from "../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"
import {
  Initialized,
  OwnershipTransferred,
  UnionAccepted,
  UnionProposed,
  UnionRevoked
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnionAccepted(event: UnionAcceptedEvent): void {
  let entity = new UnionAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unionId = event.params.unionId
  entity.attestationUid = event.params.attestationUid
  entity.sender = event.transaction.from  // add this line
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnionProposed(event: UnionProposedEvent): void {
  let entity = new UnionProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unionId = event.params.unionId
  entity.sender = event.transaction.from  // add this line
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnionRevoked(event: UnionRevokedEvent): void {
  let entity = new UnionRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unionId = event.params.unionId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
