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
      <el-button class="filter-item" @click="addTable" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus-outline">
        新增表
      </el-button>
      <el-button class="filter-item" @click="deleteTable" style="margin-left: 10px;" type="danger" icon="el-icon-remove">
        删除表
      </el-button>
    </div>

    <div class="cur-table_info">
      <div class="cur-table_title">表名：
        <el-input v-model="saveParams.tableName" :disabled="!isNewTable" style="width:300px;"></el-input>
      </div>
      <div class="cur-table_desc">表备注：
        <el-input v-model="saveParams.tableRemark" style="width:300px;"></el-input>
      </div>
    </div>

    <div class="filter-container" v-show="saveParams.tableName!=''">
      <el-button type="primary" size="mini" @click="addField()">新增一行</el-button>
      <el-button type="primary" size="mini" @click="saveTable()">保存表数据</el-button>
      <el-button type="primary" size="mini" @click="generateTable()">创建数据库表</el-button>
      <el-button type="danger" size="mini" @click="dropTable()">销毁数据库表</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column width="150px" align="center" label="是否是主键id">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isId" active-value="1" inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="字段名">
        <template slot-scope="scope">
          <!--<el-form :model="scope.row" :rules="rules" ref="saveForm">-->
          <!--<el-form-item prop="fieldName">-->
          <!--<el-input v-model="scope.row.fieldName"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-form>-->
          <el-input v-model="scope.row.fieldName"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="字段类型">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fieldType" filterable placeholder="请选择">
            <el-option
              v-for="item in fieldTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="字段长度">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldLength"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="是否为空">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isNull" active-value="1" inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="是否唯一">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isUnique" active-value="1" inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="是否为无符号">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isUnsigned" active-value="1" inactive-value="0"></el-switch>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="默认值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.defaultValue"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="字段备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fieldRemark"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteField(scope.$index, list,scope.row)">删除</el-button>
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

        isNewTable: false,
        list: [],
        listLoading: false,

        //基础表表参数
        saveParams: {
          tableName: '',
          tableRemark: '',
          fieldList: []
        },
        deleteParams:{},
        //数据库操作参数
        generateParams:{},
        dropParams:{},

        rules: {
          fieldName: [{required: true, message: '请输入字段名', trigger: 'blur'}],
          fieldType: [{required: true, message: '请输入字段类型', trigger: 'blur'}],
        },
        //字段类型
        fieldTypeList: [
          {value: 'BIGINT', name: 'BIGINT'},
          {value: 'INT', name: 'INT'},
          {value: 'TINYINT', name: 'TINYINT'},
          {value: 'DECIMAL', name: 'DECIMAL'},
          {value: 'CHAR', name: 'CHAR'},
          {value: 'VARCHAR', name: 'VARCHAR'},
          {value: 'TEXT', name: 'TEXT'},
          {value: 'DATETIME', name: 'DATETIME'},
          {value: 'TIMESTAMP', name: 'TIMESTAMP'},
          {value: 'MONEY', name: 'MONEY'},
          {value: 'BIT', name: 'BIT'},
        ]
      }
    },
    created() {
      this.listTables();
      // this.getList();
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
        _this.isNewTable = false;
        _this.postRequest('/sys/listByTableName', _this.listParams).then(res => {
            _this.listLoading = false;
          if(res.data.code == '00') {
            _this.list = res.data.data;
            let str = JSON.stringify(_this.list);
            _this.list = JSON.parse(str,function (key, value) {
              if(value == 0 || value == 1){
                return value.toString();
              }
              return value;
            });
            if (_this.list.length > 0) {
              _this.saveParams.tableName = res.data.data[0].tableName;
              _this.saveParams.tableRemark = res.data.data[0].tableRemark;
            }
          }
        })
      },
      addField() {
        this.list.push({isNull: '1'});
      },
      deleteField(index, rows , curObj) {
        if(curObj.sysBaseId != null && curObj.sysBaseId != undefined){
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center:true,
            type: 'warning'
          }).then(() => {
            this.deleteParams.sysBaseId = curObj.sysBaseId;
            this.postRequest('/sys/deleteField', this.deleteParams).then(res => {
              if(res.data.code = '00') {
                this.$message({type: 'success', message: '删除成功!'});
                rows.splice(index, 1);
                this.listTables();
              }
            })
          }).catch(() => {
            this.$message({type: 'info',message: '已取消删除'});
          });
        }else{
          rows.splice(index, 1);
        }
      },
      deleteTable(){
        this.$confirm('此操作将表字段数据并且销毁表, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'error'
        }).then(() => {
          this.deleteParams.tableName = this.listParams.tableName;
          this.postRequest('/sys/deleteTable', this.deleteParams).then(res => {
            if(res.data.code = '00'){
              this.$message({type: 'success', message: '删除成功!'});
              this.listTables();
            }
          })
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});
        });
      },
      //保存数据
      saveTable() {
        // this.$refs['saveForm'].validate((valid => {
        //   if (valid) {
        //     console.log("dui")
        //   } else {
        //     console.log("cuo")
        //   }
        // }))
        this.saveParams.fieldList = this.list;
        this.postRequest('/sys/saveTable', this.saveParams).then(res => {
          this.listLoading = false;
          if(res.data.code = '00') {
            this.$message.success('保存成功');
            this.listTables();
          }
        })
      },
      //根据系统表创建数据库表
      generateTable(){
        this.generateParams.tableName = this.saveParams.tableName;
        this.generateParams.tableRemark = this.saveParams.tableRemark;
        this.postRequest('/sys/generateTable', this.generateParams).then(res => {
          this.listLoading = false;
          if(res.data.code = '00') {
            this.$message.success('表创建成功');
          }
        })
      },
      dropTable(){
        this.$confirm('此操作将销毁表中数据，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center:true,
          type: 'error'
        }).then(() => {
          this.dropParams.tableName = this.listParams.tableName;
          this.postRequest('/sys/dropTable', this.dropParams).then(res => {
            if(res.data.code = '00') {
              this.$message({type: 'success', message: '删除成功!'});
              rows.splice(index, 1);
              this.listTables();
            }
          })
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});
        });
      },
      //新增表
      addTable(){
        this.saveParams.tableName = '';
        this.saveParams.tableRemark = '';
        this.list = [];
        this.listParams.tableName = null;
        this.isNewTable = true;
      }

    }

  }
</script>

<style scoped>
  .cur-table_info {
    padding-bottom: 20px;
  }

  .cur-table_title {
    padding: 10px 0;
  }
</style>
