<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button @click="handleCreate" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        新增权限
      </el-button>
      <el-button @click="handleAddVue" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-plus">
        新增vue视图
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
              <label>权限标识:</label>
              <div class="bon-detail_text">
                <span>{{permissionInfo.permissionFlag}}</span>
              </div>
            </div>
            <template v-if="permissionInfo.permissionType == '00'">
              <div class="bon-detail_content" >
                <label>菜单名称:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.name}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>链接地址:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.path}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>文件路径:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.component}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>标题:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.title}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>图标:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.icon}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>跳转地址:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.redirect}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>是否隐藏:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.menu.hidden}}</span>
                </div>
              </div>
            </template>
            <template v-else-if="permissionInfo.permissionType == '01'">
              <div class="bon-detail_content" >
                <label>接口名称:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.url.urlName}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>url地址:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.url.urlPath}}</span>
                </div>
              </div>
              <div class="bon-detail_content" >
                <label>接口说明:</label>
                <div class="bon-detail_text">
                  <span>{{permissionInfo.url.urlRemark}}</span>
                </div>
              </div>

            </template>
          </div>

        </el-col>
      </el-row>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="permissionForm" :rules="permissionRules" :model="permissionParams" label-position="left" label-width="80px"
               style='width: 500px; margin-left:50px;'>
        <el-form-item  label="权限类型">
          <el-select v-model="permissionParams.type" placeholder="请选择">
            <el-option
              v-for="item in permissionType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识" prop="permissionFlag">
          <el-input v-model="permissionParams.permissionFlag" placeholder="如：userList:menu"></el-input>
        </el-form-item>
        <!--菜单 start-->
        <template  v-if="permissionParams.type=='00'">
          <el-form-item label="名称" prop="menu.name" :rules="[{required:true,message:'名称不能为空',trigger:'blur'}]">
            <el-input v-model="permissionParams.menu.name"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" prop="menu.path">
            <el-input v-model="permissionParams.menu.path" placeholder="如：role/list"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="menu.component">
            <el-input v-model="permissionParams.menu.component" placeholder="如：/admin/RoleList"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="menu.title">
            <el-input v-model="permissionParams.menu.title" ></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="menu.icon">
            <el-input v-model="permissionParams.menu.icon" placeholder="如：fa fa-user-circle-o"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址" prop="menu.redirect">
            <el-input v-model="permissionParams.menu.redirect" placeholder="如：admin/user/list"></el-input>
          </el-form-item>
          <el-form-item label="是否隐藏" prop="menu.hidden">
            <el-select v-model="permissionParams.menu.hidden" placeholder="请选择">
              <el-option
                v-for="item in booleanType"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <!--菜单 end-->
        <!--接口url start-->
        <template  v-if="permissionParams.type=='01'">
          <el-form-item label="名称" prop="url.urlName" :rules="[{required:true,message:'名称不能为空',trigger:'blur'}]">
            <el-input v-model="permissionParams.url.urlName"></el-input>
          </el-form-item>
          <el-form-item label="url地址" prop="url.urlPath">
            <el-input v-model="permissionParams.url.urlPath" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="注释" prop="url.urlRemark">
            <el-input v-model="permissionParams.url.urlRemark" placeholder=""></el-input>
          </el-form-item>
        </template>
        <!--接口url end-->
        <div style="text-align: center;">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogTitle=='新增权限'||dialogTitle=='新增子权限'" type="primary" @click="createMenu">新增</el-button>
          <el-button v-else type="primary" @click="updateMenu">修改</el-button>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="新增vue视图" :visible.sync="dialogVueFormVisible">
      <el-form ref="genVueForm" :rules="genVueRules" :model="genVueParams" label-position="left" label-width="80px"
               style='width: 500px; margin-left:50px;'>
        <el-form-item label="模块名称" prop="modules" :rules="[{required:true,message:'模块名称不能为空',trigger:'blur'}]" >
          <el-input v-model="genVueParams.modules" placeholder="模块名称"></el-input>
        </el-form-item>
        <el-form-item label="表名" prop="tableName" :rules="{required:true,message:'表名不能为空',trigger:'blur'}">
          <el-input v-model="genVueParams.tableName"  placeholder="请填写驼峰形式，如：sysUser或SysUser"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button @click="dialogVueFormVisible = false">取消</el-button>
        <el-button  type="primary" @click="createVueMenu">新增</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>

  export default {
    data() {
      const data = [];
      return {
        //权限树配置
        permissionList: [],
        permissionProps: {
          label: 'permissionName',
          children: 'children'
        },
        //select类型定义
        permissionType:[{
          value: '00',
          label: '菜单'
        }, {
          value: '01',
          label: '接口url'
        }, {
          value: '99',
          label: '其他'
        }],
        booleanType:[{
          value: 1,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],

        //展示部分
        permissionInfo:{
          menu:{},
          url:{}
        },
        permissionInfoVisible:false,

        //权限参数部分
        permissionParams:{
          menu:{},
          url:{}
        },
        permissionRules: {
          permissionFlag: [{required:true,message:'权限标识不能为空',trigger:'blur'}],
        },
        dialogFormVisible:false,
        dialogTitle:'',

        //vue视图部分
        dialogVueFormVisible:false,
        genVueParams:{},
        genVueRules:{

        }

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
      //初始化参数
      initPermissionParams(){
        this.permissionParams = {
          menu:{},
          url:{}
        }
      },
      // 新增权限
      handleCreate() {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.initPermissionParams()
        this.dialogFormVisible = true;
        this.dialogTitle = '新增权限';
      },
      //新增子权限
      handleCreateChild(data) {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.initPermissionParams()
        //设置父id值
        this.permissionParams.parentId = data.permissionId;
        this.permissionParams.type = data.type;
        this.dialogFormVisible = true;
        this.dialogTitle = '新增子权限';
      },
      //修改权限
      handleUpdate(data) {
        if (this.$refs['permissionForm'] !== undefined) {
          this.$refs['permissionForm'].resetFields();
        }
        this.initPermissionParams()
        this.permissionParams = this.permissionInfo;
        this.permissionParams.objectId = data.objectId;
        this.permissionParams.type = data.type;
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
          } else {
            this.$message.error('请输入正确的信息');
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
          } else {
            this.$message.error('请输入正确的信息');
          }
        }))
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
      //新增菜单视图部分（请前端人员新生成视图文件，并将视图文件加入前端项目后再使用）
      handleAddVue(){
        if (this.$refs['genVueForm'] !== undefined) {
          this.$refs['genVueForm'].resetFields();
        }
        this.dialogVueFormVisible = true;
      },
      createVueMenu(){
        this.$refs['genVueForm'].validate((valid => {
          if (valid) {
            this.getRequest('/permission/generateVueMenu?tableName='+this.genVueParams.tableName+'&modules='+this.genVueParams.modules).then(res => {
              if (res.data.code == '00') {
                this.dialogVueFormVisible = false;
                this.$message.success('新增成功，请重新登录获取新菜单');
              }
            })
          } else {
            this.$message.error('请输入正确的信息');
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
