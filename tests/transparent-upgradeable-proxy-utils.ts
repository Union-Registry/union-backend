import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Initialized,
  OwnershipTransferred,
  UnionAccepted,
  UnionProposed,
  UnionRevoked
} from "../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createUnionAcceptedEvent(
  unionId: BigInt,
  attestationUid: BigInt
): UnionAccepted {
  let unionAcceptedEvent = changetype<UnionAccepted>(newMockEvent())

  unionAcceptedEvent.parameters = new Array()

  unionAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "unionId",
      ethereum.Value.fromUnsignedBigInt(unionId)
    )
  )
  unionAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "attestationUid",
      ethereum.Value.fromUnsignedBigInt(attestationUid)
    )
  )

  return unionAcceptedEvent
}

export function createUnionProposedEvent(unionId: BigInt): UnionProposed {
  let unionProposedEvent = changetype<UnionProposed>(newMockEvent())

  unionProposedEvent.parameters = new Array()

  unionProposedEvent.parameters.push(
    new ethereum.EventParam(
      "unionId",
      ethereum.Value.fromUnsignedBigInt(unionId)
    )
  )

  return unionProposedEvent
}

export function createUnionRevokedEvent(unionId: BigInt): UnionRevoked {
  let unionRevokedEvent = changetype<UnionRevoked>(newMockEvent())

  unionRevokedEvent.parameters = new Array()

  unionRevokedEvent.parameters.push(
    new ethereum.EventParam(
      "unionId",
      ethereum.Value.fromUnsignedBigInt(unionId)
    )
  )

  return unionRevokedEvent
}
