<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="listParams.tableName" class="filter-item" filterable placeholder="请选择">
        <el-option
          v-for="item in tableList"
          :key="item.sysBaseId"
          :label="item.tableName"
          :value="item.tableName">
        </el-option>
      </el-select>
      <el-button class="filter-item" @click="getList" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" @click="getList" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline">
        新增表
      </el-button>
    </div>

    <div class="cur-table_info">
      <div class="cur-table_title">表名：<el-input v-model="saveParams.tableName" :disabled="isNewTable" style="width:300px;" ></el-input></div>
      <div class="cur-table_desc">表备注：<el-input v-model="saveParams.tableRemark" style="width:300px;" ></el-input></div>
    </div>

    <div class="filter-container" v-show="saveParams.tableName!=''">
      <el-button type="primary" size="mini" @click="addField()">新增一行</el-button>
      <el-button type="primary" size="mini" @click="saveTable()">保存</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column width="200px" align="center" label="字段名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldName" ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="字段类型">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldType" ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="字段长度">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldLength" ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="是否为空">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isNull"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="是否唯一">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isUnique"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="默认值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.defaultValue" ></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="字段备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldRemark" ></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteField(scope.$index, list)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "sys",
    data() {
      return {
        tableList: [],
        listParams: {
          tableName: ''
        },
        isNewTable:true,
        list: [],
        listLoading: false,

        saveParams:{
          tableName: '',
          tableRemark: '',
          fieldList:[]
        }
      }
    },
    created() {
      this.listTables();
      this.getList();
    },
    methods: {
      listTables() {
        let _this = this;
        _this.listLoading = true;
        _this.getRequest('/sys/listTables').then(res => {
          _this.listLoading = false;
          if (res.data.code == '00') {
            _this.tableList = res.data.data;
          }
        })
      },
      getList() {
        let _this = this;
        _this.listLoading = true;
        _this.postRequest('/sys/listByTableName', _this.listParams).then(res => {
          _this.listLoading = false;
          if (res.data.code == '00') {
            _this.list = res.data.data;
            if (_this.list.length > 0) {
              _this.saveParams.tableName = res.data.data[0].tableName;
              _this.saveParams.tableRemark = res.data.data[0].tableRemark;
            }
          }
        })
      },
      addField(){
        this.list.push({});
      },
      deleteField(index,rows){
        rows.splice(index,1);
      },
      saveTable(){
        this.saveParams.fieldList = this.list;
        this.postRequest('/sys/saveTable', this.saveParams).then(res => {
          this.listLoading = false;
          if (res.data.code == '00') {
            this.$message.success('保存成功');
          }
        })
      }

    }

  }
</script>

<style scoped>
  .cur-table_info {
    padding-bottom: 20px;
  }
  .cur-table_title{
    padding: 10px 0;
  }
</style>
