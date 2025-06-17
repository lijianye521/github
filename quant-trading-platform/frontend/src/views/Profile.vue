<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">个人资料</h1>
      <p class="page-description">管理您的账户信息</p>
    </div>
    
    <el-card>
      <template #header>
        <span>基本信息</span>
      </template>
      
      <el-form :model="userForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" />
        </el-form-item>
        
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
          >
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const userForm = ref({
  username: 'demo用户',
  email: 'demo@example.com',
  avatar: ''
})
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .3s;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
</style> 