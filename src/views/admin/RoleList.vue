<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="listParams.keyMap.like_roleName" class="filter-item" placeholder="角色名">
      </el-input>
      <el-button class="filter-item" @click="getList" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button @click="handleCreate" class="filter-item" style="margin-left: 10px;" type="primary"
                 icon="el-icon-edit">
        新增
      </el-button>
    </div>

    <el-table :data="pageInfo.list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.roleId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="角色名">
        <template slot-scope="scope">
          <span>{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="角色标识">
        <template slot-scope="scope">
          <span>{{scope.row.roleFlag}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.gmtCreate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.roleId)">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row.roleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination
      :pageSizes="pageSizes"
      :pageSize="listParams.pageSize"
      :pageCount="pageInfo.total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"></pagination>


    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="roleForm" :rules="rules" :model="roleParams" label-position="left" label-width="70px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item v-show="false" prop="roleId">
          <el-input v-model="roleParams.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="roleFlag">
          <el-input v-model="roleParams.roleFlag"></el-input>
        </el-form-item>
        <div style="padding-bottom: 20px;font-size: 14px;font-weight: 700">权限选择</div>
        <el-tree
          :data="permissionList"
          show-checkbox
          ref="permissionTree"
          node-key="permissionId"
          :props="{children: 'children',label: 'permissionName'}">
        </el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogTitle=='新增角色'" type="primary" @click="createRole">新增</el-button>
        <el-button v-else type="primary" @click="updateRole">修改</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import ElHeader from "element-ui/packages/header/src/main";

  export default {
    components: {
      ElHeader,
      Pagination
    },
    data() {
      return {
        listLoading: true,
        listParams: {
          pageSize: 2,
          pageNum: 1,
          keyMap: {},
          orderBy: ''
        },
        pageSizes: [2, 5, 10, 20],
        pageInfo: {
          list: []
        },
        dialogFormVisible: false,
        dialogTitle: '',
        roleParams: {},
        rules: {
          roleName: [{required: true, message: '请输入角色名', trigger: 'blur'}],
          roleFlag: [{required: true, message: '请输入角色标识', trigger: 'blur'}],
        },
        permissionList: [],
        permissionIds: []
      }
    },
    created() {
      this.getList()
      this.getAllPermission()
    },
    methods: {
      getList() {
        let _this = this;
        this.listLoading = true;
        this.postRequest('/role/listRole', this.listParams).then(res => {
          _this.listLoading = false;
          if (res.data.code == '00') {
            this.pageInfo = res.data.data;
          }
        })
      },
      getAllPermission() {
        this.getRequest('/permission/getAllPermissionTree').then(res => {
          if (res.data.code == '00') {
            this.permissionList = res.data.data;
          }
        })
      },
      checkPermission() {
        this.roleParams.permissionIds = this.permissionIds;
      },
      handleSizeChange(size) {
        this.listParams.pageSize = size;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.listParams.pageNum = currentPage;
        this.getList();
      },
      getPermissionTree(){
        console.log(this.$refs.permissionTree.getCheckedKeys());
        console.log(this.$refs.permissionTree.getHalfCheckedKeys());
      },
      handleCreate() {
        if (this.$refs['roleForm'] !== undefined) {
          this.$refs['roleForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '新增角色';
      },
      createRole() {
        this.postRequest('/role/saveRole', this.roleParams).then(res => {
          if (res.data.code == '00') {
            this.$message.success('新增成功');
            this.dialogFormVisible = false;
            this.getList();
          }
        })
      },
      handleUpdate(roleId) {
        if (this.$refs['roleForm'] !== undefined) {
          this.$refs['roleForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '修改角色';
        this.getRequest('/role/getRole?key=' + roleId).then(res => {
          if (res.data.code == '00') {
            this.roleParams = res.data.data;
            if (this.roleParams.permissionIds == undefined) {
              this.roleParams.permissionIds = [];
            }
            this.$refs.permissionTree.setCheckedKeys(this.roleParams.permissionIds)
          }
        })
      },
      updateRole() {
        //拼接半选中值和选中值并传给角色表单
        let halfCheckedIds = this.$refs.permissionTree.getHalfCheckedKeys()
        let checkedIds = this.$refs.permissionTree.getCheckedKeys()
        this.roleParams.permissionIds = halfCheckedIds.concat(checkedIds);
        this.postRequest('/role/updateRole', this.roleParams).then(res => {
          if (res.data.code == '00') {
            this.$message.success('修改成功');
            this.dialogFormVisible = false;
            this.getList();
          }
        })
      },
      handleDel(roleId) {
        this.$confirm('是否删除该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/role/deleteRole?key=' + roleId).then(res => {
            if (res.data.code == '00') {
              this.$message.success('删除成功');
              this.getList();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
    }
  }

</script>
