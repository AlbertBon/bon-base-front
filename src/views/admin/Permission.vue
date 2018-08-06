<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button @click="handleCreate" class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-edit">
        新增权限
      </el-button>
    </div>

    <div class="custom-tree-container">
      <el-row >
        <el-col :span="8">
        <el-tree
          :data="permissionList"
          :props="permissionProps"
          node-key="id"
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="primary"
                size="mini"
                @click="append(data)">
                新增
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
        </el-col>

      <el-col :span="16" style="align: center">
        <el-form ref="menuForm" :rules="rules" :model="menuParams" label-position="left" label-width="70px"
                 style='width: 600px; margin-left:50px;border: 1px solid #999999;padding: 20px;border-radius: 15px'>
          <el-form-item v-show="false" prop="menuId">
            <el-input v-model="menuParams.menuId"></el-input>
          </el-form-item>
          <el-form-item v-show="menuParams.parentName" label="父权限" prop="parentName">
            <el-input v-model="menuParams.parentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :rules="{required:true,message:'名称不能为空',trigger:'blur'}" label="名称" prop="name">
            <el-input v-model="menuParams.name"></el-input>
          </el-form-item>
          <el-form-item :rules="{required:true,message:'权限标识不能为空',trigger:'blur'}" label="权限标识" prop="permissionFlag">
            <el-input v-model="menuParams.permissionFlag"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" prop="path">
            <el-input v-model="menuParams.path"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="component">
            <el-input v-model="menuParams.component"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="menuParams.title"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="menuParams.icon"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址" prop="redirect">
            <el-input v-model="menuParams.redirect"></el-input>
          </el-form-item>
          <el-form-item label="是否隐藏" prop="hidden">
            <el-select v-model="menuParams.hidden" placeholder="请选择">
              <el-option label="是" value="00"></el-option>
              <el-option label="否" value="01"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogFormVisible = false">取消</el-button>-->
          <!--<el-button v-if="dialogTitle=='新增菜单'||dialogTitle=='新增子菜单'" type="primary" @click="createMenu">新增</el-button>-->
          <!--<el-button v-else type="primary" @click="updateMenu">修改</el-button>-->
        </div>
      </el-col>
      </el-row>
    </div>


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
        menuParams: {},
        // rules:{
        //   username:[{required:true,message:'请输入菜单名',trigger:'blur'}],
        //   phone:[{pattern:/^1(3|4|5|7|8)\d{9}$/,message:'请输入正确手机号码',trigger:'blur'}],
        //   roleIds:[{validator:validateRoleIds,trigger:'change'}],
        // },
      }
    },
    created() {
      this.getAllPermission()
    },

    methods: {
      // 获取所有权限树
      getAllPermission() {
        this.getRequest('/user/getAllPermissionTree').then(res => {
          if (res.data.code == '00') {
            console.log(res.data.data)
            this.permissionList = res.data.data;
          }
        })
      },
      // 新增权限
      handleCreate() {
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '新增权限';
      },
      // 获取所有角色
      getRoleList() {
        this.getRequest('/role/getAllRole').then(res => {
          if (res.data.code == '00') {
            this.roleList = res.data.data;
          }
        })
      },
      //新增子权限
      handleCreateChild(menuId) {
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields();
        }
        this.menuParams.menuId = menuId;
        this.dialogFormVisible = true;
        this.dialogTitle = '新增子菜单';
      },
      //创建根权限
      createMenu() {
        this.$refs['menuForm'].validate((valid => {
          if (valid) {
            this.postRequest('/menu/saveMenu', this.menuParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('新增成功');
                this.getList();
              }
            })
          }
        }))
      },
      handleUpdate(menuId) {
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '修改菜单';
        this.getRequest('/menu/getMenu?key=' + menuId).then(res => {
          if (res.data.code == '00') {
            this.menuParams = res.data.data;
          }
        })
      },
      updateMenu() {
        this.$refs['menuForm'].validate((valid => {
          if (valid) {
            this.postRequest('/menu/updateMenu', this.menuParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('修改成功');
                this.getList();
              }
            })
          }
        }))
      },
      handleDel(menuId) {
        this.$confirm('是否删除该菜单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/menu/deleteMenu?key=' + menuId).then(res => {
            if (res.data.code == '00') {
              this.$message.success('删除成功');
              this.getList();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
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
