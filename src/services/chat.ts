import { Client } from '@twilio/conversations'

export let client : Client

export const initialize = (
  { accessToken } : { accessToken: string }
  ) => {
    if (!client) {
      client = new Client(accessToken);
      console.log('initialized')
    }
  }

export const createConversation = async (
  { room } : { room: string }
  ) => {
    const conversation = await client.createConversation({ uniqueName: room, attributes: { loading: true } })
    conversation?.join()
    return conversation
  }

export const joinConversation = async (
  { room } : { room: string }
  ) => {
    try {
      console.log('join',room)
      const conversation = await client.getConversationByUniqueName(room)
      console.log('join',conversation)
      conversation?.join()
      return conversation
    } catch (e) {
      console.log(e)
      return null
    }
  }

export const updateAttrConversation = async (
  { room, params } : { room: string, params: any }
  ) => {
    const conversation = await client.getConversationByUniqueName(room)
    await conversation.updateAttributes(params)
    return conversation
  }

export const deleteConversation = async (
  { room } : { room: string }
  ) => {
    const conversation = await client.getConversationByUniqueName(room)
    await conversation.delete()
    return true
  }

export const leaveConversation = async (
  { room } : { room: string }
  ) => {
    const conversation = await client.getConversationByUniqueName(room)
    await conversation.leave()
    return true
  }

export const removeParticipantConversation = async (
  { room, participant } : { room: string, participant }
  ) => {
    const conversation = await client.getConversationByUniqueName(room)
    return await conversation.removeParticipant(participant)
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
    return await client.getSubscribedConversations()
  }