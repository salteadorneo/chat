import { Client } from '@twilio/conversations'

export const createConversation = async (
  { room, accessToken } : { room: string, accessToken: string }
  ) => {
    const client = new Client(accessToken)

    return new Promise(resolve => {
      client.on('stateChanged', async state => {
        if (state === 'initialized') {
          let conversation
            
          try {
            conversation = await client.createConversation({ uniqueName: room, attributes: { loading: true } })
            conversation?.join()
          } catch (e) {
            console.error(e)
          }

          resolve(conversation)          
        }
      })
    })
  }

export const joinConversation = async (
  { room, accessToken } : { room: string, accessToken: string }
  ) => {
    const client = new Client(accessToken)

    return new Promise(resolve => {
      client.on('stateChanged', async state => {
        if (state === 'initialized') {
          let conversation

          try {
            conversation = await client.getConversationByUniqueName(room)
          } catch (e) {
            console.error(e)
          }

          resolve(conversation)          
        }
      })
    })
  }

export const updateAttributesConversation = async (
  { room, accessToken, params } : { room: string, accessToken: string, params: any }
  ) => {
    const client = new Client(accessToken)

    const conversation = await client.getConversationByUniqueName(room)

    await conversation.updateAttributes(params)
  
    return conversation
  }

export const getConversations = async (
  { accessToken } : { accessToken: string }) => {
  const client = new Client(accessToken)

  const conversations = await client.getSubscribedConversations()

  return conversations
}