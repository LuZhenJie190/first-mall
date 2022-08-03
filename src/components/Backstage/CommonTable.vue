<template>
    <div class="common_tabel">
        <el-table :data="tableData" border stripe height="90%" v-loading="pagination.loading"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" />
            <!-- 展示图片 -->
            <el-table-column show-overflow-tooltip v-for="item in tableLabelImg" :key="item.prop" :label="item.label"
                :width="item.width ? item.width : 180" :prop="item.prop">
                <template slot-scope="scope">
                    <img style="margin-left:10px;width: 80px;height: 80px;" :src="scope.row[item.prop]" />
                </template>
            </el-table-column>
            <!-- 展示文字 -->
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label"
                :width="item.width ? item.width : 180" :prop="item.prop" :sortable="item.sortable">
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{ scope.row[item.prop]
                    }}</span>
                </template>
            </el-table-column>
            <slot></slot>
        </el-table>
        <el-pagination class="paper" background layout="prev,pager,next,total" :total="pagination.total"
            :current-page.sync="pagination.page" :page-size="10" @current-change="changePage">
        </el-pagination>
    </div>

</template>

<script>
export default {
    name: "CommonTable",
    data() {
        return {
            curPage: 1,
            switchModel1: true
        }
    },
    props: {
        tableData: Array,
        tableLabel: Array,
        tableLabelImg: Array,
        pagination: Object
    },
    methods: {
        edit(row) {
            this.$emit('edit', row)
        },
        del(row) {
            this.$emit('del', row)
        },
        changePage(curPage) {
            this.$emit('changePage', curPage)
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        rootChange(val) {
            this.$emit('rootChange', val)
        }
    },
}
</script>

<style scoped>
.common_tabel {
    height: calc(100% - 100px);
    background-color: #fff;
    position: relative;
    top: 0px;
}

.paper {
    position: absolute;
    bottom: 0;
    right: 20px;
}
</style>