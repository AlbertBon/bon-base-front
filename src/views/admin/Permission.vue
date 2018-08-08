<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button @click="handleCreate" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        新增权限
      </el-button>
    </div>

    <div class="custom-tree-container">
      <el-row type="flex">
        <el-col :span="8">
          <el-tree
            :data="permissionList"
            :props="permissionProps"
            node-key="id"
            @node-click="nodeClick"
            :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="primary"
                size="mini"
                @click="handleCreateChild(data)">
                新增
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(data)">
                修改
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDel(data)">
                删除
              </el-button>
            </span>
          </span>
          </el-tree>
        </el-col>

        <el-col :span="16" v-show="permissionInfoVisible">
          <div class="bon-detail">
            <div class="bon-detail_content" >
              <label>菜单名称:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.name}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>权限标识:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.permissionFlag}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>链接地址:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.path}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>文件路径:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.component}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>标题:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.title}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>图标:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.icon}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>跳转地址:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.redirect}}</span>
              </div>
            </div>
            <div class="bon-detail_content" >
              <label>是否隐藏:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.hidden}}</span>
              </div>
            </div>

          </div>

        </el-col>
      </el-row>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="permissionForm" :rules="permissionRules" :model="permissionParams" label-position="left" label-width="80px"
               style='width: 500px; margin-left:50px;'>
        <el-form-item  label="权限类型" prop="type" >
          <el-select v-model="permissionParams.type" :disabled="isCheckType" placeholder="请选择">
            <el-option value="00">菜单</el-option>
            <el-option value="01">其他</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识" prop="permissionFlag">
          <el-input v-model="permissionParams.permissionFlag" placeholder="如：userList:menu"></el-input>
        </el-form-item>
        <!--菜单 start-->
        <template  v-if="permissionParams.type=='00'">
          <!--<el-form-item label="父菜单" prop="parentName">-->
            <!--<el-input v-model="permissionParams.parentName" :disabled="true"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="名称" prop="name">
            <el-input v-model="permissionParams.name"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" prop=".path">
            <el-input v-model="permissionParams.path" placeholder="如：role/list"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="component">
            <el-input v-model="permissionParams.component" placeholder="如：/admin/RoleList"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="permissionParams.title" ></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="permissionParams.icon" placeholder="如：fa fa-user-circle-o"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址" prop="redirect">
            <el-input v-model="permissionParams.redirect" placeholder="如：admin/user/list"></el-input>
          </el-form-item>
          <el-form-item label="是否隐藏" prop="hidden">
            <el-select v-model="permissionParams.hidden" placeholder="请选择">
              <el-option label="是" value="00"></el-option>
              <el-option label="否" value="01"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <!--菜单 end-->
        <div style="text-align: center;">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogTitle=='新增权限'||dialogTitle=='新增子权限'" type="primary" @click="createMenu">新增</el-button>
          <el-button v-else type="primary" @click="updateMenu">修改</el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>


</template>

<script>

  export default {
    data() {
      const data = [];
      return {
        permissionList: [],
        permissionProps: {
          label: 'permissionName',
          children: 'children'
        },
        permissionType:'',

        //展示部分
        permissionInfo:{},
        permissionInfoVisible:false,

        permissionParams: {
        },

        permissionParams:{},
        dialogFormVisible:false,
        dialogTitle:'',
        isCheckType:false,

        permissionRules: {
          name: [{required:true,message:'名称不能为空',trigger:'blur'}],
          permissionFlag: [{required:true,message:'权限标识不能为空',trigger:'blur'}],
        },
      }
    },
    created() {
      this.getAllPermission()
    },

    methods: {
      // 节点被点击
      nodeClick(data){
        this.postRequest('/permission/getPermission',{
          'type':data.type,
          'objectId':data.objectId,
          'permissionId': data.permissionId
        }).then(res => {
          if (res.data.code == '00') {
            console.log(res.data.data)
            this.permissionInfo = res.data.data;
            this.permissionInfoVisible = true;
          }
        })

      },
      //节点被展开
      nodeExpand() {
      },
      //选中节点改变
      currentChange(data){
      },
      // 获取所有权限树
      getAllPermission() {
        this.getRequest('/permission/getAllPermissionTree').then(res => {
          if (res.data.code == '00') {
            console.log(res.data.data)
            this.permissionList = res.data.data;
          }
        })
      },
      // 新增权限
      handleCreate() {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.isCheckType = false;
        this.dialogTitle = '新增权限';
      },
      //新增子权限
      handleCreateChild(data) {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.permissionParams.objectId = data.objectId;
        this.permissionParams.type = data.type;
        this.isCheckType = true;
        this.dialogFormVisible = true;
        this.dialogTitle = '新增子权限';
      },
      //修改权限
      handleUpdate(data) {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.permissionParams = this.permissionInfo;
        this.permissionParams.objectId = data.objectId;
        this.permissionParams.type = data.type;
        this.isCheckType = true;
        this.dialogFormVisible = true;
        this.dialogTitle = '修改菜单';

      },
      //删除权限
      handleDel(data) {
        this.$confirm('是否删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/permission/deletePermission?key=' + data.permissionId).then(res => {
            if (res.data.code == '00') {
              this.$message.success('删除成功');
              this.getAllPermission();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      //创建根权限提交
      createMenu() {
        this.$refs['permissionForm'].validate((valid => {
          if (valid) {
            this.postRequest('/permission/savePermission', this.permissionParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('新增成功');
                this.getAllPermission();
              }
            })
          }
        }))
      },
      //修改权限提交
      updateMenu() {
        this.$refs['permissionForm'].validate((valid => {
          if (valid) {
            this.postRequest('/permission/updatePermission', this.permissionParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('修改成功');
                this.getAllPermission();
              }
            })
          }
        }))
      },

    }
  };
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding-right: 8px;
  }

  .block {
    width: 30%;
  }
</style>
