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

export const updateAttrConversation = async (
  { room, params } : { room: string, params: any }
  ) => {
    const conversation = await client.getConversationByUniqueName(room)
    await conversation.updateAttributes(params)
    return conversation
  }

export const getConversation = async (
  { room } : { room: string }
  ) => {
    return await client.getConversationByUniqueName(room)
  }

export const getConversations = async (
  { } : { }) => {
  return await client.getSubscribedConversations()
}