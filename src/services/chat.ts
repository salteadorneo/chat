import { Client, type JSONValue } from '@twilio/conversations'

export let client : Client

export const initialize = (
  { accessToken } : { accessToken: string }
  ) => {
    if (!accessToken) return
    if (!client) {
      client = new Client(accessToken);
    }
  }

export const createConversation = async (
  { room, attributes } : { room: string, attributes: JSONValue }
  ) => {
    try {
      const conversation = await client.createConversation({ uniqueName: room, attributes })
      conversation?.join()
      return conversation
    } catch (e) {
      // console.log(e)
      return null
    }
  }

export const joinConversation = async (
  { room } : { room: string }
  ) => {
    try {
      const conversation = await client.getConversationByUniqueName(room)
      conversation?.join()
      return conversation
    } catch (e) {
      // console.log(e)
      return null
    }
  }

export const updateAttrConversation = async (
  { room, params } : { room: string, params: any }
  ) => {
    try {
      const conversation = await client.getConversationByUniqueName(room)
      await conversation.updateAttributes(params)
      return conversation
    } catch (e) {
      // console.log(e)
      return null
    }
  }

export const deleteConversation = async (
  { room } : { room: string }
  ) => {
    try {
      const conversation = await client.getConversationByUniqueName(room)
      await conversation.delete()
      return true
    } catch (e) {
      // console.log(e)
      return false
    }
  }

export const leaveConversation = async (
  { room } : { room: string }
  ) => {
    try {
      const conversation = await client.getConversationByUniqueName(room)
      await conversation.leave()
      return true
    } catch (e) {
      // console.log(e)
      return false
    }
  }

export const removeParticipantConversation = async (
  { room, participant } : { room: string, participant }
  ) => {
    try {
      const conversation = await client.getConversationByUniqueName(room)
      return await conversation.removeParticipant(participant)
    } catch (e) {
      return null
    }
  }

export const getConversation = async (
  { room } : { room: string }
  ) => {
    try {
      return await client.getConversationByUniqueName(room)
    } catch (e) {
      return null
    }
  }

export const getConversations = async (
  { } : { }) => {
    try {
      return await client.getSubscribedConversations()
    } catch (e) {
      return null
    }
  }