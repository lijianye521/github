<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">AI助手</h1>
      <p class="page-description">智能策略分析和建议</p>
    </div>
    
    <el-card class="ai-chat-card">
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-item"
          :class="message.role"
        >
          <div class="message-content">
            {{ message.content }}
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>
      
      <div class="chat-input">
        <el-input
          v-model="inputMessage"
          placeholder="请输入您的问题..."
          @keyup.enter="sendMessage"
          :disabled="loading"
        />
        <el-button 
          type="primary" 
          @click="sendMessage"
          :loading="loading"
        >
          发送
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: '您好！我是AI助手，可以帮助您分析策略、优化代码和提供投资建议。请问有什么可以帮助您的吗？',
    time: '刚刚'
  }
])

const inputMessage = ref('')
const loading = ref(false)
const messagesContainer = ref(null)

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    time: '刚刚'
  }
  
  messages.value.push(userMessage)
  const userInput = inputMessage.value
  inputMessage.value = ''
  loading.value = true
  
  // 模拟AI回复
  setTimeout(() => {
    const aiResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: `我收到了您的问题："${userInput}"。这是一个很好的问题，基于我的分析，建议您可以考虑以下几个方面...`,
      time: '刚刚'
    }
    messages.value.push(aiResponse)
    loading.value = false
    
    nextTick(() => {
      scrollToBottom()
    })
  }, 1000)
  
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style lang="scss" scoped>
.ai-chat-card {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    
    .message-item {
      margin-bottom: 16px;
      
      &.user {
        text-align: right;
        
        .message-content {
          background: #409EFF;
          color: white;
          display: inline-block;
          padding: 10px 15px;
          border-radius: 18px;
          max-width: 70%;
          word-wrap: break-word;
        }
      }
      
      &.assistant {
        text-align: left;
        
        .message-content {
          background: #f5f5f5;
          color: #333;
          display: inline-block;
          padding: 10px 15px;
          border-radius: 18px;
          max-width: 70%;
          word-wrap: break-word;
        }
      }
      
      .message-time {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }
  }
  
  .chat-input {
    padding: 20px;
    border-top: 1px solid #e4e7ed;
    display: flex;
    gap: 10px;
    
    .el-input {
      flex: 1;
    }
  }
}
</style> 